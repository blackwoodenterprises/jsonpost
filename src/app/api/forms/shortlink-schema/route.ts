import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database, Json } from '@/lib/database.types';

// Create a service role client for server-side operations
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const shortCode = searchParams.get('shortCode');

    if (!shortCode) {
      return NextResponse.json(
        { error: 'shortCode parameter is required' },
        { status: 400 }
      );
    }

    // Fetch the short link with endpoint data
    const { data: shortLink, error: shortLinkError } = await supabase
      .from('short_links')
      .select(`
        endpoint_id,
        form_type,
        theme,
        endpoints!inner(
          form_json,
          path,
          project_id
        )
      `)
      .eq('short_code', shortCode)
      .single();

    if (shortLinkError || !shortLink) {
      console.error('Error fetching short link:', shortLinkError);
      return NextResponse.json(
        { error: 'Short link not found' },
        { status: 404 }
      );
    }

    const endpoint = shortLink.endpoints as { form_json: Json; path: string; project_id: string };

    if (!endpoint.form_json) {
      return NextResponse.json(
        { error: 'No form schema found for this endpoint' },
        { status: 404 }
      );
    }

    // Construct the submit endpoint URL dynamically with project_id and path
    const submitEndpoint = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/submit/${endpoint.project_id}/${endpoint.path}`;
    
    // Add the submitEndpoint to the form schema
    const formSchemaWithSubmitEndpoint = {
      ...(endpoint.form_json as Record<string, unknown>),
      submitEndpoint
    };

    // Return the complete response with form schema, form type, and theme
    return NextResponse.json({
      endpoint_id: shortLink.endpoint_id,
      form_type: shortLink.form_type,
      theme_id: shortLink.theme,
      form_schema: formSchemaWithSubmitEndpoint
    });

  } catch (error) {
    console.error('Error in shortlink-schema API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle CORS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}