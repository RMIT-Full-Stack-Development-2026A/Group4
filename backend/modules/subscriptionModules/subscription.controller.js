import * as subsService from './subscription.service.js';
import { invalidAmountError } from './subscription.error.js';

// Controller for depositing money into wallet (Requirement 5.1.1)
export const depositMoney = async (req, res, next) => {
    try {
        const { amount } = req.body;
        const userId = req.user.id;

        if (!amount || amount <= 0) {
            throw new invalidAmountError();
        }

        const transaction = await subsService.depositToWallet(userId, amount);
        
        return res.status(200).json({
            success: true,
            message: `Successfully deposited $${amount} into wallet!`,
            data: transaction
        });
    } catch (err) {
        next(err);
    }
};

// Purchasing with local wallet balance
export const purchaseSubscription = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const result = await subsService.purchaseSubscription(userId);
        
        return res.status(200).json({ 
            success: true,
            message: "Successfully purchased Premium status!", 
            data: result 
        });
    } catch (err) {
        next(err);
    }
};

// Controller for starting Stripe payment (Requirement 5.2.1)
export const createStripeSession = async (req, res, next) => {
   try { 
        const userId = req.user.id;
        const result = await subsService.createStripeSession(userId);
        
        // Sending URL back to frontend for redirection
        return res.status(200).json({ url: result.url });
    }
    catch (err) {
        next(err);
    }
};

// Controller to view history
export const getTransactionHistory = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const history = await subsService.viewHistory(userId);
        
        return res.status(200).json({
            success: true,
            data: history
        });
    } catch (err) {
        next(err);
    }
};

