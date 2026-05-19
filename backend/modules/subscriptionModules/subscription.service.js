// Importing dependencies and repository queries:
import { saveTransaction, findUserTransactions } from './subscription.repository.js';
import { transactionDTO } from './subscription.dto.js';
import { insufficientFundsError, stripeSessionError, stripePaymentError } from './subscription.error.js';
import { ProfileNotFoundError } from '../profileModules/profile.error.js';
import sendPaymentConfirmation from '../shared/emailService.js'
import stripe from '../shared/stripe.js';
import * as profileRepo from '../profileModules/profile.repository.js';
import * as accountRepo from '../accountModules/account.repository.js';

// Because there's only one premium plan, we hard-code it here
const PREMIUM_PLAN = {
    name: "Premium Membership",
    price: 10,
    features: "Custom markers, Aesthetic board styles, Match replay system",
};

const assignPremiumStatus = (profile) => {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 30); // Exactly 30 days from now
    
    profile.isPremium = true;
    profile.premiumExpiryDate = expiry;
};

export const getActivePlan = () => {
    // return the plan without priceID
    const { stripePriceId, ...plan } = PREMIUM_PLAN;
    return plan;
};

// Buying the subscription with wallet
export const buyPremiumWithWallet = async (userId) => {
    try {
        const profile = await profileRepo.findProfileByUserId(userId);

        if (!profile) throw new ProfileNotFoundError();

        // Checking the wallet balance
        if (profile.wallet_balance < PREMIUM_PLAN.price) {
            throw new insufficientFundsError();
        }

        // Update the live document
        profile.wallet_balance -= PREMIUM_PLAN.price;
        profile.isPremium = true;
        assignPremiumStatus(profile);
        await profile.save();

        // Create receipt
        const record = await saveTransaction(userId, PREMIUM_PLAN.price, 'PURCHASE', 'WALLET');
        
        // Notify user
        const account = await accountRepo.findById(userId); 
        await sendPaymentConfirmation(account.email, PREMIUM_PLAN.price);
        
        return new transactionDTO(record);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

// Depositing money into local wallet:
export const depositToWallet = async (userId, amount) => {
    try {
        const profile = await profileRepo.findProfileByUserId(userId);
        if (!profile) throw new ProfileNotFoundError();

        profile.wallet_balance += amount;
        await profile.save();
        
        const record = await saveTransaction(userId, amount, 'DEPOSIT', 'WALLET');
        return new transactionDTO(record);
    } catch (err) { 
        throw err; 
    }
};

// Stripe payment:
export const createStripeSession = async (userId, successUrl, cancelUrl) => {
    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: { 
                        name: PREMIUM_PLAN.name,
                        description: PREMIUM_PLAN.features 
                    },
                    unit_amount: PREMIUM_PLAN.price * 100,
                },
                quantity: 1,
            }],
            metadata: { userId: userId.toString() },
            success_url: successUrl,
            cancel_url: cancelUrl,
        });
        return { 
            url: session.url 
        };
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
            assignPremiumStatus(profile);
            await profile.save();

            const record = await saveTransaction(userId, amount, 'PURCHASE', 'STRIPE');

            const account = await accountRepo.findById(userId);
            await sendPaymentConfirmation(account.email, amount);

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

