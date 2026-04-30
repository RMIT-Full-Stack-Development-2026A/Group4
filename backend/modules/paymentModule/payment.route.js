// Importing library:
import express from 'express';
const paymentRoutes = express.Router();
import stripe from '../shared/stripe.js';
// Importing dependencies:
import { paymentController } from './payment.controller.js'

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
        const session = event.data.object; // Creating session
        const userId = session.metadata.userId;
        const stripeSubId = session.subscription;
        const amount = session.amount_total/100; 
    }
    res.json({received: true});
})
// Exporting: 
export default paymentRoutes;