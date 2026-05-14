import AppError from "../shared/AppError.js";

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
    constructor ( seconds ) {
        super(429, `Locked: ${seconds}`);
    };
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
export class errorCreatingNewUser extends AppError {
    constructor ( message = 'Error creating new user! Please try again later...') {
        super(501, message)
    }   
}
export class userAlreadyExistsError extends AppError {
    constructor ( message = "Error! User already exists!" ) {
        super(409, message)
    }
}

export class weakPasswordError extends AppError {
    constructor(message = "Weak Password: Must have 8+ characters, include 1 uppercase, 1 number, and 1 special character.") {
        super(400, message);
    }
}

export class invalidEmailError extends AppError {
    constructor() {
        super(400, "Invalid Email format. Example: user@example.com");
    }
}

export class invalidUsernameError extends AppError {
    constructor() {
        const msg = "Invalid Username. Can only contain English alphabets, numbers, underscores and hyphens (no spaces)";
        super(400, msg);
    }
}
