// DTO
export class transactionDTO {
    constructor (data) {
        this.id = data._id;
        this.type = data.type;
        this.amount = data.amount;
        this.method = data.paymentMethod;
        this.status = data.status;
        this.date = data.createdAt;
    }
};