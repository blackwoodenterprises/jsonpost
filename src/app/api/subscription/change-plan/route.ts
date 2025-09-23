import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { PLANS, type PlanType } from '@/lib/plans';
import { Database } from '@/lib/database.types';

export async function POST(request: NextRequest) {
  try {
    // Create Supabase client to verify user authentication
    const supabase = await createClient();
    
    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { newPlanType }: { newPlanType: PlanType } = await request.json();
    
    if (!newPlanType || !PLANS[newPlanType]) {
      return NextResponse.json({ error: 'Invalid plan type' }, { status: 400 });
    }

    // Get user's current subscription from profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('dodo_customer_id, dodo_subscription_id, plan')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Type assertion for profile with Dodo fields
    const userProfile = profile as {
      dodo_customer_id: string | null;
      dodo_subscription_id: string | null;
      plan: string;
    };

    if (!userProfile.dodo_customer_id || !userProfile.dodo_subscription_id) {
      return NextResponse.json({ error: 'No active subscription found' }, { status: 400 });
    }

    const newPlan = PLANS[newPlanType as keyof typeof PLANS];
    
    // Determine the correct API base URL based on environment
    const environment = (process.env.DODO_PAYMENTS_ENVIRONMENT as "test_mode" | "live_mode") || "test_mode";
    const baseUrl = environment === "live_mode" 
      ? "https://live.dodopayments.com" 
      : "https://test.dodopayments.com";
    
    // Call Dodo's Change Plan API with subscription ID in URL
    const response = await fetch(`${baseUrl}/subscriptions/${userProfile.dodo_subscription_id}/change-plan`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.DODO_PAYMENTS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: newPlan.dodoProductId,
        proration_billing_mode: 'prorated_immediately',
        quantity: 1,
      }),
    });

    console.log('=== DODO API RESPONSE DEBUG ===');
    console.log('Response status:', response.status);
    console.log('Response statusText:', response.statusText);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    // Clone response to read it multiple times
    const responseClone = response.clone();
    const responseText = await responseClone.text();
    console.log('Raw Dodo API response text:', responseText);

    if (!response.ok) {
      console.log('Dodo API response not OK, parsing error...');
      let errorData;
      try {
        errorData = await response.json();
        console.log('Parsed Dodo API error data:', errorData);
      } catch {
        // If response is not JSON, get text instead
        const errorText = await response.text();
        errorData = { message: errorText || 'Unknown error' };
        console.log('Dodo API error as text:', errorData);
      }
      console.error('Dodo API error:', errorData);
      console.log('=== END DODO API RESPONSE DEBUG ===');
      return NextResponse.json(
        { error: 'Failed to change subscription plan' },
        { status: response.status }
      );
    }

    console.log('Dodo API response OK, parsing success response...');
    let result;
    
    // Check if response has content
    if (responseText.trim() === '') {
      console.log('Dodo API returned empty response body - treating as success');
      result = { success: true }; // Default success object for empty responses
      console.log('Using default success result for empty response');
      console.log('=== END DODO API RESPONSE DEBUG ===');
    } else {
      try {
        result = await response.json();
        console.log('Parsed Dodo API success result:', JSON.stringify(result, null, 2));
        console.log('=== END DODO API RESPONSE DEBUG ===');
      } catch (e) {
        console.error('Failed to parse Dodo API success response as JSON:', e);
        console.log('Raw Dodo API success response:', responseText);
        console.log('=== END DODO API RESPONSE DEBUG ===');
        return NextResponse.json(
          { error: 'Invalid response from payment provider' },
          { status: 500 }
        );
      }
    }

    // Update user profile with new plan
    interface DodoApiResponse {
      subscription_id?: string;
      success?: boolean;
    }
    
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        plan: newPlanType as Database['public']['Enums']['plan_type'],
        dodo_subscription_id: (result as DodoApiResponse).subscription_id || userProfile.dodo_subscription_id,
      })
      .eq('id', user.id);

    if (updateError) {
      console.error('Error updating user profile:', updateError);
      return NextResponse.json(
        { error: 'Failed to update user profile' },
        { status: 500 }
      );
    }

    console.log('Updated user profile successfully');

    const successResponse = {
      success: true,
      message: 'Subscription plan changed successfully',
      subscription_id: result.subscription_id,
    };
    
    console.log('=== API SUCCESS RESPONSE ===');
    console.log('Sending response:', JSON.stringify(successResponse, null, 2));
    console.log('=== END API SUCCESS RESPONSE ===');

    return NextResponse.json(successResponse);

  } catch (error) {
    console.error('=== API ERROR RESPONSE ===');
    console.error('Error changing subscription plan:', error);
    
    const errorResponse = { error: 'Internal server error' };
    console.error('Sending error response:', JSON.stringify(errorResponse, null, 2));
    console.error('=== END API ERROR RESPONSE ===');
    
    return NextResponse.json(errorResponse, { status: 500 });
  }
}