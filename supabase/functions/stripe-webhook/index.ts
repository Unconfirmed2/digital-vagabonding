// Supabase Edge Function: stripe-webhook
// Listens for Stripe subscription events and updates user subscription status in Supabase
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'npm:stripe@12.6.0';

const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SK_LIVE') || Deno.env.get('STRIPE_SK_TEST');
const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2024-04-10' });
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

serve(async (req) => {
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
  let event;
  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Only handle relevant events
  if (
    event.type === 'checkout.session.completed' ||
    event.type === 'invoice.paid' ||
    event.type === 'customer.subscription.updated' ||
    event.type === 'customer.subscription.deleted'
  ) {
    let userId;
    let subscriptionEndsAt = null;
    let subscriptionActive = false;
    if (event.type === 'checkout.session.completed') {
      userId = event.data.object.metadata?.userId;
      subscriptionActive = true;
    } else if (event.type.startsWith('customer.subscription')) {
      userId = event.data.object.metadata?.userId;
      subscriptionActive = event.data.object.status === 'active';
      if (event.data.object.current_period_end) {
        subscriptionEndsAt = new Date(event.data.object.current_period_end * 1000).toISOString();
      }
    } else if (event.type === 'invoice.paid') {
      userId = event.data.object.lines.data[0]?.metadata?.userId;
      subscriptionActive = true;
    }
    if (userId) {
      // Update user in Supabase
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
  }
  return new Response('ok', { status: 200 });
});
