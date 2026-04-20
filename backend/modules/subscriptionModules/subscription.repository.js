// Importing dependencies:
import Subscription from './subscription.model';
// Basic queries for subscription:
// Creating subscription:
export const createSubscription = async ( userId, paymentMethod ) => {
    return Subscription.create({
        userId,
        price: 10,
        purchasedTime: Date.now(),
        paymentMethod: paymentMethod,
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