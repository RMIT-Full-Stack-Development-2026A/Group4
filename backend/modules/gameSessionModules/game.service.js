//
import { gameNotFoundError, missingGameData } from './game.error.js';
import * as repo from './game.repository.js';

// Starts the record in the database
export const startGame = async (userId, gameData) => {
    const total = await repo.countTotalGames();
    return await repo.saveSession({
        host_id: userId,
        host_name: gameData.host_name,
        guest_name: gameData.guest_name,
        gameType: gameData.gameType,
        boardSize: gameData.boardSize,
        markers: gameData.markers,
        session_num: total + 1,
    });
};

// Fetching game based on gameId:
export const getGame = async (gameId) => {
    const session = await repo.getGame(gameId);
    if (!session) {
        throw new gameNotFoundError();
    }
    return session;
}
 
// Finalizes the record
export const finishGame = async (gameId, resultData) => {
    const result = {
        status: resultData.status, // 'FINISHED' or 'ABORTED'
        endTime: Date.now()
    };

    // Only record winner/line if the game was actually completed
    if (resultData.status === 'FINISHED') {
        result.winner = resultData.winner;
        result.winningLine = resultData.winningLine;
    }

    return await repo.updateSessionData(gameId, result);
};

// Fetching history for the profile page
export const getPlayerHistory = async (userId) => {
    return await repo.getHistoryByUser(userId);
};
