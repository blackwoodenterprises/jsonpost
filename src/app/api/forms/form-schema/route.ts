import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create a service role client for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const uuid = searchParams.get('uuid');

    if (!uuid) {
      return NextResponse.json(
        { error: 'UUID parameter is required' },
        { status: 400 }
      );
    }

    // Fetch the endpoint with the form_json, path, project_id, and branding fields
    const { data: endpoint, error } = await supabase
      .from('endpoints')
      .select('form_json, theme_id, path, project_id, branding_logo, branding_cover, jsonpost_branding, redirect_url')
      .eq('id', uuid)
      .single();

    if (error) {
      console.error('Error fetching endpoint:', error);
      return NextResponse.json(
        { error: 'Endpoint not found' },
        { status: 404 }
      );
    }

    if (!endpoint.form_json) {
      return NextResponse.json(
        { error: 'No form schema found for this endpoint' },
        { status: 404 }
      );
    }

    // Construct the submit endpoint URL dynamically with project_id and path
    const submitEndpoint = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/submit/${endpoint.project_id}/${endpoint.path}`;
    
    // Add the submitEndpoint and branding fields to the form schema
    const formSchemaWithSubmitEndpoint = {
      ...endpoint.form_json,
      submitEndpoint,
      branding_logo: endpoint.branding_logo,
      branding_cover: endpoint.branding_cover,
      jsonpost_branding: endpoint.jsonpost_branding ?? true,
      redirect_url: endpoint.redirect_url
    };

    // Return the form JSON with the dynamic submit endpoint
    return NextResponse.json(formSchemaWithSubmitEndpoint, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error in form-schema API:', error);
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
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}