import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Create a service role client for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
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
    const { target_url, endpoint_id, event_type = 'new_submission' } = body

    // Validate required fields
    if (!target_url || !endpoint_id) {
      return NextResponse.json(
        { error: 'target_url and endpoint_id are required' },
        { status: 400 }
      )
    }

    // Validate URL format
    try {
      new URL(target_url)
    } catch {
      return NextResponse.json(
        { error: 'Invalid target_url format' },
        { status: 400 }
      )
    }

    // Verify the endpoint belongs to the user
    const { data: endpoint, error: endpointError } = await supabase
      .from('endpoints')
      .select(`
        id,
        project:projects!inner(
          id,
          user_id
        )
      `)
      .eq('id', endpoint_id)
      .eq('projects.user_id', profile.id)
      .single()

    if (endpointError || !endpoint) {
      return NextResponse.json(
        { error: 'Endpoint not found or access denied' },
        { status: 404 }
      )
    }

    // Check if subscription already exists
    const { data: existingSubscription } = await supabase
      .from('zapier_subscriptions')
      .select('id')
      .eq('user_id', profile.id)
      .eq('endpoint_id', endpoint_id)
      .eq('target_url', target_url)
      .eq('event_type', event_type)
      .single()

    if (existingSubscription) {
      return NextResponse.json(
        { error: 'Subscription already exists' },
        { status: 409 }
      )
    }

    // Create the subscription
    const { data: subscription, error: subscriptionError } = await supabase
      .from('zapier_subscriptions')
      .insert({
        user_id: profile.id,
        endpoint_id: endpoint_id,
        target_url: target_url,
        event_type: event_type,
        is_active: true
      })
      .select()
      .single()

    if (subscriptionError) {
      console.error('Error creating subscription:', subscriptionError)
      return NextResponse.json(
        { error: 'Failed to create subscription' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        subscription_id: subscription.id,
        message: 'Subscription created successfully'
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Zapier Subscribe API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}