import { Router } from 'express';
import { register, login, logout, me } from './account.controller.js';
import { isEmailValid, isPasswordStrong, isUsernameValid } from './account.middleware.js';
import { authMiddleware } from '../shared/shared.middleware.js';
import jwt from 'jsonwebtoken'
const accRouter = Router();

// PUBLIC ROUTES: Anyone can access these
accRouter.post('/signup', isEmailValid, isPasswordStrong, isUsernameValid, register);
accRouter.post('/login', isEmailValid, login);

// PROTECTED ROUTES: Only logged-in users can access these
accRouter.get('/me', authMiddleware);
accRouter.post('/logout', authMiddleware, logout);

export default accRouter;