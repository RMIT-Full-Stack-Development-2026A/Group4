// Importing dependencies: 
import { createStripeSession } from './payment.service';

// Payment controller:
export const paymentController = async ( req, res ) => {
    // Extracting price ID from request body:
   try { 
        const { priceId, userId } = req.body;
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