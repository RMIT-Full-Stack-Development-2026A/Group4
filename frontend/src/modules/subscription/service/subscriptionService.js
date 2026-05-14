import { httpHelper } from "../../../utils/httpHelper";
import { SUBSCRIPTION_ENDPOINTS } from "../../../config/apiConfig";


export const startStripeService = async (priceId) => {
    // Note: In our consolidated backend, this is '/subscription/create-checkout'
    const res = await httpHelper.post(SUBSCRIPTION_ENDPOINTS.CHECKOUT, { priceId });
    return res.data.url; // The Stripe redirect link
};

export const buyWithWalletService = async () => {
    const res = await httpHelper.post(SUBSCRIPTION_ENDPOINTS.BUY_WALLET);
    if (res.status !== 200) throw new Error(res.data.message || "Purchase failed");
    return res.data;
};