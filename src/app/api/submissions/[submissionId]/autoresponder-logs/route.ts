import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ submissionId: string }> }
) {
  try {
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
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    );

    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { submissionId } = await params;

    // First, verify that the submission belongs to the user
    const { data: submission, error: submissionError } = await supabase
      .from("submissions")
      .select(`
        id,
        endpoints!submissions_endpoint_id_fkey(
          id,
          project_id,
          projects!endpoints_project_id_fkey(
            id,
            user_id
          )
        )
      `)
      .eq("id", submissionId)
      .single();

    if (submissionError || !submission) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    // Check if the user owns the project
    const projectUserId = (submission.endpoints as { projects?: { user_id: string } })?.projects?.user_id;
    if (projectUserId !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Fetch autoresponder logs for this submission
    const { data: autoresponderLogs, error: logsError } = await supabase
      .from("autoresponder_logs")
      .select("*")
      .eq("submission_id", submissionId)
      .order("created_at", { ascending: false });

    if (logsError) {
      console.error("Error fetching autoresponder logs:", logsError);
      return NextResponse.json(
        { error: "Failed to fetch autoresponder logs" },
        { status: 500 }
      );
    }

    return NextResponse.json({ logs: autoresponderLogs || [] });
  } catch (error) {
    console.error("Error in autoresponder logs API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}