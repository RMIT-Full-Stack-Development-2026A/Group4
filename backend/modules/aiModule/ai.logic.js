import { DIRECTIONS, inBounds, applyMove, checkWinner } from "../gameSessionModules/game.logic.js";
import { easyAi, hardAi, mediumAi } from "./ai.model.js";
// Finding random move for 
export const randomMove = (board) => {
    // Storing all available moves
    const empty = [];
    // Pushing all available squares
    board.forEach((row, r)=>{
        row.forEach((cellMark, c)=>{
            if (cellMark === null) {empty.push({ row: r, col: c })}
        })
    })
    // Choosing a random row, col and returning:
    return empty[Math.floor(Math.random() * empty.length)]
}

// Detecting open line:
export const detectOpenLine = (board, marker, length, requireBothEnds = false) => {
    const size = board.length
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            for (const [dr, dc] of DIRECTIONS) {
                let cells = []
                let nr = r, nc = c

                // collect N consecutive markers
                while (
                    cells.length < length &&
                    inBounds(nr, nc, size) &&
                    board[nr][nc] === marker
                ) {
                    cells.push({ row: nr, col: nc })
                    nr += dr
                    nc += dc
                }

                if (cells.length < length) continue

                // check both ends are open
                const beforeRow = r - dr
                const beforeCol = c - dc
                const afterRow = nr
                const afterCol = nc

                const frontOpen = inBounds(afterRow, afterCol, size) && board[afterRow][afterCol] === null
                const backOpen = inBounds(beforeRow, beforeCol, size) && board[beforeRow][beforeCol] === null

                // if both ends are required, make sure both are open
                // otherwise block whichever end is available
                if (requireBothEnds) {
                    if (frontOpen && backOpen) return { row: afterRow, col: afterCol };
                } else {
                    if (frontOpen) return { row: afterRow, col: afterCol };
                    if (backOpen) return { row: beforeRow, col: beforeCol };
                }
            }
        }
    }
    return null
}

// Detecting fork formation
// detect fork — two crossing 3-mark open lines
export const detectFork = (board, marker) => {
    const moves = [];

    for(let r = 0; r < board.length; r++){
        for(let c = 0; c < board.length; c++){
            if(board[r][c] !== null) continue;

            const newBoard = applyMove(r, c, board, marker);

            const threat1 = detectOpenLine(newBoard, marker, 4);
            const threat2 = detectOpenLine(newBoard, marker, 3);

            if(threat1 && threat2) {
                return {
                    row: r,
                    col: c
                };
            }
        }
    }

    return null;
}

export const getAiInstance = (aiName) => {
    switch (aiName) {
        case "Michael": return new easyAi();
        case "Bill": return new mediumAi();
        case "John": return new hardAi();
        default: return;
    }
}

//Monte-Carlo Tree Search
class Node {
    constructor(board, move = null, parent = null, player = null) {
        this.board = board;
        this.move = move;
        this.parent = parent;
        this.children = [];
        this.visits = 0;
        this.wins = 0;
        this.player = player;
    }
}

const getCandidateMoves = (board) => {
    const size = board.length;
    const moves = [];

    for(let r = 0; r < size; r++){
        for(let c = 0; c < size; c++){
            if(board[r][c] !== null) continue;

            //only consider cells near existing marks
            for(let dr = -1; dr <= 1; dr++){
                for(let dc = -1; dc <= 1; dc++){
                    const nr = r + dr;
                    const nc = c + dc;
                    if(inBounds(nr, nc, size) && board[nr][nc] !== null) {
                        moves.push({row : r, col : c});
                        dr = 2; break;
                    }
                }
            }
        }
    }
    if(moves.length === 0) {
        return [randomMove(board)];
    }

    return moves;
}

//Simulation (random output)
const simulate = (board, currentMarker, playerMarker, aiMarker) => {
    let simBoard = board.map(r => [...r]);
    let marker = currentMarker;

    while(true){
        const move = randomMove(simBoard);
        simBoard = applyMove(move.row, move.col, simBoard, marker);

        const {winner} = checkWinner(simBoard, move.row, move.col, marker);
        if(winner) {
            return marker === aiMarker ? 1 : -1;
        }

        if(!simBoard.flat().includes(null)) return 0;

        marker = marker === aiMarker ? playerMarker : aiMarker;
    }
};

//UCT formula
const uct = (node) => {
    if(node.visits === 0) return Infinity;
    return (
        node.wins / node.visits + 
        Math.sqrt(2 * Math.log(node.parent.visits + 1) / node.visits)
    );
};

//Main MCTS
export const mcts = (board, aiMarker, playerMarker, iterations = 200) => {
    const root = new Node(board, null, null, null);

    for(let i = 0; i < iterations; i++){
        let node = root;

        //Selection
        while(node.children.length > 0){
            node = node.children.reduce((best, child) => 
            uct(child) > uct(best) ? child : best);
        }

        //expansion
        const moves = getCandidateMoves(node.board);
        for(const move of moves){
            const nextMarker = node.player === aiMarker ? playerMarker : aiMarker;

            const newBoard = applyMove(move.row, move.col, node.board, nextMarker);
            const child = new Node(newBoard, move, node, nextMarker);

            node.children.push(child);
        }

        if(node.children.length === 0) continue;

        node = node.children[Math.floor(Math.random() * node.children.length)];

        //simulation
        const result = simulate(node.board, node.player, playerMarker, aiMarker);

        //backpropagation
        while(node) {
            node.visits++;
            node.wins += result;
            node = node.parent;
        }
    }

    if(root.children.length === 0){
        return randomMove(board);
    }

    //choose best move
    const bestChild = root.children.reduce((best, child) => 
    child.visits > best.visits ? child : best);

    return bestChild?.move || randomMove(board);
}

//heuristic
export const evaluatePosition = (board, row, col, marker) => {
    let score = 0;

    const directions = [
        [0,1],[1,0],[1,1],[1,-1]
    ];

    for(const [dx, dy] of directions){
        let count = 1;

        for(let i = 1; i <= 4; i++){
            const r = row + dx*i;
            const c = col + dy*i;
            if(inBounds(r,c,board.length) && board[r][c] === marker) count++;
            else break;
        }

        for(let i = 1; i <= 4; i++){
            const r = row - dx*i;
            const c = col - dy*i;
            if(inBounds(r,c,board.length) && board[r][c] === marker) count++;
            else break;
        }

        //scoring weight
        if(count >= 5) score += 100000;
        else if(count === 4) score += 10000;
        else if(count === 3) score += 1000;
        else if(count === 2) score += 100;
    }
    
    return score;
}

export const getSmartMoves = (board, aiMarker, playerMarker) => {
    const moves = [];

    for(let r = 0; r < board.length; r++){
        for(let c = 0; c < board.length; c++){
            if(board[r][c] !== null) continue;

            const aiScore = evaluatePosition(board, r, c, aiMarker);
            const playerScore = evaluatePosition(board, r, c, playerMarker);

            moves.push({
                row: r,
                col: c,
                score: aiScore + playerScore * 1.2 //prioritize defense slightly
            });
        }
    }

    //sort best first
    moves.sort((a,b) => b.score - a.score);
    
    return moves.slice(0, 8); //top 8 moves only
}
