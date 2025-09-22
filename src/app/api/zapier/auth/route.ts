import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Create a service role client for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  try {
    // Get the API key from the X-JSONPOST-API-KEY header
    const apiKey = request.headers.get('X-JSONPOST-API-KEY')
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key required. Include X-JSONPOST-API-KEY header.' },
        { status: 401 }
      )
    }

    // Look up the user by their Zapier API key
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('id, email')
      .eq('zapier_api_key', apiKey)
      .single()

    if (error || !profile) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      )
    }

    // Return success with user ID
    return NextResponse.json(
      { 
        success: true,
        user_id: profile.id,
        email: profile.email
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Zapier Auth API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}