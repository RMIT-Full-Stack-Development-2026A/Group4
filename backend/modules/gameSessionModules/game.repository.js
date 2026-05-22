import GameSession from './game.model.js';

export const saveSession = async (gameData) => {
    return await GameSession.create(gameData);
};

export const getGame = async (gameId) => {
    return await GameSession.findById(gameId);
}

export const getSessionById = async (id) => {
    return await GameSession.findById(id).lean();
};

export const updateSessionData = async (id, update) => {
    return await GameSession.findByIdAndUpdate(id, update, { returnDocument: 'after' });
};

export const countTotalGames = async () => {
    return await GameSession.countDocuments();
};