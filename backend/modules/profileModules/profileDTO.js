export class ProfileDTO {
    constructor(profile) {
        this.userId = profile.user_id;
        this.country = profile.country;
        this.avatarUrl = profile.avatarUrl;
        this.wallet_balance = profile.wallet_balance;
    }
}