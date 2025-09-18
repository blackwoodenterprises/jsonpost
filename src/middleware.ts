import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
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

  // If user is not signed in and the current path is not /auth/login or /auth/signup, redirect the user to /auth/login
  if (!user && !request.nextUrl.pathname.startsWith('/auth/')) {
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
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|api/submit|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}