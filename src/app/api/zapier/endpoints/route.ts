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

    // Fetch user's endpoints with project information
    const { data: endpoints, error: endpointsError } = await supabase
      .from('endpoints')
      .select(`
        id,
        name,
        path,
        description,
        project:projects!inner(
          id,
          name,
          user_id
        )
      `)
      .eq('projects.user_id', profile.id)
      .order('created_at', { ascending: false })

    if (endpointsError) {
      console.error('Error fetching endpoints:', endpointsError)
      return NextResponse.json(
        { error: 'Failed to fetch endpoints' },
        { status: 500 }
      )
    }

    // Transform endpoints into Zapier-friendly format
    // Zapier expects an array of objects with 'id' and 'label' properties
    const zapierEndpoints = (endpoints || []).map(endpoint => {
      // The project field is an array from the Supabase join, so we take the first element
      const project = Array.isArray(endpoint.project) ? endpoint.project[0] : endpoint.project
      return {
        id: endpoint.id,
        label: `${project.name} → ${endpoint.name} (/${endpoint.path})`,
        // Additional metadata that Zapier can use
        project_name: project.name,
        endpoint_name: endpoint.name,
        endpoint_path: endpoint.path,
        description: endpoint.description
      }
    })

    return NextResponse.json(zapierEndpoints)

  } catch (error) {
    console.error('Zapier endpoints API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}