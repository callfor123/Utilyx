/**
 * Admin API key authentication for protected routes.
 *
 * Reads ADMIN_API_KEY from environment. If the key is not set, all admin
 * routes return 503 Service Unavailable (so the app still works in dev
 * but admin endpoints are explicitly disabled).
 *
 * Security:
 *  - Only accepts key via Authorization: Bearer or X-Admin-Key header.
 *  - Query-param auth removed (was leaking keys into logs/referer/history).
 *  - Uses crypto.timingSafeEqual to prevent timing attacks.
 *
 * Usage:
 *   const authed = requireAdminAuth(request)
 *   if (authed) return authed   // 401 / 503 / 429 response
 */

import { timingSafeEqual } from 'crypto'

const ADMIN_KEY = process.env.ADMIN_API_KEY

/** Constant-time string comparison to prevent timing attacks */
function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) return false
  return timingSafeEqual(bufA, bufB)
}

export function requireAdminAuth(request: Request): Response | null {
  // If no admin key is configured, admin endpoints are disabled
  if (!ADMIN_KEY) {
    return new Response(
      JSON.stringify({ error: 'Admin API not configured' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } },
    )
  }

  const authHeader = request.headers.get('authorization')
  const bearer = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null
  const headerKey = request.headers.get('x-admin-key')

  const provided = bearer ?? headerKey

  if (!provided || !safeEqual(provided, ADMIN_KEY)) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } },
    )
  }

  return null // No error = authorized
}