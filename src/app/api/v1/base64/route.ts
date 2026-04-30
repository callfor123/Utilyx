/**
 * Base64 Encode/Decode API — POST /api/v1/base64
 *
 * Accepts JSON body: { "text": "...", "mode": "encode" | "decode" }
 * Returns the encoded or decoded result.
 *
 * Authentication: Bearer token or X-API-Key header required.
 * Rate limit: 100 requests/hour per API key.
 */

import { NextRequest } from 'next/server'
import { requireApiKey, apiError, apiSuccess, handleCors } from '@/lib/api-v1-helpers'

export const runtime = 'nodejs'

export async function OPTIONS() {
  return handleCors()
}

export async function POST(request: NextRequest) {
  // 1. Auth
  const auth = await requireApiKey(request)
  if (!auth.ok) return auth.response

  // 2. Parse body
  let body: { text?: unknown; mode?: unknown }
  try {
    body = await request.json()
  } catch {
    return apiError('bad_request', 'Request body must be valid JSON. Expected: { "text": "...", "mode": "encode" | "decode" }')
  }

  const { text, mode } = body

  if (typeof text !== 'string' || text.length === 0) {
    return apiError('bad_request', 'Field "text" is required and must be a non-empty string.')
  }

  // Encode: allow up to 1M chars (produces ~1.3M base64)
  // Decode: allow up to 5M chars of base64 (produces ~3.75M binary)
  const maxLen = mode !== undefined && String(mode).toLowerCase() === 'decode' ? 5_000_000 : 1_000_000
  if (text.length > maxLen) {
    return apiError('bad_request', `Text exceeds maximum length of ${maxLen.toLocaleString()} characters for ${mode === undefined || String(mode).toLowerCase() === 'encode' ? 'encode' : 'decode'} mode.`)
  }

  const modeStr = typeof mode === 'string' ? mode.toLowerCase() : 'encode'
  if (modeStr !== 'encode' && modeStr !== 'decode') {
    return apiError('bad_request', 'Field "mode" must be "encode" or "decode".')
  }

  // 3. Validate Base64 input before decoding
  if (modeStr === 'decode') {
    const trimmed = text.trim()
    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(trimmed)) {
      return apiError('bad_request', 'Invalid Base64 input. String contains characters outside the Base64 alphabet.')
    }
    if (trimmed.length % 4 !== 0) {
      return apiError('bad_request', 'Invalid Base64 input. String length is not a multiple of 4.')
    }
  }

  // 4. Process
  try {
    let result: string
    if (modeStr === 'encode') {
      result = Buffer.from(text, 'utf-8').toString('base64')
    } else {
      result = Buffer.from(text.trim(), 'base64').toString('utf-8')
    }

    return apiSuccess({
      mode: modeStr,
      input_length: text.length,
      output_length: result.length,
      result,
    })
  } catch {
    return apiError('bad_request', modeStr === 'decode' ? 'Invalid Base64 input. Could not decode the provided string.' : 'Failed to encode the provided text.')
  }
}