import { applyMove, validateSquare } from "../gameSessionModules/game.logic.js";
import { detectFork, detectOpenLine, getSmartMoves, mcts, randomMove } from "./ai.logic.js";

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
        const blockFive = detectOpenLine(board, playerMarker, 4);
        if (blockFive) return blockFive
        // Detecting 4 lines:
        const blockFour = detectOpenLine(board, playerMarker, 3, true);
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

        //block opponent win
        const blockMove = detectOpenLine(board, playerMarker, 4);
        if(blockMove) return blockMove;

        //block strong threat (open 3)
        const dangerMove = detectOpenLine(board, playerMarker, 3, true);
        if(dangerMove) return dangerMove;

        //block opponent fork
        const blockFork = detectFork(board, playerMarker);
        if(blockFork) return blockFork;

        //smart moves
        const smartMoves = getSmartMoves(board, aiMarker, playerMarker);

        let bestMove = null;
        let bestScore = -Infinity;

        for(const move of smartMoves) {
            const newBoard = applyMove(move.row, move.col, board, aiMarker);

            //combine heuristic + mcts
            const mctsScore = mcts(newBoard, aiMarker, playerMarker, 150);

            const totalScore = move.score + mctsScore;

            if(totalScore > bestScore) { 
                bestScore = totalScore;
                bestMove = move;
            }
        }

        if(bestMove) return bestMove;
        return randomMove(board);
    }
}