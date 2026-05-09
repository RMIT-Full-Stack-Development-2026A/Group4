// Importing dependencies:
import Subscription, { SubscriptionPlan } from './subscription.model.js';
// Basic queries for subscription:
// Creating subscription:
export const createSubscription = async ( userId, price, paymentMethod, stripeId ) => {
    return Subscription.create({
        userId,
        price: price,
        purchasedTime: Date.now(),
        paymentMethod: paymentMethod,
        stripeSubscriptionId: stripeId,
    });
};
// Deleting subscription:
export const deleteSubscription = async ( subscriptionId ) => {
    Subscription.findByIdAndDelete(subscriptionId);
};
// Updating subscription:
export const updateSubscription = async ( subscriptionId, updateInfo ) => {
    return Subscription.findByIdAndUpdate(
        subscriptionId,
        updateInfo,
        { new: true, runValidators: true}
    );
};
// Updating subscription status:
export const updateSubscriptionStatus = async ( subscriptionId, newSubscriptionStatus ) => {
    return Subscription.findByIdAndUpdate(
        subscriptionId,
        newSubscriptionStatus,
        { new: true, runValidators: true },
    );
};
// Finding existing subscription: 
export const findSubscription = async ( subscriptionId ) => {
    return Subscription.findById( subscriptionId ).lean();
};
// Finding a user's subscription:
export const findUserSubscription = async ( userId ) => {
    return Subscription.findOne({ userId }).lean();
};

// Dealing with subscription plans
export const createNewSubscriptionPlan = async (planInput) => {
    return SubscriptionPlan.create({planInput});
};
export const deleteSubscriptionPlan = async (subscriptionPlanId) => {
    return SubscriptionPlan.findByIdAndDelete(subscriptionPlanId);
};
export const findSubscriptionPlan = async () => {
    return SubscriptionPlan.findById(subscriptionPlanId);
};
export const returnAllSubscriptionPlans = async () => {
    return SubscriptionPlan.find();
}
export const updateSubscriptionPlan = async (subscriptionPlanId, updateData) => {
    return SubscriptionPlan.findByIdAndUpdate(subscriptionPlanId, updateData, {new: true, runValidators: true});
}