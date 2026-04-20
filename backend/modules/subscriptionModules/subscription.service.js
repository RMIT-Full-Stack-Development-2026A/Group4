// Importing dependencies and repository queries:
import { createSubscription, updateSubscription, deleteSubscription, findSubscription, findUserSubscription } from './subscription.repository';
import { findExistingUser } from '../userModules/user.services';
import { subscriptionDTO } from './subscription.dto';
// Cancelling subscription:
export const purchaseSubscription = async ( userId, amount, paymentMethod ) => {
    try {
        // Find and valiate user:
        const user = await findExistingUser(userId);
        if (!user) { throw new UserNotFoundError(); };
        // Ensure amount is enough:
        if ( amount !== 10 ) { throw new InvalidAmountError(); } 
        // Calling appropriate payment services depending on payment method:
        // Changing player's premium status to fit
        // Creating a new instance of subscription 
    }
    catch (err) {
        throw err;
    }
}
// Managing subscription status:
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
}