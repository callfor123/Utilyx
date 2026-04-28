import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
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
    { status: 200 }
  )
}
