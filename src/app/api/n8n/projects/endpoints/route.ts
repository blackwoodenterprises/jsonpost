import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Create a service role client for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const n8n_api_key = searchParams.get('n8n_api_key');

    if (!n8n_api_key) {
      return NextResponse.json(
        { error: "n8n_api_key is required" },
        { status: 400 }
      );
    }

    // Validate the API key and get project information
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("id")
      .eq("n8n_api_key", n8n_api_key)
      .single();

    if (projectError || !project) {
      return NextResponse.json(
        { error: "Invalid API key" },
        { status: 401 }
      );
    }

    // Get all endpoints for the project
    const { data: endpoints, error: endpointsError } = await supabase
      .from("endpoints")
      .select("id, name, path, method")
      .eq("project_id", project.id)
      .order("name");

    if (endpointsError) {
      console.error("Error fetching endpoints:", endpointsError);
      return NextResponse.json(
        { error: "Failed to fetch endpoints" },
        { status: 500 }
      );
    }

    // Format endpoints for n8n dropdown
    const formattedEndpoints = endpoints.map(endpoint => ({
      name: `${endpoint.name} (${endpoint.method} /${endpoint.path})`,
      value: endpoint.id
    }));

    return NextResponse.json({
      endpoints: formattedEndpoints
    });

  } catch (error) {
    console.error("Error fetching project endpoints:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
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