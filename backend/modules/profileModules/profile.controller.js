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
    const avatarUrl = `${req.protocol}://${req.get('host')}/${req.file.path}`;
    try {
        if(!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded',
            });
        }

        const data = await profileService.uploadAvatar(req.user.id, avatarUrl);

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

export const searchGames = async (req, res) => {
    try {
        console.log("Keyword from query: ", req.query);
        
        const data = await profileService.searchGameHistory(req.user.id, req.query);

        res.status(200).json({
            success: true,
            data
        });
        
    } catch (err){
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}