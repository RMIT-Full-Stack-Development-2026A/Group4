// Importing httpHelder
import { httpHelper } from "../../../utils/httpHelper";
import { SUBSCRIPTION_ENDPOINTS } from "../../../config/apiConfig";

const SubscriptionService = { 
    // Depositing to local wallet
    depositLocalWallet: async (userId, amount) => {
        try {
            // Checking amount is enough:
            if (amount < 10) {throw Error()};
            // Making UTO 
            const subscriptionUTO = {
                userId,
                amount,
            }
            const response = await httpHelper.post(SUBSCRIPTION_ENDPOINTS.DEPOSIT, subscriptionUTO);
        }
        catch (err) {
            console.error(err);
        }
        
    },
    // Getting topup amounts
    getDepositAmounts: async () => {

    },
    // Purchasing with Stripe:
    purchaseWithStripe: async () => {
        
    }
 }

// Purchasing with stripe
export const purchaseWithStripe = async () => {
    try {
        const res = await fetch();
        const data = await res.json();
    }
    catch (err) {
        console.error(err);
    }
}