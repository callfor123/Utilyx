/**
 * API Key validation endpoint.
 *
 * GET /api/api-keys/validate — Check if an API key is valid.
 *
 * Used by external consumers to verify their key before making tool API calls.
 */

import { NextRequest, NextResponse } from 'next/server'
import { validateApiKey, trackApiKeyEvent } from '@/lib/api-key-auth'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

export async function GET(request: NextRequest) {
  // Rate limit: 30 requests per minute per IP
  const ip = getClientIp(request)
  const rl = rateLimit(ip, 30, 60_000)
  if (!rl.allowed) {
    return NextResponse.json(
      { valid: false, error: 'Rate limit exceeded. Please try again later.' },
      { status: 429 },
    )
  }

  const result = await validateApiKey(request)

  if (!result.valid) {
    // Track expiry event when a key is found but expired
    if (result.error?.includes('expired')) {
      trackApiKeyEvent({
        eventType: 'expired',
        ip,
        metadata: { reason: 'validation_check' },
      })
    }
    return NextResponse.json(
      { valid: false, error: result.error },
      { status: 401 },
    )
  }

  // Track validation event (fire-and-forget)
  trackApiKeyEvent({
    eventType: 'validated',
    apiKeyId: result.key!.id,
    ip,
  })

  return NextResponse.json({
    valid: true,
    plan: result.key!.plan,
    expiresAt: result.key!.expiresAt.toISOString(),
  })
}