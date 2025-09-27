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

    // Fetch the endpoint with the form_json
    const { data: endpoint, error } = await supabase
      .from('endpoints')
      .select('form_json, theme_id')
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

    // Return the form JSON as-is
    return NextResponse.json(endpoint.form_json, {
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