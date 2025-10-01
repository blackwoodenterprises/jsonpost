import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ endpointId: string }> }
) {
  try {
    const { endpointId } = await params;
    const body = await request.json();

    console.log("Google Sheets configuration request:", {
      endpointId,
      body,
      timestamp: new Date().toISOString()
    });

    // Create proper SSR Supabase client
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

    // Get user authentication using proper SSR method
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    console.log("Authentication check:", {
      hasUser: !!user,
      userId: user?.id,
      authError: authError?.message
    });
    
    if (authError || !user) {
      console.error("Authentication failed:", authError);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the endpoint belongs to the user
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

    // Update the endpoint with Google Sheets configuration
    console.log("Attempting to update endpoint:", {
      endpointId,
      updateData: {
        google_sheets_enabled: body.google_sheets_enabled,
        google_sheets_spreadsheet_id: body.google_sheets_spreadsheet_id,
        google_sheets_sheet_name: body.google_sheets_sheet_name,
        google_sheets_selected_variables: body.google_sheets_selected_variables,
      }
    });

    const { data: updatedEndpoint, error: updateError } = await supabase
      .from("endpoints")
      .update({
        google_sheets_enabled: body.google_sheets_enabled,
        google_sheets_spreadsheet_id: body.google_sheets_spreadsheet_id,
        google_sheets_sheet_name: body.google_sheets_sheet_name,
        google_sheets_selected_variables: body.google_sheets_selected_variables,
      })
      .eq("id", endpointId)
      .select()
      .single();

    console.log("Update result:", {
      updatedEndpoint,
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
    return NextResponse.json(updatedEndpoint);
  } catch (error) {
    console.error("Error in Google Sheets configuration API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ endpointId: string }> }
) {
  try {
    const { endpointId } = await params;

    console.log("Google Sheets disconnect request:", {
      endpointId,
      timestamp: new Date().toISOString()
    });

    // Create proper SSR Supabase client
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

    // Get user authentication using proper SSR method
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    console.log("Authentication check:", {
      hasUser: !!user,
      userId: user?.id,
      authError: authError?.message
    });
    
    if (authError || !user) {
      console.error("Authentication failed:", authError);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the endpoint belongs to the user
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

    // Disconnect Google Sheets by clearing the configuration
    console.log("Attempting to disconnect Google Sheets:", {
      endpointId
    });

    const { data: updatedEndpoint, error: updateError } = await supabase
      .from("endpoints")
      .update({
        google_sheets_enabled: false,
        google_sheets_spreadsheet_id: null,
        google_sheets_sheet_name: null,
        google_sheets_selected_variables: null,
      })
      .eq("id", endpointId)
      .select()
      .single();

    console.log("Disconnect result:", {
      updatedEndpoint,
      updateError: updateError?.message,
      updateErrorDetails: updateError
    });

    if (updateError) {
      console.error("Error disconnecting Google Sheets:", updateError);
      return NextResponse.json(
        { error: "Failed to disconnect Google Sheets", details: updateError.message },
        { status: 500 }
      );
    }

    console.log("Successfully disconnected Google Sheets, returning response");
    return NextResponse.json(updatedEndpoint);
  } catch (error) {
    console.error("Error in Google Sheets disconnect API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}