
class accountDTO {
    constructor (accountInput) {
        this.id = accountInput.id,
        this.country = accountInput.country,
        this.username = accountInput.username,
        this.email = accountInput.email
    }
}

export default accountDTO;