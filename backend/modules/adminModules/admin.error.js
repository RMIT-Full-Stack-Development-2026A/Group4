import AppError from "../shared/AppError.js";

// prevent unauthorized access
export class adminUnauthorizedError extends AppError {
    constructor(message = 'Access denied: Administrative privileges required.') {
        super(403, message); // 403 Forbidden
    }
}

// Invalid ID format
export class invalidIdFormatError extends AppError {
    constructor(message = 'Invalid format: Target ID is not a valid identifier.') {
        super(400, message); // 400 Bad Request
    }
}

// Invalid status input
export class invalidInputError extends AppError {
    constructor(message = 'Invalid format: Status must be true or false.') {
        super(400, message); // 400 Bad Request
    }
}

// prevent accidental deletion
export class adminProtectionError extends AppError {
    constructor(message = 'Invalid format: Status must be true or false.') {
        super(403, message); // 403 Forbidden
    }
}

// Target missing
export class playerNotFoundError extends AppError {
    constructor(message = 'The target player account was not found in the system!') {
        super(404, message); // 404 Not Found
    }
}

// Redundant update
export class accountStatusRedundantError extends AppError {
    constructor(message = 'The account is already in the requested state!') {
        super(400, message); // 400 Bad Request
    }
}