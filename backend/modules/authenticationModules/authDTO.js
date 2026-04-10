// Defining data transfer objects:
// DTO for creating a JWT token: 
export class tokenDTO {
    constructor (userObject) {
        this.id = userObject.id, // Need user ID;
        this.email = userObject.email, // Need user email 
        this.username = userObject.username // need username
    };
};
