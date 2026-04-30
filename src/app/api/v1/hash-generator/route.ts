/**
 * Hash Generator API — POST /api/v1/hash-generator
 *
 * Accepts JSON body: { "text": "...", "algorithm?": "SHA-256" }
 * Returns hex hashes for the specified algorithm (or all supported algorithms).
 *
 * Supported algorithms: MD5, SHA-1, SHA-256, SHA-384, SHA-512
 *
 * Authentication: Bearer token or X-API-Key header required.
 * Rate limit: 100 requests/hour per API key.
 */

import { NextRequest } from 'next/server'
import { requireApiKey, apiError, apiSuccess, handleCors } from '@/lib/api-v1-helpers'
import { createHash } from 'crypto'

export const runtime = 'nodejs'

const SUPPORTED_ALGORITHMS = ['MD5', 'SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'] as const
type Algorithm = typeof SUPPORTED_ALGORITHMS[number]

export async function OPTIONS() {
  return handleCors()
}

export async function POST(request: NextRequest) {
  // 1. Auth
  const auth = await requireApiKey(request)
  if (!auth.ok) return auth.response

  // 2. Parse body
  let body: { text?: unknown; algorithm?: unknown }
  try {
    body = await request.json()
  } catch {
    return apiError('bad_request', 'Request body must be valid JSON. Expected: { "text": "...", "algorithm?": "SHA-256" }')
  }

  const { text, algorithm } = body

  if (typeof text !== 'string' || text.length === 0) {
    return apiError('bad_request', 'Field "text" is required and must be a non-empty string.')
  }

  if (text.length > 1_000_000) {
    return apiError('bad_request', 'Text exceeds maximum length of 1,000,000 characters.')
  }

  // 3. Determine which algorithms to compute
  let algorithms: Algorithm[]
  if (algorithm !== undefined) {
    const algo = String(algorithm).toUpperCase() as Algorithm
    if (!SUPPORTED_ALGORITHMS.includes(algo)) {
      return apiError('bad_request', `Unsupported algorithm "${algorithm}". Supported: ${SUPPORTED_ALGORITHMS.join(', ')}`)
    }
    algorithms = [algo]
  } else {
    // Default: compute all algorithms
    algorithms = [...SUPPORTED_ALGORITHMS]
  }

  // 4. Compute hashes
  const hashes: Record<string, string> = {}
  for (const algo of algorithms) {
    const digest = algo === 'MD5' ? 'md5' : algo.toLowerCase()
    hashes[algo] = createHash(digest).update(text).digest('hex')
  }

  // 5. Return
  const result: Record<string, unknown> = {
    text_length: text.length,
    algorithms: algorithms,
    hashes,
  }

  if (algorithms.length === 1) {
    result.algorithm = algorithms[0]
    result.hash = hashes[algorithms[0]]
  }

  return apiSuccess(result)
}