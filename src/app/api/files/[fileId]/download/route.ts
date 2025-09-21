import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  try {
    const { fileId } = await params
    const cookieStore = await cookies()

    // Create a server client to handle authentication
    const userSupabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          },
        },
      }
    )

    // Get the current user
    const { data: { user }, error: userError } = await userSupabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get file information from database
    const { data: fileRecord, error: fileError } = await supabase
      .from('file_uploads')
      .select(`
        *,
        submissions!inner(
          id,
          endpoints!inner(
            id,
            project_id,
            projects!inner(
              id,
              user_id
            )
          )
        )
      `)
      .eq('id', fileId)
      .single()

    if (fileError || !fileRecord) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    // Check if user owns the project
    const projectUserId = fileRecord.submissions.endpoints.projects.user_id
    if (projectUserId !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Get the file from Supabase Storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('form-uploads')
      .download(fileRecord.file_path)

    if (downloadError || !fileData) {
      console.error('Error downloading file:', downloadError)
      return NextResponse.json({ error: 'Failed to download file' }, { status: 500 })
    }

    // Convert blob to array buffer
    const arrayBuffer = await fileData.arrayBuffer()

    // Return the file with appropriate headers
    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': fileRecord.mime_type,
        'Content-Disposition': `attachment; filename="${fileRecord.original_filename}"`,
        'Content-Length': fileRecord.file_size_bytes.toString(),
      },
    })

  } catch (error) {
    console.error('Error in file download:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}