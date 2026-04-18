import profileRepository from './profile.repository.js';
import accountRepository from '../authenticationModules/account.repository.js';
import bcrypt from 'bcryptjs';

//GET profile
export const getProfile = async (userId) => {
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
