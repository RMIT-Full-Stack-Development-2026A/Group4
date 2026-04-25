import * as profileService from './profile.service.js';

//GET profile
export const getProfile = async (req, res) => {
    try{
        const data = await profileService.getProfile(req.user.id);

        res.status(200).json({
            success: true,
            data,
    });
    }    catch(error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

//UPDATE profile
export const updateProfile = async (req, res) => {
    try {
        const data = await profileService.updateProfile(req.user.id, req.body);

        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

//UPLOAD avatar
export const uploadAvatar = async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded',
            });
        }

        const data = await profileService.uploadAvatar(req.user.id, req.file.path);

        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

//GAME implementation will be added here in the future