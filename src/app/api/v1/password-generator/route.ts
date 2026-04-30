/**
 * Password Generator API — POST /api/v1/password-generator
 *
 * Accepts JSON body: { "length?": 16, "uppercase?": true, "lowercase?": true, "numbers?": true, "symbols?": true, "count?": 1 }
 * Returns one or more cryptographically random passwords with strength assessment.
 *
 * Authentication: Bearer token or X-API-Key header required.
 * Rate limit: 100 requests/hour per API key.
 */

import { NextRequest } from 'next/server'
import { requireApiKey, apiError, apiSuccess, handleCors } from '@/lib/api-v1-helpers'
import { randomBytes } from 'crypto'

export const runtime = 'nodejs'

function generatePassword(length: number, opts: { upper: boolean; lower: boolean; numbers: boolean; symbols: boolean }): string {
  let chars = ''
  if (opts.upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (opts.lower) chars += 'abcdefghijklmnopqrstuvwxyz'
  if (opts.numbers) chars += '0123456789'
  if (opts.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'
  if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz'

  // Rejection sampling to avoid modulo bias when chars.length doesn't divide 256
  const maxByte = 256 - (256 % chars.length)
  let result = ''
  let byteIdx = 0
  let bytes = randomBytes(Math.max(length * 3, 64)) // extra bytes for rejections
  while (result.length < length) {
    if (byteIdx >= bytes.length) {
      bytes = randomBytes(Math.max(length * 2, 32))
      byteIdx = 0
    }
    const b = bytes[byteIdx++]
    if (b < maxByte) {
      result += chars[b % chars.length]
    }
  }
  return result
}

function assessStrength(password: string): { score: number; label: string } {
  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (password.length >= 16) score++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^a-zA-Z0-9]/.test(password)) score++
  if (password.length >= 20) score++

  if (score <= 2) return { score, label: 'weak' }
  if (score <= 4) return { score, label: 'medium' }
  if (score <= 6) return { score, label: 'strong' }
  return { score, label: 'very_strong' }
}

export async function OPTIONS() {
  return handleCors()
}

export async function POST(request: NextRequest) {
  // 1. Auth
  const auth = await requireApiKey(request)
  if (!auth.ok) return auth.response

  // 2. Parse body
  let body: Record<string, unknown> = {}
  try {
    body = await request.json()
  } catch {
    return apiError('bad_request', 'Request body must be valid JSON. Expected: { "length?": 16, "uppercase?": true, "lowercase?": true, "numbers?": true, "symbols?": true, "count?": 1 }')
  }

  // 3. Validate parameters
  const length = typeof body.length === 'number' ? body.length : 16
  if (!Number.isInteger(length) || length < 4 || length > 128) {
    return apiError('bad_request', 'Parameter "length" must be an integer between 4 and 128.')
  }

  const count = typeof body.count === 'number' ? body.count : 1
  if (!Number.isInteger(count) || count < 1 || count > 50) {
    return apiError('bad_request', 'Parameter "count" must be an integer between 1 and 50.')
  }

  const opts = {
    upper: typeof body.uppercase === 'boolean' ? body.uppercase : true,
    lower: typeof body.lowercase === 'boolean' ? body.lowercase : true,
    numbers: typeof body.numbers === 'boolean' ? body.numbers : true,
    symbols: typeof body.symbols === 'boolean' ? body.symbols : true,
  }

  if (!opts.upper && !opts.lower && !opts.numbers && !opts.symbols) {
    return apiError('bad_request', 'At least one character class must be enabled (uppercase, lowercase, numbers, or symbols).')
  }

  // 4. Generate passwords
  const passwords = Array.from({ length: count }, () => {
    const pwd = generatePassword(length, opts)
    const strength = assessStrength(pwd)
    return { password: pwd, length: pwd.length, strength }
  })

  // 5. Return
  const result: Record<string, unknown> = {
    count: passwords.length,
    length,
    options: opts,
    passwords,
  }

  if (count === 1) {
    result.password = passwords[0].password
    result.strength = passwords[0].strength
  }

  return apiSuccess(result)
}