import * as gameService from './game.service.js';
import { gameDTO, startGameDTO } from './game.dto.js';

// Starts a new game record:
export const startSession = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const gameData = req.body;
        // Validate with middleware
        const session = await gameService.startGame(userId, gameData);
    
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

// Gets history for the current user:
export const getUserHistory = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const history = await gameService.getPlayerHistory(userId);
        
        // Map everything to DTOs for a clean response
        return res.status(200).json({
            success: true,
            data: history.map(game => new gameDTO(game))
        });
    } catch (err) {
        next(err);
    }
};

// Creating a new game
export const initializeSession = async (req, res, next) => {
    
}   