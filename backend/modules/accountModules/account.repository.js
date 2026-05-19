import Account from './account.model.js';

export const findByEmail = async (email) => {
    return await Account.findOne({ email });
};

export const findByUsername = async (username) => {
    return await Account.findOne({ username });
};

export const findById = async (userId) => {
    return await Account.findById(userId);
};

export const createAccount = async (accountData) => {
    return await Account.create(accountData);
};

export const updateAccount = async (userId, updateData) => {
    return await Account.findByIdAndUpdate(userId, updateData, { returnDocument: 'after' });
};

export const updateLoginAttempts = async (userId, attempts, lockTime) => {
    return await Account.findByIdAndUpdate(userId, { 
        failedAttempts: attempts, 
        lockUntil: lockTime 
    }, { returnDocument: 'after' });
};