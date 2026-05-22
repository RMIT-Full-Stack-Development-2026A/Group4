import * as gameService from './game.service.js';
import { gameDTO, startGameDTO, moveDTO } from './game.dto.js';

// Starts a new game record:
export const startSession = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const gameData = req.body;
        // Validate with middleware
        const session = await gameService.startGame(userId, gameData.userDTO);
        // Return status
        return res.status(201).json({
            success: true,
            data: new startGameDTO(session),
        });
    } catch (err) {
        next(err);
    }
};

export const getGameSession = async (req, res, next) => {
    try {
        // Get game ID from frontend
        const { id } = req.params
        // Fetch from backend
        const session = await gameService.getGame(id);
        return res.status(200).json({
            success: true,
            message: "Successfully fetched game info",
            data: new gameDTO(session),
        })
    } catch (err) {
        next(err);
    }
}

// Records the final result:
export const endSession = async (req, res, next) => {
    try {
        const { id } = req.params;
        const resultData = req.body;

        const updated = await gameService.finishGame(id, resultData);
        
        return res.status(200).json({
            success: true,
            data: new gameDTO(updated)
        });
    } catch (err) {
        next(err);
    }
};

// record a move in the game
export const makeMove = async (req, res, next) => {
    try {
        // When making a move: front end sends { playerId, row, col }
        const {row, col, playerId} = req.body;
        const {id} = req.params;
        // Calling service layer:
        const updated = await gameService.makeMove(row, col, playerId, id);
        console.log(updated);
        return res.status(200).json({
            success: true,
            data: new moveDTO(updated)
        })
    }  catch (err) {
        next(err);
    }
}

export const abortGame = async (req, res, next) => {
    try {
        const {id} = req.params;
        const aborted = await gameService.abortGame(id);
        return res.status(200).json({
            success: true,
            data: aborted
        })
    }
    catch (err) {
        next(err);
    }
}

