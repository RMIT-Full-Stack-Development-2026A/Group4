import { httpHelper } from "../../../utils/httpHelper";
import { SUBSCRIPTION_ENDPOINTS } from "../../../config/apiConfig";

export const getHistoryService = async () => {
    const res = await httpHelper.get(SUBSCRIPTION_ENDPOINTS.HISTORY);
    return res.data.data;
};

export const getPlanService = async () => {
    const res = await httpHelper.get(SUBSCRIPTION_ENDPOINTS.GET_PLAN);
    if (res.status !== 200) throw new Error(res.data.message || "Failed to load plan details");
    return res.data.data;
};

export const depositService = async (amount) => {
    const res = await httpHelper.post(SUBSCRIPTION_ENDPOINTS.DEPOSIT, { amount });
    if (res.status !== 200) throw new Error(res.data.message || "Deposit failed");
    return res.data.data;
};

export const buyWithWalletService = async () => {
    const res = await httpHelper.post(SUBSCRIPTION_ENDPOINTS.BUY_WALLET);
    if (res.status !== 200) throw new Error(res.data.message || "Purchase failed");
    return res.data.data;
};

export const startStripeService = async () => {

    const baseUrl = window.location.origin;
    
    const payload = {
        successUrl: `${baseUrl}/subscription/status?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${baseUrl}/subscription/status?failure=true`
    };

    const res = await httpHelper.post(SUBSCRIPTION_ENDPOINTS.CHECKOUT, payload);
    return res.data.url; 
};

export const verifyStripeService = async (sessionId) => {
    const res = await httpHelper.post(SUBSCRIPTION_ENDPOINTS.VERIFY, { sessionId });
    if (res.status !== 200) throw new Error(res.data.message || "Verification failed");
    return res.data.data;
};