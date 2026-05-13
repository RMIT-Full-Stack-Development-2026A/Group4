// Middlewares which can be shared between the modules
import jwt from 'jsonwebtoken'
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

// Auth middleware fixes
export const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized - No token provided'
            });
        }
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        req.user = {
            id: decoded.id,
            email: decoded.email,
            username: decoded.username,
            role: decoded.role,
        };
        next();
    } catch (error) {
        console.error("JWT ERROR:", error.message);
        return res.status(401).json({
            message: 'Unauthorized - Invalid token'
        });
    }
};