// Supabase Edge Function: daily-subscription-check
// This function should be scheduled to run daily. It checks all users with active subscriptions in Stripe and updates Supabase accordingly.
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'npm:stripe@12.6.0';

const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SK_LIVE') || Deno.env.get('STRIPE_SK_TEST');
const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2024-04-10' });
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

serve(async (_req) => {
  // 1. List all customers with subscriptions in Stripe
  const subscriptions = await stripe.subscriptions.list({ status: 'all', limit: 100 });
  for (const sub of subscriptions.data) {
    const userId = sub.metadata?.userId;
    if (!userId) continue;
    const subscriptionActive = sub.status === 'active';
    const subscriptionEndsAt = sub.current_period_end ? new Date(sub.current_period_end * 1000).toISOString() : null;
    // 2. Update user in Supabase
    await fetch(`${SUPABASE_URL}/rest/v1/users?id=eq.${userId}`, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({
        subscription_active: subscriptionActive,
        subscription_ends_at: subscriptionEndsAt,
      }),
    });
  }
  return new Response('ok', { status: 200 });
});
