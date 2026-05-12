import jwt from 'jsonwebtoken';
import { registerService, loginService } from './account.service.js';
import { missingCredentialsError } from './account.error.js';

export const register = async (req, res, next) => {
    // Controllers will take request, extract information and call the service layer
    try {
        // Extracting information from the request body:
        const { username, email, password, confirmPassword, country } = req.body;
        
        // Perform basic check: 
        if (!username || !email || !password || !confirmPassword || !country) {
            throw new missingCredentialsError();
        }

        // Calling the service layer
        const result = await registerService(username, email, password, confirmPassword, country);

        // Providing appropriate return to frontend;
        // Putting token into cookie: 
        res.cookie('token', result.token, {
            httpOnly: true,
            secure: false, 
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days validity
            sameSite: 'lax'
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
            secure: false,
            path: '/',
            maxAge: 24 * 60 * 60 * 1000, // 1 day validity
            sameSite: 'lax'
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
        secure: false,
        path: '/',
        sameSite: 'lax',
    });
    res.status(200).json({ message: 'Logged out!' });
};

export const me = async (req, res) => {
    // Optional chaining incase cookie doesn't exist
    const token = req.cookies?.token;
    
    if (!token) {
        return res.status(401).json({ message: 'No token found' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({
            user: {
                id: decoded.id,
                username: decoded.username,
                email: decoded.email,
                role: decoded.role
            }
        });
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};