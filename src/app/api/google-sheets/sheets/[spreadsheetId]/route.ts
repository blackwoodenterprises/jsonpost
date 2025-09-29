import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ spreadsheetId: string }> }
) {
  try {
    const { spreadsheetId } = await params;
    const projectId = request.headers.get("X-Project-ID");

    if (!projectId || !spreadsheetId) {
      return NextResponse.json(
        { error: "Missing required parameters" },
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

    // Fetch spreadsheet metadata from Google Sheets API
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=sheets.properties`;
    
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Sheets API error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        spreadsheetId,
        url: apiUrl
      });
      return NextResponse.json(
        { error: "Failed to fetch sheets from Google Sheets", details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Transform the response to include sheet names
    const sheets = data.sheets?.map((sheet: { properties: { title: string } }) => ({
      name: sheet.properties.title,
      headers: [], // Will be populated when a specific sheet is selected
    })) || [];

    return NextResponse.json({ sheets });
  } catch (error) {
    console.error("Error fetching sheets:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}