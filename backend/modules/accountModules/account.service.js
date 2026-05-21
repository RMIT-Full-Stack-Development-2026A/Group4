import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import checkPremiumExpiry from '../shared/checkPremiumExpiry.js';
import * as accRepo from './account.repository.js';
import { createProfile, findProfileByUserId } from '../profileModules/profile.repository.js';
import { TokenDTO } from './account.dto.js';
import { 
    matchingPasswordError, 
    errorCreatingNewUser, 
    userAlreadyExistsError, 
    userNotFoundError, 
    invalidCredentialsError,
    loginTimeOutError 
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
            { ...payload},
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

        const hasLock = user.lockUntil;
        const lockExpired = hasLock && user.lockUntil < Date.now();
        const lockActive = hasLock && user.lockUntil > Date.now();

        // Check if the user is locked
        if (lockActive) {
            const secondsLeft = Math.ceil((user.lockUntil - Date.now()) / 1000);
            throw new loginTimeOutError(secondsLeft);
        }

        // Checking if password is correct
        const res = await bcrypt.compare(password, user.hashedPassword);
        // If not correct
        if (!res) {
            let attempts = user.failedAttempts + 1;
            if (lockExpired) attempts = 1 // If the user was locked before and waited

            let lockTime = null;

            // If 5th failed attempt, set lock for 60 seconds
            if (attempts >= 5) {
                lockTime = new Date(Date.now() + 60 * 1000);
            }

            await accRepo.updateLoginAttempts(user._id, attempts, lockTime);
            throw new invalidCredentialsError(); // Invalid credentials error
        };

        // Reset security fields on success
        await accRepo.updateLoginAttempts(user._id, 0, null);

        // Creating token DTO: 
        const userProfile = await findProfileByUserId(user._id);
        await checkPremiumExpiry(userProfile)
        const payload = new TokenDTO(user, userProfile);

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

export const getMeService = async (userId) => {
    const user = await accRepo.findById(userId);
    const profile = await findProfileByUserId(userId);

    await checkPremiumExpiry(profile)
    return new TokenDTO(user, profile);
};

export const changePasswordService = async (userId, oldPassword, newPassword, confirmPassword) => {
    const user = await accRepo.findById(userId);

    if(!user) {
        throw new userNotFoundError();
    }

    const isMatch = await bcrypt.compare(oldPassword, user.hashedPassword);
    console.log("INPUT:", oldPassword);
    console.log("MATCH:", isMatch);
    
    if(!isMatch){
        throw new Error("Incorrect old password");
    }

    if(newPassword !== confirmPassword){
        throw new Error("Password do not match");
    }

    if(
        newPassword.length < 8 ||
        !/[A-Z]/.test(newPassword) ||
        !/[0-9]/.test(newPassword) ||
        !/[!@#$%^&*]/.test(newPassword)
    ) {
        throw new Error("Weak password");
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await accRepo.updateAccount(userId, {
        hashedPassword: hashed
    });

    return true;
}