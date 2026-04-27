/**
 * API Key validation endpoint.
 *
 * GET /api/api-keys/validate — Check if an API key is valid.
 *
 * Used by external consumers to verify their key before making tool API calls.
 */

import { NextRequest, NextResponse } from 'next/server'
import { validateApiKey } from '@/lib/api-key-auth'

export async function GET(request: NextRequest) {
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