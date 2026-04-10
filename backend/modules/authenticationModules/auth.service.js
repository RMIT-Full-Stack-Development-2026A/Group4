// Importing dependencies: 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

// Importing queries: 
import { createUser, findUserBasedOnEmail } from './auth.repository';

// Importing DTO:
import { tokenDTO } from './authDTO';

// importing error messages: 
import { invalidCredentialsError, userNotFoundError } from './auth.error';

// Registering: 
export const register = async () => {
    try {
        
    }
    catch (err) {
        console.error(err)
    }
}

// Logging in: 
export const loginService = async ( email, password ) => {
    try {
        // Find user based on email: 
        const user = await findUserBasedOnEmail(email);
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
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}