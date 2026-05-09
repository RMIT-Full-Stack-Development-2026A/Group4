// Importing dependencies: 
import { createStripeSession } from './payment.service.js';

// Payment controller:
export const paymentController = async ( req, res ) => {
    // Extracting price ID from request body:
   try { 
        const { userId, priceId } = req.body;
        console.log(priceId);
        if (!priceId) {
            return res.status(400).json({ message: 'Price ID is required' })
        }
        // Creating a stripe session
        const session = await createStripeSession(priceId, userId);
        // Sending URl to frontend: 
        res.status(200).json({ url: session.url });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({error: err.message})
    }
}

export const webHookController = async (req, res) => {
    const sign = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sign,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    }
    catch (err) {
        console.error(err);
    }
    if (event.type==='checkout.session.completed') {
        const session = event.data.object; // Creating session
        const userId = session.metadata.userId;
        const stripeSubId = session.subscription;
        const amount = session.amount_total/100; 
    }
    res.json({received: true});
} 