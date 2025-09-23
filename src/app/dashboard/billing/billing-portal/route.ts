import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { CustomerPortal } from '@dodopayments/nextjs';

export async function GET(request: NextRequest) {
  try {
    // Get the customer_id from query parameters
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customer_id');

    if (!customerId) {
      return NextResponse.json(
        { error: 'Missing customerId in query parameters' },
        { status: 400 }
      );
    }

    // Create Supabase client to verify user authentication
    const supabase = await createClient();
    
    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized - Please log in' },
        { status: 401 }
      );
    }

    // Verify that the customer_id belongs to the authenticated user
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('dodo_customer_id')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      );
    }

    // Check if the requested customer_id matches the user's customer_id
    interface ProfileWithDodo {
      dodo_customer_id?: string;
    }
    
    if ((profile as ProfileWithDodo).dodo_customer_id !== customerId) {
      return NextResponse.json(
        { error: 'Forbidden - You can only access your own customer portal' },
        { status: 403 }
      );
    }

    // If all security checks pass, create the customer portal
    const customerPortalHandler = CustomerPortal({
      bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
      environment: (process.env.DODO_PAYMENTS_ENVIRONMENT as "test_mode" | "live_mode") || "test_mode",
    });

    // Call the Dodo CustomerPortal handler
    return customerPortalHandler(request);

  } catch (error) {
    console.error('Customer portal error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}