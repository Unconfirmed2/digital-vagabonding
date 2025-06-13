
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount = 500, currency = 'usd' } = await req.json();

    // Initialize Stripe with the Live Secret Key
    const stripe = new Stripe(Deno.env.get("Live Secret Key") || "", {
      apiVersion: "2023-10-16",
    });

    // Create a one-time payment session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: { 
              name: "Support Digital Vagabonding",
              description: "Help us maintain and grow the largest collection of travel groups worldwide"
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/donation-success`,
      cancel_url: `${req.headers.get("origin")}/`,
      metadata: {
        purpose: "donation",
        project: "digital-vagabonding"
      }
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Donation error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
