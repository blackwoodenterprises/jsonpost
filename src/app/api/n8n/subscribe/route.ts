import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Create a service role client for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const n8n_api_key = request.headers.get('x-n8n-api-key');
    const { endpoint_id, webhook_url } = await request.json();

    if (!n8n_api_key || !endpoint_id || !webhook_url) {
      return NextResponse.json(
        { error: "n8n_api_key, endpoint_id, and webhook_url are required" },
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

    // Verify the endpoint belongs to the project
    const { data: endpoint, error: endpointError } = await supabase
      .from("endpoints")
      .select("id, name")
      .eq("id", endpoint_id)
      .eq("project_id", project.id)
      .single();

    if (endpointError || !endpoint) {
      return NextResponse.json(
        { error: "Endpoint not found or doesn't belong to this project" },
        { status: 404 }
      );
    }

    // Create or update the subscription
    const { data: subscription, error: subscriptionError } = await supabase
      .from("n8n_subscriptions")
      .upsert({
        project_id: project.id,
        endpoint_id: endpoint_id,
        webhook_url: webhook_url,
        is_active: true,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'project_id,endpoint_id,webhook_url'
      })
      .select()
      .single();

    if (subscriptionError) {
      console.error("Error creating n8n subscription:", subscriptionError);
      return NextResponse.json(
        { error: "Failed to create subscription" },
        { status: 500 }
      );
    }

    console.log("n8n subscription created:", {
      subscription_id: subscription.id,
      project_id: project.id,
      endpoint_id: endpoint_id,
      endpoint_name: endpoint.name,
      webhook_url: webhook_url
    });

    return NextResponse.json({
      success: true,
      subscription: {
        id: subscription.id,
        endpoint_name: endpoint.name,
        webhook_url: webhook_url,
        is_active: subscription.is_active
      }
    });

  } catch (error) {
    console.error("Error creating n8n subscription:", error);
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