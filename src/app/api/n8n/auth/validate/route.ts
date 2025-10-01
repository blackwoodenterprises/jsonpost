import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Create a service role client for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  const requestId = Math.random().toString(36).substring(7);
  const timestamp = new Date().toISOString();
  
  console.log(`[N8N-AUTH-VALIDATE] ${timestamp} [${requestId}] === REQUEST START ===`);
  console.log(`[N8N-AUTH-VALIDATE] ${timestamp} [${requestId}] Method: POST`);
  console.log(`[N8N-AUTH-VALIDATE] ${timestamp} [${requestId}] URL: ${request.url}`);
  console.log(`[N8N-AUTH-VALIDATE] ${timestamp} [${requestId}] Headers:`, Object.fromEntries(request.headers.entries()));
  
  try {
    const requestBody = await request.json();
    console.log(`[N8N-AUTH-VALIDATE] ${timestamp} [${requestId}] Request Body:`, requestBody);
    
    const { n8n_api_key } = requestBody;

    if (!n8n_api_key) {
      const errorResponse = { error: "n8n_api_key is required" };
      console.log(`[N8N-AUTH-VALIDATE] ${timestamp} [${requestId}] ERROR: Missing API key`);
      console.log(`[N8N-AUTH-VALIDATE] ${timestamp} [${requestId}] Response (400):`, errorResponse);
      console.log(`[N8N-AUTH-VALIDATE] ${timestamp} [${requestId}] === REQUEST END ===`);
      return NextResponse.json(errorResponse, { status: 400 });
    }

    console.log(`[N8N-AUTH-VALIDATE] ${timestamp} [${requestId}] Validating API key: ${n8n_api_key.substring(0, 8)}...`);
    
    // Validate the API key and get project information
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("id, name, user_id")
      .eq("n8n_api_key", n8n_api_key)
      .single();

    console.log(`[N8N-AUTH-VALIDATE] ${timestamp} [${requestId}] Database query result:`, {
      project: project ? { id: project.id, name: project.name, user_id: project.user_id } : null,
      error: projectError
    });

    if (projectError || !project) {
      const errorResponse = { error: "Invalid API key" };
      console.log(`[N8N-AUTH-VALIDATE] ${timestamp} [${requestId}] ERROR: Invalid API key`);
      console.log(`[N8N-AUTH-VALIDATE] ${timestamp} [${requestId}] Response (401):`, errorResponse);
      console.log(`[N8N-AUTH-VALIDATE] ${timestamp} [${requestId}] === REQUEST END ===`);
      return NextResponse.json(errorResponse, { status: 401 });
    }

    // Return project information for successful validation
    const successResponse = {
      valid: true,
      project: {
        id: project.id,
        name: project.name,
        user_id: project.user_id
      }
    };
    
    console.log(`[N8N-AUTH-VALIDATE] ${timestamp} [${requestId}] SUCCESS: API key validated`);
    console.log(`[N8N-AUTH-VALIDATE] ${timestamp} [${requestId}] Response (200):`, successResponse);
    console.log(`[N8N-AUTH-VALIDATE] ${timestamp} [${requestId}] === REQUEST END ===`);
    
    return NextResponse.json(successResponse);

  } catch (error) {
    const errorResponse = { error: "Internal server error" };
    console.log(`[N8N-AUTH-VALIDATE] ${timestamp} [${requestId}] EXCEPTION:`, error);
    console.log(`[N8N-AUTH-VALIDATE] ${timestamp} [${requestId}] Response (500):`, errorResponse);
    console.log(`[N8N-AUTH-VALIDATE] ${timestamp} [${requestId}] === REQUEST END ===`);
    console.error("Error validating n8n API key:", error);
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

// Handle CORS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}