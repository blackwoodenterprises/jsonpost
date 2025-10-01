import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Create a service role client for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { n8n_api_key } = await request.json();

    if (!n8n_api_key) {
      return NextResponse.json(
        { error: "n8n_api_key is required" },
        { status: 400 }
      );
    }

    // Validate the API key and get project information
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("id, name, user_id")
      .eq("n8n_api_key", n8n_api_key)
      .single();

    if (projectError || !project) {
      return NextResponse.json(
        { error: "Invalid API key" },
        { status: 401 }
      );
    }

    // Return project information for successful validation
    return NextResponse.json({
      valid: true,
      project: {
        id: project.id,
        name: project.name,
        user_id: project.user_id
      }
    });

  } catch (error) {
    console.error("Error validating n8n API key:", error);
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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}