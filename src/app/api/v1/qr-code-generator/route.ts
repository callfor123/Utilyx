/**
 * QR Code Generator API — POST /api/v1/qr-code-generator
 *
 * Accepts JSON body: { "data": "text or URL", "size?": 256, "format?": "png" }
 * Returns a base64-encoded QR code image.
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
  let body: { data?: unknown; size?: unknown; format?: unknown }
  try {
    body = await request.json()
  } catch {
    return apiError('bad_request', 'Request body must be valid JSON. Expected: { "data": "...", "size?": 256, "format?": "png" }')
  }

  const { data, size, format } = body

  if (typeof data !== 'string' || data.trim().length === 0) {
    return apiError('bad_request', 'Field "data" is required and must be a non-empty string.')
  }

  if (data.length > 4096) {
    return apiError('bad_request', 'Data exceeds maximum length of 4,096 characters.')
  }

  // Validate size (64–1024, default 256)
  let qrSize = 256
  if (size !== undefined) {
    qrSize = Number(size)
    if (!Number.isInteger(qrSize) || qrSize < 64 || qrSize > 1024) {
      return apiError('bad_request', 'Field "size" must be an integer between 64 and 1024.')
    }
  }

  // Validate format (png or svg, default png)
  const qrFormat = typeof format === 'string' && format.toLowerCase() === 'svg' ? 'svg' : 'png'

  // 3. Generate QR code
  try {
    const QRCode = (await import('qrcode')).default

    if (qrFormat === 'svg') {
      const svg = await QRCode.toString(data, {
        type: 'svg',
        width: qrSize,
        margin: 2,
        errorCorrectionLevel: 'M',
      })

      return apiSuccess({
        format: 'svg',
        mime_type: 'image/svg+xml',
        encoding: 'utf-8',
        svg,
      })
    }

    // PNG: return base64
    const buffer = await QRCode.toBuffer(data, {
      type: 'png',
      width: qrSize,
      margin: 2,
      errorCorrectionLevel: 'M',
    })

    return apiSuccess({
      format: 'png',
      mime_type: 'image/png',
      encoding: 'base64',
      size_bytes: buffer.length,
      data: buffer.toString('base64'),
    })
  } catch (err) {
    console.error('[QR API] Generation error:', err)
    return apiError('server_error', 'Failed to generate QR code. The data may be too long for the error correction level.')
  }
}