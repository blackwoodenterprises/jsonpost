import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import GoogleSheetsClient from "./GoogleSheetsClient";

interface Project {
  id: string;
  name: string;
  google_sheets_access_token?: string | null;
  google_sheets_refresh_token?: string | null;
  google_sheets_token_expires_at?: string | null;
}

interface Endpoint {
  id: string;
  name: string;
  description: string | null;
  variable_paths?: string[] | null;
  google_sheets_enabled?: boolean | null;
  google_sheets_spreadsheet_id?: string | null;
  google_sheets_sheet_name?: string | null;
  google_sheets_column_mappings?: Record<string, string> | null;
}

interface GoogleSheet {
  spreadsheetId: string;
  properties: {
    title: string;
  };
}

interface SheetInfo {
  name: string;
  headers: string[];
}

// Google API response interfaces
interface GoogleDriveFile {
  id: string;
  name: string;
}

interface GoogleSheetProperties {
  title: string;
}

interface GoogleSheetData {
  properties: GoogleSheetProperties;
}

async function getServerData(projectId: string, endpointId: string) {
  const cookieStore = await cookies();
  
  // Create proper SSR Supabase client
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
  
  if (authError || !user) {
    redirect("/auth/login");
  }

  // Fetch project data
  const { data: projectData, error: projectError } = await supabase
    .from("projects")
    .select(
      "id, name, google_sheets_access_token, google_sheets_refresh_token, google_sheets_token_expires_at"
    )
    .eq("id", projectId)
    .eq("user_id", user.id)
    .single();

  if (projectError || !projectData) {
    throw new Error("Project not found");
  }

  // Fetch endpoint data
  const { data: endpointData, error: endpointError } = await supabase
    .from("endpoints")
    .select(
      "id, name, description, variable_paths, google_sheets_enabled, google_sheets_spreadsheet_id, google_sheets_sheet_name, google_sheets_column_mappings"
    )
    .eq("id", endpointId)
    .eq("project_id", projectId)
    .single();

  if (endpointError || !endpointData) {
    throw new Error("Endpoint not found");
  }

  let spreadsheets: GoogleSheet[] = [];
  let availableSheets: SheetInfo[] = [];
  let sheetHeaders: string[] = [];

  // If Google Sheets is connected, fetch data directly from Google APIs
  if (projectData.google_sheets_access_token) {
    try {
      // Get Google Sheets access token (with refresh if needed)
      let accessToken = projectData.google_sheets_access_token;
      const now = new Date();
      const expiresAt = projectData.google_sheets_token_expires_at ? new Date(projectData.google_sheets_token_expires_at) : null;

      // Refresh token if expired
      if (expiresAt && now >= expiresAt && projectData.google_sheets_refresh_token) {
        const refreshResponse = await fetch("https://oauth2.googleapis.com/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            client_secret: process.env.GOOGLE_CLIENT_SECRET!,
            refresh_token: projectData.google_sheets_refresh_token,
            grant_type: "refresh_token",
          }),
        });

        if (refreshResponse.ok) {
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
      }

      // Fetch spreadsheets directly from Google Drive API
      const spreadsheetsResponse = await fetch(
        "https://www.googleapis.com/drive/v3/files?q=mimeType='application/vnd.google-apps.spreadsheet'&fields=files(id,name,properties)",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (spreadsheetsResponse.ok) {
        const data = await spreadsheetsResponse.json();
        spreadsheets = data.files?.map((file: GoogleDriveFile) => ({
          spreadsheetId: file.id,
          properties: {
            title: file.name,
          },
        })) || [];
      }

      // If endpoint has a selected spreadsheet, fetch its sheets
      if (endpointData.google_sheets_spreadsheet_id) {
        const sheetsResponse = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${endpointData.google_sheets_spreadsheet_id}?fields=sheets.properties`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (sheetsResponse.ok) {
          const data = await sheetsResponse.json();
          availableSheets = data.sheets?.map((sheet: GoogleSheetData) => ({
            name: sheet.properties.title,
            headers: [],
          })) || [];
        }

        // If endpoint has a selected sheet, fetch its headers
        if (endpointData.google_sheets_sheet_name) {
          const range = `'${endpointData.google_sheets_sheet_name}'!1:1`;
          const headersResponse = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${endpointData.google_sheets_spreadsheet_id}/values/${encodeURIComponent(range)}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (headersResponse.ok) {
            const data = await headersResponse.json();
            const rawHeaders = data.values?.[0] || [];
            sheetHeaders = rawHeaders
              .filter((header: unknown) => header && typeof header === 'string' && header.trim())
              .map((header: string) => header.trim());
          }
        }
      }
    } catch (error) {
      console.error("Error fetching Google Sheets data:", error);
    }
  }

  return {
    project: projectData as Project,
    endpoint: endpointData as Endpoint,
    spreadsheets,
    availableSheets,
    sheetHeaders,
  };
}

export default async function GoogleSheetsSettingsPage({
  params,
}: {
  params: Promise<{ id: string; endpointId: string }>;
}) {
  const { id: projectId, endpointId } = await params;

  try {
    const serverData = await getServerData(projectId, endpointId);
    
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <GoogleSheetsClient
          initialProject={serverData.project}
          initialEndpoint={serverData.endpoint}
          initialSpreadsheets={serverData.spreadsheets}
          initialAvailableSheets={serverData.availableSheets}
          initialSheetHeaders={serverData.sheetHeaders}
          projectId={projectId}
          endpointId={endpointId}
        />
      </Suspense>
    );
  } catch (error) {
    console.error("Error loading Google Sheets page:", error);
    redirect(`/dashboard/projects/${projectId}/endpoints/${endpointId}`);
  }
}