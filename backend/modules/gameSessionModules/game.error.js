import AppError from "../shared/AppError.js";

export class gameNotFoundError extends AppError {
    constructor(message = "The requested game session was not found.") { super(404, message); }
}

export class gameAlreadyFinishedError extends AppError {
    constructor(message = "This game has already ended.") { super(400, message); }
}

export class invalidMoveError extends AppError {
    constructor(message = "Invalid move.") {
        super(400, message);
    }
}

export class notYourTurnError extends AppError {
    constructor(message = "It's not your turn.") {
        super(403, message);
    }
}