export const validateSignup = (data) => {
    const { username, email, password, confirmPassword, country } = data;

    // Missing fields
    if (!username || !email || !password || !confirmPassword || !country) {
        return "Missing credentials!";
    }

    // Password Match
    if (password !== confirmPassword) {
        return "Passwords must match!";
    }

    // Username Validation
    const userRegex = /^[a-zA-Z0-9-_]+$/;
    if (!username || !userRegex.test(username)) {
        return "Invalid Username! Only English alphabets, numbers, underscores (_), and hyphens (-) allowed. Example: player_1-win";
    }

    // Email Validation
    const hasSpaces = /\s/.test(email);
    const hasProhibited = /[();:]/.test(email);
    const parts = email.split('@');
    if (email.length > 255 || hasSpaces || hasProhibited || parts.length !== 2 || !parts[1].includes('.')) {
        return "Invalid Email format! Must contain exactly one '@' and a '.' after the '@', be under 255 characters, and contain no spaces or prohibited characters \"( ) ; :\". Example: user@example.com";
    }

    // Password Validation
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[^a-z0-9A-Z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    if (password.length < 8 || !hasNumber || !hasSpecial || !hasUpper) {
        return "Weak Password! Must have 8+ characters, include 1 uppercase, 1 number, and 1 special character ($#@!). Example: TicTac!2026";
    }

    return null; // Return null if everything is valid
};