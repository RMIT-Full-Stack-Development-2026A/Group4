// 10 x 10 layout:
[
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
]
// 15 x 15 layout:
[
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]
// Representing an easy AI:
export class easyAiService {
    // Constructor: 
    constructor () {
        this.name = "Bill";
    }
    // Make move:
    makeMove (previousSquare, board, marker) {
        // Coordinates: 
        const { x, y } = previousSquare;
        
        // Calculate all moves: 
        // X:
        const newMoves = [
            // Right Side:
            { x: x + 1, y: y },
            // Left Side
            { x: x - 1, y: y },
            // Move Up:
            { x: x, y: y + 1},
            // Move Down:
            { x: x, y: y - 1},
            // Diagonals
            { x: x + 1, y: y + 1 },
            { x: x + 1, y: y - 1 },
            { x: x - 1, y: y - 1 },
            { x: x - 1, y: y+ 1}
        ]

        // Filter and check: 
        const potentialMoves = moveEquation.filter((move) => {
            // If this move is within the board:
            const isInside = move.x >= 0 && move.y <= board.length && move.y >= 0 && move.x <= board.length();
            // If the square is empty:
            if (!isInside) return false;
            return board[move.x][move.y] === 0
        });

        // Choosing and making a move:
        if (potentialMoves.length > 0) {
            const randomIndex = Math.floor(Math.random() * potentialMoves.length);
            return potentialMoves[randomIndex];
        }
        // 
        return this.findEmptyCell(board);
    }
    // Find empty cell: 
    findEmptyCell (board) {
        for ( let y = 0; y < board.length; y++ ) {
            for ( let x = 0; x < board.length; x++ ) {
                if (board[y][x] === 0) {
                    return {x, y};
                }
            };
        }
        return null;
    }
};

export class mediumAiService {
    // Constructor:
    constructor () {
        this.name = "Ricky"
    };
    // Make Move:
    defend (boardLayout, aiMarker) {
        
    };
    // Make move:
    
};

export class hardAiService {
    // Constructor:
    constructor () {
        this.name = "Mack"
    };
    // Make Move: 
    attack (boardLayout, aiMarker) {

    };
    // Defending:
    defend (boardLayout, aiMarker) {

    };
}
