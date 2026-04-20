import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limit store (in-memory; use Redis/Upstash in multi-instance production deployments)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

// Evict expired entries periodically to prevent unbounded memory growth
const EVICTION_INTERVAL_MS = 5 * 60 * 1000 // 5 minutes
let lastEviction = Date.now()

function evictExpiredEntries(): void {
  const now = Date.now()
  if (now - lastEviction < EVICTION_INTERVAL_MS) return
  lastEviction = now
  for (const [key, entry] of rateLimitStore) {
    if (now > entry.resetAt) {
      rateLimitStore.delete(key)
    }
  }
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}

function rateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const entry = rateLimitStore.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + windowMs })
    return true // allowed
  }

  if (entry.count >= limit) {
    return false // rate-limited
  }

  entry.count++
  return true // allowed
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const ip = getClientIp(req)

  // Periodically evict expired rate limit entries to prevent memory growth
  evictExpiredEntries()

  // Apply tighter rate limiting on auth routes
  const isAuthRoute = pathname.startsWith('/api/auth')
  const isApiRoute = pathname.startsWith('/api/')

  if (isAuthRoute) {
    if (!rateLimit(`auth:${ip}`, 10, 15 * 60 * 1000)) {
      return new NextResponse('Too Many Requests', { status: 429 })
    }
  } else if (isApiRoute) {
    if (!rateLimit(`api:${ip}`, 100, 15 * 60 * 1000)) {
      return new NextResponse('Too Many Requests', { status: 429 })
    }
  }

  const response = NextResponse.next()

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  )
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://*.solana.com https://*.helius.xyz https://api.mainnet-beta.solana.com https://api.devnet.solana.com wss://*.solana.com",
      "frame-ancestors 'none'",
    ].join('; ')
  )

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|manifest.json|.*\\.png$|.*\\.svg$|.*\\.ico$).*)',
  ],
}
