import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  const start = Date.now()
  const checks: Record<string, { status: string; latencyMs: number; message?: string }> = {}

  // Check database connectivity
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

  // Check API itself
  checks.api = {
    status: 'healthy',
    latencyMs: Date.now() - start,
  }

  const overallStatus = Object.values(checks).every(c => c.status === 'healthy')
    ? 'healthy'
    : Object.values(checks).some(c => c.status === 'down')
      ? 'down'
      : 'degraded'

  const totalLatency = Date.now() - start

  // Persist health check record
  try {
    await db.healthCheck.create({
      data: {
        service: 'api',
        status: overallStatus,
        latency: totalLatency,
        message: JSON.stringify(checks),
      },
    })
  } catch {
    // Non-critical: don't fail the health check if logging fails
  }

  return NextResponse.json(
    {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      latencyMs: totalLatency,
      checks,
    },
    { status: overallStatus === 'down' ? 503 : 200 }
  )
}
