// Importing dependencies: 
import AppError from "../shared/error.middleware";

// Handing errors relating to authentication:
// User not found: 
export class userNotFoundError extends AppError {
    constructor ( message = 'User not found!' ) {
        super(401, message);
    }
}
// Invalid Credentials:
export class invalidCredentialsError extends AppError {
    constructor ( message = 'Invalid credentials!' ) {
        super(401, message);
    }
}
// User is deactivated => account status is deactivated
export class userIsDeactivatedError extends AppError {
    constructor ( message='This account is deactivated!' ) {
        super(403, message);
    }
}
// Log in time out => more than 5 log in attempts: 
export class loginTimeOutError extends AppError {
    constructor ( message = 'Exceeded the allowed login attempts!' ) {
        super(429, message);
    }
}
export class missingCredentialsError extends AppError {
    constructor( message='Missing credentials!' ) {
        super(401, message);
    }
}
export class matchingPasswordError extends AppError {
    constructor (message = 'Passwords must match') {
        super(401, message);
    }
}
export class ErrorCreatingNewUser extends AppError {
    constructor ( message = 'Error creating new user! Please try again later...') {
        super(501, message)
    }
}




