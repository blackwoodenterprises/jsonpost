import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Create a service role client for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function DELETE(request: NextRequest) {
  const requestId = Math.random().toString(36).substring(7);
  const timestamp = new Date().toISOString();
  
  console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] === REQUEST START ===`);
  console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] Method: DELETE`);
  console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] URL: ${request.url}`);
  console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] Headers:`, Object.fromEntries(request.headers.entries()));
  
  try {
    const n8n_api_key = request.headers.get('x-n8n-api-key');
    const requestBody = await request.json();
    // Support both camelCase (from n8n node) and snake_case field names
    const endpoint_id = requestBody.endpoint_id || requestBody.endpointId;
    const webhook_url = requestBody.webhook_url || requestBody.webhookUrl;
    
    console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] API Key from header: ${n8n_api_key ? n8n_api_key.substring(0, 8) + '...' : 'null'}`);
    console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] Request Body:`, requestBody);
    console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] Extracted fields:`, { endpoint_id, webhook_url });

    if (!n8n_api_key || !endpoint_id || !webhook_url) {
      const errorResponse = { error: "n8n_api_key, endpoint_id, and webhook_url are required" };
      console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] ERROR: Missing required fields`);
      console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] Missing fields:`, {
        n8n_api_key: !n8n_api_key,
        endpoint_id: !endpoint_id,
        webhook_url: !webhook_url
      });
      console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] Response (400):`, errorResponse);
      console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] === REQUEST END ===`);
      return NextResponse.json(errorResponse, { status: 400 });
    }

    console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] Validating API key: ${n8n_api_key.substring(0, 8)}...`);
    
    // Validate the API key and get project information
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("id")
      .eq("n8n_api_key", n8n_api_key)
      .single();

    console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] Project validation result:`, {
      project: project ? { id: project.id } : null,
      error: projectError
    });

    if (projectError || !project) {
      const errorResponse = { error: "Invalid API key" };
      console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] ERROR: Invalid API key`);
      console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] Response (401):`, errorResponse);
      console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] === REQUEST END ===`);
      return NextResponse.json(errorResponse, { status: 401 });
    }

    console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] Deleting subscription for project ${project.id}, endpoint ${endpoint_id}, webhook ${webhook_url}`);
    
    // Delete the subscription
    const { data: deletedSubscription, error: deleteError } = await supabase
      .from("n8n_subscriptions")
      .delete()
      .eq("project_id", project.id)
      .eq("endpoint_id", endpoint_id)
      .eq("webhook_url", webhook_url)
      .select()
      .single();

    console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] Subscription deletion result:`, {
      deletedSubscription: deletedSubscription ? { id: deletedSubscription.id } : null,
      error: deleteError
    });

    if (deleteError) {
      console.error("Error deleting n8n subscription:", deleteError);
      const errorResponse = { error: "Failed to unsubscribe from webhook" };
      console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] ERROR: Failed to delete subscription`);
      console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] Delete error:`, deleteError);
      console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] Response (500):`, errorResponse);
      console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] === REQUEST END ===`);
      return NextResponse.json(errorResponse, { status: 500 });
    }

    if (!deletedSubscription) {
      const errorResponse = { error: "Subscription not found" };
      console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] ERROR: Subscription not found`);
      console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] Response (404):`, errorResponse);
      console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] === REQUEST END ===`);
      return NextResponse.json(errorResponse, { status: 404 });
    }

    const successResponse = { message: "Successfully unsubscribed from webhook" };
    console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] SUCCESS: Subscription deleted successfully`);
    console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] Response (200):`, successResponse);
    console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] === REQUEST END ===`);
    return NextResponse.json(successResponse);

  } catch (error) {
    console.error("Error deleting n8n subscription:", error);
    const errorResponse = { error: "Internal server error" };
    console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] EXCEPTION: Internal server error`);
    console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] Exception details:`, error);
    console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] Response (500):`, errorResponse);
    console.log(`[N8N-UNSUBSCRIBE] ${timestamp} [${requestId}] === REQUEST END ===`);
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

// Handle CORS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}