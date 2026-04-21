import Account from './account.model.js';

export const findByEmail = async (email) => {
    return await Account.findOne({ email });
}

export const findByUsername = async( username ) => {
    return await Account.findOne({ username });
}

export const createUser = async (userDTO) => {
    return await Account.create({
        userDTO
    })
}
 
export const findById = async (userId) => {
    return await Account.findById(userId);
}

export const updateAccount = async (userId, updateData) => {
    return await Account.findByIdAndUpdate(
        userId,
        updateData,
        {new: true}
    );
}

export const deleteAccount = async (userId) => {
    return await Account.findByIdAndDelete(userId);
}