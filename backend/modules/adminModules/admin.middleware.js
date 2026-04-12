import mongoose from 'mongoose';

// Authorization
export const isAdmin = (req, res, next) => {
    // check the role attached by the verifyToken middleware
    if (req.user && req.user.userRole === 'ADMIN') {
        return next();
    }
    return res.status(403).json({ message: 'Access denied: Administrative privileges required.' });
};

// checks input format before reaching the Service
export const validateToggleInput = (req, res, next) => {
    const { id } = req.params;
    const { isActive } = req.body;

    // check if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid format: Target ID is not a valid identifier.' });
    }

    // check if isActive is strictly a boolean
    if (typeof isActive !== 'boolean') {
        return res.status(400).json({ message: 'Invalid format: Status must be true or false.' });
    }

    next();
};