/**
 * API Key auto-expiry cleanup endpoint.
 *
 * Called by Vercel Cron every 6 hours.
 * Marks all active keys past their expiresAt as expired.
 *
 * Also callable manually with admin auth for ad-hoc cleanup.
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAdminAuth } from '@/lib/admin-auth'
import { trackApiKeyEvent } from '@/lib/api-key-auth'

async function runCleanup() {
  const now = new Date()

  // Find keys that will be expired before updating (to track events)
  const expiringKeys = await db.apiKey.findMany({
    where: {
      status: 'active',
      expiresAt: { lt: now },
    },
    select: { id: true, email: true, ip: true },
  })

  const result = await db.apiKey.updateMany({
    where: {
      status: 'active',
      expiresAt: { lt: now },
    },
    data: {
      status: 'expired',
    },
  })

  // Track expiry events for each key
  for (const key of expiringKeys) {
    trackApiKeyEvent({
      eventType: 'expired',
      apiKeyId: key.id,
      email: key.email,
      ip: key.ip,
      metadata: { reason: 'cron_cleanup' },
    })
  }

  console.log(`[API Keys Cleanup] Expired ${result.count} keys at ${now.toISOString()}`)

  return { expiredCount: result.count, cleanedAt: now.toISOString() }
}

export async function POST(request: NextRequest) {
  // Allow Vercel Cron (no auth) or admin auth for manual runs
  const isCron = request.headers.get('x-vercel-cron') === '1'

  if (!isCron) {
    const authError = requireAdminAuth(request)
    if (authError) return authError
  }

  try {
    const result = await runCleanup()
    return NextResponse.json({ success: true, ...result })
  } catch (error) {
    console.error('[API Keys Cleanup] Error:', error)
    return NextResponse.json({ error: 'Cleanup failed.' }, { status: 500 })
  }
}

// Also support GET for manual admin-triggered cleanup
export async function GET(request: NextRequest) {
  const authError = requireAdminAuth(request)
  if (authError) return authError

  try {
    const result = await runCleanup()
    return NextResponse.json({ success: true, ...result })
  } catch (error) {
    console.error('[API Keys Cleanup] Error:', error)
    return NextResponse.json({ error: 'Cleanup failed.' }, { status: 500 })
  }
}