import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { randomBytes } from "crypto";

// Create a service role client for server-side operations
const supabaseServiceRole = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;

    // Create SSR Supabase client for authentication
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

    // Get user authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the project belongs to the user
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("id")
      .eq("id", projectId)
      .eq("user_id", user.id)
      .single();

    if (projectError || !project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Generate a new API key using service role client
    const { data: updatedProject, error: updateError } = await supabaseServiceRole
      .from("projects")
      .update({ 
        n8n_api_key: `n8n_${Buffer.from(randomBytes(32)).toString('hex')}`,
        updated_at: new Date().toISOString()
      })
      .eq("id", projectId)
      .select("n8n_api_key")
      .single();

    if (updateError || !updatedProject) {
      console.error("Error regenerating n8n API key:", updateError);
      return NextResponse.json(
        { error: "Failed to regenerate API key" },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      n8n_api_key: updatedProject.n8n_api_key 
    });

  } catch (error) {
    console.error("Error regenerating n8n API key:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}