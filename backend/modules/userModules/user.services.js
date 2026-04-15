import bcrypt, { hash } from 'bcrypt';
import * as userRepository from './user.repository.js';

// Basic queries: 
export const createNewUser = async({
    userName,
    email,
    password,
    country
} ) => {
    //Username validation
    const userNameRegex = /^[a-zA-Z0-9_-]+$/;
    if(!userNameRegex.test(userName)){
        throw new Error('User name can only contain letters, numbers, underscores, and hyphens.');
    }
    
    //Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailRegex.test(email)){
        throw new Error('Invalid email format.');
    }

    //Password validation
    if(password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[0-9]/.test(password) ||
    !/[!@#$%^&*(),.?":{}|<>]/.test(password)){
        throw new Error('Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.');
    }

    //Check duplicate email
    const existingEmail = await userRepository.findUserBasedOnEmail(email);
    if(existingEmail){
        throw new Error('Email already exists.');
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Save to DB
    const newUser = await userRepository.createUser({
        userName,
        email,
        hashedPassword,
        country,
    });

    return newUser;
};


//UPDATE user info
export const updateUserInfo = async(userId, updateData) => {
    const updateData = {};
    
    //Username
    if(updateData.userName){
        const userNameRegex = /^[a-zA-Z0-9_-]+$/;
        if(!userNameRegex.test(updateData.userName)){
            throw new Error('User name can only contain letters, numbers, underscores, and hyphens.');
        }

    //Email
    if(updateData.email){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(updateData.email)){
            throw new Error('Invalid email format.');
        }

        const existingEmail = await userRepository.findUserBasedOnEmail(updateData.email);
        if(existingEmail && existing)
    }
};

//GET user info
export const getUserInfo = async (userId) => {
    const user = await userRepository.findUserBasedOnId(userId);

    if(!user){
        throw new Error('User not found.');
    }

    //remove password before returning
    user.hashedPassword = undefined;

    return user;
};
export const deactivateUser = () => {

};
export const reActivateUser = () => {

}