// Defining a subscription route
import express from 'express';
const SubscriptionRoute = express.Router();
// Importing middlewares and controllers: 
import { retrievingSubscriptionPlans } from './subscription.controller.js'
// Defining routes:
SubscriptionRoute.get('/plans', retrievingSubscriptionPlans);

export default SubscriptionRoute;