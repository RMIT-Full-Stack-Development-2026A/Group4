import { registerService, loginService, getMeService, changePasswordService } from './account.service.js';
import jwt from 'jsonwebtoken';

const isProduction = process.env.NODE_ENV === "production";

export const register = async (req, res, next) => {
    // Controllers will take request, extract information and call the service layer: 
    try {
        // Extracting information from the request body:
        const { username, email, password, confirmPassword, country } = req.body;
    
        // Calling the service layer
        const result = await registerService(username, email, password, confirmPassword, country);

        // Providing appropriate return to frontend;
        // Putting token into cookie: 
        res.cookie('token', result.token, {
            httpOnly: true,
            secure: true, 
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days validity
            sameSite: isProduction ? "none" : "lax"
        });
        
        return res.status(201).json({ 
            message: 'Successfully registered user', 
            user: result.user
        });
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        // Takes the request and response and extract email and password
        const { email, password } = req.body;

        // If email or password not found:
        if (!email || !password) {
            throw new missingCredentialsError();
        }

        // Calling the service:
        const result = await loginService(email, password);

        // Putting cookie into browser:
        res.cookie('token', result.token, {
            httpOnly: true,
            secure: true,
            path: '/',
            maxAge: 24 * 60 * 60 * 1000, // 1 day validity
            sameSite: isProduction ? 'none' : 'lax'
        });

        // returning information back to user.
        return res.status(200).json({
            message: 'Successfully logged in!',
            user: result.user,
        });
    } catch (err) {
        next(err);
    }
};

export const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: isProduction ? 'none' : 'lax',
    });
    res.status(200).json({ message: 'Logged out!' });
};

export const me = async (req, res, next) => {
    try {
        const userData = await getMeService(req.user.id);

        res.status(200).json({
            user: userData,
            message: 'Authorized'
        });
    } catch (err) {
        next(err);
    }
};

export const changePassword = async (req, res) => {
    try{
        const {oldPassword, newPassword, confirmPassword} = req.body;

        if(!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        await changePasswordService(req.user.id, oldPassword, newPassword, confirmPassword);

        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });
    } catch (err){
        return res.status(400).json({
            success: false,
            message: err.message || "Failed to change password"
        });
    }
};