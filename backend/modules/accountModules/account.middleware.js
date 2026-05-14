import jwt from 'jsonwebtoken'
import { weakPasswordError, invalidEmailError, invalidUsernameError } from './account.error.js';
// Validating input: 
// Checking if password's strong:
export const isPasswordStrong = (req, res, next) => {
    // Extracting the password
    const { password } = req.body;
    // Checking that password exists
    if (!password) {
        return next(new weakPasswordError())
    }
    // Using regular expressions to check for password strength:
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacter = /[^a-z0-9A-Z]/.test(password); // special regex to check for special characters
    const hasUpper = /[A-Z]/.test(password);
    // Checking whether all conditions are met
    if (password.length < 8 || (hasNumber === false) || (hasSpecialCharacter === false) || (hasUpper === false)) {
        return next(new weakPasswordError())
    }
    // Calling the next middleware if everything is good.
    next();
};
// Check that email is valid:
export const isEmailValid = ( req, res, next ) => {
    // Extracting data from request:
    const { email } = req.body;
    // Checking if email is entered, shorter than 255 characters and doesn't have spaces 
    if (!email || email.length > 255 || /\s/.test(email)) {
        return next(new invalidEmailError());
    }
    // only 1 @
    const parts = email.split('@');
    if (parts.length !== 2) {
        return next(new invalidEmailError());
    }
    // '382782374' 'gmail.com'
    const [ username, domain ] = parts;
    const allowedCharacters = /^[a-zA-Z0-9._-]+$/;
    if ( !allowedCharacters.test(username) || !allowedCharacters.test(domain.replace('.', '')) ) {
        return next(new invalidEmailError());
    }
    // Calling next middleware:
    next();
};
// Ensuring username is valid"
export const isUsernameValid = ( req, res, next ) => {
    // Extracting username from frontend: 
    const { username } = req.body;
    const allowedCharacters = /^[a-zA-Z0-9-_]+$/ // regular expression for username format
    // Checking to see if username is valid:
    if (!allowedCharacters.test(username)) {
        return next(new invalidUsernameError());
    };  
    // Calling next middleware: 
    next()
};
