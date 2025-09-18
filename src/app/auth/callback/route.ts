import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/dashboard'

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          },
        },
      }
    )
    
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('OAuth callback error:', error)
        return NextResponse.redirect(new URL('/auth/login?error=oauth_error', requestUrl.origin))
      }
      
      // Successful authentication - redirect to dashboard or specified next URL
      return NextResponse.redirect(new URL(next, requestUrl.origin))
    } catch (error) {
      console.error('OAuth callback exception:', error)
      return NextResponse.redirect(new URL('/auth/login?error=oauth_error', requestUrl.origin))
    }
  }

  // No code parameter - redirect to login
  return NextResponse.redirect(new URL('/auth/login', requestUrl.origin))
}