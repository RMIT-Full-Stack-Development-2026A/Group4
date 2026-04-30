// Importing appropriate services:
import { purchaseSubscription, cancelSubscription, reActivateSubscription, getAllSubscriptionPlans } from './subscription.service.js'

// Getting existing subscription:
export const retrievingSubscriptionPlans = async (req, res, next) => {
    const subscriptionplans = await getAllSubscriptionPlans();
    if (!subscriptionplans) {
        return res.status(401).json({
            message: 'failed!'
        })
    }
    return res.status().json({
        subscriptions: subscriptionplans,
        message: 'Successfully retrieved subscriptions!',
    })
};



