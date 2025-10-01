import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/lib/database.types";

interface WriteRequest {
  endpointId: string;
  submissionData: Record<string, unknown>;
}

export async function POST(request: NextRequest) {
  try {
    const { endpointId, submissionData }: WriteRequest = await request.json();

    if (!endpointId || !submissionData) {
      return NextResponse.json(
        { error: "Missing endpointId or submissionData" },
        { status: 400 }
      );
    }

    // Get endpoint configuration
    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { data: endpoint, error: endpointError } = await supabase
      .from("endpoints")
      .select("*")
      .eq("id", endpointId)
      .single();

    if (endpointError || !endpoint) {
      return NextResponse.json(
        { error: "Endpoint not found" },
        { status: 404 }
      );
    }

    // Check if Google Sheets is configured for this endpoint
    const spreadsheetId = (endpoint as Database['public']['Tables']['endpoints']['Row']).google_sheets_spreadsheet_id;
    const sheetName = (endpoint as Database['public']['Tables']['endpoints']['Row']).google_sheets_sheet_name;
    const selectedVariables = (endpoint as Database['public']['Tables']['endpoints']['Row']).google_sheets_selected_variables;

    if (!spreadsheetId || !sheetName || !selectedVariables || selectedVariables.length === 0) {
      return NextResponse.json(
        { error: "Google Sheets not configured for this endpoint" },
        { status: 400 }
      );
    }

    // Get project's Google Sheets credentials
    console.log('Looking up project for endpoint:', {
      endpointId: endpoint.id,
      projectId: endpoint.project_id,
      endpointData: endpoint
    });

    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("*")
      .eq("id", endpoint.project_id)
      .single();

    console.log('Project lookup result:', {
      project: project,
      projectError: projectError,
      projectId: endpoint.project_id
    });

    if (projectError || !project) {
      console.error('Project not found:', {
        projectId: endpoint.project_id,
        error: projectError
      });
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    console.log("🔍 Google Sheets Debug - Spreadsheet ID:", spreadsheetId);
    console.log("🔍 Google Sheets Debug - Sheet Name:", sheetName);
    console.log("🔍 Google Sheets Debug - Selected Variables:", selectedVariables);
    console.log("🔍 Google Sheets Debug - Submission Data:", submissionData);

    // Extract access token (simplified for now due to type issues)
    const accessToken = (project as Database['public']['Tables']['projects']['Row']).google_sheets_access_token;
    if (!accessToken) {
      return NextResponse.json(
        { error: "Google Sheets not connected for this project" },
        { status: 401 }
      );
    }

    console.log("🔍 Google Sheets Debug - Access Token Present:", !!accessToken);

    // Prepare row data based on selected variables
    console.log("🔍 Google Sheets Debug - Selected Variables:", selectedVariables);
    
    // First, get the headers to determine the correct order
    const headersResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'${sheetName}'!1:1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("🔍 Google Sheets Debug - Headers Response Status:", headersResponse.status);

    if (!headersResponse.ok) {
      const errorText = await headersResponse.text();
      console.error("🔍 Google Sheets Debug - Headers Error:", errorText);
      return NextResponse.json(
        { error: "Failed to fetch sheet headers" },
        { status: 500 }
      );
    }

    const headersData = await headersResponse.json();
    const headers = headersData.values?.[0] || [];

    console.log("🔍 Google Sheets Debug - Headers Retrieved:", headers);

    // Create row data in the correct column order
    const rowValues = new Array(headers.length).fill("");
    
    for (const variablePath of selectedVariables) {
      // For the new approach, we use the variable path as both the column header and the data path
      const columnIndex = headers.indexOf(variablePath);
      console.log(`🔍 Google Sheets Debug - Mapping ${variablePath} -> column index: ${columnIndex}`);
      
      if (columnIndex !== -1) {
        // Extract value from submission data using variable path
        const value = extractValueFromPath(submissionData, variablePath);
        rowValues[columnIndex] = value !== undefined ? String(value) : "";
        console.log(`🔍 Google Sheets Debug - Set value at index ${columnIndex}:`, value);
      } else {
        console.log(`🔍 Google Sheets Debug - Column "${variablePath}" not found in headers`);
      }
    }

    console.log("🔍 Google Sheets Debug - Final Row Values:", rowValues);

    // Append the row to the sheet
    const appendResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetName)}:append?valueInputOption=RAW`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [rowValues],
        }),
      }
    );

    console.log("🔍 Google Sheets Debug - Append Response Status:", appendResponse.status);
    console.log("🔍 Google Sheets Debug - Request Body:", JSON.stringify({
      values: [rowValues],
    }));

    if (!appendResponse.ok) {
      const errorText = await appendResponse.text();
      console.error("🔍 Google Sheets Debug - Append Error:", errorText);
      return NextResponse.json(
        { error: "Failed to write to Google Sheets" },
        { status: 500 }
      );
    }

    const appendData = await appendResponse.json();
    console.log("🔍 Google Sheets Debug - Append Response Data:", appendData);

    return NextResponse.json({
      success: true,
      updatedRange: appendData.updates?.updatedRange,
      updatedRows: appendData.updates?.updatedRows,
    });
  } catch (error) {
    console.error("Error writing to Google Sheets:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper function to extract value from nested object using dot notation path
function extractValueFromPath(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce((current: unknown, key: string) => {
    return current && typeof current === 'object' ? (current as Record<string, unknown>)[key] : undefined;
  }, obj as unknown);
}