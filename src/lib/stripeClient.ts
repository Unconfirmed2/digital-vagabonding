import { getStripePublishableKey, STRIPE_TEST_MODE } from '@/config/subscriptionConfig';

// NOTE: Stripe keys are managed via environment variables on the backend (see server/stripeRoutes.ts)

// Utility to get Stripe publishable key for frontend Stripe.js usage
export { getStripePublishableKey };

// Call this to create a Stripe Checkout session for the user
export async function createStripeCheckoutSession(userId: string, testMode: boolean = STRIPE_TEST_MODE) {
  const response = await fetch(`/api/create-stripe-session?testMode=${testMode}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, priceId: STRIPE_PRICE_ID })
  });
  const data = await response.json();
  return data.url; // Stripe Checkout URL
}

// Call this to cancel a user's subscription
export async function cancelStripeSubscription(userId: string, testMode: boolean = STRIPE_TEST_MODE) {
  const response = await fetch(`/api/cancel-stripe-subscription?testMode=${testMode}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId })
  });
  return await response.json();
}
