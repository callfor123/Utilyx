/**
 * POST /api/auth/login
 *
 * Authenticate with email and password.
 * Returns a session token on success.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail, verifyPassword, createSessionToken, setSessionCookie } from '@/lib/auth'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

const LOGIN_RATE_LIMIT = 10
const LOGIN_RATE_WINDOW = 15 * 60 * 1000 // 15 minutes

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)
  const rl = rateLimit(ip, LOGIN_RATE_LIMIT, LOGIN_RATE_WINDOW)
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Too many login attempts. Try again later.' },
      { status: 429 },
    )
  }

  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
    }

    const user = await getUserByEmail(email)
    if (!user) {
      // Don't reveal whether email exists
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    }

    const valid = await verifyPassword(password, user.passwordHash)
    if (!valid) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    }

    const token = await createSessionToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    })
    await setSessionCookie(token)

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    })
  } catch (error) {
    console.error('[Auth] Login error:', error)
    return NextResponse.json({ error: 'Login failed.' }, { status: 500 })
  }
}