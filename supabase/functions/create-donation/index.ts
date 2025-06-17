// Supabase Edge Function: create-donation
// This is a basic template. Add your donation logic here.
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'npm:stripe@12.6.0';

const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SK_LIVE') || Deno.env.get('STRIPE_SK_TEST');
const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2024-04-10' });

serve(async (req) => {
  try {
    const { amount, userId, currency = 'usd' } = await req.json();
    if (!amount || !userId) {
      return new Response(JSON.stringify({ error: 'Missing amount or userId' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }
    // Create a PaymentIntent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // amount in cents
      currency,
      metadata: { userId },
    });
    return new Response(JSON.stringify({ success: true, clientSecret: paymentIntent.client_secret }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Stripe error', details: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
