import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { emailService } from '@/lib/email'
import { Svix } from 'svix'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { SubmissionLogger } from '@/lib/submission-logger'
import { Database } from '@/lib/database.types'
import { createAutoresponderService } from '@/lib/autoresponder'

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

// Helper function to unflatten form data from multipart/form-data submissions
function unflattenFormData(flatData: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  
  // Sort keys to ensure proper nesting order
  const sortedKeys = Object.keys(flatData).sort()
  
  for (const key of sortedKeys) {
    const value = flatData[key]
    
    // Handle array notation like "skills[0]", "skills[1]"
    if (key.includes('[') && key.includes(']')) {
      const arrayMatch = key.match(/^([^[]+)\[(\d+)\]$/)
      if (arrayMatch) {
        const [, arrayName, indexStr] = arrayMatch
        const index = parseInt(indexStr, 10)
        
        if (!result[arrayName]) {
          result[arrayName] = []
        }
        
        if (Array.isArray(result[arrayName])) {
          (result[arrayName] as unknown[])[index] = value
        }
        continue
      }
      
      // Handle nested object notation like "address[city]", "contact_info[email]"
      const nestedMatch = key.match(/^([^[]+)\[([^\]]+)\]$/)
      if (nestedMatch) {
        const [, objectName, propertyName] = nestedMatch
        
        if (!result[objectName]) {
          result[objectName] = {}
        }
        
        if (typeof result[objectName] === 'object' && result[objectName] !== null && !Array.isArray(result[objectName])) {
          (result[objectName] as Record<string, unknown>)[propertyName] = value
        }
        continue
      }
    }
    
    // Handle dot notation like "user.name", "user.email" (if any)
    if (key.includes('.')) {
      const parts = key.split('.')
      let current = result
      
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i]
        if (!current[part]) {
          current[part] = {}
        }
        if (typeof current[part] === 'object' && current[part] !== null && !Array.isArray(current[part])) {
          current = current[part] as Record<string, unknown>
        }
      }
      
      const lastPart = parts[parts.length - 1]
      current[lastPart] = value
      continue
    }
    
    // Regular field
    result[key] = value
  }
  
  return result
}

// Helper function to apply transformation template to data
function applyTransformation(template: unknown, data: Record<string, unknown>): unknown {
  if (typeof template !== 'object' || template === null) {
    return template;
  }

  if (Array.isArray(template)) {
    return template.map(item => applyTransformation(item, data));
  }

  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(template as Record<string, unknown>)) {
    if (typeof value === 'string') {
      // Replace variables in the format {{variable.path}}
      const transformedValue = value.replace(/\{\{([^}]+)\}\}/g, (match, path) => {
        const pathValue = getNestedValue(data, path.trim());
        return pathValue !== undefined ? String(pathValue) : match;
      });
      result[key] = transformedValue;
    } else if (typeof value === 'object' && value !== null) {
      result[key] = applyTransformation(value, data);
    } else {
      result[key] = value;
    }
  }

  return result;
}

// Helper function to get nested value from object using dot notation
function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce((current, key) => {
    if (current && typeof current === 'object') {
      // Handle array indices
      if (key.includes('[') && key.includes(']')) {
        const [arrayKey, indexStr] = key.split('[');
        const index = parseInt(indexStr.replace(']', ''), 10);
        const currentObj = current as Record<string, unknown>;
        return currentObj[arrayKey] && Array.isArray(currentObj[arrayKey]) 
          ? (currentObj[arrayKey] as unknown[])[index] 
          : undefined;
      }
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj as unknown);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; endpointPath: string }> }
) {
  const { projectId, endpointPath } = await params;
  
  // Initialize submission logger
  const logger = new SubmissionLogger('temp-' + Date.now());
  
  try {
    logger.info('Form submission started', {
      projectId,
      endpointPath,
      method: request.method,
      headers: Object.fromEntries(request.headers.entries()),
      timestamp: new Date().toISOString()
    });

    // Get the endpoint configuration with project and user info
    logger.info('Looking up endpoint configuration', { 
      projectId, 
      endpointPath,
      timestamp: new Date().toISOString()
    });
    
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

    if (endpoint) {
      logger.info('Endpoint found successfully', { 
        endpointId: endpoint.id,
        endpointName: endpoint.name,
        projectName: endpoint.project?.name,
        userEmail: endpoint.project?.user?.email
      });
    } else {
      logger.error('Endpoint lookup failed', { 
        projectId, 
        endpointPath, 
        error: endpointError?.message || 'Unknown error'
      });
    }

    if (endpointError || !endpoint) {
      logger.error('Endpoint not found', {
        projectId,
        endpointPath,
        error: endpointError
      });
      
      logger.debug('Endpoint not found. Checking all endpoints for this project...');
      
      // Debug: Check what endpoints exist for this project
      const { data: projectEndpoints } = await supabase
        .from('endpoints')
        .select('id, name, path, project_id')
        .eq('project_id', projectId)
      
      logger.debug('All endpoints for project', { projectEndpoints });
      
      return createCorsResponse(
        { error: 'Endpoint not found' },
        404
      )
    }

    logger.success('Endpoint found', {
      endpointId: endpoint.id,
      endpointName: endpoint.name,
      projectName: endpoint.project.name,
      userId: endpoint.project.user.id
    });

    // Validate CORS origins
    const requestOrigin = request.headers.get('origin');
    const allowedDomains = Array.isArray(endpoint.allowed_domains) 
      ? endpoint.allowed_domains 
      : (endpoint.allowed_domains ? endpoint.allowed_domains.split(',').map((d: string) => d.trim()) : null);
    
    logger.info('CORS validation', {
      requestOrigin,
      allowedDomains
    });
    
    if (!validateCorsOrigin(requestOrigin, allowedDomains)) {
      logger.error('CORS policy violation', {
        requestOrigin,
        allowedDomains
      });
      return createCorsResponse(
        { error: 'CORS policy violation: Origin not allowed' },
        403,
        'null' // Don't allow the origin in the response
      );
    }

    logger.success('CORS validation passed');

    // Validate API key if required
    if (endpoint.require_api_key) {
      logger.info('API key validation required');
      const providedApiKey = request.headers.get('x-api-key');
      const projectApiKey = endpoint.project.api_key;
      
      if (!providedApiKey) {
        logger.error('API key missing');
        const corsOrigin = requestOrigin === 'null' ? 'null' : (requestOrigin || (allowedDomains && allowedDomains.length > 0 ? allowedDomains[0] : '*'))
        return createCorsResponse(
          { error: 'API key required. Include X-API-Key header.' },
          401,
          corsOrigin
        );
      }
      
      if (providedApiKey !== projectApiKey) {
        logger.error('Invalid API key provided');
        const corsOrigin = requestOrigin === 'null' ? 'null' : (requestOrigin || (allowedDomains && allowedDomains.length > 0 ? allowedDomains[0] : '*'))
        return createCorsResponse(
          { error: 'Invalid API key' },
          401,
          corsOrigin
        );
      }
      
      logger.success('API key validation passed');
    }

    // Check if method matches
    if (endpoint.method !== request.method) {
      logger.error('Method not allowed', {
        requestMethod: request.method,
        expectedMethod: endpoint.method
      });
      const corsOrigin = requestOrigin === 'null' ? 'null' : (requestOrigin || (allowedDomains && allowedDomains.length > 0 ? allowedDomains[0] : '*'))
      return createCorsResponse(
        { error: `Method ${request.method} not allowed. Expected ${endpoint.method}` },
        405,
        corsOrigin
      )
    }

    logger.success('Method validation passed');

    const contentType = request.headers.get('content-type') || ''
    let submissionData: Record<string, unknown> = {}
    const uploadedFiles: File[] = []

    logger.info('Request parsing started', {
      contentType,
      method: request.method,
      headers: Object.fromEntries(request.headers.entries()),
      bodyUsed: request.bodyUsed,
      bodyLocked: request.body?.locked
    });

    // Handle different content types
    try {
      if (contentType.includes('application/json')) {
        logger.info('Parsing as JSON');
        // Handle JSON data
        submissionData = await request.json()
        logger.success('JSON parsing successful', { submissionData });
      } else {
        // For all other cases (including multipart/form-data, application/x-www-form-urlencoded, or no content-type)
        // try to parse as FormData first since file uploads require FormData
        logger.info('Attempting to parse as FormData', {
          bodyUsed: request.bodyUsed,
          bodyLocked: request.body?.locked
        });
        
        // Clone the request before attempting FormData parsing to preserve the body for fallback
        const clonedRequest = request.clone()
        
        try {
          const formData = await request.formData()
          logger.success('FormData parsed successfully, processing entries...');
          
          for (const [key, value] of formData.entries()) {
            logger.debug('Processing FormData entry', {
              key,
              type: typeof value,
              isFile: value instanceof File,
              fileName: value instanceof File ? value.name : undefined
            });
            
            if (value instanceof File) {
              // Check if file uploads are enabled for this endpoint
              if (!endpoint.file_uploads_enabled) {
                logger.error('File uploads not enabled for endpoint');
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
          
          logger.success('FormData processing complete', { 
            submissionData, 
            fileCount: uploadedFiles.length,
            fileNames: uploadedFiles.map(f => f.name)
          });
          
          // Unflatten the form data to convert array-like keys and nested object keys to proper JSON structure
          submissionData = unflattenFormData(submissionData)
          
        } catch (formDataError) {
          logger.error('FormData parsing failed', {
            error: formDataError,
            errorName: (formDataError as Error).name,
            errorMessage: (formDataError as Error).message,
            errorStack: (formDataError as Error).stack
          });
          
          // If it's multipart/form-data, try manual parsing as fallback using the cloned request
          if (contentType.includes('multipart/form-data')) {
            logger.info('Attempting manual multipart parsing as fallback...')
            
            try {
              const boundary = contentType.split('boundary=')[1]
              if (!boundary) {
                throw new Error('No boundary found in Content-Type header')
              }
              
              // Use the cloned request for manual parsing
              const rawBody = await clonedRequest.arrayBuffer()
              const bodyBytes = new Uint8Array(rawBody)
              
              logger.debug('Manual parsing - Body length:', bodyBytes.length)
              logger.debug('Manual parsing - Boundary:', boundary)
              
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
              
              logger.debug('Manual parsing - Found parts:', parts.length)
              
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
                
                logger.debug(`Manual parsing - Processing field: ${name}`, { filename, contentType })
                
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
              
              logger.success('Manual parsing successful:', { 
                submissionData, 
                fileCount: uploadedFiles.length,
                fileNames: uploadedFiles.map(f => f.name)
              })
              
              // Unflatten the form data to convert array-like keys and nested object keys to proper JSON structure
              submissionData = unflattenFormData(submissionData)
              
            } catch (manualParseError) {
              logger.error('Manual multipart parsing also failed:', manualParseError)
              return createCorsResponse(
                { error: 'Failed to parse form data. Please check your request format and ensure files are properly attached.' },
                400,
                requestOrigin || '*'
              )
            }
          } else {
            // For other content types, try JSON as fallback only if the request body hasn't been consumed
            try {
              logger.info('Attempting JSON fallback after FormData failure')
              submissionData = await request.json()
            } catch (jsonError) {
              logger.error('JSON parsing also failed:', jsonError)
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
      logger.error('Outer parsing error:', error)
      const corsOrigin = requestOrigin === 'null' ? 'null' : (requestOrigin || (allowedDomains && allowedDomains.length > 0 ? allowedDomains[0] : '*'))
      return createCorsResponse(
        { error: 'Failed to parse request body. Please check your request format.' },
        400,
        corsOrigin
      )
    }

    // Validate file uploads if any
    if (uploadedFiles.length > 0) {
      logger.info('Starting file upload validation', {
        fileCount: uploadedFiles.length,
        fileNames: uploadedFiles.map(f => f.name),
        fileSizes: uploadedFiles.map(f => f.size),
        fileTypes: uploadedFiles.map(f => f.type),
        uploadsEnabled: endpoint.file_uploads_enabled,
        maxFiles: endpoint.max_files_per_submission || 5,
        maxSizeMB: endpoint.max_file_size_mb || 10
      });

      const corsOrigin = requestOrigin === 'null' ? 'null' : (requestOrigin || (allowedDomains && allowedDomains.length > 0 ? allowedDomains[0] : '*'))
      
      // Check if file uploads are enabled
      if (!endpoint.file_uploads_enabled) {
        logger.error('File uploads rejected - not enabled', {
          endpointId: endpoint.id,
          fileCount: uploadedFiles.length
        });
        return createCorsResponse(
          { error: 'File uploads are not enabled for this endpoint' },
          400,
          corsOrigin
        )
      }

      // Check file count limit
      if (uploadedFiles.length > (endpoint.max_files_per_submission || 5)) {
        logger.error('File uploads rejected - too many files', {
          fileCount: uploadedFiles.length,
          maxAllowed: endpoint.max_files_per_submission || 5
        });
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
          logger.error('File rejected - too large', {
            fileName: file.name,
            fileSize: file.size,
            maxSizeBytes: maxFileSizeBytes,
            maxSizeMB: endpoint.max_file_size_mb || 10
          });
          return createCorsResponse(
            { error: `File "${file.name}" is too large. Maximum size is ${endpoint.max_file_size_mb || 10}MB.` },
            400,
            corsOrigin
          )
        }

        // Check file type
        if (!allowedFileTypes.includes(file.type)) {
          logger.error('File rejected - invalid type', {
            fileName: file.name,
            fileType: file.type,
            allowedTypes: allowedFileTypes
          });
          return createCorsResponse(
            { error: `File type "${file.type}" is not allowed for file "${file.name}".` },
            400,
            corsOrigin
          )
        }
      }

      logger.success('File validation completed successfully', {
        validatedFiles: uploadedFiles.length,
        totalSizeBytes: uploadedFiles.reduce((sum, f) => sum + f.size, 0)
      });
    }

    // JSON Schema Validation (if enabled)
    if (endpoint.json_validation_enabled && endpoint.json_schema) {
      logger.info('Starting JSON schema validation', {
        validationEnabled: endpoint.json_validation_enabled,
        hasSchema: !!endpoint.json_schema,
        dataKeys: Object.keys(submissionData),
        dataSize: JSON.stringify(submissionData).length
      });

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
        
        logger.debug('Schema prepared for validation', {
          schemaType: typeof schema,
          schemaKeys: schema && typeof schema === 'object' ? Object.keys(schema) : []
        });
        
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
          
          logger.error('JSON schema validation failed', {
            errors: validate.errors,
            formattedErrors: errors,
            submissionData: submissionData
          });
          
          return createCorsResponse(
            { error: `Validation failed: ${errors}` },
            400,
            corsOrigin
          )
        }

        logger.success('JSON schema validation passed', {
          validatedFields: Object.keys(submissionData).length
        });

      } catch (schemaError) {
        logger.error('JSON schema validation error:', {
          error: schemaError,
          schema: endpoint.json_schema,
          submissionData: submissionData
        });
        return createCorsResponse(
          { error: 'Invalid JSON schema configuration' },
          500,
          corsOrigin
        )
      }
    }

    // Store the submission
    logger.info('Storing submission in database', {
      endpointId: endpoint.id,
      dataKeys: Object.keys(submissionData),
      clientIP: getClientIP(request),
      userAgent: request.headers.get('user-agent') || 'unknown'
    });

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
      logger.error('Failed to store submission in database', {
        error: submissionError,
        endpointId: endpoint.id,
        submissionData: submissionData
      });
      return createCorsResponse(
        { error: endpoint.error_message || 'Failed to process submission' },
        500,
        requestOrigin || '*'
      )
    }

    // Update the logger with the actual submission ID now that we have it
    logger.updateSubmissionId(submission.id)
    logger.success('Submission stored successfully in database', { 
      submissionId: submission.id, 
      endpointId: endpoint.id,
      dataSize: JSON.stringify(submissionData).length
    });

    // Handle file uploads if any
    const fileUploadRecords = []
    if (uploadedFiles.length > 0) {
      logger.info('Starting file upload to storage', {
        fileCount: uploadedFiles.length,
        submissionId: submission.id,
        projectId: endpoint.project.id,
        endpointId: endpoint.id
      });

      const corsOrigin = requestOrigin === 'null' ? 'null' : (requestOrigin || (allowedDomains && allowedDomains.length > 0 ? allowedDomains[0] : '*'))
      
      try {
        for (const file of uploadedFiles) {
          logger.info('Processing file upload', {
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            submissionId: submission.id
          });

          // Generate unique filename
          const timestamp = Date.now()
          const randomString = Math.random().toString(36).substring(2, 15)
          const fileExtension = file.name.split('.').pop() || ''
          const storedFilename = `${timestamp}_${randomString}.${fileExtension}`
          const filePath = `${endpoint.project.id}/${endpoint.id}/${storedFilename}`

          // Convert File to ArrayBuffer for upload
          const fileBuffer = await file.arrayBuffer()
          
          logger.debug('Uploading file to Supabase Storage', {
            filePath,
            bufferSize: fileBuffer.byteLength,
            contentType: file.type
          });
          
          // Upload to Supabase Storage
          const { error: uploadError } = await supabase.storage
            .from('form-uploads')
            .upload(filePath, fileBuffer, {
              contentType: file.type,
              duplex: 'half'
            })

          if (uploadError) {
            logger.error('File upload to storage failed', {
              fileName: file.name,
              filePath,
              error: uploadError,
              submissionId: submission.id
            });
            return createCorsResponse(
              { error: `Failed to upload file "${file.name}": ${uploadError.message}` },
              500,
              corsOrigin
            )
          }

          logger.success('File uploaded to storage successfully', { 
            fileName: file.name,
            filePath, 
            fileSize: file.size,
            submissionId: submission.id
          });

          // Store file record in database
          logger.debug('Creating file record in database', {
            submissionId: submission.id,
            originalFilename: file.name,
            storedFilename,
            filePath
          });

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
            logger.error('Failed to create file record in database', {
              error: fileRecordError,
              fileName: file.name,
              submissionId: submission.id
            });
            // Try to clean up the uploaded file
            await supabase.storage.from('form-uploads').remove([filePath])
            return createCorsResponse(
              { error: `Failed to record file "${file.name}": ${fileRecordError.message}` },
              500,
              corsOrigin
            )
          }

          logger.success(`File record stored successfully: ${file.name}`, { fileRecordId: fileRecord.id })

          fileUploadRecords.push(fileRecord)
        }
      } catch (error) {
        logger.error('Error processing file uploads:', error)
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

    logger.debug('Updating monthly submission count for user:', { userId, year, month })

    // Use the database function to handle the counting logic
    const { error: countError } = await supabase.rpc('increment_monthly_submission_count', {
      p_user_id: userId,
      p_year: year,
      p_month: month
    })
    
    if (countError) {
      logger.error('Error updating monthly submission count:', countError)
      // Don't fail the submission if count update fails, but log it for debugging
    } else {
      logger.success('Successfully updated monthly submission count')
    }

    // Send webhooks via Svix if enabled
    if (endpoint.webhooks_enabled && endpoint.svix_app_id) {
      logger.info('Starting Svix webhook delivery', {
        svixAppId: endpoint.svix_app_id,
        submissionId: submission.id,
        hasFiles: fileUploadRecords.length > 0,
        transformationEnabled: endpoint.webhook_json_transformation_enabled
      });

      try {
        const svix = new Svix(process.env.SVIX_AUTH_TOKEN!)
        
        // Prepare webhook payload with file information
        let webhookPayload = {
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

        logger.debug('Webhook payload prepared', {
          payloadKeys: Object.keys(webhookPayload),
          fileCount: webhookPayload._files.length,
          payloadSize: JSON.stringify(webhookPayload).length
        });

        // Apply webhook transformation if configured
         if (endpoint.webhook_json_transformation_enabled && endpoint.webhook_json_transformation_template) {
           logger.info('Applying webhook JSON transformation', {
             hasTemplate: !!endpoint.webhook_json_transformation_template,
             submissionId: submission.id
           });

           try {
             let template = endpoint.webhook_json_transformation_template
             if (typeof template === 'string') {
               template = JSON.parse(template)
             }
             const originalPayload = { ...webhookPayload }
             webhookPayload = applyTransformation(template, webhookPayload) as typeof webhookPayload
             
             logger.success('Webhook transformation applied successfully', {
               originalKeys: Object.keys(originalPayload),
               transformedKeys: Object.keys(webhookPayload),
               submissionId: submission.id
             });
           } catch (transformError) {
             logger.error('Webhook transformation failed', {
               error: transformError,
               template: endpoint.webhook_json_transformation_template,
               submissionId: submission.id
             });
             // Continue with original payload if transformation fails
           }
         }

        logger.info('Sending webhook event to Svix', {
          svixAppId: endpoint.svix_app_id,
          eventType: 'form.submitted',
          payloadSize: JSON.stringify(webhookPayload).length,
          submissionId: submission.id
        });

        // Send event to Svix
        const svixResponse = await svix.message.create(endpoint.svix_app_id, {
          eventType: 'form.submitted',
          payload: webhookPayload
        })

        logger.success('Svix webhook delivered successfully', {
          svixMessageId: svixResponse.id,
          svixAppId: endpoint.svix_app_id,
          submissionId: submission.id,
          timestamp: svixResponse.timestamp
        });
      } catch (svixError) {
        logger.error('Svix webhook delivery failed', {
          error: svixError,
          svixAppId: endpoint.svix_app_id,
          submissionId: submission.id,
          errorMessage: svixError instanceof Error ? svixError.message : 'Unknown error'
        });
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
        let webhookPayload = {
          ...submissionData,
          _files: fileUploadRecords.map(file => ({
            id: file.id,
            original_filename: file.original_filename,
            file_size_bytes: file.file_size_bytes,
            mime_type: file.mime_type,
            download_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/form-uploads/${file.file_path}`
          }))
        }

        // Apply webhook transformation if configured
         if (endpoint.webhook_json_transformation_enabled && endpoint.webhook_json_transformation_template) {
           try {
             let template = endpoint.webhook_json_transformation_template
             if (typeof template === 'string') {
               template = JSON.parse(template)
             }
             webhookPayload = applyTransformation(template, webhookPayload) as typeof webhookPayload
           } catch (transformError) {
             logger.error('Webhook transformation error:', transformError)
             // Continue with original payload if transformation fails
           }
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
            logger.error('Webhook delivery failed:', webhookError)
            
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
      logger.info('Starting email notifications', {
        emailCount: emailAddresses.length,
        recipients: emailAddresses.map(e => e.email_address),
        submissionId: submission.id,
        hasFileAttachments: fileUploadRecords.length > 0
      });

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

      logger.debug('Email attachments prepared', {
        attachmentCount: fileAttachments.length,
        attachmentDetails: fileAttachments.map(a => ({
          filename: a.filename,
          size: a.size,
          type: a.type
        }))
      });

      const emailPromises = emailAddresses.map(async (emailConfig) => {
        logger.info('Sending email notification', {
          recipient: emailConfig.email_address,
          submissionId: submission.id,
          endpointName: endpoint.name,
          projectName: endpoint.project.name
        });

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

          logger.success('Email notification sent successfully', {
            recipient: emailConfig.email_address,
            submissionId: submission.id
          });

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
          logger.error('Email notification failed', {
            recipient: emailConfig.email_address,
            submissionId: submission.id,
            error: emailError,
            errorMessage: emailError instanceof Error ? emailError.message : 'Unknown error'
          });
          
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

      const emailResults = await Promise.allSettled(emailPromises)
      const successfulEmails = emailResults.filter(result => 
        result.status === 'fulfilled' && result.value.success
      ).length
      const failedEmails = emailResults.length - successfulEmails

      logger.info('Email notifications completed', {
        totalEmails: emailResults.length,
        successful: successfulEmails,
        failed: failedEmails,
        submissionId: submission.id
      });
    }

    // Send Zapier webhook notifications
    logger.info('Checking for Zapier subscriptions', {
      endpointId: endpoint.id,
      submissionId: submission.id
    });
    
    const { data: zapierSubscriptions } = await supabase
      .from('zapier_subscriptions')
      .select('id, target_url, event_type')
      .eq('endpoint_id', endpoint.id)
      .eq('event_type', 'new_submission')
      .eq('is_active', true)

    logger.info('Found Zapier subscriptions', { 
      count: zapierSubscriptions?.length || 0,
      submissionId: submission.id
    });
    
    if (zapierSubscriptions && zapierSubscriptions.length > 0) {
      logger.debug('Zapier subscription details', {
        subscriptions: zapierSubscriptions.map(sub => ({
          id: sub.id,
          target_url: sub.target_url,
          event_type: sub.event_type
        })),
        submissionId: submission.id
      });
    }

    if (zapierSubscriptions && zapierSubscriptions.length > 0) {
      logger.info('Starting Zapier webhook delivery', {
        subscriptionCount: zapierSubscriptions.length,
        submissionId: submission.id
      });

      // Prepare Zapier webhook payload
      let zapierPayload = {
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

      logger.debug('Zapier payload prepared', {
        submissionId: zapierPayload.id,
        endpointId: zapierPayload.endpoint_id,
        endpointName: zapierPayload.endpoint_name,
        projectName: zapierPayload.project_name,
        formDataKeys: Object.keys(zapierPayload.form_data || {}),
        filesCount: zapierPayload.files.length,
        payloadSize: JSON.stringify(zapierPayload).length,
        flattenedFields: Object.keys(zapierPayload).filter(key => 
          !['id', 'endpoint_id', 'endpoint_name', 'endpoint_path', 'project_name', 'form_data', 'ip_address', 'user_agent', 'submitted_at', 'files'].includes(key)
        )
      });

      // Apply webhook transformation if configured
       if (endpoint.webhook_json_transformation_enabled && endpoint.webhook_json_transformation_template) {
         logger.info('Applying Zapier webhook transformation', {
           submissionId: submission.id,
           hasTemplate: !!endpoint.webhook_json_transformation_template
         });

         try {
           let template = endpoint.webhook_json_transformation_template
           if (typeof template === 'string') {
             template = JSON.parse(template)
           }
           zapierPayload = applyTransformation(template, zapierPayload) as typeof zapierPayload
           
           logger.success('Zapier webhook transformation applied successfully', {
             submissionId: submission.id,
             transformedPayloadSize: JSON.stringify(zapierPayload).length
           });
         } catch (transformError) {
           logger.error('Zapier webhook transformation failed', {
             submissionId: submission.id,
             error: transformError,
             errorMessage: transformError instanceof Error ? transformError.message : 'Unknown error'
           });
           // Continue with original payload if transformation fails
         }
       }

      logger.debug('Prepared Zapier webhook payload:', {
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
        logger.info('Sending Zapier webhook', {
          targetUrl: subscription.target_url,
          subscriptionId: subscription.id,
          submissionId: submission.id,
          payloadSize: JSON.stringify(zapierPayload).length
        });
        
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
          const responseTime = endTime - startTime

          if (zapierResponse.ok) {
            logger.success('Zapier webhook delivered successfully', {
              targetUrl: subscription.target_url,
              subscriptionId: subscription.id,
              submissionId: submission.id,
              status: zapierResponse.status,
              responseTimeMs: responseTime
            });
          } else {
            const responseText = await zapierResponse.text()
            logger.warning('Zapier webhook returned non-200 status', {
              targetUrl: subscription.target_url,
              subscriptionId: subscription.id,
              submissionId: submission.id,
              status: zapierResponse.status,
              responseTimeMs: responseTime,
              responseBody: responseText
            });
          }

          return { success: zapierResponse.ok, url: subscription.target_url, status: zapierResponse.status }
        } catch (zapierError) {
          logger.error('Zapier webhook delivery failed', {
            targetUrl: subscription.target_url,
            subscriptionId: subscription.id,
            submissionId: submission.id,
            error: zapierError,
            errorMessage: zapierError instanceof Error ? zapierError.message : 'Unknown error',
            errorStack: zapierError instanceof Error ? zapierError.stack : undefined
          });
          return { success: false, url: subscription.target_url, error: zapierError }
        }
      })

      const zapierResults = await Promise.allSettled(zapierPromises)
      const successfulWebhooks = zapierResults.filter(result => 
        result.status === 'fulfilled' && result.value.success
      ).length
      const failedWebhooks = zapierResults.length - successfulWebhooks

      logger.info('Zapier webhook delivery completed', {
        totalWebhooks: zapierResults.length,
        successful: successfulWebhooks,
        failed: failedWebhooks,
        submissionId: submission.id
      });

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
        logger.debug('Updating submission Zapier status', {
          submissionId: submission.id,
          zapierStatus: zapierStatus
        });

        await supabase
          .from('submissions')
          .update({ zapier_status: zapierStatus })
          .eq('id', submission.id)
        
        logger.success('Submission Zapier status updated', {
          submissionId: submission.id,
          zapierStatus: zapierStatus
        });
      }
    } else {
      logger.debug('No active Zapier subscriptions found', {
        endpointId: endpoint.id,
        submissionId: submission.id
      });
    }

    // Send to Google Sheets if configured
    logger.info('Checking for Google Sheets configuration', {
      endpointId: endpoint.id,
      submissionId: submission.id
    });

    try {
      // Check if Google Sheets is configured for this endpoint
      logger.debug('Checking Google Sheets configuration', {
        endpointId: endpoint.id,
        hasSpreadsheetId: !!(endpoint as Database['public']['Tables']['endpoints']['Row']).google_sheets_spreadsheet_id,
        hasSheetName: !!(endpoint as Database['public']['Tables']['endpoints']['Row']).google_sheets_sheet_name,
        hasColumnMappings: !!(endpoint as Database['public']['Tables']['endpoints']['Row']).google_sheets_column_mappings,
        spreadsheetId: (endpoint as Database['public']['Tables']['endpoints']['Row']).google_sheets_spreadsheet_id,
        sheetName: (endpoint as Database['public']['Tables']['endpoints']['Row']).google_sheets_sheet_name,
        columnMappings: (endpoint as Database['public']['Tables']['endpoints']['Row']).google_sheets_column_mappings
      });

      const googleSheetsEnabled = (endpoint as Database['public']['Tables']['endpoints']['Row']).google_sheets_spreadsheet_id && 
                                 (endpoint as Database['public']['Tables']['endpoints']['Row']).google_sheets_sheet_name && 
                                 (endpoint as Database['public']['Tables']['endpoints']['Row']).google_sheets_column_mappings;

      if (googleSheetsEnabled) {
        logger.info('Google Sheets configuration found, sending data', {
          endpointId: endpoint.id,
          submissionId: submission.id,
          spreadsheetId: (endpoint as Database['public']['Tables']['endpoints']['Row']).google_sheets_spreadsheet_id,
          sheetName: (endpoint as Database['public']['Tables']['endpoints']['Row']).google_sheets_sheet_name
        });

        const googleSheetsResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/google-sheets/write`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            endpointId: endpoint.id,
            submissionData: submissionData
          })
        });

        if (googleSheetsResponse.ok) {
          const googleSheetsResult = await googleSheetsResponse.json();
          logger.success('Google Sheets data written successfully', {
            endpointId: endpoint.id,
            submissionId: submission.id,
            updatedRange: googleSheetsResult.updatedRange,
            updatedRows: googleSheetsResult.updatedRows
          });

          // Update submission with Google Sheets status
          await supabase
            .from('submissions')
            .update({ google_sheets_status: 'success' })
            .eq('id', submission.id);
        } else {
          const errorText = await googleSheetsResponse.text();
          logger.error('Google Sheets write failed', {
            endpointId: endpoint.id,
            submissionId: submission.id,
            status: googleSheetsResponse.status,
            error: errorText
          });

          // Update submission with Google Sheets failure status
          await supabase
            .from('submissions')
            .update({ google_sheets_status: 'failure' })
            .eq('id', submission.id);
        }
      } else {
        logger.debug('Google Sheets not configured for this endpoint', {
          endpointId: endpoint.id,
          submissionId: submission.id
        });
      }
    } catch (googleSheetsError) {
        logger.error('Google Sheets integration error', {
          endpointId: endpoint.id,
          submissionId: submission.id,
          error: googleSheetsError,
          errorMessage: googleSheetsError instanceof Error ? googleSheetsError.message : 'Unknown error'
        });

        // Update submission with Google Sheets failure status
        try {
          await supabase
            .from('submissions')
            .update({ google_sheets_status: 'failure' })
            .eq('id', submission.id);
        } catch (updateError) {
          logger.error('Failed to update Google Sheets failure status', {
            endpointId: endpoint.id,
            submissionId: submission.id,
            error: updateError
          });
        }
      }

      // Send autoresponder email if configured
      logger.info('Checking for autoresponder configuration', {
        endpointId: endpoint.id,
        submissionId: submission.id
      });

      try {
        const autoresponderService = createAutoresponderService(endpoint as Database['public']['Tables']['endpoints']['Row']);
        
        if (autoresponderService) {
          logger.info('Autoresponder configuration found, sending email', {
            endpointId: endpoint.id,
            submissionId: submission.id,
            provider: (endpoint as Database['public']['Tables']['endpoints']['Row']).autoresponder_provider,
            fromEmail: (endpoint as Database['public']['Tables']['endpoints']['Row']).autoresponder_from_email,
            recipientField: (endpoint as Database['public']['Tables']['endpoints']['Row']).autoresponder_recipient_field
          });

          const autoresponderResult = await autoresponderService.sendAutoresponder(
            submissionData,
            submission.id,
            endpoint.id
          );

          if (autoresponderResult.success) {
            logger.success('Autoresponder email sent successfully', {
              endpointId: endpoint.id,
              submissionId: submission.id,
              logId: autoresponderResult.logId
            });
          } else {
            logger.error('Autoresponder email failed', {
              endpointId: endpoint.id,
              submissionId: submission.id,
              error: autoresponderResult.error,
              logId: autoresponderResult.logId
            });
          }
        } else {
          logger.debug('Autoresponder not configured for this endpoint', {
            endpointId: endpoint.id,
            submissionId: submission.id,
            enabled: (endpoint as Database['public']['Tables']['endpoints']['Row']).autoresponder_enabled,
            hasFromEmail: !!(endpoint as Database['public']['Tables']['endpoints']['Row']).autoresponder_from_email,
            hasSubject: !!(endpoint as Database['public']['Tables']['endpoints']['Row']).autoresponder_subject,
            hasRecipientField: !!(endpoint as Database['public']['Tables']['endpoints']['Row']).autoresponder_recipient_field
          });
        }
      } catch (autoresponderError) {
        logger.error('Autoresponder integration error', {
          endpointId: endpoint.id,
          submissionId: submission.id,
          error: autoresponderError,
          errorMessage: autoresponderError instanceof Error ? autoresponderError.message : 'Unknown error'
        });
      }
    logger.success('Form submission completed successfully', {
      submissionId: submission.id,
      endpointId: endpoint.id,
      endpointName: endpoint.name,
      filesUploaded: fileUploadRecords.length,
      hasRedirect: !!endpoint.redirect_url,
      clientIP: clientIP
    });

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
      logger.info('Processing redirect response', {
        redirectUrl: endpoint.redirect_url,
        submissionId: submission.id
      });

      // Upload logs before redirect
      logger.debug('Uploading logs before redirect');
      try {
        const uploadResult = await logger.uploadToStorage()
        if (uploadResult.success) {
          logger.success('Logs uploaded successfully before redirect', {
            filePath: uploadResult.filePath,
            submissionId: submission.id
          });
        } else {
          logger.error('Failed to upload logs before redirect', {
            error: uploadResult.error,
            submissionId: submission.id
          });
        }
      } catch (uploadError) {
        logger.error('Exception during log upload before redirect', {
          error: uploadError,
          submissionId: submission.id
        });
      }

      // Check if this is an AJAX request (has XMLHttpRequest header or Accept: application/json)
      const isAjaxRequest = request.headers.get('x-requested-with') === 'XMLHttpRequest' ||
                           request.headers.get('accept')?.includes('application/json')
      
      logger.debug('Determining response type', {
        isAjaxRequest: isAjaxRequest,
        xRequestedWith: request.headers.get('x-requested-with'),
        acceptHeader: request.headers.get('accept'),
        submissionId: submission.id
      });

      if (isAjaxRequest) {
        // For AJAX requests, return JSON response instead of redirect to avoid CORS issues
        const corsOrigin = requestOrigin === 'null' ? 'null' : (requestOrigin || (allowedDomains && allowedDomains.length > 0 ? allowedDomains[0] : '*'))
        
        logger.info('Returning AJAX response with redirect URL', {
          corsOrigin: corsOrigin,
          redirectUrl: endpoint.redirect_url,
          submissionId: submission.id
        });

        return createCorsResponse({
           success: true,
           message: 'Form submitted successfully',
           submission_id: submission.id,
           redirect_url: endpoint.redirect_url
         }, 200, corsOrigin)
      } else {
        // For regular form submissions, use redirect with CORS headers
        const corsOrigin = requestOrigin === 'null' ? 'null' : (requestOrigin || (allowedDomains && allowedDomains.length > 0 ? allowedDomains[0] : '*'))
        
        logger.info('Returning redirect response', {
          corsOrigin: corsOrigin,
          redirectUrl: endpoint.redirect_url,
          submissionId: submission.id
        });

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

    // Upload logs to Supabase storage before returning response
    logger.debug('Uploading logs to storage before final response');
    try {
      const uploadResult = await logger.uploadToStorage()
      if (uploadResult.success) {
        logger.success('Logs uploaded successfully', {
          filePath: uploadResult.filePath,
          submissionId: submission.id
        });
      } else {
        logger.error('Failed to upload logs to storage', {
          error: uploadResult.error,
          submissionId: submission.id
        });
      }
    } catch (uploadError) {
      logger.error('Exception during log upload', {
        error: uploadError,
        submissionId: submission.id
      });
    }

    // Determine the correct CORS origin to return
    const corsOrigin = requestOrigin === 'null' ? 'null' : (requestOrigin || (allowedDomains && allowedDomains.length > 0 ? allowedDomains[0] : '*'))
    return createCorsResponse(response, 200, corsOrigin)

  } catch (error) {
    logger.error('Critical API error occurred', {
      error: error,
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      errorStack: error instanceof Error ? error.stack : undefined,
      requestMethod: request.method,
      requestUrl: request.url,
      userAgent: request.headers.get('user-agent'),
      clientIP: getClientIP(request)
    });
    
    // Upload logs even in error cases
    logger.debug('Uploading error logs to storage');
    try {
      const uploadResult = await logger.uploadToStorage()
      if (uploadResult.success) {
        logger.success('Error logs uploaded successfully', {
          filePath: uploadResult.filePath
        });
      } else {
        logger.error('Failed to upload error logs', {
          uploadError: uploadResult.error
        });
      }
    } catch (uploadError) {
      logger.error('Exception during error log upload', {
        uploadError: uploadError
      });
    }
    
    // Get request origin for proper CORS handling even in error cases
    const requestOrigin = request.headers.get('origin');
    const corsOrigin = requestOrigin === 'null' ? 'null' : (requestOrigin || '*')
    
    logger.info('Returning error response', {
      corsOrigin: corsOrigin,
      statusCode: 500
    });
    
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
  
  // Initialize logger for OPTIONS method
  const logger = new SubmissionLogger('temp-options-' + Date.now())
  
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
    logger.error('OPTIONS Error:', error)
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