import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as accRepo from './account.repository.js';
import { createProfile } from '../profileModules/profile.repository.js';
import { TokenDTO } from './account.dto.js';
import { 
    matchingPasswordError, 
    errorCreatingNewUser, 
    userAlreadyExistsError, 
    userNotFoundError, 
    invalidCredentialsError 
} from './account.error.js';

// Registering
export const registerService = async ( username, email, password, confirmPassword, country ) => {
    try {
        // Perform validation:
        if (password !== confirmPassword) {
            throw new matchingPasswordError();
        }

        // Check if user already exists: 
        const existingUser = await accRepo.findByEmail(email);
        if (existingUser){
            throw new userAlreadyExistsError();
        };

        // Hash password:
        const hashedPassword = await bcrypt.hash( password, 10 );

        // Create the account record
        const newAccount = await accRepo.createAccount({
            username,
            email,
            hashedPassword,
            userRole: 'PLAYER',
        });

        // Create the profile record
        const newProfile = await createProfile({
            user_id: newAccount._id,
            country: country,
        });

        // Throwing error if something is wrong: 
        if (!newAccount || !newProfile) {
            throw new errorCreatingNewUser();
        }

        // Creating token based on user
        const payload = new TokenDTO(newAccount);
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

// Logging in
export const loginService = async ( email, password ) => {
    try {
        // Find user based on email: 
        const user = await accRepo.findByEmail(email);
        if (!user) {
            throw new userNotFoundError(); // User not found error
        }
        // Checking if password is correct:
        const res = await bcrypt.compare(password, user.hashedPassword);
        if (!res) {
            throw new invalidCredentialsError(); // Invalid credentials error
        };
        // Creating token DTO: 
        const payload = new TokenDTO(user);
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

export const deleteExistingUser = async () => {
    // To be implemented
}