import { NextRequest, NextResponse } from 'next/server'
import { db, isDbAvailable } from '@/lib/db'
import { z } from 'zod'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

// POST: Record a tool usage event (public, rate-limited: 60/min)
const trackSchema = z.object({
  toolId: z.string().min(1),
  category: z.string().min(1),
  action: z.string().min(1),
  success: z.boolean().default(true),
  fileSize: z.number().int().nullable().optional(),
  duration: z.number().int().nullable().optional(),
})

export async function POST(request: NextRequest) {
  // Rate limit
  const ip = getClientIp(request)
  const rl = rateLimit(ip, 60, 60_000)
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Rate limit exceeded', retryAfterMs: rl.resetAt - Date.now() },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
    )
  }

  try {
    const body = await request.json()
    const parsed = trackSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { toolId, category, action, success, fileSize, duration } = parsed.data
    const userAgent = request.headers.get('user-agent') ?? undefined

    if (!isDbAvailable) {
      // DB not configured - log without sensitive data but don't fail
      console.log('[Analytics] DB unavailable, event received:', { toolId, category, timestamp: new Date().toISOString() })
      return NextResponse.json({ recorded: true, note: 'Analytics received (DB unavailable)' }, { status: 201 })
    }

    await db.toolUsage.create({
      data: {
        toolId,
        category,
        action,
        success,
        fileSize: fileSize ?? null,
        duration: duration ?? null,
        userAgent,
        ip: ip !== 'unknown' ? ip : undefined,
      },
    })

    return NextResponse.json({ recorded: true }, { status: 201 })
  } catch (error) {
    console.error('[Analytics POST] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET: Retrieve usage analytics (admin-only, rate-limited: 30/min)
const querySchema = z.object({
  toolId: z.string().optional(),
  category: z.string().optional(),
  period: z.enum(['24h', '7d', '30d', '90d']).default('30d'),
  limit: z.coerce.number().int().min(1).max(1000).default(100),
})

export async function GET(request: NextRequest) {
  const ip = getClientIp(request)
  const rl = rateLimit(ip, 30, 60_000)
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Rate limit exceeded', retryAfterMs: rl.resetAt - Date.now() },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
    )
  }

  try {
    const { searchParams } = request.nextUrl
    const parsed = querySchema.safeParse(Object.fromEntries(searchParams))
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid query', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { toolId, category, period, limit } = parsed.data

    if (!isDbAvailable) {
      return NextResponse.json({
        error: 'Database not configured',
        note: 'Analytics API requires DATABASE_URL',
      }, { status: 503 })
    }

    const periodDays: Record<string, number> = { '24h': 1, '7d': 7, '30d': 30, '90d': 90 }
    const since = new Date(Date.now() - periodDays[period] * 24 * 60 * 60 * 1000)

    const where: Record<string, unknown> = { createdAt: { gte: since } }
    if (toolId) where.toolId = toolId
    if (category) where.category = category

    const [totalEvents, successCount, byTool, recentEvents] = await Promise.all([
      db.toolUsage.count({ where }),
      db.toolUsage.count({ where: { ...where, success: true } }),
      db.toolUsage.groupBy({
        by: ['toolId'],
        where,
        _count: { toolId: true },
        orderBy: { _count: { toolId: 'desc' } },
        take: 50,
      }),
      db.toolUsage.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        select: {
          id: true,
          toolId: true,
          category: true,
          action: true,
          success: true,
          fileSize: true,
          duration: true,
          createdAt: true,
        },
      }),
    ])

    return NextResponse.json({
      period,
      since: since.toISOString(),
      totalEvents,
      successRate: totalEvents > 0 ? Math.round((successCount / totalEvents) * 100) : 0,
      byTool: byTool.map(t => ({ toolId: t.toolId, count: t._count.toolId })),
      recentEvents,
    })
  } catch (error) {
    console.error('[Analytics GET] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
