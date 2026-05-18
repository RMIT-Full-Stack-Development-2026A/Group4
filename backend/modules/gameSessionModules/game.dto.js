// DTO for game session data
export class gameDTO {
    constructor (game) {
        this.id = game._id;
        
        this.host = game.host_name;
        this.guest = game.guest_name;

        this.type = game.type;
        this.size = game.boardSize;

        this.status = game.status;
        this.winner = game.winner;

        this.winLine = game.winningLine;

        this.start = game.startTime;
        this.end = game.endTime;
        this.currentMarker = game.currentMarker,
        this.currentPlayer = game.currentPlayer,
        this.board = game.board
    }
}

// DTO each time player makes a move:
export class moveDTO {
    constructor (game) {
        this.id = game._id,
        this.host_name = game.host_name,
        this.guest_name = game.guest_name,
        this.board = game.board,
        this.currentPlayer = game.currentPlayer,
        this.currentMarker = game.currentMarker,
        this.winningLine = game.winningLine,
        this.isDraw = game.isDraw,
        this.status = game.status
        this.winner = game.winner
    }
}

// Enough information to start a game: 
export class startGameDTO {
    constructor (game) {
        this.id = game._id
    }
}