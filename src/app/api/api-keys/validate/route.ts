/**
 * API Key validation endpoint.
 *
 * GET /api/api-keys/validate — Check if an API key is valid.
 *
 * Used by external consumers to verify their key before making tool API calls.
 */

import { NextRequest, NextResponse } from 'next/server'
import { validateApiKey } from '@/lib/api-key-auth'
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
    return NextResponse.json(
      { valid: false, error: result.error },
      { status: 401 },
    )
  }

  return NextResponse.json({
    valid: true,
    plan: result.key!.plan,
    expiresAt: result.key!.expiresAt.toISOString(),
  })
}