import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { Redis } from '@upstash/redis'

// Initialize Redis client for rate limiting
let redis: Redis | null = null

function getRedisClient(): Redis {
  if (!redis) {
    redis = new Redis({
      url: process.env.KEY_VALUE_STORE_KV_REST_API_URL!,
      token: process.env.KEY_VALUE_STORE_KV_REST_API_TOKEN!,
    })
  }
  return redis
}

// Rate limiting function using sliding window approach
async function checkRateLimit(
  identifier: string,
  windowSizeSeconds: number,
  maxRequests: number
): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
  try {
    const redisClient = getRedisClient()
    const now = Date.now()
    const windowStart = now - (windowSizeSeconds * 1000)
    const key = `rate_limit:${identifier}:${windowSizeSeconds}`

    // Use Redis pipeline for atomic operations
    const pipeline = redisClient.pipeline()
    
    // Remove expired entries
    pipeline.zremrangebyscore(key, 0, windowStart)
    
    // Count current requests in window
    pipeline.zcard(key)
    
    // Add current request
    pipeline.zadd(key, { score: now, member: `${now}-${Math.random()}` })
    
    // Set expiration
    pipeline.expire(key, windowSizeSeconds)
    
    const results = await pipeline.exec()
    
    if (!results) {
      throw new Error('Redis pipeline failed')
    }

    const currentCount = (results[1] as number) + 1 // +1 for the request we just added
    const allowed = currentCount <= maxRequests
    const remaining = Math.max(0, maxRequests - currentCount)
    const resetTime = now + (windowSizeSeconds * 1000)

    if (!allowed) {
      // Remove the request we just added since it's not allowed
      await redisClient.zrem(key, `${now}-${Math.random()}`)
    }

    return { allowed, remaining, resetTime }
  } catch (error) {
    console.error('Rate limiting error:', error)
    // Fail open - allow the request if Redis is unavailable
    return { allowed: true, remaining: maxRequests - 1, resetTime: Date.now() + (windowSizeSeconds * 1000) }
  }
}

// Get client identifier for rate limiting - purely based on IP and endpoint ID
function getClientIdentifier(request: NextRequest): string {
  // Try to get IP from various headers (for different deployment environments)
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const cfConnectingIp = request.headers.get('cf-connecting-ip')
  
  const ip = forwarded?.split(',')[0] || realIp || cfConnectingIp || 'unknown'
  
  // Extract endpoint ID from URL path: /api/submit/[projectId]/[endpointPath]
  if (request.nextUrl.pathname.startsWith('/api/submit/')) {
    const pathParts = request.nextUrl.pathname.split('/')
    if (pathParts.length >= 5) {
      const projectId = pathParts[3]
      const endpointPath = pathParts[4]
      // Create unique identifier: IP:projectId:endpointPath
      return `${ip}:${projectId}:${endpointPath}`
    }
  }
  
  // Fallback for other endpoints
  return `${ip}:${request.nextUrl.pathname}`
}

export async function middleware(request: NextRequest) {
  // Apply rate limiting to submission endpoints
  if (request.nextUrl.pathname.startsWith('/api/submit/')) {
    const identifier = getClientIdentifier(request)
    
    // Check both rate limits: 5 requests per 10 seconds AND 100 requests per minute
    const [shortTermLimit, longTermLimit] = await Promise.all([
      checkRateLimit(identifier, 10, 5),    // 5 requests per 10 seconds
      checkRateLimit(identifier, 60, 100)   // 100 requests per minute
    ])
    
    // If either limit is exceeded, return rate limit error
    if (!shortTermLimit.allowed || !longTermLimit.allowed) {
      const limitExceeded = !shortTermLimit.allowed ? shortTermLimit : longTermLimit
      const retryAfter = Math.ceil((limitExceeded.resetTime - Date.now()) / 1000)
      
      return new NextResponse(
        JSON.stringify({
          error: 'Rate limit exceeded',
          message: !shortTermLimit.allowed 
            ? 'Too many requests. Maximum 5 requests per 10 seconds allowed.'
            : 'Too many requests. Maximum 100 requests per minute allowed.',
          retryAfter: retryAfter
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit-Short': '5',
            'X-RateLimit-Remaining-Short': shortTermLimit.remaining.toString(),
            'X-RateLimit-Reset-Short': Math.ceil(shortTermLimit.resetTime / 1000).toString(),
            'X-RateLimit-Limit-Long': '100',
            'X-RateLimit-Remaining-Long': longTermLimit.remaining.toString(),
            'X-RateLimit-Reset-Long': Math.ceil(longTermLimit.resetTime / 1000).toString(),
          },
        }
      )
    }
    
    // Add rate limit headers to successful requests
    const response = NextResponse.next()
    response.headers.set('X-RateLimit-Limit-Short', '5')
    response.headers.set('X-RateLimit-Remaining-Short', shortTermLimit.remaining.toString())
    response.headers.set('X-RateLimit-Reset-Short', Math.ceil(shortTermLimit.resetTime / 1000).toString())
    response.headers.set('X-RateLimit-Limit-Long', '100')
    response.headers.set('X-RateLimit-Remaining-Long', longTermLimit.remaining.toString())
    response.headers.set('X-RateLimit-Reset-Long', Math.ceil(longTermLimit.resetTime / 1000).toString())
    
    // Continue with the request but return early to avoid auth checks for API endpoints
    return response
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            if (options?.httpOnly === false) {
              request.cookies.set(name, value)
            }
          })
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Define public paths that don't require authentication
  const publicPaths = [
    '/',
    '/docs',
    '/quick-start',
    '/free-html-form-generator',
    '/free-json-schema-builder',
    '/features-and-screenshots',
    '/status',
    '/help',
    '/terms-of-service',
    '/privacy-policy',
    '/refund-policy',
    '/blog',
    '/sitemap.xml',
    '/robots.txt',
    '/api/zapier/auth',
    '/api/zapier/subscribe',
    '/api/zapier/unsubscribe',
    '/api/zapier/perform',
    '/api/zapier/endpoints',
    '/api/webhook/dodo-payments',
    '/api/forms/form-schema'
  ]
  
  // If user is not signed in and the current path is not /auth/ or a public path, redirect the user to /auth/login
  if (!user && !request.nextUrl.pathname.startsWith('/auth/') && !publicPaths.includes(request.nextUrl.pathname) && !request.nextUrl.pathname.startsWith('/blog/')) {
    return NextResponse.redirect(new URL('/auth/login?redirectTo=' + encodeURIComponent(request.nextUrl.pathname), request.url))
  }

  // If user is signed in and the current path is /auth/login or /auth/signup, redirect the user to /dashboard
  if (user && request.nextUrl.pathname.startsWith('/auth/')) {
    const redirectTo = request.nextUrl.searchParams.get('redirectTo')
    const redirectPath = redirectTo || '/dashboard'
    return NextResponse.redirect(new URL(redirectPath, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/submit (public form submission endpoint)
     * - sitemap.xml (sitemap file)
     * - robots.txt (robots file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|api/submit|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}