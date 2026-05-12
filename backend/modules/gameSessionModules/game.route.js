import { Router } from "express";
import { authMiddleware } from "../accountModules/account.middleware.js";

import * as gameConTroller from './game.controller.js'

const router = Router();

router.use(authMiddleware);

//start game
router.post('/start', gameConTroller.startGame);

//play move
router.put('/:id/move', gameConTroller.playMove);

//get history
router.get('/history', gameConTroller.getHistory);

export default router;