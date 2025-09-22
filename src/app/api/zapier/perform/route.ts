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

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const endpointId = searchParams.get('endpoint_id')
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100) // Max 100 records

    // Build query for submissions
    let query = supabase
      .from('submissions')
      .select(`
        id,
        data,
        ip_address,
        user_agent,
        created_at,
        endpoint:endpoints!inner(
          id,
          name,
          path,
          project:projects!inner(
            id,
            name,
            user_id
          )
        )
      `)
      .eq('endpoints.projects.user_id', profile.id)
      .order('created_at', { ascending: false })
      .limit(limit)

    // Filter by endpoint if specified
    if (endpointId) {
      query = query.eq('endpoint_id', endpointId)
    }

    const { data: submissions, error: submissionsError } = await query

    if (submissionsError) {
      console.error('Error fetching submissions:', submissionsError)
      return NextResponse.json(
        { error: 'Failed to fetch submissions' },
        { status: 500 }
      )
    }

    // Transform submissions into Zapier-friendly format
    const zapierData = submissions.map(submission => {
      // Handle the endpoint field which might be an array or object from Supabase join
      let endpoint: { id: string; name: string; path: string; project: unknown } | undefined
      let project: { id: string; name: string } | undefined
      
      if (Array.isArray(submission.endpoint)) {
        endpoint = submission.endpoint[0]
      } else {
        endpoint = submission.endpoint
      }
      
      if (!endpoint) {
        console.error('Missing endpoint data for submission:', submission.id)
        return null
      }
      
      if (Array.isArray(endpoint.project)) {
        project = (endpoint.project as Array<{ id: string; name: string }>)[0]
      } else {
        project = endpoint.project as { id: string; name: string }
      }
      
      if (!project) {
        console.error('Missing project data for endpoint:', endpoint.id)
        return null
      }
      
      return {
        id: submission.id,
        endpoint_id: endpoint.id,
        endpoint_name: endpoint.name,
        endpoint_path: endpoint.path,
        project_name: project.name,
        form_data: submission.data,
        ip_address: submission.ip_address,
        user_agent: submission.user_agent,
        submitted_at: submission.created_at,
        // Add individual form fields at the top level for easier mapping in Zapier
        ...flattenFormData(submission.data)
      }
    }).filter(Boolean) // Remove any null entries

    return NextResponse.json(zapierData, { status: 200 })

  } catch (error) {
    console.error('Zapier Perform API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper function to flatten form data for easier Zapier field mapping
function flattenFormData(data: Record<string, unknown>, prefix = 'field_'): Record<string, unknown> {
  const flattened: Record<string, unknown> = {}
  
  if (data && typeof data === 'object') {
    Object.entries(data).forEach(([key, value]) => {
      // Clean the key name for Zapier compatibility
      const cleanKey = key.replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase()
      
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        // Recursively flatten nested objects
        const nested = flattenFormData(value as Record<string, unknown>, `${prefix}${cleanKey}_`)
        Object.assign(flattened, nested)
      } else {
        // Convert arrays to comma-separated strings
        const finalValue = Array.isArray(value) ? value.join(', ') : value
        flattened[`${prefix}${cleanKey}`] = finalValue
      }
    })
  }
  
  return flattened
}