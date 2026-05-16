// Importing dependencies:
import { useState } from 'react';
import { useAuth } from '../../../context/UserContext';
import { 
    startStripeService, 
    buyWithWalletService, 
    depositService 
} from '../service/subscriptionService';

export const useSubscription = () => {
    // Auth Context:
    const { user, updateUserInfo } = useAuth();

    // States:
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Since we only have one plan, we hardcode it here instead of fetching
    const plan = {
        name: "Premium",
        price: 10,
        features: "Custom markers, Aesthetic board styles, Match replay system",
        stripePriceId: import.meta.env.VITE_STRIPE_PREMIUM_PRICE_ID 
    };

    // Functions:

    // Depositing money into local wallet
    const handleDeposit = async (amount) => {
        try {
            setLoading(true);
            setErrorMessage('');
            
            const result = await depositService(amount);
            
            // Update the user's wallet balance
            updateUserInfo({
                ...user,
                wallet_balance: result.data.amount 
            });
            
            alert(`Successfully deposited $${amount}!`);
        } catch (err) {
            setErrorMessage(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Logic for purchasing premium with wallet (Requirement 5.1.1):
    const handleWalletPurchase = async () => {
        try {
            setLoading(true);
            setErrorMessage('');
            
            await buyWithWalletService();
            
            // update premium status
            updateUserInfo({
                ...user,
                isPremium: true
            });
            
            alert("Welcome to the Premium Arena!");
        } catch (err) {
            setErrorMessage(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Logic for starting a Stripe payment (Requirement 5.2.1):
    const handleStripePurchase = async () => {
        try {
            setLoading(true);
            setErrorMessage('');
            
            const url = await startStripeService(plan.stripePriceId);
            
            // Redirect the user to Stripe's secure page
            window.location.href = url;
        } catch (err) {
            setErrorMessage(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        plan,
        loading,
        errorMessage,
        user,
        handleDeposit,
        handleWalletPurchase,
        handleStripePurchase
    };
};