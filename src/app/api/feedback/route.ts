import { NextRequest, NextResponse } from 'next/server'
import { db, isDbAvailable } from '@/lib/db'
import { z } from 'zod'
import { rateLimit, getClientIp } from '@/lib/rate-limit'
import { requireAdminAuth } from '@/lib/admin-auth'

// POST: Submit feedback (public, rate-limited: 10/min)
const feedbackSchema = z.object({
  toolId: z.string().nullable().optional(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(2000).nullable().optional(),
  email: z.string().email().nullable().optional(),
})

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)
  const rl = rateLimit(ip, 10, 60_000)
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Rate limit exceeded', retryAfterMs: rl.resetAt - Date.now() },
      {
        status: 429,
        headers: { 'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)) },
      }
    )
  }

  try {
    const body = await request.json()
    const parsed = feedbackSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { toolId, rating, comment, email } = parsed.data
    const userAgent = request.headers.get('user-agent') ?? undefined

    if (!isDbAvailable) {
      // DB not configured - log without PII but don't fail
      console.log('[Feedback] DB unavailable, feedback received:', { toolId, rating, timestamp: new Date().toISOString() })
      return NextResponse.json({ recorded: true, note: 'Feedback received (DB unavailable)' }, { status: 201 })
    }

    await db.feedback.create({
      data: {
        toolId: toolId ?? null,
        rating,
        comment: comment ?? null,
        email: email ?? null,
        userAgent,
        ip: ip !== 'unknown' ? ip : undefined,
      },
    })

    return NextResponse.json({ recorded: true }, { status: 201 })
  } catch (error) {
    console.error('[Feedback POST] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET: Retrieve feedback summary (rate-limited: 30/min)
const feedbackQuerySchema = z.object({
  toolId: z.string().optional(),
  period: z.enum(['24h', '7d', '30d', '90d']).default('30d'),
  limit: z.coerce.number().int().min(1).max(500).default(50),
})

export async function GET(request: NextRequest) {
  const authError = requireAdminAuth(request)
  if (authError) return authError

  const ip = getClientIp(request)
  const rl = rateLimit(ip, 30, 60_000)
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Rate limit exceeded', retryAfterMs: rl.resetAt - Date.now() },
      {
        status: 429,
        headers: { 'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)) },
      }
    )
  }

  try {
    const { searchParams } = request.nextUrl
    const parsed = feedbackQuerySchema.safeParse(Object.fromEntries(searchParams))
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid query', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { toolId, period, limit } = parsed.data

    if (!isDbAvailable) {
      return NextResponse.json({
        error: 'Database not configured',
        note: 'Feedback API requires DATABASE_URL',
      }, { status: 503 })
    }

    const periodDays: Record<string, number> = { '24h': 1, '7d': 7, '30d': 30, '90d': 90 }
    const since = new Date(Date.now() - periodDays[period] * 24 * 60 * 60 * 1000)

    const where: Record<string, unknown> = { createdAt: { gte: since } }
    if (toolId) where.toolId = toolId

    const [totalCount, avgRating, byRating, byTool, recentFeedback] = await Promise.all([
      db.feedback.count({ where }),
      db.feedback.aggregate({
        where,
        _avg: { rating: true },
      }),
      db.feedback.groupBy({
        by: ['rating'],
        where,
        _count: { rating: true },
        orderBy: { rating: 'asc' },
      }),
      db.feedback.groupBy({
        by: ['toolId'],
        where: { ...where, toolId: { not: null } },
        _count: { toolId: true },
        _avg: { rating: true },
        orderBy: { _count: { toolId: 'desc' } },
        take: 20,
      }),
      db.feedback.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        select: {
          id: true,
          toolId: true,
          rating: true,
          comment: true,
          createdAt: true,
        },
      }),
    ])

    return NextResponse.json({
      period,
      since: since.toISOString(),
      totalCount,
      averageRating: avgRating._avg.rating
        ? Math.round(avgRating._avg.rating * 100) / 100
        : null,
      byRating: Object.fromEntries(byRating.map(r => [r.rating, r._count.rating])),
      byTool: byTool.map(t => ({
        toolId: t.toolId,
        count: t._count.toolId,
        avgRating: t._avg.rating ? Math.round(t._avg.rating * 100) / 100 : null,
      })),
      recentFeedback,
    })
  } catch (error) {
    console.error('[Feedback GET] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
