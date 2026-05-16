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
    constructor(user, profile = null) {
        this.id = user._id;
        this.username = user.username;
        this.role = user.userRole;
        this.isPremium = profile ? profile.isPremium : false;
        this.avatarUrl = profile ? profile.avatarUrl : null;
        this.wallet_balance = profile ? profile.wallet_balance : 0;
    }
}
