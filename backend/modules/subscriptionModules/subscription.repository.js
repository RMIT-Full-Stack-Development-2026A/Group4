// Importing dependencies: 
import Transaction from './subscription.model.js';

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

// Finding user transactions: 
export const findUserTransactions = async (userId) => {
    return Transaction.find({ user_id: userId }).sort({ createdAt: -1 }).lean();
};

// Get all transactions from user:
export const getTransactionsByUser = async (userId) => {
    return Transaction.findMany({user_id: userId});
}