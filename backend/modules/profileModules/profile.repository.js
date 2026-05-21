
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

export const searchGameHistory = async (userId, query) => {
    const {
        keyword,
        result,
        type,
        startDate,
        endDate,
        sort
    } = query;

    console.log("Search keyword", keyword);

    const conditions = [];

    // Always filter by user
    conditions.push({
        host_id: userId
    });

    // Search
    if (keyword && keyword.trim() !== "") {
        conditions.push({
            guest_name: { $regex: keyword, $options: "i" }
        });
    }

    // Type
    if (type && type !== "ALL") {
        conditions.push({ gameType: type });
    }

    // Date
    if (startDate || endDate) {
        const dateFilter = {};

        if (startDate) dateFilter.$gte = new Date(startDate);
        if (endDate){
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
            dateFilter.$lte = end;
        } 

        conditions.push({
            startTime: dateFilter
        });
    }

    // Sort
    const sortOption =
        sort === "oldest"
            ? { startTime: 1 }
            : { startTime: -1 };

        console.log("FINAL QUERY:", JSON.stringify(conditions, null, 2));

    // Final query
    const games = await GameSession.find({
        $and: conditions
    }).sort(sortOption);


    const filteredGames = games.filter(g => {
    const playerName = g.host_name;

    if (result === "WIN") {
        return g.winner === playerName;
    }

    if (result === "LOSE") {
        return g.winner !== playerName && g.winner !== "Draw";
    }

    if (result === "DRAW") {
        return g.winner === "Draw";
    }

    if (result === "ABORTED") {
        return g.status === "ABORTED";
    }

    return true;
});

    return filteredGames;
    
};
