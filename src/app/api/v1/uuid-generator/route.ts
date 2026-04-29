/**
 * UUID Generator API — GET /api/v1/uuid-generator
 *
 * Accepts query params: ?count=1&version=4
 * Returns one or more UUIDs.
 *
 * Authentication: Bearer token or X-API-Key header required.
 * Rate limit: 100 requests/hour per API key.
 */

import { NextRequest } from 'next/server'
import { requireApiKey, apiError, apiSuccess, handleCors } from '@/lib/api-v1-helpers'
import { randomUUID } from 'crypto'

export const runtime = 'nodejs'

export async function OPTIONS() {
  return handleCors()
}

export async function GET(request: NextRequest) {
  // 1. Auth
  const auth = await requireApiKey(request)
  if (!auth.ok) return auth.response

  // 2. Parse query params
  const countParam = request.nextUrl.searchParams.get('count')
  const versionParam = request.nextUrl.searchParams.get('version')

  let count = 1
  if (countParam !== null) {
    count = Number(countParam)
    if (!Number.isInteger(count) || count < 1 || count > 100) {
      return apiError('bad_request', 'Parameter "count" must be an integer between 1 and 100.')
    }
  }

  const version = versionParam ?? '4'
  if (version !== '4') {
    return apiError('bad_request', 'Only UUID version 4 is supported at this time.')
  }

  // 3. Generate UUIDs
  const uuids = Array.from({ length: count }, () => randomUUID())

  // 4. Return
  return apiSuccess({
    version: 4,
    count: uuids.length,
    uuids,
  })
}