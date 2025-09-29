import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ endpointId: string }> }
) {
  try {
    const { endpointId } = await params;

    // Validate that the endpoint exists
    const { data: endpoint, error: endpointError } = await supabase
      .from('endpoints')
      .select('id')
      .eq('id', endpointId)
      .single();

    if (endpointError || !endpoint) {
      return NextResponse.json(
        { error: 'Endpoint not found' },
        { status: 404 }
      );
    }

    // Fetch the latest submission for this endpoint
    const { data: submission, error: submissionError } = await supabase
      .from('submissions')
      .select('id, data, created_at')
      .eq('endpoint_id', endpointId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (submissionError) {
      if (submissionError.code === 'PGRST116') {
        // No submissions found
        return NextResponse.json({ submission: null });
      }
      throw submissionError;
    }

    return NextResponse.json({ submission });
  } catch (error) {
    console.error('Error fetching latest submission:', error);
    return NextResponse.json(
      { error: 'Failed to fetch latest submission' },
      { status: 500 }
    );
  }
}