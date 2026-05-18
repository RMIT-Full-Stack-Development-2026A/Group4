// All Directions: 
export const DIRECTIONS = [
    [0, 1], // Horizontal
    [1, 0], // Vertical
    [1, 1], // Diagonal
    [1, -1], // AntiDiagonal
];

// Ensure it's still inbounds:
export const inBounds = (row, col, size) => row >= 0 && row < size && col >= 0 && col < size

// Creating board: 
export const createBoard = (size) => {
    return Array.from({length: size}, () => Array(size).fill(null));
}

// Checking for a winner: 
export const checkWinner = ( board, row, col, marker ) => {
    const size = board.length;
    for (const [Drow, Dcol] of DIRECTIONS) {
        let cells = [{ row, col }]; // Storing all the cells if there's a winning line
        
        // Go forward:
        let nextRow = row + Drow
        let nextCol = col + Dcol   
        while ( inBounds(nextRow, nextCol, size) && board[nextRow][nextCol] === marker ) {
            cells.push( {row: nextRow, col: nextCol} );
            nextRow += Drow;
            nextCol += Dcol;
        }

        // Go backward: 
        nextRow = row - Drow;
        nextCol = col - Dcol;
        while (inBounds(nextRow, nextCol, size) && board[nextRow][nextCol] === marker) {
            cells.push({row: nextRow, col: nextCol});
            nextRow -= Drow;
            nextCol -= Dcol;
        }
        if (cells.length >= 5) return { winner: true, winningCells: cells };
    }
    // Map out the directions and automatically check the board?
    return {winner: false, winningCells: []}
};

// Validate square:
export const validateSquare = (row, col, board) => {
    // Check that move is valid: 
    if (!inBounds(row, col, board.length) || board[row][col] !== null) {
        return false; 
    }
    return true; 
}

// Making a move: 
export const applyMove = (row, col, board, marker) => {
    const updated = board.map(innerRow => [...innerRow])
    updated[row][col] = marker
    return updated;
}