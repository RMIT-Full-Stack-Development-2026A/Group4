import GameSession from './game.model.js';

export const saveSession = async (gameData) => {
    return await GameSession.create(gameData);
};

export const getSessionById = async (id) => {
    return await GameSession.findById(id).lean();
};

export const updateSessionData = async (id, update) => {
    return await GameSession.findByIdAndUpdate(id, update, { new: true });
};

export const getHistoryByUser = async (userId) => {
    return await GameSession.find({
        $or: [{ host_id: userId }, { guest_id: userId }]
    }).sort({ startTime: -1 }).lean();
};

export const countTotalGames = async () => {
    return await GameSession.countDocuments();
};