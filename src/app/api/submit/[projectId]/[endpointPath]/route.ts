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
    const uploadedFiles: File[] = []

    // Handle different content types
    if (contentType.includes('application/json')) {
      // Handle JSON data
      submissionData = await request.json()
    } else if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
      // Handle form data
      const formData = await request.formData()
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          // Check if file uploads are enabled for this endpoint
          if (!endpoint.file_uploads_enabled) {
            const corsOrigin = requestOrigin || (allowedDomains && allowedDomains.length > 0 ? allowedDomains[0] : '*')
            return createCorsResponse(
              { error: 'File uploads are not enabled for this endpoint' },
              400,
              corsOrigin
            )
          }
          uploadedFiles.push(value)
        } else {
          submissionData[key] = value
        }
      }
    } else {
      // Try to parse as JSON first, then as form data
      try {
        submissionData = await request.json()
      } catch {
        try {
          const formData = await request.formData()
          for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
              // Check if file uploads are enabled for this endpoint
              if (!endpoint.file_uploads_enabled) {
                const corsOrigin = requestOrigin || (allowedDomains && allowedDomains.length > 0 ? allowedDomains[0] : '*')
                return createCorsResponse(
                  { error: 'File uploads are not enabled for this endpoint' },
                  400,
                  corsOrigin
                )
              }
              uploadedFiles.push(value)
            } else {
              submissionData[key] = value
            }
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

    // Validate file uploads if any
    if (uploadedFiles.length > 0) {
      const corsOrigin = requestOrigin || (allowedDomains && allowedDomains.length > 0 ? allowedDomains[0] : '*')
      
      // Check if file uploads are enabled
      if (!endpoint.file_uploads_enabled) {
        return createCorsResponse(
          { error: 'File uploads are not enabled for this endpoint' },
          400,
          corsOrigin
        )
      }

      // Check file count limit
      if (uploadedFiles.length > (endpoint.max_files_per_submission || 5)) {
        return createCorsResponse(
          { error: `Too many files. Maximum ${endpoint.max_files_per_submission || 5} files allowed per submission.` },
          400,
          corsOrigin
        )
      }

      // Validate each file
      const maxFileSizeBytes = (endpoint.max_file_size_mb || 10) * 1024 * 1024
      const allowedFileTypes = endpoint.allowed_file_types || [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp', 
        'application/pdf', 'text/plain', 'text/csv',
        'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]

      for (const file of uploadedFiles) {
        // Check file size
        if (file.size > maxFileSizeBytes) {
          return createCorsResponse(
            { error: `File "${file.name}" is too large. Maximum size is ${endpoint.max_file_size_mb || 10}MB.` },
            400,
            corsOrigin
          )
        }

        // Check file type
        if (!allowedFileTypes.includes(file.type)) {
          return createCorsResponse(
            { error: `File type "${file.type}" is not allowed for file "${file.name}".` },
            400,
            corsOrigin
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

    // Handle file uploads if any
    const fileUploadRecords = []
    if (uploadedFiles.length > 0) {
      const corsOrigin = requestOrigin || (allowedDomains && allowedDomains.length > 0 ? allowedDomains[0] : '*')
      
      try {
        for (const file of uploadedFiles) {
          // Generate unique filename
          const timestamp = Date.now()
          const randomString = Math.random().toString(36).substring(2, 15)
          const fileExtension = file.name.split('.').pop() || ''
          const storedFilename = `${timestamp}_${randomString}.${fileExtension}`
          const filePath = `${endpoint.project.id}/${endpoint.id}/${storedFilename}`

          // Convert File to ArrayBuffer for upload
          const fileBuffer = await file.arrayBuffer()
          
          // Upload to Supabase Storage
          const { error: uploadError } = await supabase.storage
            .from('form-uploads')
            .upload(filePath, fileBuffer, {
              contentType: file.type,
              duplex: 'half'
            })

          if (uploadError) {
            console.error('Error uploading file:', uploadError)
            return createCorsResponse(
              { error: `Failed to upload file "${file.name}": ${uploadError.message}` },
              500,
              corsOrigin
            )
          }

          // Store file record in database
          const { data: fileRecord, error: fileRecordError } = await supabase
            .from('file_uploads')
            .insert({
              submission_id: submission.id,
              original_filename: file.name,
              stored_filename: storedFilename,
              file_path: filePath,
              file_size_bytes: file.size,
              mime_type: file.type,
              storage_bucket: 'form-uploads'
            })
            .select()
            .single()

          if (fileRecordError) {
            console.error('Error storing file record:', fileRecordError)
            // Try to clean up the uploaded file
            await supabase.storage.from('form-uploads').remove([filePath])
            return createCorsResponse(
              { error: `Failed to record file "${file.name}": ${fileRecordError.message}` },
              500,
              corsOrigin
            )
          }

          fileUploadRecords.push(fileRecord)
        }
      } catch (error) {
        console.error('Error processing file uploads:', error)
        return createCorsResponse(
          { error: 'Failed to process file uploads' },
          500,
          requestOrigin || '*'
        )
      }
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
      // Prepare webhook payload with file information
      const webhookPayload = {
        ...submissionData,
        _files: fileUploadRecords.map(file => ({
          id: file.id,
          original_filename: file.original_filename,
          file_size_bytes: file.file_size_bytes,
          mime_type: file.mime_type,
          download_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/form-uploads/${file.file_path}`
        }))
      }

      const webhookPromises = webhookUrls.map(async (webhookConfig) => {
        try {
          const webhookResponse = await fetch(webhookConfig.webhook_url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'User-Agent': 'JSONPost-Webhook/1.0'
            },
            body: JSON.stringify(webhookPayload)
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
      submission_id: submission.id,
      files_uploaded: fileUploadRecords.length,
      files: fileUploadRecords.map(file => ({
        id: file.id,
        original_filename: file.original_filename,
        file_size_bytes: file.file_size_bytes,
        mime_type: file.mime_type
      }))
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