import { validateSquare } from "../gameSessionModules/game.logic.js";
import { detectFork, detectOpenLine, randomMove } from "./ai.logic.js";

export class easyAi {
    constructor (name = "Michael") {
        this.name = name;
    }
    makeMove (board, lastMove) {
        // Getting the last move
        const { row, col } = lastMove;
        const size = board.length;
        // All directions it could move in:
        const adjacent = [
            [-1, -1], [-1, 0], [-1, 1],
            [0,  -1],           [0,  1],
            [1,  -1], [1,  0], [1,  1]
        ]
        // Find all valid squares:
        const available = adjacent
            .map(([dx, dy])=>({ row: row + dx, col: col + dy}))
            .filter(({ row, col })=>validateSquare(row, col, board));
        // If no adjacent available:
        if (available.length === 0) {return randomMove(board)};
        return available[Math.floor(Math.random() * available.length)]; // Returning a random coordinate of available squares
    }
};

export class mediumAi extends easyAi  {
    constructor ( name = "Bill" ) {
        super(name)
    }
    makeMove (board, lastMove, playerMarker) {
        // Detecting 5 lines:
        const blockFive = detectOpenLine(board, playerMarker, 5);
        if (blockFive) return blockFive
        // Detecting 4 lines:
        const blockFour = detectOpenLine(board, playerMarker, 4);
        if (blockFour) return blockFour
        // Detecting fork formation:
        const forkFormation = detectFork(board, playerMarker);
        if (forkFormation) return forkFormation;
        // Attacks:
        return super.makeMove(board, lastMove);
    } 
};

export class hardAi extends mediumAi {
    constructor (name = "John") {
        super(name)   
    }
    makeMove (board, lastMove, playerMarker, aiMarker) {
        const winMove = detectOpenLine(board, aiMarker, 4);
        if (winMove) return winMove;
        return super.makeMove(board, lastMove, playerMarker)
    }
}