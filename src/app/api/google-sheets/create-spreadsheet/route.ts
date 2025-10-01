import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

interface CreateSpreadsheetRequest {
  endpointId: string;
  endpointName: string;
  selectedVariables: string[];
}

export async function POST(request: NextRequest) {
  try {
    const { endpointId, endpointName, selectedVariables }: CreateSpreadsheetRequest = await request.json();

    if (!endpointId || !endpointName || !selectedVariables || selectedVariables.length === 0) {
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

    // Get endpoint to verify ownership
    const { data: endpoint, error: endpointError } = await supabase
      .from("endpoints")
      .select("project_id")
      .eq("id", endpointId)
      .single();

    if (endpointError || !endpoint) {
      return NextResponse.json(
        { error: "Endpoint not found" },
        { status: 404 }
      );
    }

    // Get project's Google Sheets credentials
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("google_sheets_access_token, google_sheets_refresh_token, google_sheets_token_expires_at")
      .eq("id", endpoint.project_id)
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
        .eq("id", endpoint.project_id);
    }

    // Generate random number for spreadsheet name
    const randomNum = Math.floor(Math.random() * 1000) + 1;
    const spreadsheetTitle = `JSONPost - ${endpointName} - Submissions - ${randomNum}`;

    // Create headers from selected variables (use full variable paths as headers)
    const headers = selectedVariables;

    // Create the spreadsheet
    const createResponse = await fetch(
      "https://sheets.googleapis.com/v4/spreadsheets",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          properties: {
            title: spreadsheetTitle,
          },
          sheets: [
            {
              properties: {
                title: "Sheet1",
              },
              data: [
                {
                  rowData: [
                    {
                      values: headers.map(header => ({
                        userEnteredValue: {
                          stringValue: header,
                        },
                        userEnteredFormat: {
                          textFormat: {
                            bold: true,
                          },
                        },
                      })),
                    },
                  ],
                },
              ],
            },
          ],
        }),
      }
    );

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      console.error("Failed to create spreadsheet:", errorText);
      return NextResponse.json(
        { error: "Failed to create spreadsheet" },
        { status: 500 }
      );
    }

    const spreadsheetData = await createResponse.json();

    // Update the endpoint with the new spreadsheet configuration
    const { error: updateError } = await supabase
      .from("endpoints")
      .update({
        google_sheets_enabled: true,
        google_sheets_spreadsheet_id: spreadsheetData.spreadsheetId,
        google_sheets_sheet_name: "Sheet1",
        google_sheets_selected_variables: selectedVariables,
      })
      .eq("id", endpointId);

    if (updateError) {
      console.error("Failed to update endpoint:", updateError);
      return NextResponse.json(
        { error: "Failed to update endpoint configuration" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      spreadsheetId: spreadsheetData.spreadsheetId,
      spreadsheetUrl: spreadsheetData.spreadsheetUrl,
      title: spreadsheetTitle,
    });
  } catch (error) {
    console.error("Error creating spreadsheet:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}