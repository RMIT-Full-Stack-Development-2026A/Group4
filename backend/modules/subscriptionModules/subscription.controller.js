import * as subsService from './subscription.service.js';

export const getPlanDetails = (req, res) => {
    const plan = subsService.getActivePlan();
    res.status(200).json({ success: true, data: plan });
};

// Controller for depositing money into wallet
export const depositMoney = async (req, res, next) => {
    try {
        const { amount } = req.body;
        const userId = req.user.id;

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

// Purchasing with local wallet
export const buyPremiumWithWallet = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const result = await subsService.buyPremiumWithWallet(userId);
        
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
        const { successUrl, cancelUrl } = req.body; 
        
        const result = await subsService.createStripeSession(userId, successUrl, cancelUrl);
        
        return res.status(200).json({ url: result.url });
    }
    catch (err) { 
        next(err); 
    }
};

export const confirmStripePayment = async (req, res, next) => {
    try {
        const { sessionId } = req.body;
        const result = await subsService.verifyStripePayment(sessionId);

        return res.status(200).json({
            success: true,
            message: "Payment verified!",
            data: result
        });
    } catch (err) {
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

