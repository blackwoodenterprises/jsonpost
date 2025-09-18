import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { emailService } from '@/lib/email'

// Create a service role client for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; endpointPath: string }> }
) {
  const { projectId, endpointPath } = await params;
  
  try {
    const contentType = request.headers.get('content-type') || ''
    let submissionData: Record<string, unknown> = {}

    // Handle different content types
    if (contentType.includes('application/json')) {
      // Handle JSON data
      submissionData = await request.json()
    } else if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
      // Handle form data
      const formData = await request.formData()
      for (const [key, value] of formData.entries()) {
        submissionData[key] = value
      }
    } else {
      // Try to parse as JSON first, then as form data
      try {
        submissionData = await request.json()
      } catch {
        try {
          const formData = await request.formData()
          for (const [key, value] of formData.entries()) {
            submissionData[key] = value
          }
        } catch {
          return NextResponse.json(
            { error: 'Invalid request format. Please send JSON or form data.' },
            { status: 400 }
          )
        }
      }
    }

    // Get the endpoint configuration with project and user info
    console.log('Looking for endpoint with:', { projectId, endpointPath })
    
    // First, let's check ALL endpoints with this path (regardless of project)
    const { data: allEndpointsWithPath } = await supabase
      .from('endpoints')
      .select('id, name, path, project_id')
      .eq('path', endpointPath)
    
    console.log('All endpoints with this path:', allEndpointsWithPath)
    
    // Check ALL endpoints in the database
    const { data: allEndpoints } = await supabase
      .from('endpoints')
      .select('id, name, path, project_id')
    
    console.log('ALL endpoints in database:', allEndpoints)
    
    const { data: endpoint, error: endpointError } = await supabase
      .from('endpoints')
      .select(`
        *,
        project:projects(
          id,
          name,
          user:profiles(
            id,
            email
          )
        )
      `)
      .eq('project_id', projectId)
      .eq('path', endpointPath)
      .single()

    console.log('Endpoint query result:', { endpoint, endpointError })

    if (endpointError || !endpoint) {
      console.log('Endpoint not found. Checking all endpoints for this project...')
      
      // Debug: Check what endpoints exist for this project
      const { data: projectEndpoints } = await supabase
        .from('endpoints')
        .select('id, name, path, project_id')
        .eq('project_id', projectId)
      
      console.log('All endpoints for project:', projectEndpoints)
      
      return NextResponse.json(
        { error: 'Endpoint not found' },
        { status: 404 }
      )
    }

    // Check if method matches
    if (endpoint.method !== request.method) {
      return NextResponse.json(
        { error: `Method ${request.method} not allowed. Expected ${endpoint.method}` },
        { status: 405 }
      )
    }

    // Store the submission
    const { data: submission, error: submissionError } = await supabase
      .from('submissions')
      .insert({
        endpoint_id: endpoint.id,
        data: submissionData,
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        user_agent: request.headers.get('user-agent') || 'unknown'
      })
      .select()
      .single()

    if (submissionError) {
      console.error('Error storing submission:', submissionError)
      return NextResponse.json(
        { error: endpoint.error_message || 'Failed to process submission' },
        { status: 500 }
      )
    }

    // Send webhook if configured
    if (endpoint.webhook_url) {
      try {
        await fetch(endpoint.webhook_url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'JSONPost-Webhook/1.0'
          },
          body: JSON.stringify({
            endpoint: {
              id: endpoint.id,
              name: endpoint.name,
              project_id: projectId
            },
            submission: {
              id: submission.id,
              data: submissionData,
              created_at: submission.created_at
            }
          })
        })
      } catch (webhookError) {
        console.error('Webhook delivery failed:', webhookError)
        // Don't fail the request if webhook fails
      }
    }

    // Send email notification if enabled
    if (endpoint.email_notifications && endpoint.project?.user?.email) {
      try {
        await emailService.sendSubmissionNotification(
          endpoint.project.user.email,
          {
            endpointName: endpoint.name,
            projectName: endpoint.project.name,
            submissionData,
            submissionId: submission.id,
            submittedAt: new Date(submission.created_at).toLocaleString(),
            ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
          }
        )
      } catch (emailError) {
        console.error('Email notification failed:', emailError)
        // Don't fail the request if email fails
      }
    }

    // Return success response
    const response = {
      success: true,
      message: endpoint.success_message || 'Submission received successfully',
      submission_id: submission.id
    }

    // Handle redirect if configured
    if (endpoint.redirect_url) {
      return NextResponse.redirect(endpoint.redirect_url, 302)
    }

    return NextResponse.json(response, { status: 200 })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle other HTTP methods
export async function PUT(request: NextRequest, { params }: { params: Promise<{ projectId: string; endpointPath: string }> }) {
  return POST(request, { params })
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ projectId: string; endpointPath: string }> }) {
  return POST(request, { params })
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}