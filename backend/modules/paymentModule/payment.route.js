// Importing library:
import express from 'express';
const paymentRoutes = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// Importing dependencies:
import { paymentController } from './payment.controller'

// Post for stripe:
paymentRoutes.post('/create-payment-intent', paymentController );
// Verify payment is successfuly
paymentRoutes.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
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
        const session = event.data.object;
        const playerId = session.metadata.playerId;
        console.log(`Payment successful for player: ${playerId}`);
    }
    res.json({received: true});
})
// Exporting: 
export default paymentRoutes;