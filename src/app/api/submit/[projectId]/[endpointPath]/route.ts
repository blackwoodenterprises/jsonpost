import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { emailService } from '@/lib/email'

// Create a service role client for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Helper function to validate CORS origins
function validateCorsOrigin(requestOrigin: string | null, allowedDomains: string[] | null): boolean {
  // If no allowed domains are set, allow all origins
  if (!allowedDomains || allowedDomains.length === 0) {
    return true;
  }

  // If no origin header (e.g., server-to-server requests), allow
  if (!requestOrigin) {
    return true;
  }

  // Check if origin matches any allowed domain
  return allowedDomains.some(domain => {
    // Handle wildcard domains
    if (domain === '*') {
      return true;
    }
    
    // Handle subdomain wildcards (e.g., *.example.com)
    if (domain.startsWith('*.')) {
      const baseDomain = domain.substring(2);
      return requestOrigin.endsWith(baseDomain);
    }
    
    // Exact match
    return requestOrigin === domain || requestOrigin === `https://${domain}` || requestOrigin === `http://${domain}`;
  });
}

// Helper function to create responses with dynamic CORS headers
function createCorsResponse(
  data: Record<string, unknown> | { error: string } | { success: boolean; message: string; submission_id: string }, 
  status: number = 200,
  allowedOrigin: string = '*'
) {
  return NextResponse.json(data, {
    status,
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
    },
  })
}

// Helper function to extract real IP address for Vercel hosting
function getClientIP(request: NextRequest): string {
  // Vercel-specific headers (in order of preference)
  const vercelIP = request.headers.get('x-vercel-forwarded-for')
  if (vercelIP) {
    // x-vercel-forwarded-for can contain multiple IPs, take the first one (original client)
    return vercelIP.split(',')[0].trim()
  }

  // Standard forwarded headers
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one (original client)
    return forwardedFor.split(',')[0].trim()
  }

  // Other common headers
  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP.trim()
  }

  // Cloudflare header (if using Cloudflare in front of Vercel)
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  if (cfConnectingIP) {
    return cfConnectingIP.trim()
  }

  // Fallback to connection remote address (may not be available in serverless)
  const remoteAddr = request.headers.get('x-forwarded-host')
  if (remoteAddr) {
    return remoteAddr.trim()
  }

  return 'unknown'
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; endpointPath: string }> }
) {
  const { projectId, endpointPath } = await params;
  
  try {
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
          api_key,
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
      
      return createCorsResponse(
        { error: 'Endpoint not found' },
        404
      )
    }

    // Validate CORS origins
    const requestOrigin = request.headers.get('origin');
    const allowedDomains = Array.isArray(endpoint.allowed_domains) 
      ? endpoint.allowed_domains 
      : (endpoint.allowed_domains ? endpoint.allowed_domains.split(',').map((d: string) => d.trim()) : null);
    
    if (!validateCorsOrigin(requestOrigin, allowedDomains)) {
      return createCorsResponse(
        { error: 'CORS policy violation: Origin not allowed' },
        403,
        'null' // Don't allow the origin in the response
      );
    }

    // Validate API key if required
    if (endpoint.require_api_key) {
      const providedApiKey = request.headers.get('x-api-key');
      const projectApiKey = endpoint.project.api_key;
      
      if (!providedApiKey) {
        const corsOrigin = requestOrigin || (allowedDomains && allowedDomains.length > 0 ? allowedDomains[0] : '*')
        return createCorsResponse(
          { error: 'API key required. Include X-API-Key header.' },
          401,
          corsOrigin
        );
      }
      
      if (providedApiKey !== projectApiKey) {
        const corsOrigin = requestOrigin || (allowedDomains && allowedDomains.length > 0 ? allowedDomains[0] : '*')
        return createCorsResponse(
          { error: 'Invalid API key' },
          401,
          corsOrigin
        );
      }
    }

    // Check if method matches
    if (endpoint.method !== request.method) {
      const corsOrigin = requestOrigin || (allowedDomains && allowedDomains.length > 0 ? allowedDomains[0] : '*')
      return createCorsResponse(
        { error: `Method ${request.method} not allowed. Expected ${endpoint.method}` },
        405,
        corsOrigin
      )
    }

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
          return createCorsResponse(
            { error: 'Invalid request format. Please send JSON or form data.' },
            400,
            requestOrigin || '*'
          )
        }
      }
    }

    // Store the submission
    const clientIP = getClientIP(request)
    const { data: submission, error: submissionError } = await supabase
      .from('submissions')
      .insert({
        endpoint_id: endpoint.id,
        data: submissionData,
        ip_address: clientIP,
        user_agent: request.headers.get('user-agent') || 'unknown'
      })
      .select()
      .single()

    if (submissionError) {
      console.error('Error storing submission:', submissionError)
      return createCorsResponse(
        { error: endpoint.error_message || 'Failed to process submission' },
        500,
        requestOrigin || '*'
      )
    }

    // Update monthly submission count for the user
    const userId = endpoint.project.user.id
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1 // JavaScript months are 0-indexed

    console.log('Updating monthly submission count for user:', userId, 'Year:', year, 'Month:', month)

    // Use the database function to handle the counting logic
    const { error: countError } = await supabase.rpc('increment_monthly_submission_count', {
      p_user_id: userId,
      p_year: year,
      p_month: month
    })
    
    if (countError) {
      console.error('Error updating monthly submission count:', countError)
      // Don't fail the submission if count update fails, but log it for debugging
    } else {
      console.log('Successfully updated monthly submission count')
    }

    // Fetch multiple webhook URLs for this endpoint
    const { data: webhookUrls } = await supabase
      .from('endpoint_webhooks')
      .select('id, webhook_url')
      .eq('endpoint_id', endpoint.id)
      .eq('is_active', true)

    // Send webhooks if configured
    if (webhookUrls && webhookUrls.length > 0) {
      const webhookPromises = webhookUrls.map(async (webhookConfig) => {
        try {
          const webhookResponse = await fetch(webhookConfig.webhook_url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'User-Agent': 'JSONPost-Webhook/1.0'
            },
            body: JSON.stringify(submissionData)
          })

          // Log webhook delivery
          await supabase
            .from('webhook_logs')
            .insert({
              submission_id: submission.id,
              endpoint_webhook_id: webhookConfig.id,
              webhook_url: webhookConfig.webhook_url,
              status_code: webhookResponse.status,
              response_body: await webhookResponse.text(),
              status: 'sent',
              sent_at: new Date().toISOString()
            })

          return { success: true, url: webhookConfig.webhook_url }
        } catch (webhookError) {
          console.error('Webhook delivery failed:', webhookError)
          
          // Log failed webhook delivery
          await supabase
            .from('webhook_logs')
            .insert({
              submission_id: submission.id,
              endpoint_webhook_id: webhookConfig.id,
              webhook_url: webhookConfig.webhook_url,
              status_code: 0,
              error_message: webhookError instanceof Error ? webhookError.message : 'Unknown error',
              status: 'failed',
              sent_at: new Date().toISOString()
            })

          return { success: false, url: webhookConfig.webhook_url, error: webhookError }
        }
      })

      await Promise.allSettled(webhookPromises)
    }

    // Fetch multiple email addresses for this endpoint
    const { data: emailAddresses } = await supabase
      .from('endpoint_emails')
      .select('id, email_address')
      .eq('endpoint_id', endpoint.id)
      .eq('is_active', true)

    // Send email notifications if enabled
    if (endpoint.email_notifications && emailAddresses && emailAddresses.length > 0) {
      const emailPromises = emailAddresses.map(async (emailConfig) => {
        try {
          await emailService.sendSubmissionNotification(
            emailConfig.email_address,
            {
              endpointName: endpoint.name,
              projectName: endpoint.project.name,
              submissionData,
              submissionId: submission.id,
              submittedAt: new Date(submission.created_at).toLocaleString(),
              ipAddress: clientIP
            }
          )

          // Log email delivery
          await supabase
            .from('email_logs')
            .insert({
              submission_id: submission.id,
              endpoint_email_id: emailConfig.id,
              recipient_email: emailConfig.email_address,
              status: 'sent',
              sent_at: new Date().toISOString()
            })

          return { success: true, email: emailConfig.email_address }
        } catch (emailError) {
          console.error('Email notification failed:', emailError)
          
          // Log failed email delivery
          await supabase
            .from('email_logs')
            .insert({
              submission_id: submission.id,
              endpoint_email_id: emailConfig.id,
              recipient_email: emailConfig.email_address,
              status: 'failed',
              error_message: emailError instanceof Error ? emailError.message : 'Unknown error',
              sent_at: new Date().toISOString()
            })

          return { success: false, email: emailConfig.email_address, error: emailError }
        }
      })

      await Promise.allSettled(emailPromises)
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

    // Determine the correct CORS origin to return
    const corsOrigin = requestOrigin || (allowedDomains && allowedDomains.length > 0 ? allowedDomains[0] : '*')
    return createCorsResponse(response, 200, corsOrigin)

  } catch (error) {
    console.error('API Error:', error)
    return createCorsResponse(
      { error: 'Internal server error' },
      500
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

// Handle OPTIONS for CORS with dynamic origin support
export async function OPTIONS(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; endpointPath: string }> }
) {
  const { projectId, endpointPath } = await params;
  
  try {
    // Get the endpoint configuration to check CORS settings
    const { data: endpoint } = await supabase
      .from('endpoints')
      .select('allowed_domains')
      .eq('project_id', projectId)
      .eq('path', endpointPath)
      .single()

    const requestOrigin = request.headers.get('origin');
    const allowedDomains = Array.isArray(endpoint?.allowed_domains) 
      ? endpoint.allowed_domains 
      : (endpoint?.allowed_domains ? endpoint.allowed_domains.split(',').map((d: string) => d.trim()) : null);
    
    // Validate CORS origins for preflight
    if (!validateCorsOrigin(requestOrigin, allowedDomains)) {
      return new NextResponse(null, {
        status: 403,
        headers: {
          'Access-Control-Allow-Origin': 'null',
        },
      });
    }

    // Determine the correct CORS origin to return
    const corsOrigin = requestOrigin || (allowedDomains && allowedDomains.length > 0 ? allowedDomains[0] : '*')
    
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': corsOrigin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
      },
    })
  } catch (error) {
    console.error('OPTIONS Error:', error)
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
      },
    })
  }
}