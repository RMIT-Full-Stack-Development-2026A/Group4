import * as gameService from './game.service.js';
import { gameDTO } from './game.dto.js';

// Starts a new game record:
export const startSession = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const gameData = req.body;

        const session = await gameService.startGame(userId, gameData);
        
        return res.status(201).json({
            success: true,
            data: new gameDTO(session)
        });
    } catch (err) {
        next(err);
    }
};

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