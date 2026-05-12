import { Router } from 'express';
import * as gameController from './game.gameController.js';
import { authMiddleware } from '../shared/shared.middleware.js';

const gameRouter = gameRouter();

gameRouter.use(authMiddleware);

gameRouter.post('/start', gameController.startSession);
gameRouter.get('/history', gameController.getUserHistory);
gameRouter.patch('/finish/:id', gameController.endSession);

export default gameRouter;