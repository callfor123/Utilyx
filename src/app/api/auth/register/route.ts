/**
 * POST /api/auth/register
 *
 * Create a new user account with email and password.
 * Returns a session token on success.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createUser, getUserByEmail, createSessionToken, setSessionCookie } from '@/lib/auth'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

const REGISTER_RATE_LIMIT = 5
const REGISTER_RATE_WINDOW = 60 * 60 * 1000 // 1 hour

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)
  const rl = rateLimit(ip, REGISTER_RATE_LIMIT, REGISTER_RATE_WINDOW)
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Try again later.' },
      { status: 429, headers: { 'X-RateLimit-Remaining': '0' } },
    )
  }

  try {
    const body = await request.json()
    const { email, password, name } = body

    // Validate email
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 })
    }

    // Validate password
    if (!password || typeof password !== 'string' || password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
    }

    if (password.length > 128) {
      return NextResponse.json({ error: 'Password must be at most 128 characters.' }, { status: 400 })
    }

    // Check if user already exists
    const existing = await getUserByEmail(email)
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 })
    }

    // Create user
    const user = await createUser(email, password, name)

    // Create session
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
        createdAt: user.createdAt,
      },
    }, { status: 201 })
  } catch (error) {
    console.error('[Auth] Register error:', error)
    return NextResponse.json({ error: 'Failed to create account.' }, { status: 500 })
  }
}