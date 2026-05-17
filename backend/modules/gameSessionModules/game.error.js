import AppError from "../shared/AppError.js";

export class gameNotFoundError extends AppError {
    constructor(message = "The requested game session was not found.") { super(404, message); }
}

export class missingGameData extends AppError {
    constructor(message = "Missing game credentials") {super(404, message)}
}

export class gameAlreadyFinishedError extends AppError {
    constructor(message = "This game has already ended.") { super(400, message); }
}
