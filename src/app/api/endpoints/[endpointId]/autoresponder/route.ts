import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ endpointId: string }> }
) {
  try {
    const { endpointId } = await params;
    console.log("Autoresponder configuration request for endpoint:", endpointId);

    // Create SSR Supabase client
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              if (options?.httpOnly === false) {
                cookieStore.set(name, value);
              }
            });
          },
        },
      }
    );

    // Get the current user using SSR authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      console.error("Authentication error:", authError);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Authenticated user:", user.id);

    // Parse request body
    const body = await request.json();
    console.log("Request body:", {
      ...body,
      autoresponder_api_key: body.autoresponder_api_key ? "[REDACTED]" : null
    });

    // Validate required fields if autoresponder is enabled
    if (body.autoresponder_enabled) {
      if (!body.autoresponder_from_email) {
        return NextResponse.json(
          { error: "From email is required when autoresponder is enabled" },
          { status: 400 }
        );
      }
      if (!body.autoresponder_recipient_field) {
        return NextResponse.json(
          { error: "Recipient field is required when autoresponder is enabled" },
          { status: 400 }
        );
      }
      if (!body.autoresponder_subject) {
        return NextResponse.json(
          { error: "Subject is required when autoresponder is enabled" },
          { status: 400 }
        );
      }
      if (body.autoresponder_provider !== "jsonpost" && !body.autoresponder_api_key) {
        return NextResponse.json(
          { error: "API key is required for external email providers" },
          { status: 400 }
        );
      }
    }

    // Verify endpoint exists and user has access
    const { data: endpoint, error: endpointError } = await supabase
      .from("endpoints")
      .select("id, project_id, projects!inner(user_id)")
      .eq("id", endpointId)
      .single();

    console.log("Endpoint lookup result:", {
      endpoint,
      endpointError: endpointError?.message,
      endpointId
    });

    if (endpointError || !endpoint) {
      console.error("Endpoint not found:", { endpointId, error: endpointError });
      return NextResponse.json({ error: "Endpoint not found" }, { status: 404 });
    }

    // Check if user owns the project - projects is an object when using !inner join
    const project = endpoint.projects as unknown as { user_id: string };
    console.log("Project ownership check:", {
      projectUserId: project?.user_id,
      currentUserId: user.id,
      hasAccess: project?.user_id === user.id
    });
    
    if (project?.user_id !== user.id) {
      console.error("Access denied:", { 
        projectUserId: project?.user_id, 
        currentUserId: user.id 
      });
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Update the endpoint with autoresponder configuration
    console.log("Attempting to update endpoint:", {
      endpointId,
      updateData: {
        autoresponder_enabled: body.autoresponder_enabled,
        autoresponder_provider: body.autoresponder_provider,
        autoresponder_from_email: body.autoresponder_from_email,
        autoresponder_from_name: body.autoresponder_from_name,
        autoresponder_subject: body.autoresponder_subject,
        autoresponder_html_template: body.autoresponder_html_template,
        autoresponder_text_template: body.autoresponder_text_template,
        autoresponder_recipient_field: body.autoresponder_recipient_field,
        autoresponder_api_key: body.autoresponder_api_key ? "[REDACTED]" : null,
        autoresponder_domain: body.autoresponder_domain,
      }
    });

    const { data: updatedEndpoint, error: updateError } = await supabase
      .from("endpoints")
      .update({
        autoresponder_enabled: body.autoresponder_enabled,
        autoresponder_provider: body.autoresponder_provider,
        autoresponder_from_email: body.autoresponder_from_email,
        autoresponder_from_name: body.autoresponder_from_name,
        autoresponder_subject: body.autoresponder_subject,
        autoresponder_html_template: body.autoresponder_html_template,
        autoresponder_text_template: body.autoresponder_text_template,
        autoresponder_recipient_field: body.autoresponder_recipient_field,
        autoresponder_api_key: body.autoresponder_api_key,
        autoresponder_domain: body.autoresponder_domain,
      })
      .eq("id", endpointId)
      .select()
      .single();

    console.log("Update result:", {
      updatedEndpoint: updatedEndpoint ? { ...updatedEndpoint, autoresponder_api_key: "[REDACTED]" } : null,
      updateError: updateError?.message,
      updateErrorDetails: updateError
    });

    if (updateError) {
      console.error("Error updating endpoint:", updateError);
      return NextResponse.json(
        { error: "Failed to update endpoint", details: updateError.message },
        { status: 500 }
      );
    }

    console.log("Successfully updated endpoint, returning response");
    
    // Return the updated endpoint but redact sensitive information
    const responseEndpoint = updatedEndpoint ? {
      ...updatedEndpoint,
      autoresponder_api_key: updatedEndpoint.autoresponder_api_key ? "[REDACTED]" : null
    } : null;

    return NextResponse.json(responseEndpoint);
  } catch (error) {
    console.error("Error in autoresponder configuration API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}