// Importing dependencies: 
import {Router} from 'express';
const AuthRouter = Router();
// Importing middlewares:
import { isEmailValid, isPasswordStrong, isUsernameValid } from './auth.middleware';
// Signing up:  
AuthRouter.post('/signup', isEmailValid, isPasswordStrong, isUsernameValid, )
// Logging in:
AuthRouter.get('/login', isEmailValid,   )

// Export
export default AuthRouter;