import { invalidAmountError } from './subscription.error.js';

export const validateDeposit = (req, res, next) => {
    const amount = Number(req.body.amount);
    
    // Check if it's NaN, or zero/negative
    if (!amount || isNaN(amount) || amount <= 0) {
        return next(new invalidAmountError());
    }

    req.body.amount = amount;
    next();
};