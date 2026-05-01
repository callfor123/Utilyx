import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from '@/i18n/routing'
import { verifySessionToken } from '@/lib/auth'

const intlMiddleware = createMiddleware(routing)

const PROTECTED_ROUTES = ['/dashboard']
const AUTH_ROUTES = ['/login', '/register']

const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '0',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
}

if (process.env.NODE_ENV === 'production') {
  SECURITY_HEADERS['Strict-Transport-Security'] = 'max-age=63072000; includeSubDomains; preload'
}

function withSecurityHeaders(response: NextResponse): NextResponse {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value)
  }
  return response
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const localeMatch = pathname.match(/^\/(fr|en|es|de|ar|pt)(\/.*)?$/)
  const locale = localeMatch ? localeMatch[1] : null
  const pathAfterLocale = localeMatch?.[2] || ''

  const isProtected = PROTECTED_ROUTES.some(route => pathAfterLocale.startsWith(route))
  const isAuthRoute = AUTH_ROUTES.some(route => pathAfterLocale.startsWith(route))

  const sessionToken = request.cookies.get('utilyx_session')?.value
  let isAuthenticated = false

  if (sessionToken) {
    const payload = await verifySessionToken(sessionToken)
    isAuthenticated = !!payload
  }

  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL(`/${locale || 'fr'}/login`, request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthRoute && isAuthenticated) {
    const dashboardUrl = new URL(`/${locale || 'fr'}/dashboard`, request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  const response = intlMiddleware(request)

  // Convert temporary (307) locale redirects to permanent (301) so that
  // Google AdSense and other bots follow the redirect reliably.
  if (response.status === 307) {
    const location = response.headers.get('location')
    if (location) {
      const redirectUrl = location.startsWith('http')
        ? new URL(location)
        : new URL(location, request.url)
      const permanent = NextResponse.redirect(redirectUrl, { status: 301 })
      withSecurityHeaders(permanent)
      // Preserve the locale cookie set by next-intl
      response.headers.getSetCookie().forEach(cookie => {
        permanent.headers.append('set-cookie', cookie)
      })
      return permanent
    }
  }

  return withSecurityHeaders(response)
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}