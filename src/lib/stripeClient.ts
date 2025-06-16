import { supabase } from '@/integrations/supabase/client';
import { STRIPE_PRICE_ID } from '@/config/subscriptionConfig';

// Call this to create a Stripe Checkout session for the user
export async function createStripeCheckoutSession(userId: string) {
  // This should call your backend API to create a Stripe session
  // For demo, we'll just return a placeholder
  const response = await fetch('/api/create-stripe-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, priceId: STRIPE_PRICE_ID })
  });
  const data = await response.json();
  return data.url; // Stripe Checkout URL
}

// Call this to cancel a user's subscription
export async function cancelStripeSubscription(userId: string) {
  // This should call your backend API to cancel the subscription
  const response = await fetch('/api/cancel-stripe-subscription', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId })
  });
  return await response.json();
}
