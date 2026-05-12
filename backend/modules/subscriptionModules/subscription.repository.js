import Transaction from './subscription.model.js';

// Basic queries for transactions:

// Creating a new transaction:
export const saveTransaction = async ( user_id, amount, type, method, stripeId = null ) => {
    return Transaction.create({
        user_id,
        amount,
        type,
        paymentMethod: method,
        stripeId,
        status: 'SUCCESS'
    });
};


export const findUserTransactions = async (userId) => {
    return Transaction.find({ user_id: userId }).sort({ createdAt: -1 }).lean();
};