/**
 * GET /api/auth/session
 *
 * Return the current session info if the user is logged in.
 */

import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'

export async function GET() {
  const session = await getSession()

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  return NextResponse.json({
    authenticated: true,
    data: {
      id: session.userId,
      email: session.email,
      name: session.name,
    },
  })
}