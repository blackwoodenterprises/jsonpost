import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Create a service role client for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");

    // Handle OAuth error
    if (error) {
      console.error("OAuth error:", error);
      return NextResponse.redirect(
        new URL(`/dashboard/projects/${state}/settings?error=oauth_error`, request.url)
      );
    }

    // Validate required parameters
    if (!code || !state) {
      console.error("Missing code or state parameter");
      return NextResponse.redirect(
        new URL(`/dashboard/projects/${state}/settings?error=missing_parameters`, request.url)
      );
    }

    // Exchange authorization code for access token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: "authorization_code",
        redirect_uri: `${new URL(request.url).origin}/api/auth/google-sheets/callback`,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("Token exchange failed:", errorText);
      return NextResponse.redirect(
        new URL(`/dashboard/projects/${state}/settings?error=token_exchange_failed`, request.url)
      );
    }

    const tokenData = await tokenResponse.json();
    const { access_token, refresh_token, expires_in } = tokenData;

    console.log("Token exchange successful, access_token received:", access_token ? "Yes" : "No");

    // Get user info from Google
    const userInfoResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!userInfoResponse.ok) {
      const errorText = await userInfoResponse.text();
      console.error("Failed to get user info:", userInfoResponse.status, errorText);
      return NextResponse.redirect(
        new URL(`/dashboard/projects/${state}/settings?error=user_info_failed`, request.url)
      );
    }

    const userInfo = await userInfoResponse.json();

    // Calculate token expiration time
    const expiresAt = new Date(Date.now() + expires_in * 1000);

    // Update project with Google Sheets credentials
    const { error: updateError } = await supabase
      .from("projects")
      .update({
        google_sheets_access_token: access_token,
        google_sheets_refresh_token: refresh_token,
        google_sheets_token_expires_at: expiresAt.toISOString(),
        google_sheets_connected_at: new Date().toISOString(),
        google_sheets_user_email: userInfo.email,
      })
      .eq("id", state);

    if (updateError) {
      console.error("Failed to update project:", updateError);
      return NextResponse.redirect(
        new URL(`/dashboard/projects/${state}/settings?error=database_update_failed`, request.url)
      );
    }

    // Redirect back to project settings with success
    return NextResponse.redirect(
      new URL(`/dashboard/projects/${state}/settings?success=google_sheets_connected`, request.url)
    );
  } catch (error) {
    console.error("OAuth callback error:", error);
    return NextResponse.redirect(
      new URL(`/dashboard/projects/settings?error=internal_error`, request.url)
    );
  }
}