import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// In-memory metrics store (use a real store in production)
const startTime = Date.now()

export async function GET() {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000)
  const uptimePct = 100

  return NextResponse.json({
    uptime: uptimePct,
    uptime_seconds: uptimeSeconds,
    calls_24h: 0,
    calls_7d: 0,
    calls_30d: 0,
    error_rate: '0.0',
    avg_latency_ms: 0,
    protocols: {
      jupiter: 0,
      raydium: 0,
      orca: 0,
      meteora: 0,
      drift: 0,
      metaplex: 0,
    },
    timestamp: new Date().toISOString(),
  })
}
