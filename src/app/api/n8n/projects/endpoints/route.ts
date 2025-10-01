import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Create a service role client for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  const requestId = Math.random().toString(36).substring(7);
  const timestamp = new Date().toISOString();
  
  console.log(`[N8N-PROJECTS-ENDPOINTS] ${timestamp} [${requestId}] === REQUEST START ===`);
  console.log(`[N8N-PROJECTS-ENDPOINTS] ${timestamp} [${requestId}] Method: GET`);
  console.log(`[N8N-PROJECTS-ENDPOINTS] ${timestamp} [${requestId}] URL: ${request.url}`);
  console.log(`[N8N-PROJECTS-ENDPOINTS] ${timestamp} [${requestId}] Headers:`, Object.fromEntries(request.headers.entries()));
  
  try {
    const n8n_api_key = request.headers.get('x-n8n-api-key');
    console.log(`[N8N-PROJECTS-ENDPOINTS] ${timestamp} [${requestId}] API Key from header: ${n8n_api_key ? n8n_api_key.substring(0, 8) + '...' : 'null'}`);

    if (!n8n_api_key) {
      const errorResponse = { error: "n8n_api_key is required" };
      console.log(`[N8N-PROJECTS-ENDPOINTS] ${timestamp} [${requestId}] ERROR: Missing API key`);
      console.log(`[N8N-PROJECTS-ENDPOINTS] ${timestamp} [${requestId}] Response (400):`, errorResponse);
      console.log(`[N8N-PROJECTS-ENDPOINTS] ${timestamp} [${requestId}] === REQUEST END ===`);
      return NextResponse.json(errorResponse, { status: 400 });
    }

    console.log(`[N8N-PROJECTS-ENDPOINTS] ${timestamp} [${requestId}] Validating API key: ${n8n_api_key.substring(0, 8)}...`);
    
    // Validate the API key and get project information
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("id")
      .eq("n8n_api_key", n8n_api_key)
      .single();

    console.log(`[N8N-PROJECTS-ENDPOINTS] ${timestamp} [${requestId}] Project validation result:`, {
      project: project ? { id: project.id } : null,
      error: projectError
    });

    if (projectError || !project) {
      const errorResponse = { error: "Invalid API key" };
      console.log(`[N8N-PROJECTS-ENDPOINTS] ${timestamp} [${requestId}] ERROR: Invalid API key`);
      console.log(`[N8N-PROJECTS-ENDPOINTS] ${timestamp} [${requestId}] Response (401):`, errorResponse);
      console.log(`[N8N-PROJECTS-ENDPOINTS] ${timestamp} [${requestId}] === REQUEST END ===`);
      return NextResponse.json(errorResponse, { status: 401 });
    }

    console.log(`[N8N-PROJECTS-ENDPOINTS] ${timestamp} [${requestId}] Fetching endpoints for project: ${project.id}`);
    
    // Get all endpoints for the project
    const { data: endpoints, error: endpointsError } = await supabase
      .from("endpoints")
      .select("id, name, path, method")
      .eq("project_id", project.id)
      .order("name");

    console.log(`[N8N-PROJECTS-ENDPOINTS] ${timestamp} [${requestId}] Endpoints query result:`, {
      endpointsCount: endpoints ? endpoints.length : 0,
      endpoints: endpoints,
      error: endpointsError
    });

    if (endpointsError) {
      const errorResponse = { error: "Failed to fetch endpoints" };
      console.log(`[N8N-PROJECTS-ENDPOINTS] ${timestamp} [${requestId}] ERROR: Failed to fetch endpoints`);
      console.log(`[N8N-PROJECTS-ENDPOINTS] ${timestamp} [${requestId}] Database error:`, endpointsError);
      console.log(`[N8N-PROJECTS-ENDPOINTS] ${timestamp} [${requestId}] Response (500):`, errorResponse);
      console.log(`[N8N-PROJECTS-ENDPOINTS] ${timestamp} [${requestId}] === REQUEST END ===`);
      console.error("Error fetching endpoints:", endpointsError);
      return NextResponse.json(errorResponse, { status: 500 });
    }

    // Format endpoints for n8n dropdown
    const formattedEndpoints = endpoints.map(endpoint => ({
      name: `${endpoint.name} (${endpoint.method} /${endpoint.path})`,
      value: endpoint.id
    }));

    console.log(`[N8N-PROJECTS-ENDPOINTS] ${timestamp} [${requestId}] Formatted endpoints:`, formattedEndpoints);

    const successResponse = {
      endpoints: formattedEndpoints
    };
    
    console.log(`[N8N-PROJECTS-ENDPOINTS] ${timestamp} [${requestId}] SUCCESS: Endpoints fetched`);
    console.log(`[N8N-PROJECTS-ENDPOINTS] ${timestamp} [${requestId}] Response (200):`, successResponse);
    console.log(`[N8N-PROJECTS-ENDPOINTS] ${timestamp} [${requestId}] === REQUEST END ===`);

    return NextResponse.json(successResponse);

  } catch (error) {
    const errorResponse = { error: "Internal server error" };
    console.log(`[N8N-PROJECTS-ENDPOINTS] ${timestamp} [${requestId}] EXCEPTION:`, error);
    console.log(`[N8N-PROJECTS-ENDPOINTS] ${timestamp} [${requestId}] Response (500):`, errorResponse);
    console.log(`[N8N-PROJECTS-ENDPOINTS] ${timestamp} [${requestId}] === REQUEST END ===`);
    console.error("Error fetching project endpoints:", error);
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

// Handle CORS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}