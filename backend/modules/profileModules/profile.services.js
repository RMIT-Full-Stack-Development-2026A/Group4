import profileRepository from './profile.repository.js';
import accountRepository from '../authenticationModules/account.repository.js';
import bcrypt from 'bcryptjs';

//GET profile
export const createNewProfile = async () => {
    
};

export const getProfile = async (userId) => {
    // Ensuring account and profile exist
    const account = await accountRepository.findById(userId);
    const profile = await profileRepository.findProfileByUserId(userId);

    if(!account || !profile){
        throw new Error('Profile not found');
    }

    account.hashedPassword = undefined;

    return {
        account,
        profile
    };
}

//UPDATE profile
    export const updateProfile = async (userId, data) => {
        const accountUpdate = {};
        const profileUpdate = {};

        //Username
        if(data.username){
            const regex = /^[a-zA-Z0-9_]{3,30}$/;
            if(!regex.test(data.username)){
                throw new Error('Invalid username format. Must be 3-30 characters long and can only contain letters, numbers, and underscores.');
            }

            accountUpdate.username = data.username;
        }

        //Email
        if(data.email){
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!regex.test(data.email)){
                throw new Error('Invalid email format.');
            }
        }

        //Password
        if(data.password){
            const hashed = await bcrypt.hash(data.password, 10);
            accountUpdate.hashedPassword = hashed;
        }

        //Country
        if(data.country){
            profileUpdate.country = data.country;
        }

        //Apply updates
        if(Object.keys(profileUpdate).length > 0){
            await profileRepository.updateProfile(userId, profileUpdate);
        }

        return await accountRepository.updateAccount(userId, accountUpdate);
    };

    //UPLOAD avatar
    export const uploadAvatar = async(userId, filePath) => {
        const updated = await profileRepository.updateProfile(userId, {avatarUrl: filePath});

        if(!updated){
            throw new Error('Failed to upload avatar');
        }

        return updated;
    };

    //Still demand function for fetching game history, but will implement after game history module is done.