import mongoose from 'mongoose';
import { adminUnauthorizedError,
         invalidIdFormatError,
         invalidInputError
 } from './admin.error';

// Authorization
export const isAdmin = (req, res, next) => {
    // check the role attached by the verifyToken middleware
    if (req.user && req.user.userRole === 'ADMIN') {
        return next();
    }
    return next(new adminUnauthorizedError);
};

// checks input format before reaching the Service
export const validateToggleInput = (req, res, next) => {
    const { id } = req.params;
    const { isActive } = req.body;

    // check if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new invalidIdFormatError);
    }

    // check if isActive is strictly a boolean
    if (typeof isActive !== 'boolean') {
        return next(new invalidInputError);
    }

    next();
};