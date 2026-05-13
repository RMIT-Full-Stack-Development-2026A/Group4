import { Router } from 'express';
import { register, login, logout, me } from './account.controller.js';
import { isEmailValid, isPasswordStrong, isUsernameValid } from './account.middleware.js';
import { authMiddleware } from './account.middleware.js';
import jwt from 'jsonwebtoken'
const router = Router();

// PUBLIC ROUTES: Anyone can access these
router.post('/signup', isEmailValid, isPasswordStrong, isUsernameValid, register);
router.post('/login', isEmailValid, login);

// PROTECTED ROUTES: Only logged-in users can access these
router.get('/me', authMiddleware, me);
router.post('/logout', authMiddleware, logout);

export default router;