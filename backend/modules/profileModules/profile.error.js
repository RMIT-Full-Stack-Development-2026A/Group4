export class ProfileError extends Error {
    constructor (message, statusCode = 400) {
        super(message);
        this.name = "ProfileError";
        this.statusCode = statusCode;
    }
}

//Specific errors: 
export class ProfileNotFoundError extends ProfileError {
    constructor() {
        super("Profile not found", 404);
    }
}

export class AccountNotFoundError extends ProfileError {
    constructor() {
        super("Account not found", 404);
    }
}

export class DuplicateEmailError extends ProfileError {
    constructor() {
        super("Email already in use", 400);
    }
}

export class InvalidUsernameError extends ProfileError {
    constructor() {
        super("Invalid username format", 400);
    }
}