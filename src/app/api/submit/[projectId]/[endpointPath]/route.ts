import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { emailService } from '@/lib/email'
import { Svix } from 'svix'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'

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

  // If origin is "null" (local files), allow when no specific domains are configured
  if (requestOrigin === 'null') {
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

// Helper function to flatten form data for Zapier field mapping
function flattenFormDataForZapier(data: Record<string, unknown>, prefix = ''): Record<string, unknown> {
  const flattened: Record<string, unknown> = {}
  
  for (const [key, value] of Object.entries(data)) {
    const newKey = prefix ? `${prefix}_${key}` : key
    
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      // Recursively flatten nested objects
      Object.assign(flattened, flattenFormDataForZapier(value as Record<string, unknown>, newKey))
    } else if (Array.isArray(value)) {
      // Handle arrays by creating indexed keys
      value.forEach((item, index) => {
        if (item && typeof item === 'object') {
          Object.assign(flattened, flattenFormDataForZapier(item as Record<string, unknown>, `${newKey}_${index}`))
        } else {
          flattened[`${newKey}_${index}`] = item
        }
      })
      // Also include the array length
      flattened[`${newKey}_count`] = value.length
    } else {
      flattened[newKey] = value
    }
  }
  
  return flattened
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
        const corsOrigin = requestOrigin === 'null' ? 'null' : (requestOrigin || (allowedDomains && allowedDomains.length > 0 ? allowedDomains[0] : '*'))
        return createCorsResponse(
          { error: 'API key required. Include X-API-Key header.' },
          401,
          corsOrigin
        );
      }
      
      if (providedApiKey !== projectApiKey) {
        const corsOrigin = requestOrigin === 'null' ? 'null' : (requestOrigin || (allowedDomains && allowedDomains.length > 0 ? allowedDomains[0] : '*'))
        return createCorsResponse(
          { error: 'Invalid API key' },
          401,
          corsOrigin
        );
      }
    }

    // Check if method matches
    if (endpoint.method !== request.method) {
      const corsOrigin = requestOrigin === 'null' ? 'null' : (requestOrigin || (allowedDomains && allowedDomains.length > 0 ? allowedDomains[0] : '*'))
      return createCorsResponse(
        { error: `Method ${request.method} not allowed. Expected ${endpoint.method}` },
        405,
        corsOrigin
      )
    }

    const contentType = request.headers.get('content-type') || ''
    let submissionData: Record<string, unknown> = {}
    const uploadedFiles: File[] = []

    console.log('Content-Type header:', contentType)
    console.log('Request method:', request.method)
    console.log('Request headers:', Object.fromEntries(request.headers.entries()))
    
    // Check if request body is readable
    console.log('Request body locked:', request.bodyUsed)
    console.log('Request body readable:', request.body?.locked === false)

    // Handle different content types
    try {
      if (contentType.includes('application/json')) {
        console.log('Parsing as JSON')
        // Handle JSON data
        submissionData = await request.json()
      } else {
        // For all other cases (including multipart/form-data, application/x-www-form-urlencoded, or no content-type)
        // try to parse as FormData first since file uploads require FormData
        console.log('Attempting to parse as FormData')
        console.log('Request body status before FormData parsing:', {
          bodyUsed: request.bodyUsed,
          bodyLocked: request.body?.locked
        })
        
        // Clone the request before attempting FormData parsing to preserve the body for fallback
        const clonedRequest = request.clone()
        
        try {
          const formData = await request.formData()
          console.log('FormData parsed successfully, processing entries...')
          
          for (const [key, value] of formData.entries()) {
            console.log(`Processing FormData entry: ${key}`, typeof value, value instanceof File ? `File: ${value.name}` : value)
            
            if (value instanceof File) {
              // Check if file uploads are enabled for this endpoint
              if (!endpoint.file_uploads_enabled) {
                const corsOrigin = requestOrigin === 'null' ? 'null' : (requestOrigin || (allowedDomains && allowedDomains.length > 0 ? allowedDomains[0] : '*'))
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
          
          console.log('FormData processing complete:', { 
            submissionData, 
            fileCount: uploadedFiles.length,
            fileNames: uploadedFiles.map(f => f.name)
          })
          
        } catch (formDataError) {
          console.error('FormData parsing failed:', formDataError)
          console.error('FormData error details:', {
            name: (formDataError as Error).name,
            message: (formDataError as Error).message,
            stack: (formDataError as Error).stack
          })
          
          // If it's multipart/form-data, try manual parsing as fallback using the cloned request
          if (contentType.includes('multipart/form-data')) {
            console.log('Attempting manual multipart parsing as fallback...')
            
            try {
              const boundary = contentType.split('boundary=')[1]
              if (!boundary) {
                throw new Error('No boundary found in Content-Type header')
              }
              
              // Use the cloned request for manual parsing
              const rawBody = await clonedRequest.arrayBuffer()
              const bodyBytes = new Uint8Array(rawBody)
              
              console.log('Manual parsing - Body length:', bodyBytes.length)
              console.log('Manual parsing - Boundary:', boundary)
              
              // Add size limits to prevent memory issues
              const MAX_BODY_SIZE = 50 * 1024 * 1024 // 50MB
              const MAX_FILES = 10
              
              if (bodyBytes.length > MAX_BODY_SIZE) {
                return createCorsResponse(
                  { error: `Request body too large. Maximum size is ${MAX_BODY_SIZE / (1024 * 1024)}MB` },
                  413,
                  requestOrigin || '*'
                )
              }
              
              // Convert to text for boundary splitting (but preserve binary data)
              const boundaryBytes = new TextEncoder().encode(`--${boundary}`)
              
              // Parse multipart manually using binary approach
              const parts: Uint8Array[] = []
              let currentStart = 0
              
              // Find boundary positions in the binary data
              for (let i = 0; i <= bodyBytes.length - boundaryBytes.length; i++) {
                let match = true
                for (let j = 0; j < boundaryBytes.length; j++) {
                  if (bodyBytes[i + j] !== boundaryBytes[j]) {
                    match = false
                    break
                  }
                }
                if (match) {
                  if (currentStart > 0) {
                    parts.push(bodyBytes.slice(currentStart, i))
                  }
                  currentStart = i + boundaryBytes.length
                  i += boundaryBytes.length - 1 // Skip ahead
                }
              }
              
              console.log('Manual parsing - Found parts:', parts.length)
              
              let fileCount = 0
              
              for (const partBytes of parts) {
                if (partBytes.length === 0) continue
                
                // Convert part to text to parse headers
                const partText = new TextDecoder('utf-8', { fatal: false }).decode(partBytes)
                const headerEndIndex = partText.indexOf('\r\n\r\n')
                if (headerEndIndex === -1) continue
                
                const headers = partText.substring(0, headerEndIndex)
                
                // Parse headers
                const headerLines = headers.split('\r\n')
                let name = ''
                let filename = ''
                let contentType = ''
                
                for (const headerLine of headerLines) {
                  if (headerLine.includes('Content-Disposition')) {
                    const nameMatch = headerLine.match(/name="([^"]*)"/)
                    const filenameMatch = headerLine.match(/filename="([^"]*)"/)
                    if (nameMatch) name = nameMatch[1]
                    if (filenameMatch) filename = filenameMatch[1]
                  } else if (headerLine.includes('Content-Type')) {
                    contentType = headerLine.split(':')[1].trim()
                  }
                }
                
                console.log(`Manual parsing - Processing field: ${name}`, { filename, contentType })
                
                if (filename) {
                  // It's a file - extract binary data
                  fileCount++
                  
                  if (fileCount > MAX_FILES) {
                    return createCorsResponse(
                      { error: `Too many files. Maximum allowed is ${MAX_FILES} files` },
                      413,
                      requestOrigin || '*'
                    )
                  }
                  
                  if (!endpoint.file_uploads_enabled) {
                    const corsOrigin = requestOrigin === 'null' ? 'null' : (requestOrigin || (allowedDomains && allowedDomains.length > 0 ? allowedDomains[0] : '*'))
                    return createCorsResponse(
                      { error: 'File uploads are not enabled for this endpoint' },
                      400,
                      corsOrigin
                    )
                  }
                  
                  // Extract binary file data (skip headers + \r\n\r\n)
                  const headerBytesLength = new TextEncoder().encode(headers + '\r\n\r\n').length
                  const fileData = partBytes.slice(headerBytesLength)
                  
                  // Remove trailing \r\n if present
                  let endIndex = fileData.length
                  if (endIndex >= 2 && fileData[endIndex - 2] === 13 && fileData[endIndex - 1] === 10) {
                    endIndex -= 2
                  }
                  
                  const cleanFileData = fileData.slice(0, endIndex)
                  const file = new File([cleanFileData], filename, { type: contentType })
                  uploadedFiles.push(file)
                } else {
                  // It's a regular field - extract as text
                  const headerBytesLength = new TextEncoder().encode(headers + '\r\n\r\n').length
                  const fieldData = partBytes.slice(headerBytesLength)
                  const fieldValue = new TextDecoder('utf-8').decode(fieldData).replace(/\r\n$/, '')
                  submissionData[name] = fieldValue
                }
              }
              
              console.log('Manual parsing successful:', { 
                submissionData, 
                fileCount: uploadedFiles.length,
                fileNames: uploadedFiles.map(f => f.name)
              })
              
            } catch (manualParseError) {
              console.error('Manual multipart parsing also failed:', manualParseError)
              return createCorsResponse(
                { error: 'Failed to parse form data. Please check your request format and ensure files are properly attached.' },
                400,
                requestOrigin || '*'
              )
            }
          } else {
            // For other content types, try JSON as fallback only if the request body hasn't been consumed
            try {
              console.log('Attempting JSON fallback after FormData failure')
              submissionData = await request.json()
            } catch (jsonError) {
              console.error('JSON parsing also failed:', jsonError)
              return createCorsResponse(
                { error: 'Invalid request format. Please send JSON or properly formatted form data.' },
                400,
                requestOrigin || '*'
              )
            }
          }
        }
      }
    } catch (error) {
      console.error('Outer parsing error:', error)
      const corsOrigin = requestOrigin === 'null' ? 'null' : (requestOrigin || (allowedDomains && allowedDomains.length > 0 ? allowedDomains[0] : '*'))
      return createCorsResponse(
        { error: 'Failed to parse request body. Please check your request format.' },
        400,
        corsOrigin
      )
    }

    // Validate file uploads if any
    if (uploadedFiles.length > 0) {
      const corsOrigin = requestOrigin === 'null' ? 'null' : (requestOrigin || (allowedDomains && allowedDomains.length > 0 ? allowedDomains[0] : '*'))
      
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
        'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
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

    // JSON Schema Validation (if enabled)
    if (endpoint.json_validation_enabled && endpoint.json_schema) {
      const corsOrigin = requestOrigin === 'null' ? 'null' : (requestOrigin || (allowedDomains && allowedDomains.length > 0 ? allowedDomains[0] : '*'))
      
      try {
        // Initialize AJV with formats support
        const ajv = new Ajv({ allErrors: true })
        addFormats(ajv)
        
        // Parse and clean the schema (remove $schema property if present)
        let schema = endpoint.json_schema
        if (typeof schema === 'string') {
          schema = JSON.parse(schema)
        }
        
        // Remove $schema property to avoid meta-schema validation issues
        if (schema && typeof schema === 'object' && '$schema' in schema) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { $schema: _$schema, ...cleanSchema } = schema
          schema = cleanSchema
        }
        
        // Compile the schema
        const validate = ajv.compile(schema)
        
        // Validate the submission data
        const valid = validate(submissionData)
        
        if (!valid) {
          // Format validation errors
          const errors = validate.errors?.map(error => {
            const field = error.instancePath ? error.instancePath.replace('/', '') : error.schemaPath
            return `${field}: ${error.message}`
          }).join(', ') || 'Invalid data format'
          
          return createCorsResponse(
            { error: `Validation failed: ${errors}` },
            400,
            corsOrigin
          )
        }
      } catch (schemaError) {
        console.error('JSON schema validation error:', schemaError)
        return createCorsResponse(
          { error: 'Invalid JSON schema configuration' },
          500,
          corsOrigin
        )
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
      const corsOrigin = requestOrigin === 'null' ? 'null' : (requestOrigin || (allowedDomains && allowedDomains.length > 0 ? allowedDomains[0] : '*'))
      
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

    // Send webhooks via Svix if enabled
    if (endpoint.webhooks_enabled && endpoint.svix_app_id) {
      try {
        const svix = new Svix(process.env.SVIX_AUTH_TOKEN!)
        
        // Prepare webhook payload with file information
        const webhookPayload = {
          ...submissionData,
          _files: fileUploadRecords.map(file => ({
            id: file.id,
            original_filename: file.original_filename,
            file_size_bytes: file.file_size_bytes,
            mime_type: file.mime_type,
            download_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/form-uploads/${file.file_path}`
          })),
          endpoint: {
            id: endpoint.id,
            name: endpoint.name,
            path: endpoint.path
          },
          submission_id: submission.id,
          created_at: submission.created_at
        }

        // Send event to Svix
        await svix.message.create(endpoint.svix_app_id, {
          eventType: 'form.submitted',
          payload: webhookPayload
        })

        console.log('Successfully sent webhook event to Svix')
      } catch (svixError) {
        console.error('Failed to send webhook event to Svix:', svixError)
        // Don't fail the submission if webhook fails
      }
    } else {
      // Fallback to direct webhooks for backward compatibility
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
    }

    // Fetch multiple email addresses for this endpoint
    const { data: emailAddresses } = await supabase
      .from('endpoint_emails')
      .select('id, email_address')
      .eq('endpoint_id', endpoint.id)
      .eq('is_active', true)

    // Send email notifications if enabled
    if (endpoint.email_notifications && emailAddresses && emailAddresses.length > 0) {
      // Prepare file attachments data for email
      const fileAttachments = fileUploadRecords.map(fileRecord => {
        // Generate internal download URL instead of direct Supabase URL
        const downloadUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/files/${fileRecord.id}/download`
        
        return {
          filename: fileRecord.original_filename,
          size: fileRecord.file_size_bytes,
          type: fileRecord.mime_type,
          downloadUrl: downloadUrl
        }
      })

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
              ipAddress: clientIP,
              fileAttachments: fileAttachments.length > 0 ? fileAttachments : undefined
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

    // Send Zapier webhook notifications
    console.log('🔍 [ZAPIER DEBUG] Checking for Zapier subscriptions for endpoint:', endpoint.id)
    
    const { data: zapierSubscriptions } = await supabase
      .from('zapier_subscriptions')
      .select('id, target_url, event_type')
      .eq('endpoint_id', endpoint.id)
      .eq('event_type', 'new_submission')
      .eq('is_active', true)

    console.log('🔍 [ZAPIER DEBUG] Found subscriptions:', zapierSubscriptions?.length || 0)
    if (zapierSubscriptions && zapierSubscriptions.length > 0) {
      console.log('🔍 [ZAPIER DEBUG] Subscription details:', zapierSubscriptions.map(sub => ({
        id: sub.id,
        target_url: sub.target_url,
        event_type: sub.event_type
      })))
    }

    if (zapierSubscriptions && zapierSubscriptions.length > 0) {
      // Prepare Zapier webhook payload
      const zapierPayload = {
        id: submission.id,
        endpoint_id: endpoint.id,
        endpoint_name: endpoint.name,
        endpoint_path: endpoint.path,
        project_name: endpoint.project.name,
        form_data: submissionData,
        ip_address: clientIP,
        user_agent: request.headers.get('user-agent') || 'unknown',
        submitted_at: submission.created_at,
        files: fileUploadRecords.map(file => ({
          id: file.id,
          filename: file.original_filename,
          size: file.file_size_bytes,
          type: file.mime_type,
          download_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/files/${file.id}/download`
        })),
        // Flatten form data for easier Zapier field mapping
        ...flattenFormDataForZapier(submissionData)
      }

      console.log('🔍 [ZAPIER DEBUG] Prepared webhook payload:', {
        submission_id: zapierPayload.id,
        endpoint_id: zapierPayload.endpoint_id,
        endpoint_name: zapierPayload.endpoint_name,
        project_name: zapierPayload.project_name,
        form_data_keys: Object.keys(zapierPayload.form_data || {}),
        files_count: zapierPayload.files.length,
        flattened_fields: Object.keys(zapierPayload).filter(key => 
          !['id', 'endpoint_id', 'endpoint_name', 'endpoint_path', 'project_name', 'form_data', 'ip_address', 'user_agent', 'submitted_at', 'files'].includes(key)
        )
      })

      const zapierPromises = zapierSubscriptions.map(async (subscription) => {
        console.log(`🔍 [ZAPIER DEBUG] Sending webhook to: ${subscription.target_url}`)
        console.log(`🔍 [ZAPIER DEBUG] Payload size: ${JSON.stringify(zapierPayload).length} characters`)
        
        try {
          const startTime = Date.now()
          const zapierResponse = await fetch(subscription.target_url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'User-Agent': 'JSONPost-Zapier-Webhook/1.0'
            },
            body: JSON.stringify(zapierPayload)
          })
          const endTime = Date.now()

          console.log(`✅ [ZAPIER DEBUG] Webhook delivered successfully:`, {
            url: subscription.target_url,
            status: zapierResponse.status,
            response_time_ms: endTime - startTime,
            subscription_id: subscription.id
          })

          // Log response body if it's not successful
          if (!zapierResponse.ok) {
            const responseText = await zapierResponse.text()
            console.log(`⚠️ [ZAPIER DEBUG] Non-200 response body:`, responseText)
          }

          return { success: true, url: subscription.target_url, status: zapierResponse.status }
        } catch (zapierError) {
          console.error('❌ [ZAPIER DEBUG] Webhook delivery failed:', {
            url: subscription.target_url,
            subscription_id: subscription.id,
            error: zapierError instanceof Error ? zapierError.message : 'Unknown error',
            error_stack: zapierError instanceof Error ? zapierError.stack : undefined
          })
          return { success: false, url: subscription.target_url, error: zapierError }
        }
      })

      const zapierResults = await Promise.allSettled(zapierPromises)
      console.log('🔍 [ZAPIER DEBUG] All webhook deliveries completed:', {
        total_webhooks: zapierResults.length,
        successful: zapierResults.filter(result => result.status === 'fulfilled').length,
        failed: zapierResults.filter(result => result.status === 'rejected').length
      })

      // Determine overall Zapier status and update submission
      let zapierStatus: 'success' | 'failure' | null = null
      if (zapierResults.length > 0) {
        const successfulResults = zapierResults.filter(result => 
          result.status === 'fulfilled' && 
          (result.value as { success?: boolean })?.success === true
        )
        zapierStatus = successfulResults.length === zapierResults.length ? 'success' : 'failure'
      }

      // Update submission with Zapier status
      if (zapierStatus) {
        await supabase
          .from('submissions')
          .update({ zapier_status: zapierStatus })
          .eq('id', submission.id)
        
        console.log('🔍 [ZAPIER DEBUG] Updated submission zapier_status:', zapierStatus)
      }
    } else {
      console.log('🔍 [ZAPIER DEBUG] No active Zapier subscriptions found for this endpoint')
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
      // Check if this is an AJAX request (has XMLHttpRequest header or Accept: application/json)
      const isAjaxRequest = request.headers.get('x-requested-with') === 'XMLHttpRequest' ||
                           request.headers.get('accept')?.includes('application/json')
      
      if (isAjaxRequest) {
        // For AJAX requests, return JSON response instead of redirect to avoid CORS issues
        const corsOrigin = requestOrigin === 'null' ? 'null' : (requestOrigin || (allowedDomains && allowedDomains.length > 0 ? allowedDomains[0] : '*'))
        return createCorsResponse({
           success: true,
           message: 'Form submitted successfully',
           submission_id: submission.id,
           redirect_url: endpoint.redirect_url
         }, 200, corsOrigin)
      } else {
        // For regular form submissions, use redirect with CORS headers
        const corsOrigin = requestOrigin === 'null' ? 'null' : (requestOrigin || (allowedDomains && allowedDomains.length > 0 ? allowedDomains[0] : '*'))
        return new NextResponse(null, {
          status: 302,
          headers: {
            'Location': endpoint.redirect_url,
            'Access-Control-Allow-Origin': corsOrigin,
            'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
          }
        })
      }
    }

    // Determine the correct CORS origin to return
    const corsOrigin = requestOrigin === 'null' ? 'null' : (requestOrigin || (allowedDomains && allowedDomains.length > 0 ? allowedDomains[0] : '*'))
    return createCorsResponse(response, 200, corsOrigin)

  } catch (error) {
    console.error('API Error:', error)
    
    // Get request origin for proper CORS handling even in error cases
    const requestOrigin = request.headers.get('origin');
    const corsOrigin = requestOrigin === 'null' ? 'null' : (requestOrigin || '*')
    
    return createCorsResponse(
      { error: 'Internal server error' },
      500,
      corsOrigin
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
    const corsOrigin = requestOrigin === 'null' ? 'null' : (requestOrigin || (allowedDomains && allowedDomains.length > 0 ? allowedDomains[0] : '*'))
    
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