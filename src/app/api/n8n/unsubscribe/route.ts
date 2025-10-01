import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Create a service role client for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function DELETE(request: NextRequest) {
  try {
    const { n8n_api_key, endpoint_id, webhook_url } = await request.json();

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

    // Delete the subscription
    const { data: deletedSubscription, error: deleteError } = await supabase
      .from("n8n_subscriptions")
      .delete()
      .eq("project_id", project.id)
      .eq("endpoint_id", endpoint_id)
      .eq("webhook_url", webhook_url)
      .select()
      .single();

    if (deleteError) {
      console.error("Error deleting n8n subscription:", deleteError);
      return NextResponse.json(
        { error: "Failed to delete subscription" },
        { status: 500 }
      );
    }

    if (!deletedSubscription) {
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 404 }
      );
    }

    console.log("n8n subscription deleted:", {
      subscription_id: deletedSubscription.id,
      project_id: project.id,
      endpoint_id: endpoint_id,
      webhook_url: webhook_url
    });

    return NextResponse.json({
      success: true,
      message: "Subscription deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting n8n subscription:", error);
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
      'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}