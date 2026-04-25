import {Router} from 'express';
import * as controller from './profile.controller.js';

import {authMiddleware} from '../authenticationModules/auth.middleware.js';

import {
    upload,
    resizeAvatar,
} from '../shared/shared.middleware.js';

const router = Router();

//GET profile
router.get('/', authMiddleware, controller.getProfile);

//UPDATE profile
router.put('/', authMiddleware, controller.updateProfile);

//UPLOAD avatar
router.put('/avatar', authMiddleware, upload.single('avatar'), resizeAvatar, controller.uploadAvatar);

//GAME HISTORY - To be implemented

export default router;
