//
import { gameNotFoundError, invalidMoveError, missingGameData, unableToMakeMoveError } from './game.error.js';
import { applyMove, checkWinner, createBoard, validateSquare } from './game.logic.js';
import * as repo from './game.repository.js';

// Starts the record in the database:
export const startGame = async (userId, gameData) => {
    const total = await repo.countTotalGames();
    return await repo.saveSession({
        host_id: userId,
        host_name: gameData.host_name,
        guest_name: gameData.guest_name,
        gameType: gameData.gameType,
        boardSize: gameData.boardSize,
        markers: gameData.markers,
        board: createBoard(gameData.boardSize),
        currentPlayer: gameData.currentPlayer,
        currentMarker: gameData.currentMarker,
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
 
// Finalizes the record:
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

export const abortGame = async (id) => {
    return await repo.updateSessionData(id, {status: "ABORTED"});
}

// Fetching history for the profile page:
export const getPlayerHistory = async (userId) => {
    return await repo.getHistoryByUser(userId);
};

// Making a move:
export const makeMove = async ( row, col, playerId, id ) => {
    // Fetching game info from repo
    const session = await repo.getGame(id);
    if (!session) throw new gameNotFoundError();
    // Checking if square is valid
    const valid = validateSquare(row, col, session.board);
    if (!valid) throw new invalidMoveError();
    // Applying the move
    const updatedBoard = applyMove(row, col, session.board, session.currentMarker);
    if (!updatedBoard) throw new unableToMakeMoveError();
    const hasWinner = checkWinner(updatedBoard, row, col, session.currentMarker);
    if (hasWinner) {
        // Finish game:
        await repo.updateSessionData(id, { board: updatedBoard, status: "FINISHED", winner: playerId })
        return {
            board: updatedBoard,
            status: "FINISHED",
            winner: playerId,
        };
    }
    // Getting next turn and next marker
    const nextTurn = session.currentPlayer === session.host_name ? session.guest_name : session.host_name;
    const nextMarker = session.currentPlayer === session.host_name ? session.markers[1] : session.markers[0]
    // Update repo
    const updated = await repo.updateSessionData(id, {board: updatedBoard, currentPlayer: nextTurn, currentMarker: nextMarker, winner: null, status: "ACTIVE"});
    return updated;
}
