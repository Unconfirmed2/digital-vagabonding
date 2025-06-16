import Stripe from 'stripe';
import express from 'express';
import { createClient } from '@supabase/supabase-js';

// Setup Supabase client for server-side usage
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const router = express.Router();

// Helper to get Stripe instance based on testMode
async function getStripeInstance(testMode = false) {
  const keyName = testMode ? 'stripe_test' : 'Stripe1';
  const { data, error } = await supabase
    .from('secrets')
    .select('value')
    .eq('key', keyName)
    .single();
  if (error || !data) throw new Error(`Could not fetch Stripe key for ${keyName}`);
  return new Stripe(data.value, { apiVersion: '2024-04-10' });
}

// Create Stripe Checkout session
router.post('/create-stripe-session', async (req, res) => {
  const { userId, priceId } = req.body;
  const testMode = req.query.testMode === 'true';
  try {
    const stripe = await getStripeInstance(testMode);
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cancel Stripe subscription
router.post('/cancel-stripe-subscription', async (req, res) => {
    const { userId } = req.body;
    // TODO: Lookup subscription by userId, then cancel
    // For demo, just return success
    res.json({ success: true });
});

export default router;
