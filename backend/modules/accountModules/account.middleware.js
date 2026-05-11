import jwt from 'jsonwebtoken';
// Validating input: 
// Checking if password's strong:
export const isPasswordStrong = (req, res, next) => {
    // Extracting the password
    const { password } = req.body;
    // Checking that password exists
    if (!password) {
        return res.status(400).json({message: 'Password is required'})
    }
    // 8 characters:
    if ( password.length < 8 ) {
        // Sending a json message back:
        return res.status(400).json({message: 'Choose a long password!'});
    }
    // Using regular expressions to check for password strength:
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacter = /[^a-z0-9A-Z]/.test(password); // special regex to check for special characters
    const hasUpper = /[A-Z]/.test(password);
    // Checking whether all conditions are met
    if ((hasNumber === false) || (hasSpecialCharacter === false) || (hasUpper === false)) {
        return res.status(400).json({message: 'Choose a stronger password!'}); // Sending response to controller
    }
    // Calling the next middleware if everything is good.
    next();
};
// Check that email is valid:
export const isEmailValid = ( req, res, next ) => {
    // Extracting data from request:
    const { email } = req.body;
    // Checking if email have spaces: 
    if (/\s/.test(email)) {return res.status(400).json({ message: 'Invalid email format' })};
    // Email characters allowed:
    if (email.length > 255) { 
        return res.status(400).json({ message: 'Invalid email format!' });
    }
    // only 1 @
    const parts = email.split('@');
    if (parts.length !== 2) {
        return res.status(400).json({message: 'Invalid email format!'})
    }
    // '382782374' 'gmail.com'
    const [ username, domain ] = parts;
    const allowedCharacters = /^[a-zA-Z0-9._-]+$/;
    if ( !allowedCharacters.test(username) || !allowedCharacters.test(domain.replace('.', '')) ) {
        return res.status(400).json({message: 'Invalid email format!'})
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
        return res.status(400).json({message: 'Invalid username format'});
    };  
    // Calling next middleware: 
    next()
};

