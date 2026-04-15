
import User from "./user.model";

export const createUser = async (userData) => {
    return await User.create(userData);
};

export const findUserBasedOnId = async (userId) => {
    return await User.findById(userId);
};

export const findUserBasedOnEmail = async(email) => {
    return await User.findOne({email});
};

export const deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
};
export const updateUser = async(userId, updateData) => {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
}