import { useState } from 'react';
import { useAuth } from '../../../context/UserContext';
import { startStripeService, buyWithWalletService } from '../service/subscriptionService';

const useSubscription = () => {
    // Auth Context:
    const { updateUserInfo } = useAuth();

    // States:
    const [loading, setLoading] = useState(false);

    // Since we only have one plan, we hardcode it here instead of fetching
    const plan = {
        name: "Premium Pass",
        price: 10,
        features: ["Custom Markers", "Board Styles", "Match Replays"],
        stripePriceId: import.meta.env.VITE_STRIPE_PREMIUM_PRICE_ID
    };

    // Functions:

    // Logic for Stripe Payment:
    const handleStripePurchase = async () => {
        try {
            setLoading(true);
            const url = await startStripeService(plan.stripePriceId);
            window.location.href = url;
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Logic for Wallet Payment:
    const handleWalletPurchase = async () => {
        try {
            setLoading(true);
            await buyWithWalletService();
            alert("Success! Welcome to the Premium Arena.");
            updateUserInfo({ ...user, isPremium: true });
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { plan, loading, user, handleStripePurchase, handleWalletPurchase };
};

export default useSubscription