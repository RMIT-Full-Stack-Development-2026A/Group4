
export const validateProfileUpdate = (req, res, next) => {
    const {username, email, password, country} = req.body;

    //Username
    if (username) {
        const regex = /^[a-zA-Z0-9_-]+$/;
        if(!regex.test(username)) {
            return res.status(400).json
            ({ message: 'Invalid username format' });
        }
    }

    //Email
    if(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({message: 'Invalid email format'});
        }
    }

    //Country
    if(country && typeof country !== 'string') {
        return res.status(400).json({message: 'Country must be a string'});
    }

    next();
};

//Validate avatar upload
export const validateAvatar = (req, res, next) => {
    if(!req.file) {
        return res.status(400).json({message: 'No file uploaded'});
    }

    //Only allow image files
    if(!req.file.mimetype.startsWith('image/')) {
        return res.status(400).json({message: 'Only image files are allowed'});
    }

    next();
}




