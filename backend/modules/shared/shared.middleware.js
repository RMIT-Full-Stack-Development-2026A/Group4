// Middlewares which can be shared between the modules

import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

//Config
const storage = multer.memoryStorage();

//File filter
const fileFilter = (req, file, cb) => {
    if(!file.mimetype.startsWith('image/')) {
        return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
};

//Limit file size
export const upload = multer({
    storage, 
    fileFilter,
    limits: {fileSize: 5 * 1024 * 1024}, //5MB
});

//Resize avatar
export const resizeAvatar = async (req, res, next) => {
    try {
        if(!req.file) return next();

        //Ensure uploads folder exists 
        const uploadDir = "uploads";
        if(!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        //Generate filename
        const fileName = `avatar_${Date.now()}.png`;
        const filePath = path.join(uploadDir, fileName);

        //Resize image using sharp
        await sharp(req.file.buffer)    
        .resize(200, 200)
        .png()
        .toFile(filePath);

        req.file.path = filePath; //Update file path for controller

        next();
    } catch (error) {
        next(error);
    }
};

// Logged in check
export const authMiddleware = (req, res, next) => {
    try {
        const header = req.headers.authorization;
        let token = null;

        //Check if token exists in headers
        if(header && header.startsWith('Bearer ')) {
            token = header.split(' ')[1];
        } 

        //Check if token exists in cookie
        else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        //Check if token exists 
        if(!token) {
            return res.status(401).json({message: 'Unauthorized - No token provided'});
        }

        const secret = process.env.JWT_SECRET || "mysecretkey";

        //Verify token
        const decoded = jwt.verify(token, secret);

        //Attach user info to request object
        req.user = {
            id: decoded.id,
            username: decoded.username,
            email: decoded.email,
            role: decoded.role,
            userRole: decoded.role // Added to ensure Admin checks work
        };

        console.log("TOKEN EXTRACTED:", token);

        next();
    } catch (error) {
        console.error("JWT ERROR:", error.message);
        return res.status(401).json({message: 'Unauthorized - Invalid token'});
    }
};