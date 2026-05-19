// Importing dependencies:
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/UserContext';
import { 
    getPlanService,
    startStripeService, 
    buyWithWalletService, 
    depositService,
    verifyStripeService 
} from '../service/subscriptionService';

export const useSubscription = () => {
    const navigate = useNavigate();

    // Auth Context:
    const { user, updateUserInfo } = useAuth();

    // States and Hooks:
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    // get the premium plan detail from backend
    useEffect(() => {
        async function fetchPlan() {
            try {
                const data = await getPlanService();
                setPlan(data);
            } catch (err) {
                setErrorMessage(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPlan();
    }, []);

    // Functions:
    // Depositing money into local wallet
    const handleDeposit = async (amount) => {
        try {
            setLoading(true);
            setErrorMessage('');
            
            const result = await depositService(amount);
            const updatedBalance = user.wallet_balance + result.amount;

            // Update the user's wallet balance
            updateUserInfo({
                ...user,
                wallet_balance: updatedBalance
            });
            
            alert(`Successfully deposited $${amount}!`);
        } catch (err) {
            setErrorMessage(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Purchasing premium with wallet
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
            
            navigate('/subscription/status');
        } catch (err) {
            setErrorMessage(err.message);
            setLoading(false);
        }
    };

    // Start a purchase session with Stripe
    const startStripePurchase = async () => {
        try {
            setLoading(true);
            setErrorMessage('');
            
            const url = await startStripeService();
            
            // Redirect the user to Stripe's secure page
            window.location.href = url;
        } catch (err) {
            setErrorMessage(err.message);
            setLoading(false);
        }
    };

    // Verify the Stripe payment
    const verifyStripePayment = async (sessionId) => {
        try {
            // Send the ID to the backend
            await verifyStripeService(sessionId);
            
            // If successful, update the global state so sidebar changes instantly
            updateUserInfo({ ...user, isPremium: true });
            return true; // Signal success to the view
        } catch (err) {
            console.error("Verification failed:", err);
            return false; // Signal failure to the view
        }
    };

    return {
        plan,
        loading,
        errorMessage,
        user,
        handleDeposit,
        handleWalletPurchase,
        startStripePurchase,
        verifyStripePayment
    };
};