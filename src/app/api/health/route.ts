import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  // Rate limit: 30 requests per minute per IP (prevents DB fill from unbounded writes)
  const ip = getClientIp(request)
  const rl = rateLimit(ip, 30, 60_000)
  if (!rl.allowed) {
    return NextResponse.json(
      { status: 'rate_limited', error: 'Too many requests' },
      { status: 429 },
    )
  }

  const start = Date.now()
  const checks: Record<string, { status: string; latencyMs: number; message?: string }> = {}

  const dbStart = Date.now()
  try {
    await db.$queryRaw`SELECT 1`
    const dbLatency = Date.now() - dbStart
    checks.database = {
      status: dbLatency < 500 ? 'healthy' : 'degraded',
      latencyMs: dbLatency,
    }
  } catch (error) {
    const dbLatency = Date.now() - dbStart
    checks.database = {
      status: 'down',
      latencyMs: dbLatency,
      message: 'Connection failed',
    }
  }

  try {
    await db.healthCheck.create({
      data: {
        service: 'api',
        status: Object.values(checks).every(c => c.status === 'healthy') ? 'healthy' : 'degraded',
        latency: Date.now() - start,
      },
    })
  } catch {
    // Non-critical
  }

  checks.api = {
    status: 'healthy',
    latencyMs: Date.now() - start,
  }

  const allHealthy = Object.values(checks).every(c => c.status === 'healthy')
  const overallStatus = allHealthy ? 'healthy' : 'degraded'

  return NextResponse.json(
    {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      latencyMs: Date.now() - start,
      checks,
    },
    { status: 200 },
  )
}