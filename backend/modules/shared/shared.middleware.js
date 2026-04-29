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