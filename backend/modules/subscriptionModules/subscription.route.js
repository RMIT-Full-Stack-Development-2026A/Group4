// Defining a subscription route
import express from 'express';
const SubscriptionRoute = express.Router();
// Importing middlewares and controllers: 
import { retrievingSubscriptionPlans } from './subscription.controller.js'
// Defining routes:
SubscriptionRoute.get('/', retrievingSubscriptionPlans);
// New entry to payment history: 

export default SubscriptionRoute;