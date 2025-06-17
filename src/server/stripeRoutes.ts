import Stripe from 'stripe';
import express from 'express';

// Helper to get the correct Stripe secret key
function getStripeSecretKey(testMode: boolean) {
  if (testMode) {
    if (!process.env.STRIPE_SK_TEST) {
      throw new Error('STRIPE_SK_TEST is not set in environment variables');
    }
    return process.env.STRIPE_SK_TEST;
  } else {
    if (!process.env.STRIPE_SK_LIVE) {
      throw new Error('STRIPE_SK_LIVE is not set in environment variables');
    }
    return process.env.STRIPE_SK_LIVE;
  }
}

const router = express.Router();

// Create Stripe Checkout session
router.post('/create-stripe-session', async (req, res) => {
  const { userId, priceId } = req.body;
  const testMode = req.query.testMode === 'true' || process.env.STRIPE_TEST_MODE === 'true';
  const stripe = new Stripe(getStripeSecretKey(testMode), { apiVersion: '2024-04-10' });
  // TODO: Lookup/create Stripe customer for userId
  // For demo, use a test customer
  const customer = await stripe.customers.create({ metadata: { userId } });
  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: `${process.env.FRONTEND_URL}/account?success=true`,
    cancel_url: `${process.env.FRONTEND_URL}/account?canceled=true`,
  });
  res.json({ url: session.url });
});

// Cancel Stripe subscription
router.post('/cancel-stripe-subscription', async (req, res) => {
  const { userId } = req.body;
  const testMode = req.query.testMode === 'true' || process.env.STRIPE_TEST_MODE === 'true';
  const stripe = new Stripe(getStripeSecretKey(testMode), { apiVersion: '2024-04-10' });
  // TODO: Lookup subscription by userId, then cancel
  // For demo, just return success
  res.json({ success: true });
});

export default router;
