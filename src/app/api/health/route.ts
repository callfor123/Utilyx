import { NextResponse } from 'next/server'
import { isDbAvailable, db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  const start = Date.now()
  const checks: Record<string, { status: string; latencyMs: number; message?: string }> = {}

  if (isDbAvailable && db) {
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
        message: error instanceof Error ? error.message : 'Unknown error',
      }
    }

    try {
      await db.healthCheck.create({
        data: {
          service: 'api',
          status: 'healthy',
          latency: Date.now() - start,
        },
      })
    } catch {
      // Non-critical
    }
  } else {
    checks.database = {
      status: 'unavailable',
      latencyMs: 0,
      message: 'DATABASE_URL not configured - tools work without DB',
    }
  }

  checks.api = {
    status: 'healthy',
    latencyMs: Date.now() - start,
  }

  const allHealthy = Object.values(checks).every(c => c.status === 'healthy' || c.status === 'unavailable')
  const anyDown = Object.values(checks).some(c => c.status === 'down')
  const overallStatus = anyDown ? 'degraded' : allHealthy ? 'healthy' : 'degraded'

  return NextResponse.json(
    {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      latencyMs: Date.now() - start,
      checks,
    },
    { status: 200 }
  )
}
