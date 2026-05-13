
const getEmptyCells = (board) => {
    const cells = [];

    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board.length; j++) {
            if(board[i][j] === '') {
                cells.push({row: i, col: j});
            }
        }
    }
    return cells;
};

//Easy AI
export class EasyAI {
    getRandom(board) {
        const empty = [];

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j] === '') {
                    empty.push({ row: i, col: j });
                }
            }
        }

        return empty[Math.floor(Math.random() * empty.length)];
    }

    makeMove(board) {
        return this.getRandom(board);
    }
}

//Medium
export class MediumAI {

    getRandom(board) {
        const empty = [];

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j] === '') {
                    empty.push({ row: i, col: j });
                }
            }
        }

        return empty[Math.floor(Math.random() * empty.length)];
    }

    makeMove(board) {
        // 30% random
        if (Math.random() < 0.3) {
            return this.getRandom(board);
        }

        // try win
        const win = this.findMove(board, 'O');
        if (win) return win;

        // block
        const block = this.findMove(board, 'X');
        if (block) return block;

        return this.getRandom(board);
    }

    findMove(board, player) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {

                if (board[i][j] === '') {
                    board[i][j] = player;

                    if (this.checkWinner(board, i, j, player)) {
                        board[i][j] = '';
                        return { row: i, col: j };
                    }

                    board[i][j] = '';
                }
            }
        }
        return null;
    }

    checkWinner(board, row, col, player) {
        const directions = [[0,1],[1,0],[1,1],[1,-1]];

        for (let [dx, dy] of directions) {
            let count = 1;

            count += this.countDir(board, row, col, dx, dy, player);
            count += this.countDir(board, row, col, -dx, -dy, player);

            if (count >= 5) return true;
        }

        return false;
    }

    countDir(board, r, c, dx, dy, player) {
        let count = 0;
        let x = r + dx;
        let y = c + dy;

        while (
            x >= 0 && y >= 0 &&
            x < board.length &&
            y < board.length &&
            board[x][y] === player
        ) {
            count++;
            x += dx;
            y += dy;
        }

        return count;
    }
}
//HARD AI
export class HardAI extends MediumAI {

    makeMove(board) {
        let bestMove = null;
        let bestScore = -Infinity;

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {

                if (board[i][j] === '') {
                    const score = this.evaluatePosition(board, i, j);

                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = { row: i, col: j };
                    }
                }
            }
        }

        return bestMove;
    }

    evaluatePosition(board, row, col) {
        let score = 0;

        // Prefer center
        const center = Math.floor(board.length / 2);
        score -= Math.abs(row - center) + Math.abs(col - center);

        // Prefer near existing moves
        score += this.countNeighbors(board, row, col);

        return score;
    }

    countNeighbors(board, row, col) {
        let count = 0;

        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                const x = row + dx;
                const y = col + dy;

                if (
                    x >= 0 && y >= 0 &&
                    x < board.length &&
                    y < board.length &&
                    board[x][y] !== ''
                ) {
                    count++;
                }
            }
        }

        return count;
    }
}

