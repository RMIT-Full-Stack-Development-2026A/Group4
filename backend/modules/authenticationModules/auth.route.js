// Importing dependencies: 
import {Router} from 'express';
const AuthRouter = Router();

// Importing middlewares:
import { isEmailValid, isPasswordStrong, isUsernameValid } from './auth.middleware.js';
import { AuthController } from './auth.controller.js';

// Signing up:  
AuthRouter.post( '/signup', isEmailValid, isPasswordStrong, isUsernameValid, AuthController.registerController )
// Logging in:
AuthRouter.post( '/login', isEmailValid, AuthController.loginController );

// Export:
export default AuthRouter;