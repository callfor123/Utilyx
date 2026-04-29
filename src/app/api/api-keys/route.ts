/**
 * API Keys management endpoint.
 *
 * POST   /api/api-keys          — Generate a new free API key
 * GET    /api/api-keys?email=   — List keys by email (admin-only)
 * DELETE /api/api-keys          — Revoke a key (admin-only)
 */

import { NextRequest, NextResponse } from 'next/server'
import { generateApiKey, revokeApiKey, getApiKeysByEmail, trackApiKeyEvent } from '@/lib/api-key-auth'
import { rateLimit, getClientIp } from '@/lib/rate-limit'
import { requireAdminAuth } from '@/lib/admin-auth'
import { db } from '@/lib/db'

// Rate limit for key generation: 5 per hour per IP
const GENERATE_RATE_LIMIT = 5
const GENERATE_RATE_WINDOW = 60 * 60 * 1000

// Anti-abuse: max active keys per email / IP
const MAX_ACTIVE_KEYS_PER_EMAIL = 3
const MAX_ACTIVE_KEYS_PER_IP = 3

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)

  // Rate limit key generation
  const rl = rateLimit(ip, GENERATE_RATE_LIMIT, GENERATE_RATE_WINDOW)
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. You can generate up to 5 API keys per hour.' },
      { status: 429, headers: { 'X-RateLimit-Remaining': '0' } },
    )
  }

  try {
    const body = await request.json().catch(() => ({}))
    const name = typeof body.name === 'string' ? body.name.slice(0, 100) : undefined
    const email = typeof body.email === 'string' ? body.email.slice(0, 255) : undefined

    // Security: reject regenerate/replace flags — new keys must go through the form
    if (body.regenerate || body.replace) {
      return NextResponse.json(
        { error: 'Key regeneration is only available through the web UI. Generate a new key instead.' },
        { status: 400 },
      )
    }

    // Validate email format if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 })
    }

    // Anti-abuse: limit active keys per email
    if (email) {
      const emailKeyCount = await db.apiKey.count({ where: { email, status: 'active' } })
      if (emailKeyCount >= MAX_ACTIVE_KEYS_PER_EMAIL) {
        return NextResponse.json(
          { error: `You already have ${MAX_ACTIVE_KEYS_PER_EMAIL} active API keys. Revoke an existing key before generating a new one.` },
          { status: 429 },
        )
      }
    }

    // Anti-abuse: limit active keys per IP (when no email provided)
    if (!email) {
      const ipKeyCount = await db.apiKey.count({ where: { ip, status: 'active' } })
      if (ipKeyCount >= MAX_ACTIVE_KEYS_PER_IP) {
        return NextResponse.json(
          { error: `Rate limit: max ${MAX_ACTIVE_KEYS_PER_IP} active keys per IP without email. Provide an email to generate more keys.` },
          { status: 429 },
        )
      }
    }

    const result = await generateApiKey({ name, email, ip })

    // Detect regeneration: user had a prior expired key (same email or IP)
    const hadExpiredKey = email
      ? (await db.apiKey.count({ where: { email, status: 'expired' } })) > 0
      : (await db.apiKey.count({ where: { ip, status: 'expired' } })) > 0

    // Track generation event (regenerated if user had a prior expired key)
    trackApiKeyEvent({
      eventType: hadExpiredKey ? 'regenerated' : 'generated',
      apiKeyId: result.id,
      email,
      ip,
      metadata: { plan: result.plan, has_email: !!email },
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          id: result.id,
          key: result.key,
          plan: result.plan,
          expiresAt: result.expiresAt.toISOString(),
        },
      },
      {
        status: 201,
        headers: {
          'X-RateLimit-Remaining': rl.remaining.toString(),
        },
      },
    )
  } catch (error) {
    console.error('[API Keys] Generate error:', error)
    return NextResponse.json({ error: 'Failed to generate API key.' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const authError = requireAdminAuth(request)
  if (authError) return authError

  const email = request.nextUrl.searchParams.get('email')

  if (!email) {
    return NextResponse.json(
      { error: 'Email parameter required. GET /api/api-keys?email=your@email.com' },
      { status: 400 },
    )
  }

  try {
    const keys = await getApiKeysByEmail(email)

    // Mask keys for security (show only last 8 chars)
    const masked = keys.map((k) => ({
      ...k,
      key: k.key.length > 12 ? `••••••${k.key.slice(-8)}` : k.key,
    }))

    return NextResponse.json({ success: true, data: masked })
  } catch (error) {
    console.error('[API Keys] List error:', error)
    return NextResponse.json({ error: 'Failed to list API keys.' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const authError = requireAdminAuth(request)
  if (authError) return authError

  try {
    const body = await request.json().catch(() => ({}))
    const { key } = body

    if (!key || typeof key !== 'string') {
      return NextResponse.json({ error: 'API key is required in request body.' }, { status: 400 })
    }

    const revoked = await revokeApiKey(key)

    if (!revoked) {
      return NextResponse.json({ error: 'API key not found or already revoked/expired.' }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: 'API key revoked.' })
  } catch (error) {
    console.error('[API Keys] Revoke error:', error)
    return NextResponse.json({ error: 'Failed to revoke API key.' }, { status: 500 })
  }
}