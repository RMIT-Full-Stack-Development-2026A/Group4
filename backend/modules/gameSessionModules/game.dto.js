// DTO for game session data
export class gameDTO {
    constructor (game) {
        this.id = game._id;
        
        this.host = game.host_name;
        this.guest = game.guest_name;

        this.type = game.type;
        this.size = game.size;

        this.status = game.status;
        this.winner = game.winner;

        this.winLine = game.winningLine;

        this.start = game.startTime;
        this.end = game.endTime;
    }
}