import Stripe from 'stripe';
import express from 'express';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-04-10' });
const router = express.Router();
// Create Stripe Checkout session
router.post('/create-stripe-session', async (req, res) => {
    const { userId, priceId } = req.body;
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
    // TODO: Lookup subscription by userId, then cancel
    // For demo, just return success
    res.json({ success: true });
});
export default router;
