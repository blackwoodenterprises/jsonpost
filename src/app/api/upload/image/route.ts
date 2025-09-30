import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { createClient } from '@supabase/supabase-js';

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    console.log('Upload request received');
    const formData = await request.formData();
    console.log('FormData keys:', Array.from(formData.keys()));
    
    const file = formData.get('file') as File;
    const endpointId = formData.get('endpointId') as string;
    const imageType = formData.get('imageType') as string; // 'logo' or 'cover'

    console.log('Parsed data:', { 
      file: file ? `${file.name} (${file.type}, ${file.size} bytes)` : 'null',
      endpointId,
      imageType 
    });

    if (!file) {
      console.log('Error: No file provided');
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!endpointId) {
      console.log('Error: No endpoint ID provided');
      return NextResponse.json({ error: 'No endpoint ID provided' }, { status: 400 });
    }

    if (!imageType || !['logo', 'cover'].includes(imageType)) {
      console.log('Error: Invalid image type:', imageType);
      return NextResponse.json({ error: 'Invalid image type. Must be "logo" or "cover"' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.' 
      }, { status: 400 });
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: 'File too large. Maximum size is 5MB.' 
      }, { status: 400 });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const filename = `branding/${endpointId}/${imageType}-${timestamp}.${fileExtension}`;

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: 'public',
    });

    // Update the endpoint record in the database
    const columnName = imageType === 'logo' ? 'branding_logo' : 'branding_cover';
    const { error: updateError } = await supabase
      .from('endpoints')
      .update({ [columnName]: blob.url })
      .eq('id', endpointId);

    if (updateError) {
      console.error('Database update error:', updateError);
      return NextResponse.json({ 
        error: 'Failed to update database' 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      url: blob.url,
      message: 'Image uploaded successfully' 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'Failed to upload image' 
    }, { status: 500 });
  }
}