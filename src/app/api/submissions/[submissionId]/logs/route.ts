import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ submissionId: string }> }
) {
  try {
    const { submissionId } = await params;

    // Verify the submission exists and get user authorization
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization required' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    
    // Verify the user token with Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid authorization' },
        { status: 401 }
      );
    }

    // Check if the submission belongs to the user's projects
    const { data: submission, error: submissionError } = await supabase
      .from('submissions')
      .select(`
        id,
        endpoints!inner(
          id,
          project_id,
          projects!inner(
            id,
            user_id
          )
        )
      `)
      .eq('id', submissionId)
      .single();

    if (submissionError || !submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    // Verify user owns the project
    const endpoint = submission.endpoints as { projects?: { user_id?: string } };
    const project = endpoint?.projects;
    const projectUserId = project?.user_id;
    
    if (projectUserId !== user.id) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    // Fetch the log file from Supabase storage
    const { data: logFile, error: storageError } = await supabase.storage
      .from('submission_logs')
      .download(`${submissionId}.html`);

    if (storageError) {
      if (storageError.message.includes('Object not found')) {
        return NextResponse.json(
          { error: 'Log file not found', message: 'No logs available for this submission' },
          { status: 404 }
        );
      }
      throw storageError;
    }

    // Return the log file content
    const logContent = await logFile.text();
    
    return new NextResponse(logContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'private, max-age=300', // Cache for 5 minutes
      },
    });

  } catch (error) {
    console.error('Error fetching submission logs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Alternative endpoint to get logs as JSON for programmatic access
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ submissionId: string }> }
) {
  try {
    const { submissionId } = await params;
    const { format } = await request.json();

    // Verify the submission exists and get user authorization
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization required' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    
    // Verify the user token with Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid authorization' },
        { status: 401 }
      );
    }

    // Check if the submission belongs to the user's projects
    const { data: submission, error: submissionError } = await supabase
      .from('submissions')
      .select(`
        id,
        endpoints!inner(
          id,
          project_id,
          projects!inner(
            id,
            user_id
          )
        )
      `)
      .eq('id', submissionId)
      .single();

    if (submissionError || !submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    // Verify user owns the project
    const endpoint = submission.endpoints as { projects?: { user_id?: string } };
    const project = endpoint?.projects;
    const projectUserId = project?.user_id;
    
    if (projectUserId !== user.id) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    // Fetch the log file from Supabase storage
    const { data: logFile, error: storageError } = await supabase.storage
      .from('submission_logs')
      .download(`${submissionId}.html`);

    if (storageError) {
      if (storageError.message.includes('Object not found')) {
        return NextResponse.json(
          { logs: [], message: 'No logs available for this submission' },
          { status: 200 }
        );
      }
      throw storageError;
    }

    if (format === 'json') {
      // Parse HTML and extract log entries as JSON
      const logContent = await logFile.text();
      
      // Simple regex-based parsing for log entries
      const logEntryRegex = /<div class="log-entry[^"]*">\s*<div class="log-header">\s*<span class="timestamp">([^<]+)<\/span>\s*<span class="level[^"]*">([^<]+)<\/span>\s*<\/div>\s*<div class="message">([^<]+)<\/div>(?:\s*<div class="data">([^<]*)<\/div>)?/g;
      
      const logs = [];
      let match;
      
      while ((match = logEntryRegex.exec(logContent)) !== null) {
        logs.push({
          timestamp: match[1].trim(),
          level: match[2].trim(),
          message: match[3].trim(),
          data: match[4] ? match[4].trim() : undefined
        });
      }

      return NextResponse.json({
        logs,
        submissionId,
        totalEntries: logs.length
      });
    }

    // Return raw HTML by default
    const logContent = await logFile.text();
    return new NextResponse(logContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'private, max-age=300',
      },
    });

  } catch (error) {
    console.error('Error fetching submission logs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}