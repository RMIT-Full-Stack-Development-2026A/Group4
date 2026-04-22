import AppError from "../shared/AppError.js";

export class userAlreadyExistsError extends AppError {
    constructor ( message = "Error! User already exists!" ) {
        super(409, message)
    }
}