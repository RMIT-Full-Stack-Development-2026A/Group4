// Importing library:
import express from 'express';
const paymentRoutes = express.Router();
import stripe from '../shared/stripe.js';
// Importing dependencies:
import { paymentController, webHookController } from './payment.controller.js'

// Post for stripe:
paymentRoutes.post('/create-payment-intent', paymentController );
// Verify payment is successfuly
paymentRoutes.post('/webhook', express.raw({type: 'application/json'}), webHookController)
// Exporting: 
export default paymentRoutes;