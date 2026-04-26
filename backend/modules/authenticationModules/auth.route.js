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
// logging out:
AuthRouter.post('/logout', AuthController.logOut)
// Checking for cookie: 
AuthRouter.get('/me', AuthController.checkCookie );

// Export:
export default AuthRouter;