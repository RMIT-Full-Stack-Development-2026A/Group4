// Importing dependencies:
import Subscription from './subscription.model'

// Basic queries for subscription:
// Creating subscription
export const createSubscription = async ( userId, paymentMethod ) => {
    return Subscription.create({
        userId: userId,
        price: 10,
        purchasedTime: Date.now(),
        paymentMethod: paymentMethod,
    });
}
// Deleting subscription:
export const deleteSubscription = async ( subscriptionId ) => {
    return Subscription.findByIdAndDelete({ id: subscriptionId });
}
// Updating subscription:
export const updateSubscription = async ( subscriptionId, updateInfo ) => {
    return Subscription.findByIdAndUpdate(
        { id: subscriptionId, },
        { status: updateInfo },
        {
            new: true,
            runValidators: true,
        }
    )
}
// Finding existing subscription
export const findSubscription = async ( subscriptionId ) => {
    return Subscription.findById({ id: subscriptionId })
}
// Finding a user's subscription
export const findUserSubscription = async ( userId ) => {
    return Subscription.findOne({ userId: userId });
}