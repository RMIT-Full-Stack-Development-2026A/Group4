
//Repo
import * as accountRepo from "../accountModules/account.repository.js";
import * as profileRepo from "./profile.repository.js";

//DTO
import { ProfileDTO } from "./profileDTO.js";
import {AccountDTO} from "../accountModules/account.dto.js";

//Error
import {
    ProfileNotFoundError,
    AccountNotFoundError,
    DuplicateEmailError,
} from "./profile.error.js";

import { errorCreatingNewUser } from '../accountModules/account.error.js';
import { gameDTO } from '../gameSessionModules/game.dto.js';

// Creating new profile: 
export const createNewProfile = async ( accountId, country ) => {
    const profileInput = {
        user_id: accountId,
        country: country,
    }
    const profile = await profileRepo.createProfile(profileInput);
    if (!profile) {
        throw new errorCreatingNewUser();
    }
    return profile;
};

//GET profile
export const getProfile = async (userId) => {
    const account = await accountRepo.findById(userId);
    const profile = await profileRepo.findProfileByUserId(userId);

    if(!account) {
        throw new AccountNotFoundError();
    }
    if(!profile) {
        throw new ProfileNotFoundError();
    }

    return {
        account: new AccountDTO(account),
        profile: profile ? new ProfileDTO(profile) : null,
    }
}


//UPDATE profile
export const updateProfile = async (userId, data) => {
    const account = await accountRepo.findById(userId);

    if(!account) {
        throw new AccountNotFoundError();
    }

    const accountUpdate = {};
    const profileUpdate = {};

    //Username
    if(data.username) {
        const regex = /^[a-zA-Z0-9_-]+$/;
        if(!regex.test(data.username)) {
            throw new InvalidUsernameError();
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
            throw new DuplicateEmailError();
        }

        accountUpdate.email = data.email;
    }

    //Country
    if(data.country) {
        profileUpdate.country = data.country;
        accountUpdate.country = data.country;
    }

    //Apply updates
    if(Object.keys(accountUpdate).length > 0) {
        await accountRepo.updateAccount(userId, accountUpdate);
    }

    if(Object.keys(profileUpdate).length > 0) {
        const profile = await profileRepo.findProfileByUserId(userId);

        if(!profile){
            throw new ProfileNotFoundError();
        }
        await profileRepo.updateProfile(profile.user_id, profileUpdate);
    }

    return await getProfile(userId);
};

// Changing player premium status:
export const updatePlayerPremiumStatus = async (userId, newStatus) => {
    const updatedStatus = await profileRepo.updateProfile(userId, {isPremium: newStatus});
    if (!updatedStatus) {
        throw new ProfileNotFoundError();
    }
    return ProfileDTO(updated);
}

//UPLOAD avatar
export const uploadAvatar = async (userId, avatarUrl) => {
    const updated = await profileRepo.updateProfile(userId, {avatarUrl});

    if(!updated) {
        throw new ProfileNotFoundError();
    }

    return await getProfile(userId);
}

export const searchGameHistory = async (userId, query) => {
    const profile = await profileRepo.findProfileByUserId(userId);

    console.log("Service: ", query);
    
    if(!profile) {
        throw new ProfileNotFoundError();
    }

    const games = await profileRepo.searchGameHistory(userId, query);
    return games.map(game => new gameDTO(game));
};
