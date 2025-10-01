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
  
  console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] === REQUEST START ===`);
  console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] Method: POST`);
  console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] URL: ${request.url}`);
  console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] Headers:`, Object.fromEntries(request.headers.entries()));
  
  try {
    const n8n_api_key = request.headers.get('x-n8n-api-key');
    const requestBody = await request.json();
    // Support both camelCase (from n8n node) and snake_case field names
    const endpoint_id = requestBody.endpoint_id || requestBody.endpointId;
    const webhook_url = requestBody.webhook_url || requestBody.webhookUrl;
    
    console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] API Key from header: ${n8n_api_key ? n8n_api_key.substring(0, 8) + '...' : 'null'}`);
    console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] Request Body:`, requestBody);
    console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] Extracted fields:`, { endpoint_id, webhook_url });

    if (!n8n_api_key || !endpoint_id || !webhook_url) {
      const errorResponse = { error: "n8n_api_key, endpoint_id, and webhook_url are required" };
      console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] ERROR: Missing required fields`);
      console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] Missing fields:`, {
        n8n_api_key: !n8n_api_key,
        endpoint_id: !endpoint_id,
        webhook_url: !webhook_url
      });
      console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] Response (400):`, errorResponse);
      console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] === REQUEST END ===`);
      return NextResponse.json(errorResponse, { status: 400 });
    }

    console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] Validating API key: ${n8n_api_key.substring(0, 8)}...`);
    
    // Validate the API key and get project information
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("id")
      .eq("n8n_api_key", n8n_api_key)
      .single();

    console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] Project validation result:`, {
      project: project ? { id: project.id } : null,
      error: projectError
    });

    if (projectError || !project) {
      const errorResponse = { error: "Invalid API key" };
      console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] ERROR: Invalid API key`);
      console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] Response (401):`, errorResponse);
      console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] === REQUEST END ===`);
      return NextResponse.json(errorResponse, { status: 401 });
    }

    console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] Verifying endpoint ${endpoint_id} belongs to project ${project.id}`);
    
    // Verify the endpoint belongs to the project
    const { data: endpoint, error: endpointError } = await supabase
      .from("endpoints")
      .select("id, name")
      .eq("id", endpoint_id)
      .eq("project_id", project.id)
      .single();

    console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] Endpoint verification result:`, {
      endpoint: endpoint ? { id: endpoint.id, name: endpoint.name } : null,
      error: endpointError
    });

    if (endpointError || !endpoint) {
      const errorResponse = { error: "Endpoint not found or doesn't belong to this project" };
      console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] ERROR: Endpoint not found or unauthorized`);
      console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] Response (404):`, errorResponse);
      console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] === REQUEST END ===`);
      return NextResponse.json(errorResponse, { status: 404 });
    }

    console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] Creating/updating subscription for endpoint: ${endpoint.name}`);
    console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] Webhook URL: ${webhook_url}`);
    
    // Create or update the subscription
    const subscriptionData = {
      project_id: project.id,
      endpoint_id: endpoint_id,
      webhook_url: webhook_url,
      is_active: true,
      updated_at: new Date().toISOString()
    };
    
    console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] Subscription data:`, subscriptionData);
    
    const { data: subscription, error: subscriptionError } = await supabase
      .from("n8n_subscriptions")
      .upsert(subscriptionData, {
        onConflict: 'project_id,endpoint_id,webhook_url'
      })
      .select()
      .single();

    console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] Subscription upsert result:`, {
      subscription: subscription ? { id: subscription.id, is_active: subscription.is_active } : null,
      error: subscriptionError
    });

    if (subscriptionError) {
      const errorResponse = { error: "Failed to create subscription" };
      console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] ERROR: Failed to create subscription`);
      console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] Database error:`, subscriptionError);
      console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] Response (500):`, errorResponse);
      console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] === REQUEST END ===`);
      console.error("Error creating n8n subscription:", subscriptionError);
      return NextResponse.json(errorResponse, { status: 500 });
    }

    console.log("n8n subscription created:", {
      subscription_id: subscription.id,
      project_id: project.id,
      endpoint_id: endpoint_id,
      endpoint_name: endpoint.name,
      webhook_url: webhook_url
    });

    const successResponse = {
      success: true,
      subscription: {
        id: subscription.id,
        endpoint_name: endpoint.name,
        webhook_url: webhook_url,
        is_active: subscription.is_active
      }
    };
    
    console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] SUCCESS: Subscription created/updated`);
    console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] Response (200):`, successResponse);
    console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] === REQUEST END ===`);

    return NextResponse.json(successResponse);

  } catch (error) {
    const errorResponse = { error: "Internal server error" };
    console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] EXCEPTION:`, error);
    console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] Response (500):`, errorResponse);
    console.log(`[N8N-SUBSCRIBE] ${timestamp} [${requestId}] === REQUEST END ===`);
    console.error("Error creating n8n subscription:", error);
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