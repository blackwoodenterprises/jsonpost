import { Webhooks } from '@dodopayments/nextjs';
import { createClient } from '@supabase/supabase-js';

// Create a service role client for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);



export const POST = Webhooks({
  webhookKey: process.env.DODO_WEBHOOK_SECRET!,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPaymentSucceeded: async (payload: any) => {
    console.log('=== PAYMENT SUCCEEDED WEBHOOK ===');
    console.log('Webhook handler called at:', new Date().toISOString());
    console.log('Full payload:', JSON.stringify(payload, null, 2));
    console.log('Payload data:', JSON.stringify(payload.data, null, 2));
    console.log('Metadata:', JSON.stringify(payload.data.metadata, null, 2));
    console.log('User ID from metadata:', payload.data.metadata?.userId);
    
    // Handle successful payment
    if (payload.data.metadata?.userId) {
      console.log(`Processing payment success for user: ${payload.data.metadata.userId}`);
      // Additional payment processing logic can be added here
    } else {
      console.log('No userId found in payment metadata');
    }
    console.log('=== END PAYMENT SUCCEEDED WEBHOOK ===');
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubscriptionActive: async (payload: any) => {
    console.log('=== SUBSCRIPTION ACTIVE WEBHOOK ===');
    console.log('Webhook handler called at:', new Date().toISOString());
    console.log('Full payload:', JSON.stringify(payload, null, 2));
    console.log('Payload data:', JSON.stringify(payload.data, null, 2));
    console.log('Metadata:', JSON.stringify(payload.data.metadata, null, 2));
    console.log('User ID from metadata:', payload.data.metadata?.userId);
    console.log('Product ID:', payload.data.product_id);
    
    // Update user plan when subscription becomes active
    if (payload.data.metadata?.userId && payload.data.product_id) {
      console.log(`Processing subscription activation for user: ${payload.data.metadata.userId}`);
      console.log(`Product ID: ${payload.data.product_id}`);
      
      try {
        // Determine plan type based on product ID using environment variables
        const productToPlanMap: Record<string, string> = {
          [process.env.DODO_PRO_PRODUCT_ID!]: 'PRO',
          [process.env.DODO_GROWTH_PRODUCT_ID!]: 'GROWTH',
        };
        
        console.log('Product to plan mapping:', productToPlanMap);
        const planType = productToPlanMap[payload.data.product_id] || 'FREE';
        console.log(`Mapped plan type: ${planType}`);
        
        console.log(`Attempting to update user ${payload.data.metadata.userId} to plan ${planType}`);
        
        // Extract subscription data from payload
        const paymentData = payload.data;
        console.log('Subscription data for Dodo fields:', {
          subscription_id: paymentData.subscription_id,
          customer_id: paymentData.customer?.customer_id,
          status: 'active', // For subscription.active event, status is active
          next_billing_date: paymentData.next_billing_date,
          previous_billing_date: paymentData.previous_billing_date,
          cancel_at_next_billing_date: paymentData.cancel_at_next_billing_date
        });
        
        const updateData = {
          plan: planType,
          updated_at: new Date().toISOString(),
          dodo_subscription_id: paymentData.subscription_id || null,
          dodo_customer_id: paymentData.customer?.customer_id || null,
          dodo_subscription_status: 'active',
          dodo_subscription_current_period_start: paymentData.previous_billing_date ? new Date(paymentData.previous_billing_date).toISOString() : null,
          dodo_subscription_current_period_end: paymentData.next_billing_date ? new Date(paymentData.next_billing_date).toISOString() : null,
          dodo_subscription_cancel_at_period_end: paymentData.cancel_at_next_billing_date || false,
          dodo_last_payment_date: paymentData.previous_billing_date ? new Date(paymentData.previous_billing_date).toISOString() : new Date().toISOString(),
          dodo_next_payment_date: paymentData.next_billing_date ? new Date(paymentData.next_billing_date).toISOString() : null
        };
        
        console.log('Update data to be sent to Supabase:', updateData);
        
        const { data, error } = await supabase
          .from('profiles')
          .update(updateData)
          .eq('id', payload.data.metadata.userId)
          .select();
          
        console.log('Supabase update result:', { data, error });
        
        if (error) {
          console.error('❌ Error updating user plan:', error);
          console.error('Error details:', JSON.stringify(error, null, 2));
        } else {
          console.log(`✅ Successfully updated user ${payload.data.metadata.userId} to plan ${planType} with Dodo subscription data`);
          console.log('Updated data:', JSON.stringify(data, null, 2));
        }
      } catch (error) {
        console.error('❌ Exception in subscription active handler:', error);
        console.error('Exception details:', JSON.stringify(error, null, 2));
      }
    } else {
      console.log('❌ Missing required data:');
      console.log('- User ID:', payload.data.metadata?.userId);
      console.log('- Product ID:', payload.data.product_id);
    }
    console.log('=== END SUBSCRIPTION ACTIVE WEBHOOK ===');
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubscriptionCancelled: async (payload: any) => {
    console.log('=== SUBSCRIPTION CANCELLED WEBHOOK ===');
    console.log('Subscription cancelled:', payload);
    
    // Downgrade user to FREE plan and update Dodo fields when subscription is cancelled
    if (payload.data.metadata?.userId) {
      try {
        const updateData = {
          plan: 'FREE',
          updated_at: new Date().toISOString(),
          dodo_subscription_status: 'cancelled',
          dodo_subscription_cancel_at_period_end: true
        };
        
        const { error } = await supabase
          .from('profiles')
          .update(updateData)
          .eq('id', payload.data.metadata.userId);
          
        if (error) {
          console.error('Error downgrading user plan:', error);
        } else {
          console.log(`Downgraded user ${payload.data.metadata.userId} to FREE plan and updated subscription status`);
        }
      } catch (error) {
        console.error('Error processing subscription cancellation:', error);
      }
    }
    console.log('=== END SUBSCRIPTION CANCELLED WEBHOOK ===');
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubscriptionExpired: async (payload: any) => {
    console.log('=== SUBSCRIPTION EXPIRED WEBHOOK ===');
    console.log('Subscription expired:', payload);
    
    // Downgrade user to FREE plan and update Dodo fields when subscription expires
    if (payload.data.metadata?.userId) {
      try {
        const updateData = {
          plan: 'FREE',
          updated_at: new Date().toISOString(),
          dodo_subscription_status: 'expired',
          dodo_subscription_cancel_at_period_end: false
        };
        
        const { error } = await supabase
          .from('profiles')
          .update(updateData)
          .eq('id', payload.data.metadata.userId);
          
        if (error) {
          console.error('Error downgrading user plan:', error);
        } else {
          console.log(`Downgraded user ${payload.data.metadata.userId} to FREE plan due to expiration and updated subscription status`);
        }
      } catch (error) {
        console.error('Error processing subscription expiration:', error);
      }
    }
    console.log('=== END SUBSCRIPTION EXPIRED WEBHOOK ===');
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubscriptionPlanChanged: async (payload: any) => {
    console.log('=== SUBSCRIPTION PLAN CHANGED WEBHOOK ===');
    console.log('Subscription plan changed:', JSON.stringify(payload, null, 2));
    
    // Update user plan and Dodo fields when subscription plan changes
    if (payload.data.metadata?.userId && payload.data.product_id) {
      try {
        // Determine new plan type based on product ID using environment variables
        const productToPlanMap: Record<string, string> = {
          [process.env.DODO_PRO_PRODUCT_ID!]: 'PRO',
          [process.env.DODO_GROWTH_PRODUCT_ID!]: 'GROWTH',
        };
        
        const newPlanType = productToPlanMap[payload.data.product_id] || 'FREE';
        
        // Extract subscription data from payload - based on actual webhook structure
        const subscriptionData = payload.data;
        
        console.log('Extracting data from payload:');
        console.log('- subscription_id:', subscriptionData.subscription_id);
        console.log('- customer:', subscriptionData.customer);
        console.log('- status:', subscriptionData.status);
        console.log('- next_billing_date:', subscriptionData.next_billing_date);
        console.log('- previous_billing_date:', subscriptionData.previous_billing_date);
        
        const updateData = {
          plan: newPlanType,
          updated_at: new Date().toISOString(),
          dodo_subscription_id: subscriptionData.subscription_id || null,
          dodo_customer_id: subscriptionData.customer?.customer_id || null,
          dodo_subscription_status: subscriptionData.status || 'active',
          dodo_subscription_current_period_start: subscriptionData.previous_billing_date ? new Date(subscriptionData.previous_billing_date).toISOString() : null,
          dodo_subscription_current_period_end: subscriptionData.next_billing_date ? new Date(subscriptionData.next_billing_date).toISOString() : null,
          dodo_subscription_cancel_at_period_end: subscriptionData.cancel_at_next_billing_date || false,
          dodo_last_payment_date: subscriptionData.previous_billing_date ? new Date(subscriptionData.previous_billing_date).toISOString() : null,
          dodo_next_payment_date: subscriptionData.next_billing_date ? new Date(subscriptionData.next_billing_date).toISOString() : null
        };
        
        console.log('Update data to be saved:', JSON.stringify(updateData, null, 2));
        
        const { error } = await supabase
          .from('profiles')
          .update(updateData)
          .eq('id', payload.data.metadata.userId);
          
        if (error) {
          console.error('Error updating user plan:', error);
        } else {
          console.log(`Updated user ${payload.data.metadata.userId} to plan ${newPlanType} with updated subscription data`);
        }
      } catch (error) {
        console.error('Error processing subscription plan change:', error);
      }
    }
    console.log('=== END SUBSCRIPTION PLAN CHANGED WEBHOOK ===');
  },
});