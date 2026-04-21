// Defining a subscription route
import express from 'express';
const SubscriptionRoute = express.Router();
// Importing middlewares and controllers: 
// Defining routes:
SubscriptionRoute.get('/', () => {
    console.log("Hello");
})
// New entry to payment history: 

export default SubscriptionRoute;