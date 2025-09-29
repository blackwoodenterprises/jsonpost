import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { Json } from '@/lib/database.types';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ endpointId: string }> }
) {
  try {
    const { endpointId } = await params;
    const { template, data } = await request.json();

    if (!template || !data) {
      return NextResponse.json(
        { error: 'Template and data are required' },
        { status: 400 }
      );
    }

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

    // Apply the transformation template
    const transformedData = applyTransformation(template, data);

    return NextResponse.json({ transformedData });
  } catch (error) {
    console.error('Error previewing transformation:', error);
    return NextResponse.json(
      { error: 'Failed to preview transformation' },
      { status: 500 }
    );
  }
}

function applyTransformation(template: Json, data: Json): Json {
  if (typeof template !== 'object' || template === null) {
    return template;
  }

  if (Array.isArray(template)) {
    return template.map(item => applyTransformation(item, data));
  }

  const result: Record<string, Json> = {};

  for (const [key, value] of Object.entries(template)) {
    if (typeof value === 'string') {
      // Replace variables in the format {{variable.path}}
      const transformedValue = value.replace(/\{\{([^}]+)\}\}/g, (match, path) => {
        const pathValue = getNestedValue(data, path.trim());
        return pathValue !== undefined ? String(pathValue) : match;
      });
      result[key] = transformedValue;
    } else if (typeof value === 'object' && value !== null) {
      result[key] = applyTransformation(value, data);
    } else {
      result[key] = value ?? null;
    }
  }

  return result;
}

function getNestedValue(obj: Json, path: string): Json {
  return path.split('.').reduce((current: Json, key: string): Json => {
    if (current && typeof current === 'object' && current !== null && !Array.isArray(current)) {
      // Handle array indices
      if (key.includes('[') && key.includes(']')) {
        const [arrayKey, indexStr] = key.split('[');
        const index = parseInt(indexStr.replace(']', ''), 10);
        const arrayValue = current[arrayKey];
        return arrayValue && Array.isArray(arrayValue) 
          ? arrayValue[index] ?? null
          : null;
      }
      return current[key] ?? null;
    }
    return null;
  }, obj);
}