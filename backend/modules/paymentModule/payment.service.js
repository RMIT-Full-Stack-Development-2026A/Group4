import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createStripeSession = async (priceId, userId) => {
    try {
        // Creating a stripe session
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {  
                    price: priceId,
                    quantity: 1,
                }
            ],
            metadata: userId,
            success_url: 'http://localhost:3000/payment/success.html',
            cancel_url:'http://localhost:3000/payment/success.html',
        })
        return {url: session.url};
    }
    catch (err) {
        throw new Error("Error creating stripe session");
    }
}