/**
 * API Key authentication and validation for Utilyx.
 *
 * Free API keys expire automatically after a configurable period.
 * Keys are validated against the database on each request.
 */

import { db } from './db'
import { randomBytes, timingSafeEqual } from 'crypto'

/**
 * Track an API key event for analytics.
 * Fire-and-forget: never blocks the caller, errors are logged only.
 */
export function trackApiKeyEvent(params: {
  eventType: 'generated' | 'validated' | 'expired' | 'regenerated'
  apiKeyId?: string
  email?: string | null
  ip?: string | null
  metadata?: Record<string, unknown>
}) {
  db.apiKeyEvent
    .create({
      data: {
        eventType: params.eventType,
        apiKeyId: params.apiKeyId ?? null,
        email: params.email ?? null,
        ip: params.ip ?? null,
        metadata: params.metadata ? JSON.stringify(params.metadata) : null,
      },
    })
    .catch((err) => console.error('[ApiKeyEvent] Track error:', err))
}

/** Free plan: key expires after 5 days */
const FREE_KEY_DURATION_MS = 5 * 24 * 60 * 60 * 1000

/** Rate limit: max 100 requests per key per hour */
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 100

/** In-memory rate limit store (per key) */
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

// Periodic cleanup
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'test') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of rateLimitStore) {
      if (now > entry.resetAt) rateLimitStore.delete(key)
    }
  }, 60_000)
}

export interface ApiKeyValidationResult {
  valid: boolean
  error?: string
  key?: {
    id: string
    plan: string
    status: string
    expiresAt: Date
  }
}

/**
 * Validate an API key from a request.
 * Checks: existence, status, expiration, and rate limits.
 * Updates lastUsedAt and usageCount on success.
 */
export async function validateApiKey(request: Request): Promise<ApiKeyValidationResult> {
  const rawKey = extractApiKey(request)
  if (!rawKey) {
    return { valid: false, error: 'API key required. Provide via Authorization: Bearer <key> or X-API-Key header.' }
  }

  // Look up key in database
  const apiKeyRecord = await db.apiKey.findUnique({ where: { key: rawKey } })
  if (!apiKeyRecord) {
    return { valid: false, error: 'Invalid API key.' }
  }

  // Check status
  if (apiKeyRecord.status === 'revoked') {
    return { valid: false, error: 'API key has been revoked.' }
  }

  // Check expiration
  if (apiKeyRecord.status === 'expired' || new Date() > apiKeyRecord.expiresAt) {
    // Auto-expire in DB if not yet marked
    if (apiKeyRecord.status !== 'expired') {
      await db.apiKey.update({ where: { id: apiKeyRecord.id }, data: { status: 'expired' } })
    }
    return { valid: false, error: 'API key has expired. Generate a new one at /api-keys.' }
  }

  // Rate limit check
  const rateResult = checkRateLimit(apiKeyRecord.id)
  if (!rateResult.allowed) {
    return { valid: false, error: `Rate limit exceeded. Try again in ${Math.ceil((rateResult.resetAt - Date.now()) / 60000)} minutes.` }
  }

  // Update usage stats (fire and forget)
  db.apiKey.update({
    where: { id: apiKeyRecord.id },
    data: { lastUsedAt: new Date(), usageCount: { increment: 1 } },
  }).catch(() => {})

  return {
    valid: true,
    key: {
      id: apiKeyRecord.id,
      plan: apiKeyRecord.plan,
      status: apiKeyRecord.status,
      expiresAt: apiKeyRecord.expiresAt,
    },
  }
}

/**
 * Generate a new free API key.
 */
export async function generateApiKey(options: {
  name?: string
  email?: string
  ip?: string
  durationMs?: number
}): Promise<{ id: string; key: string; expiresAt: Date; plan: string }> {
  const key = `utilyx_${generateSecureToken()}`
  const expiresAt = new Date(Date.now() + (options.durationMs || FREE_KEY_DURATION_MS))

  const record = await db.apiKey.create({
    data: {
      key,
      name: options.name || null,
      email: options.email || null,
      plan: 'free',
      status: 'active',
      expiresAt,
      ip: options.ip || null,
    },
  })

  return {
    id: record.id,
    key: record.key,
    expiresAt: record.expiresAt,
    plan: record.plan,
  }
}

/**
 * Revoke an API key by its value.
 */
export async function revokeApiKey(keyValue: string): Promise<boolean> {
  const result = await db.apiKey.updateMany({
    where: { key: keyValue, status: 'active' },
    data: { status: 'revoked' },
  })
  return result.count > 0
}

/**
 * Get API key info (for dashboard display).
 */
export async function getApiKeyInfo(keyValue: string) {
  return db.apiKey.findUnique({
    where: { key: keyValue },
    select: {
      id: true,
      name: true,
      email: true,
      plan: true,
      status: true,
      expiresAt: true,
      createdAt: true,
      lastUsedAt: true,
      usageCount: true,
    },
  })
}

/**
 * Look up keys by email (for "my keys" dashboard).
 */
export async function getApiKeysByEmail(email: string) {
  return db.apiKey.findMany({
    where: { email },
    select: {
      id: true,
      key: true,
      name: true,
      plan: true,
      status: true,
      expiresAt: true,
      createdAt: true,
      lastUsedAt: true,
      usageCount: true,
    },
    orderBy: { createdAt: 'desc' },
  })
}

// --- Internal helpers ---

function extractApiKey(request: Request): string | null {
  const authHeader = request.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7).trim()
  }
  const headerKey = request.headers.get('x-api-key')
  if (headerKey) return headerKey.trim()

  return null
}

function generateSecureToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const segments: string[] = []
  for (let s = 0; s < 4; s++) {
    const bytes = randomBytes(8)
    let segment = ''
    for (let i = 0; i < 8; i++) {
      segment += chars[bytes[i] % chars.length]
    }
    segments.push(segment)
  }
  return segments.join('_')
}

function checkRateLimit(keyId: string): { allowed: boolean; resetAt: number } {
  const now = Date.now()
  const entry = rateLimitStore.get(keyId)

  if (!entry || now > entry.resetAt) {
    const resetAt = now + RATE_LIMIT_WINDOW_MS
    rateLimitStore.set(keyId, { count: 1, resetAt })
    return { allowed: true, resetAt }
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, resetAt: entry.resetAt }
  }

  entry.count += 1
  return { allowed: true, resetAt: entry.resetAt }
}