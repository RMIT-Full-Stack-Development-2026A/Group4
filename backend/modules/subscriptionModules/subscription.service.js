// Importing dependencies and repository queries:
import { saveTransaction, findUserTransactions } from './subscription.repository.js';
import { updatePlayerPremiumStatus, getProfile } from '../profileModules/profile.service.js';
import { transactionDTO } from './subscription.dto.js';
import { insufficientFundsError, stripeSessionError, transactionFailedError } from './subscription.error.js';
import { sendPaymentConfirmation } from '../shared/emailService.js';
import stripe from '../shared/stripe.js';

const premium_fee = 10;

// Buying the subscription with wallet
export const purchaseSubscription = async (userId) => {
    try {
        const userData = await getProfile(userId);
        const profile = userData.profile;
        const email = userData.account.email; // We need the user's email

        if (profile.wallet_balance < premium_fee) {
            throw new insufficientFundsError();
        }

        profile.wallet_balance -= premium_fee;
        await profile.save();

        const record = await saveTransaction(userId, premium_fee, 'PURCHASE', 'WALLET');
        
        await updatePlayerPremiumStatus(userId, true);

        await sendPaymentConfirmation(email, premium_fee);

        return new transactionDTO(record);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

// Depositing money into local wallet
export const depositToWallet = async ( userId, amount ) => {
    try {
        const userData = await getProfile(userId);
        const profile = userData.profile;

        profile.wallet_balance += amount;
        await profile.save();
        
        return await saveTransaction( userId, amount, 'DEPOSIT', 'WALLET', null );
    } catch (err) {
        throw err;
    }
}

// Stripe payment
export const createStripeSession = async (userId) => {
    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: { name: 'TicTacToang Premium' },
                    unit_amount: premium_fee * 100,
                },
                quantity: 1,
            }],
            metadata: { userId: userId.toString() },
            success_url: `${process.env.CLIENT_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/payment/failure`,
        });
        return { url: session.url };
    } catch (err) {
        throw new stripeSessionError();
    }
};

// View History:
export const viewHistory = async (userId) => {
    try {
        const records = await findUserTransactions(userId);
        return records.map(r => new transactionDTO(r));
    } catch (err) {
        throw err;
    }
};

// Cancelling a subscription
export const cancelSubscription = async ( userId ) => {
    try {
        // Corrected to use our existing getProfile service
        const userData = await getProfile(userId);
        // Ensure subscription is currently active:
        // Change status to cancelled:
        // Send email to user email (Requirement 5.1.2):
    }
    catch (err) {
        throw err;
    }
};