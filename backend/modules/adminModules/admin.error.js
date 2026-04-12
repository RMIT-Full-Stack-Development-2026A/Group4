import AppError from "../shared/AppError";

// prevent 
export class adminProtectionError extends AppError {
    constructor(message = 'You cannot deactivate an admin account!') {
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