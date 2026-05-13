// For general account data
export class AccountDTO {
    constructor(user) {
        this.id = user._id;
        this.username = user.username;
        this.email = user.email;
        this.role = user.userRole;
        this.isActive = user.isActive;
    }
}

// For JWT payload
export class TokenDTO {
    constructor(user) {
        this.id = user._id;
        this.email = user.email;
        this.username = user.username;
        this.role = user.userRole;
    }
}
