
import Profile from "./profile.model.js";
import GameSession from "../gameSessionModules/game.model.js";

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
export const getGameHistoryByUser = async (userId) => {
    return await GameSession.find({
        $or: [
            {host_id: userId},
            {guest_id: userId}
        ]
    }).sort({startTime: -1});
}