// Importing dependencies: 
import { findUserBasedOnEmail } from "./auth.repository";
import bcrypt from 'bcrypt';
// Import error messages:
import {invalidCredentialsError, userNotFoundError, missingCredentialsError} from './auth.error'
import {loginService} from './auth.service'
// Called at the route
export const AuthController = {
    async registerController () {

    },
    async loginController (req, res) {
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
                message: 'Successfully created user!',
                token: result.jwt,
                user: result.user,
            })
        }
        catch (err) {
            next(err);
        }
    }
}