// Importing dependencies and repository queries:
import { createSubscription, updateSubscription, deleteSubscription, findSubscription, findUserSubscription, returnAllSubscriptionPlans, createNewSubscriptionPlan, updateSubscriptionPlan } from './subscription.repository.js';
import { getProfile } from '../profileModules/profile.service.js';
import { subscriptionDTO } from './subscription.dto.js';
import { updatePlayerPremiumStatus } from '../profileModules/profile.service.js';
// purchasing a subscription:
export const purchaseSubscription = async ( userId, amount, paymentMethod, stripeSubId ) => {
    try {
        // Find and valiate user:
        const user = await getProfile(userId);
        if (!user) { throw new UserNotFoundError(); };
        // Ensure amount is enough:
        if ( amount !== 10 ) { throw new InvalidAmountError(); } 
        // Creating a new subscription instance:
        const subscription = await createSubscription( userId, amount, paymentMethod, stripeSubId );
        // Verify subscription is successful:
        if (!subscription) {
            throw new Error();
        }
        // 
        await updatePlayerPremiumStatus(userId, true);
    }
    catch (err) {
        console.error(err); // Consoling error
        throw err; // Throwing error
    }
};
// Cancelling a subscription:
export const cancelSubscription = async ( userId ) => {
    try {
        // Find user:
        const user = await findExistingUser(userId);
        // Ensure subscription is currently active:
        // Change status to cancelled:
        // Send email to user email:
    }
    catch (err) {
        throw err;
    }
};
export const reActivateSubscription = async ( userId ) => {
    try {
        // Finding user 
        // Ensure subscription status is cancelled.
        // Calling appropriate payment method:
        // Once sucessful, change status:
    }   
    catch (err) {
        throw err;
    }
};
// View subscription history:
export const viewSubscriptionHistory = async ( userId ) => {
    try {
       const subscriptions = await findUserSubscription(userId);
       // Turn subscription into DTO to return;
       const subscriptionDTOs = subscriptions.map((subscription)=>{
            return new subscriptionDTO(subscription);
       })
       // returning the dto:
       return subscriptionDTOs;
    }
    catch (err) {
        throw err;
    }
};

// Dealing with subscription plans:
export const addNewSubscription = async ( name, stripePriceId, price, features ) => {
    try {
        // Creating a data object
        const planInput = {
            name: name,
            StripePriceId: stripePriceId,
            price: price,
            features: features,
        }
        const newSub = await createNewSubscriptionPlan(planInput);
        if (!newSub) {
            throw new Error();
        }
        return newSub;

    }   
    catch (err) {
        throw err;
    }
};
export const deactiveSubscription = async (subscriptionPlanId) => {
    const updated = updateSubscriptionPlan(subscriptionPlanId, { isActive: false });
    if (!updated) {
        throw new Error();
    }
    return;
};
export const reactivateSubscription = async (subscriptionPlanId) => {
    const updated = updateSubscriptionPlan(subscriptionPlanId, {isActive: true});
    if (!updated) {
        throw new Error();
    }
    return;
};
export const getAllSubscriptionPlans = async () => {
    return await returnAllSubscriptionPlans();
};