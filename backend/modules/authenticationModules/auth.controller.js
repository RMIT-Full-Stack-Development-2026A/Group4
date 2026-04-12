// Importing dependencies: 
import { findUserBasedOnEmail } from "./auth.repository";
import bcrypt from 'bcrypt';
// Import error messages:
import {invalidCredentialsError, userNotFoundError, missingCredentialsError} from './auth.error'
import {loginService, registerService} from './auth.service'
// Called at the route
export const AuthController = {
    async registerController (req, res, next) {
        // Controllers will take request, extract information and call the service layer
        try {
            // Extracting information from the request body:
            const { username, email, password, confirmPassword, country  } = req.body;
            // Perform basic check: 
            if (!username || !email || !password || !confirmPassword || !country ) {
                throw new missingCredentialsError();
            }
            // Calling the service layer
            const result = await registerService( username, email, password, confirmPassword, country );
            // Providing appropriate return to frontend
            return res.status(201).json({ 
                message: 'Successfully registered user', 
                token: result.token,
                user: result.user
            })
        }
        catch (err) {
            next(err)
        }
    },
    // Controller for logging in
    async loginController (req, res, next) {
        try {
            // Takes the request and response and extract email and password
            const { email, password } = req.body;
            // If email or password not found: (Double checking)
            if (!email || !password) {
                throw new missingCredentialsError();
            }
            // Calling the service:
            const result = await loginService( email, password );
            // returning information back to user.
            return res.status(200).json({
                message: 'Successfully logged in!',
                token: result.token,
                user: result.user,
            })
        }
        catch (err) {
            next(err);
        }
    }
}