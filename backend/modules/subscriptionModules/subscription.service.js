// Importing dependencies and repository queries:
import { saveTransaction, findUserTransactions } from './subscription.repository.js';
import { transactionDTO } from './subscription.dto.js';
import { insufficientFundsError, stripeSessionError, stripePaymentError } from './subscription.error.js';
import { ProfileNotFoundError } from '../profileModules/profile.error.js';
import { sendPaymentConfirmation } from '../shared/emailService.js';
import stripe from '../shared/stripe.js';
import * as profileRepo from '../profileModules/profile.repository.js';
import * as accountRepo from '../accountModules/account.repository.js';

const premium_fee = 10;

// Buying the subscription with wallet
export const buyPremiumWithWallet = async (userId) => {
    try {
        const profile = await profileRepo.findProfileByUserId(userId);

        if (!profile) throw new ProfileNotFoundError();

        // Checking the wallet balance
        if (profile.wallet_balance < premium_fee) {
            throw new insufficientFundsError();
        }

        // Update the live document
        profile.wallet_balance -= premium_fee;
        profile.isPremium = true;
        await profile.save();

        // Create receipt
        const record = await saveTransaction(userId, premium_fee, 'PURCHASE', 'WALLET');
        
        // Notify user
        const account = await accountRepo.findById(userId); 
        await sendPaymentConfirmation(account.email, premium_fee);
        
        return new transactionDTO(record);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

// Cancelling a subscription
export const cancelSubscription = async (userId) => {
    try {
        const profile = await profileRepo.findProfileByUserId(userId);
        profile.isPremium = false;
        await profile.save();
        return { success: true, message: "Subscription cancelled." };
    } catch (err) { 
        throw err; 
    }
};

// Depositing money into local wallet:
export const depositToWallet = async (userId, amount) => {
    try {
        const profile = await profileRepo.findProfileByUserId(userId);
        if (!profile) throw new ProfileNotFoundError(); // Use formalized error

        profile.wallet_balance += amount;
        await profile.save();
        
        const record = await saveTransaction(userId, amount, 'DEPOSIT', 'WALLET');
        return new transactionDTO(record);
    } catch (err) { 
        throw err; 
    }
};

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

// Confirming the Stripe payment
export const verifyStripePayment = async (sessionId) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {
            const userId = session.metadata.userId;
            const amount = session.amount_total / 100;

            const profile = await profileRepo.findProfileByUserId(userId);
            if (!profile) throw new ProfileNotFoundError();

            profile.isPremium = true;
            await profile.save();

            const record = await saveTransaction(userId, amount, 'PURCHASE', 'STRIPE');
            return new transactionDTO(record);
        }
        throw new stripePaymentError();
    } catch (err) { throw err; }
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

