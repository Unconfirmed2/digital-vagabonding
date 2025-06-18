// Configuration for subscription access
export const ALLOW_VIEW_ALL_CITIES = true; // Set to true to allow all users to view all cities
// Toggle for test mode (set via Vite env or UI)
export const STRIPE_TEST_MODE = import.meta.env.VITE_STRIPE_TEST_MODE === 'true';

// Stripe publishable keys (set via Vite env for frontend)
export const STRIPE_PUBLISHABLE_KEY_LIVE = import.meta.env.VITE_STRIPE_PK_LIVE || '';
export const STRIPE_PUBLISHABLE_KEY_TEST = import.meta.env.VITE_STRIPE_PK_TEST || '';

// Stripe test subscription link for test mode
export const STRIPE_TEST_SUBSCRIPTION_LINK = 'https://buy.stripe.com/28EfZidTfclCdqC9a07AI02';
export const STRIPE_TEST_DONATION_LINK = 'https://buy.stripe.com/test_28EfZidTfclCdqC9a07AI02';

// Stripe test subscription link for test mode
export const STRIPE_LIVE_SUBSCRIPTION_LINK = 'https://buy.stripe.com/28EfZidTfclCdqC9a07AI02';
export const STRIPE_LIVE_DONATION_LINK = 'https://buy.stripe.com/eVqeVeaH33P62LY1Hy7AI03';
// Helper to get the correct publishable key
export function getStripePublishableKey() {
  return STRIPE_TEST_MODE ? STRIPE_PUBLISHABLE_KEY_TEST : STRIPE_PUBLISHABLE_KEY_LIVE;
}
