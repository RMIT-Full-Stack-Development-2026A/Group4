// DTO for game session data
export class gameDTO {
    constructor (game) {
        // Game id
        this.id = game._id;
        // Players info
        this.host = game.host_name;
        this.guest = game.guest_name;
        this.type = game.gameType;

        // Board info
        this.boardStyle = game.boardStyle;
        this.size = game.boardSize;
        this.markers = game.markers;

        // State
        this.status = game.status;
        this.winner = game.winner;
        this.winningLine = game.winningLine;
        this.currentMarker = game.currentMarker;
        this.currentPlayer = game.currentPlayer;
        this.board = game.board;

        // Timestamp
        this.start = game.startTime;
        this.end = game.endTime;
    }
}

// DTO each time player makes a move:
export class moveDTO {
    constructor (game) {
        // We only send what changes during a move
        this.board = game.board;

        // Turn rotation
        this.currentPlayer = game.currentPlayer;
        this.currentMarker = game.currentMarker;
        
        // Game condition
        this.status = game.status;
        this.winner = game.winner;
        this.winningLine = game.winningLine;
    }
}

export class winningGameDto {
    constructor (game) {
        this.winner = game.playerId,
        this.status = "FINISHED",
        this.winningCells = game.winningLine,
        this.board = game.board
    }
}

// Enough information to start a game: 
export class startGameDTO {
    constructor (game) {
        this.id = game._id
    }
}