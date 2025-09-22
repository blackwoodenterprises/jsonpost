import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Create a service role client for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function DELETE(request: NextRequest) {
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
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, email')
      .eq('zapier_api_key', apiKey)
      .single()

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { subscription_id, target_url, endpoint_id } = body

    // Build query based on provided parameters
    let query = supabase
      .from('zapier_subscriptions')
      .delete()
      .eq('user_id', profile.id)

    if (subscription_id) {
      // Delete by subscription ID (preferred method)
      query = query.eq('id', subscription_id)
    } else if (target_url && endpoint_id) {
      // Delete by target URL and endpoint ID
      query = query.eq('target_url', target_url).eq('endpoint_id', endpoint_id)
    } else if (target_url) {
      // Delete by target URL only
      query = query.eq('target_url', target_url)
    } else {
      return NextResponse.json(
        { error: 'Either subscription_id or target_url (with optional endpoint_id) is required' },
        { status: 400 }
      )
    }

    // Execute the deletion
    const { data: deletedSubscriptions, error: deleteError } = await query
      .select()

    if (deleteError) {
      console.error('Error deleting subscription:', deleteError)
      return NextResponse.json(
        { error: 'Failed to delete subscription' },
        { status: 500 }
      )
    }

    if (!deletedSubscriptions || deletedSubscriptions.length === 0) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        deleted_count: deletedSubscriptions.length,
        message: 'Subscription(s) deleted successfully'
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Zapier Unsubscribe API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}