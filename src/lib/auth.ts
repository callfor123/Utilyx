/**
 * User authentication for Utilyx.
 *
 * Uses bcrypt for password hashing and JWT for stateless sessions.
 * No external auth provider dependency — lightweight and self-contained.
 */

import { compare, genSalt, hash } from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import { db } from './db'
import { cookies } from 'next/headers'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'utilyx-dev-secret-change-in-prod')
const JWT_ALG = 'HS256'
const SESSION_COOKIE = 'utilyx_session'
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

// --- Password helpers ---

export async function hashPassword(password: string): Promise<string> {
  const salt = await genSalt(12)
  return hash(password, salt)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return compare(password, hash)
}

// --- JWT session helpers ---

export interface SessionPayload {
  userId: string
  email: string
  name: string | null
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: JWT_ALG })
    .setIssuedAt()
    .setExpirationTime(new Date(Date.now() + SESSION_DURATION_MS))
    .sign(JWT_SECRET)
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, { algorithms: [JWT_ALG] })
    return payload as unknown as SessionPayload
  } catch {
    return null
  }
}

// --- Cookie-based session for Server Components / API routes ---

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return null
  return verifySessionToken(token)
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DURATION_MS / 1000,
  })
}

export async function clearSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
}

// --- User CRUD ---

export async function createUser(email: string, password: string, name?: string) {
  const passwordHash = await hashPassword(password)
  return db.user.create({
    data: { email: email.toLowerCase().trim(), passwordHash, name: name || null },
  })
}

export async function getUserByEmail(email: string) {
  return db.user.findUnique({ where: { email: email.toLowerCase().trim() } })
}

export async function getUserById(id: string) {
  return db.user.findUnique({ where: { id } })
}