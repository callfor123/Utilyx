/**
 * API Key conversion analytics endpoint (admin-only).
 *
 * GET /api/api-keys/analytics — Conversion funnel metrics for free API keys.
 *
 * Returns:
 *  - Total keys generated per day (last 30 days)
 *  - Expiry rate (% of keys expired without regeneration)
 *  - Regeneration rate (% of expired keys regenerated within 48h)
 *  - Conversion funnel: generated → expired → regenerated
 */

import { NextRequest, NextResponse } from 'next/server'
import { db, isDbAvailable } from '@/lib/db'
import { requireAdminAuth } from '@/lib/admin-auth'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

export async function GET(request: NextRequest) {
  const authError = requireAdminAuth(request)
  if (authError) return authError

  const ip = getClientIp(request)
  const rl = rateLimit(ip, 30, 60_000)
  if (!rl.allowed) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
  }

  if (!isDbAvailable) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }

  try {
    const period = request.nextUrl.searchParams.get('period') || '30d'
    const periodDays: Record<string, number> = { '7d': 7, '30d': 30, '90d': 90 }
    const days = periodDays[period] ?? 30
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

    // Total keys generated in period
    const [totalGenerated, totalExpired, totalRegenerated, eventsByDay, eventCounts] = await Promise.all([
      db.apiKey.count({ where: { createdAt: { gte: since } } }),
      db.apiKey.count({ where: { status: 'expired', createdAt: { gte: since } } }),
      db.apiKeyEvent.count({
        where: { eventType: 'regenerated', createdAt: { gte: since } },
      }),
      db.apiKeyEvent.groupBy({
        by: ['eventType'],
        where: { createdAt: { gte: since } },
        _count: { eventType: true },
      }),
      db.apiKeyEvent.count({ where: { createdAt: { gte: since } } }),
    ])

    // Keys generated per day (last N days)
    const generatedPerDay = await db.apiKeyEvent.groupBy({
      by: ['eventType'],
      where: { createdAt: { gte: since } },
      _count: { eventType: true },
    })

    // Daily generation counts
    const dailyGenerated = await db.$queryRaw<Array<{ date: string; count: bigint }>>`
      SELECT DATE("createdAt") as date, COUNT(*) as count
      FROM "ApiKeyEvent"
      WHERE "eventType" = 'generated' AND "createdAt" >= ${since}
      GROUP BY DATE("createdAt")
      ORDER BY date DESC
    `

    // Regeneration within 48h of expiry
    const regeneratedWithin48h = await db.$queryRaw<Array<{ count: bigint }>>`
      SELECT COUNT(DISTINCT e1."apiKeyId") as count
      FROM "ApiKeyEvent" e1
      JOIN "ApiKeyEvent" e2 ON e1."apiKeyId" = e2."apiKeyId"
      WHERE e1."eventType" = 'expired'
        AND e2."eventType" = 'regenerated'
        AND e2."createdAt" <= e1."createdAt" + INTERVAL '48 hours'
        AND e1."createdAt" >= ${since}
    `

    const expiredInPeriod = eventCounts > 0
      ? (generatedPerDay.find(e => e.eventType === 'expired')?._count.eventType ?? 0)
      : 0

    const regenRate = totalExpired > 0
      ? Math.round((Number(regeneratedWithin48h[0]?.count ?? 0) / totalExpired) * 100)
      : 0

    const expiryRate = totalGenerated > 0
      ? Math.round((totalExpired / totalGenerated) * 100)
      : 0

    // Funnel
    const funnel = {
      generated: totalGenerated,
      expired: totalExpired,
      regenerated: totalRegenerated,
    }

    return NextResponse.json({
      period,
      since: since.toISOString(),
      summary: {
        totalGenerated,
        totalExpired,
        totalRegenerated,
        expiryRate,
        regenerationRate: regenRate,
      },
      funnel,
      dailyGenerated: dailyGenerated.map(d => ({
        date: d.date,
        count: Number(d.count),
      })),
      eventsByType: Object.fromEntries(
        generatedPerDay.map(e => [e.eventType, e._count.eventType])
      ),
    })
  } catch (error) {
    console.error('[API Key Analytics] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}