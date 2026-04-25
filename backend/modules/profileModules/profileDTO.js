export class ProfileDTO {
    constructor(profile) {
        this.userId = profile.user_id;
        this.country = profile.country;
        this.avatarUrl = profile.avatarUrl;
    }
}