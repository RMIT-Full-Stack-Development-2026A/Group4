import { invalidAmountError } from './subscription.error.js';

export const validateDeposit = (req, res, next) => {
    const { amount } = req.body;
    
    // Amount must be a positive number
    if (!amount || typeof amount !== 'number' || amount <= 0) {
        return next(new invalidAmountError());
    }
    next();
};