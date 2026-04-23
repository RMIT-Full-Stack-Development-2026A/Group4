export class AdminPlayerDTO {
    constructor(account, profile) {
        this.id = account._id; 
        this.username = account.username;
        this.email = account.email;
        this.isActive = account.isActive;
        this.isPremium = profile?.isPremium || false;
    }
}
