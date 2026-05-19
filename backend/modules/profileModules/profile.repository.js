
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
        { returnDocument: 'after' }
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

export const searchGameHistory = async (userId, query) => {
    const {keyword} = query;

    console.log("Search keyword", keyword);
    console.log("query: ",query);
    

    const filter = {
        host_id: userId
    };

    if(!keyword) {
        return await GameSession.find(filter).sort({startTime: -1});
    }  

    const searchConditions = [];

    //Search by guest_name (case-insensitive)
    searchConditions.push({
        guest_name: {$regex: keyword, $options: "i"}
    });

    //Search by session number
    if(!isNaN(keyword)) {
        searchConditions.push({
            session_num: Number(keyword)
        });
    }

    return await GameSession.find({
        $and: [
            filter,
            {$or: searchConditions}
        ]
    }).sort({startTime: -1});
}