/**
 * Shared helpers for /api/v1/* endpoints.
 *
 * All v1 endpoints must:
 * 1. Validate the API key via validateApiKey()
 * 2. Return proper HTTP status codes for auth failures
 * 3. Include rate-limit headers in responses
 * 4. Return CORS headers for cross-origin API access
 */

import { NextResponse } from 'next/server'
import { validateApiKey } from './api-key-auth'

/** Standard CORS headers for public API access */
export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, X-API-Key, Content-Type',
  'Access-Control-Max-Age': '86400',
}

/** Handle CORS preflight requests */
export function handleCors(): NextResponse {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

/** Standard error response shapes for the v1 API */
export type ApiErrorCode =
  | 'auth_required'
  | 'auth_invalid'
  | 'auth_expired'
  | 'auth_revoked'
  | 'rate_limited'
  | 'bad_request'
  | 'not_found'
  | 'server_error'

const HTTP_STATUS: Record<ApiErrorCode, number> = {
  auth_required: 401,
  auth_invalid: 401,
  auth_expired: 403,
  auth_revoked: 403,
  rate_limited: 429,
  bad_request: 400,
  not_found: 404,
  server_error: 500,
}

export interface ApiErrorResponse {
  error: ApiErrorCode
  message: string
  docs?: string
}

/**
 * Return a standardised error JSON response.
 */
export function apiError(
  code: ApiErrorCode,
  message: string,
  extra?: Record<string, unknown>,
): NextResponse {
  const status = HTTP_STATUS[code]
  return NextResponse.json(
    { error: code, message, ...extra },
    { status, headers: CORS_HEADERS },
  )
}

/**
 * Validate the API key from the request and return either an error response
 * or the validated key info.
 */
export async function requireApiKey(
  request: Request,
): Promise<{ ok: true; key: { id: string; plan: string; status: string; expiresAt: Date } } | { ok: false; response: NextResponse }> {
  const result = await validateApiKey(request)

  if (!result.valid) {
    // Map the generic error message to a structured code
    const msg = result.error ?? ''
    let code: ApiErrorCode = 'auth_invalid'
    if (msg.includes('required')) code = 'auth_required'
    else if (msg.includes('expired')) code = 'auth_expired'
    else if (msg.includes('revoked')) code = 'auth_revoked'

    return {
      ok: false,
      response: apiError(code, msg, { docs: 'https://utilyx.app/api-docs' }),
    }
  }

  return { ok: true, key: result.key! }
}

/**
 * Return a success JSON response with CORS headers and optional rate-limit headers.
 */
export function apiSuccess(
  data: Record<string, unknown>,
  headers?: Record<string, string>,
): NextResponse {
  return NextResponse.json(data, {
    status: 200,
    headers: { ...CORS_HEADERS, ...headers },
  })
}