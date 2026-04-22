// Importing dependencies: 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
// Importing queries: 
import { findByEmail } from '../accountModules/account.repository.js';
// Importing DTO:
import { tokenDTO } from './authDTO.js';
// importing error messages: 
import { matchingPasswordError, ErrorCreatingNewUser, invalidCredentialsError, userNotFoundError } from './auth.error.js';
// Registering: 
export const registerService = async (username, email, password, confirmPassword, country) => {
    try {
        // Perform validation:
        if (password !== confirmPassword) {
            throw new matchingPasswordError();
        }
        // Hash password:
        const hashed = await bcrypt.hash( password, 10 );
        // create new user: 
        const user = await createUser(username, email, hashed, country);
        if (!user) {
            throw new ErrorCreatingNewUser();
        }
        // Creating token based on user
        const payload = new tokenDTO(user);
        const token = jwt.sign(
            { ...payload },
            process.env.JWT_SECRET,
            { expiresIn: '7d' },
        )
        return { 
            token: token, 
            message: 'Successfully created user', 
            user: payload 
        };
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
// Logging in: 
export const loginService = async ( email, password ) => {
    try {
        // Find user based on email: 
        const user = await findByEmail(email);
        if (!user) {
            throw new userNotFoundError(); // User not found error
        }
        // Checking if password is correct:
        const res = await bcrypt.compare(password, user.hashedPassword);
        if (!res) {
            throw new invalidCredentialsError(); // Invalid credentials error
        };
        // Creating token DTO: 
        const payload = new tokenDTO(user);
        // Creating token:
        const token = jwt.sign ( 
            { ...payload }, 
            process.env.JWT_SECRET,
            { expiresIn: '1d' },
         );
         // Returning payload:
        return { token: token, user: payload }
    } catch (err) {
        console.error(err);
        throw err;
    }
}