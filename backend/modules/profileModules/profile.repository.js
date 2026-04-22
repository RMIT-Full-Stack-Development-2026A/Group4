
import Profile from "./profile.model";

export const createProfile = async ( profileData ) => 
    Profile.create( profileData );

export const findProfileByUserId = async (userId) => 
    Profile.findOne({ user_id: userId });

export const updateProfile = (userId, updateData) => 
    Profile.findOneAndUpdate(
        { user_id: userId },
        updateData,
        {new: true}
    );

export const deleteProfile = (userId) => 
    Profile.findOneAndDelete({user_id: userId});

//Still need to implement to fetch game history 