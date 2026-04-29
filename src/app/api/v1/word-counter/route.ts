/**
 * Word Counter API — POST /api/v1/word-counter
 *
 * Accepts JSON body: { "text": "your text here" }
 * Returns word count, character count, sentence count, paragraph count, and reading time.
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
  let body: { text?: unknown }
  try {
    body = await request.json()
  } catch {
    return apiError('bad_request', 'Request body must be valid JSON. Expected: { "text": "..." }')
  }

  const { text } = body
  if (typeof text !== 'string') {
    return apiError('bad_request', 'Field "text" is required and must be a string.')
  }

  if (text.length > 1_000_000) {
    return apiError('bad_request', 'Text exceeds maximum length of 1,000,000 characters.')
  }

  // 3. Compute stats
  const trimmed = text.trim()

  const words = trimmed ? trimmed.split(/\s+/).length : 0
  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, '').length
  const sentences = trimmed ? (trimmed.match(/[.!?]+/g) || []).length || (trimmed ? 1 : 0) : 0
  const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter(p => p.trim()).length || (trimmed ? 1 : 0) : 0
  const readingTimeMinutes = Math.max(1, Math.ceil(words / 200))

  // 4. Return
  return apiSuccess({
    text_length: characters,
    words,
    characters: characters,
    characters_no_spaces: charactersNoSpaces,
    sentences,
    paragraphs,
    reading_time_minutes: readingTimeMinutes,
  })
}