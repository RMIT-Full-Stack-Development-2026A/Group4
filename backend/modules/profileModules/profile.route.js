import {Router} from 'express';
import * as controller from './profile.controller.js';

import { authMiddleware } from '../shared/shared.middleware.js';

import {
    upload,
    resizeAvatar,
} from '../shared/shared.middleware.js';

import {
    validateProfileUpdate,
    validateAvatar,
} from './profile.middleware.js';

const router = Router();

//GET profile
router.get('/', authMiddleware, controller.getProfile);

//UPDATE profile
router.put('/', authMiddleware, validateProfileUpdate, controller.updateProfile);

//UPLOAD avatar
router.put('/avatar', authMiddleware, upload.single('avatar'), validateAvatar, resizeAvatar, controller.uploadAvatar);

//GAME HISTORY - To be implemented
router.get('/games', authMiddleware, controller.getGameHistory);

//GAME stats
router.get('/stats', authMiddleware, controller.getGameStats);

router.get('/games/search', authMiddleware, controller.searchGames);
export default router;
