import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const projectId = request.headers.get("X-Project-ID");

    if (!projectId) {
      return NextResponse.json(
        { error: "Missing project ID" },
        { status: 400 }
      );
    }

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

    // Verify user authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get project's Google Sheets credentials
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("google_sheets_access_token, google_sheets_refresh_token, google_sheets_token_expires_at")
      .eq("id", projectId)
      .eq("user_id", user.id)
      .single();

    if (projectError || !project?.google_sheets_access_token) {
      return NextResponse.json(
        { error: "Google Sheets not connected for this project" },
        { status: 401 }
      );
    }

    // Check if token is expired and refresh if needed
    const now = new Date();
    const expiresAt = project.google_sheets_token_expires_at ? new Date(project.google_sheets_token_expires_at) : null;
    
    let accessToken = project.google_sheets_access_token;

    if (expiresAt && now >= expiresAt && project.google_sheets_refresh_token) {
      // Refresh the token
      const refreshResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          client_secret: process.env.GOOGLE_CLIENT_SECRET!,
          refresh_token: project.google_sheets_refresh_token,
          grant_type: "refresh_token",
        }),
      });

      if (!refreshResponse.ok) {
        return NextResponse.json(
          { error: "Failed to refresh Google Sheets token" },
          { status: 401 }
        );
      }

      const refreshData = await refreshResponse.json();
      accessToken = refreshData.access_token;

      // Update the token in the database
      const newExpiresAt = new Date(now.getTime() + refreshData.expires_in * 1000);
      await supabase
        .from("projects")
        .update({
          google_sheets_access_token: accessToken,
          google_sheets_token_expires_at: newExpiresAt.toISOString(),
        })
        .eq("id", projectId)
        .eq("user_id", user.id);
    }

    // Fetch spreadsheets from Google Drive API
    const response = await fetch(
      "https://www.googleapis.com/drive/v3/files?q=mimeType='application/vnd.google-apps.spreadsheet'&fields=files(id,name,properties)",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Drive API error:", errorText);
      return NextResponse.json(
        { error: "Failed to fetch spreadsheets from Google Drive" },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Transform the response to match our expected format
    const spreadsheets = data.files?.map((file: { id: string; name: string }) => ({
      spreadsheetId: file.id,
      properties: {
        title: file.name,
      },
    })) || [];

    return NextResponse.json({ spreadsheets });
  } catch (error) {
    console.error("Error fetching spreadsheets:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}