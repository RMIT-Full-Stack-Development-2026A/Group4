import bcrypt from 'bcrypt';

//Repo
import * as accountRepo from "../accountModules/account.repository.js";
import * as profileRepo from "./profile.repository.js";

//DTO
import { ProfileDTO } from "./profileDTO.js";
import { AccountDTO } from "../accountModules/accountDTO.js";


//GET profile
export const getProfile = async (userId) => {
    const account = await accountRepo.findById(userId);
    const profile = await profileRepo.findProfileByUserId(userId);

    if(!account) {
        throw new Error('Account not found');
    }

    return {
        account: new AccountDTO(account),
        profile: profile ? new ProfileDTO(profile) : null,
    }
}


//UPDATE profile
export const updateProfile = async (userId, data) => {
    const accountUpdate = {};
    const profileUpdate = {};

    //Username
    if(data.username) {
        const regex = /^[a-zA-Z0-9_-]+$/;
        if(!regex.test(data.username)) {
            throw new Error('Invalid username format');
        }

        accountUpdate.username = data.username;
    }

    //Email
    if(data.email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regex.test(data.email)) {
            throw new Error('Invalid email format');
        }

        const existingEmail = await accountRepo.findByEmail(data.email);
        if(existingEmail && existingEmail._id.toString() !== userId) {
            throw new Error('Email already in use');
        }

        accountUpdate.email = data.email;
    }

    //Password
    if(data.password){
        if (
            data.password.length < 8 ||
            !/[A-Z]/.test(data.password) ||
            !/[0-9]/.test(data.password) ||
            !/[!@#$%^&*]/.test(data.password)
        ) {
            throw new Error('Weak password');
        }

        const hashed = await bcrypt.hash(data.password, 10);
        accountUpdate.password = hashed;
    }

    //Country
    if(data.country) {
        profileUpdate.country = data.country;
    }

    //Apply updates
    if(Object.keys(accountUpdate).length > 0) {
        await accountRepo.updateAccount(userId, accountUpdate);
    }

    if(Object.keys(profileUpdate).length > 0) {
        await profileRepo.updateProfile(userId, profileUpdate);
    }

    return await getProfile(userId);
};

//UPLOAD avatar
export const uploadAvatar = async (userId, avatarUrl) => {
    const updated = await profileRepo.updateProfile(userId, {avatarUrl: filePath});

    if(!updated) {
        throw new Error('Profile not found');
    }

    return new ProfileDTO(updated);
}

//GAME implementation will be added here in the future