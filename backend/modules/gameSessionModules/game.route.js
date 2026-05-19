import { Router } from 'express';
import * as gameController from './game.controller.js'
import * as gameMiddleware from './game.middleware.js'
import { authMiddleware } from '../shared/shared.middleware.js';

const gameRouter = Router();

gameRouter.use(authMiddleware);

// Create new game instance:
gameRouter.post('/start',gameMiddleware.validCredentials ,gameController.startSession);
// Controlling the flow of the game:
gameRouter.get('/:id', gameController.getGameSession,);
gameRouter.post('/:id/move', gameController.makeMove) // Making a move
// Aborting game: 
gameRouter.post('/finish/abort/:id', gameController.abortGame) // Aborting the game
// Getting player history:
gameRouter.get('/history', gameController.getUserHistory);
// Game is done:
gameRouter.patch('/finish/:id', gameController.endSession);

export default gameRouter;