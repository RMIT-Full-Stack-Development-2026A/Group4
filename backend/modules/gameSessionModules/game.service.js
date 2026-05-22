//
import { getAiInstance } from '../aiModule/ai.logic.js';
import { winningGameDto } from './game.dto.js';
import { gameNotFoundError, invalidMoveError, missingGameData, unableToMakeMoveError } from './game.error.js';
import { applyMove, checkWinner, createBoard, validateSquare } from './game.logic.js';
import * as repo from './game.repository.js';

// Starts the record in the database:
export const startGame = async (userId, gameData) => {
    const total = await repo.countTotalGames();
    let board = createBoard(gameData.boardSize);
    
    let currentPlayer = gameData.currentPlayer;
    let currentMarker = gameData.currentMarker;

    // If it's an AI game and the Bot is chosen to start
    if (gameData.gameType === 'AI' && currentPlayer === gameData.guest_name) {
        const ai = getAiInstance(gameData.guest_name);
        
        // AI makes its first move (we pass center coordinates as a hint for the first move)
        const center = Math.floor(gameData.boardSize / 2);
        const aiMove = ai.makeMove(board, { row: center, col: center }, gameData.markers[0], gameData.markers[1]);
        
        // Apply the AI's move to the board
        board = applyMove(aiMove.row, aiMove.col, board, gameData.markers[1]);
        
        // Now switch the turn back to the Human (host) before saving
        currentPlayer = gameData.host_name;
        currentMarker = gameData.markers[0];
    }

    return await repo.saveSession({
        host_id: userId,
        host_name: gameData.host_name,
        guest_name: gameData.guest_name,
        gameType: gameData.gameType,
        boardSize: gameData.boardSize,
        boardStyle: gameData.boardStyle,
        markers: gameData.markers,
        board: board,
        currentPlayer: currentPlayer,
        currentMarker: currentMarker,
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
    return await repo.updateSessionData(id, {status: "ABORTED", endTime: Date.now()});
}

// Making a move:
export const makeMove = async ( row, col, playerId, id ) => {
    // Fetching game info from repo
    const session = await repo.getGame(id);
    if (!session) throw new gameNotFoundError();

    // Checking if square is valid
    const valid = validateSquare(row, col, session.board);
    if (!valid) throw new invalidMoveError();

    // Applying the move:
    const updatedBoard = applyMove(row, col, session.board, session.currentMarker);
    if (!updatedBoard) throw new unableToMakeMoveError();
    
    // Checking if a winner exists: 
    const { winner, winningCells } = checkWinner(updatedBoard, row, col, session.currentMarker);
    if (winner) {
        // Finish game:
        await repo.updateSessionData(id, { board: updatedBoard, status: "FINISHED", winner: playerId, winningLine: winningCells, endTime: Date.now() })
        return {
            board: updatedBoard,
            status: "FINISHED",
            winner: playerId,
            winningLine: winningCells,
        }
    }

    // Check draw
    if (!updatedBoard.flat().includes(null)) {
        await repo.updateSessionData(id, { board: updatedBoard, status: "FINISHED", winner: "Draw", endTime: Date.now() });
        return { board: updatedBoard, status: "FINISHED", winner: "Draw" };
    }

    // AI GAME:
    if (session.gameType !== "MULTIPLAYER") {
        // finding the ai and making the move
        const ai = getAiInstance(session.guest_name)
        console.log(ai);
        const aiMove = ai.makeMove(updatedBoard, {row, col}, session.markers[0], session.markers[1]);
        console.log(aiMove);
        // Applying the move
        const afterAiBoard = applyMove( aiMove.row, aiMove.col, updatedBoard, session.markers[1] );

        // Checking if a winner exists
        const { winner: aiWinner, winningCells: aiWinningCells } = checkWinner(afterAiBoard, aiMove.row, aiMove.col, session.markers[1]);
        if (aiWinner) {
            await repo.updateSessionData(id, {board: afterAiBoard, status: "FINISHED", winner: session.guest_name, winningLine: aiWinningCells, endTime: Date.now()});
            return {
                board: afterAiBoard,
                status: "FINISHED",
                winner: session.guest_name,
                winningLine: aiWinningCells,
            };
        }
        
        // Updating session and switching turn
        await repo.updateSessionData(id, {board: afterAiBoard });
        return {
            board: afterAiBoard, 
            currentPlayer: session.host_name,
            currentMarker: session.markers[0],
            status: "ACTIVE",
            winner: null,
        }
    };
    
    // Multiplayer change turns: 
    const nextTurn = session.currentPlayer === session.host_name ? session.guest_name : session.host_name;
    const nextMarker = session.currentPlayer === session.host_name ? session.markers[1] : session.markers[0]
    // Update repo:
    const updated = await repo.updateSessionData(id, {board: updatedBoard, currentPlayer: nextTurn, currentMarker: nextMarker, winner: null, status: "ACTIVE"});
    return {
        board: updatedBoard,
        currentPlayer: nextTurn,
        currentMarker: nextMarker,
        status: "ACTIVE",
        winner: null,
    }
}
