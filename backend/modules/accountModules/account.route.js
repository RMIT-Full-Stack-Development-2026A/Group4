import { Router } from 'express';
import { register, login, logout, me } from './account.controller.js';
import { hasRequiredFields, isEmailValid, isPasswordStrong, isUsernameValid } from './account.middleware.js';
import { authMiddleware } from '../shared/shared.middleware.js';

const accRouter = Router();

// PUBLIC ROUTES: Anyone can access these
accRouter.post('/signup', hasRequiredFields, isUsernameValid, isEmailValid, isPasswordStrong,  register);
accRouter.post('/login', isEmailValid, login);

// PROTECTED ROUTES: Only logged-in users can access these
accRouter.get('/me', authMiddleware, me);
accRouter.post('/logout', authMiddleware, logout);

export default accRouter;