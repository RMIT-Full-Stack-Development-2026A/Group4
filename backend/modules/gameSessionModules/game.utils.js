
//WIN CHECK
export const checkWinner = (board, row, col, player) => {
    const dirs = [[0,1],[1,0],[1,1],[1,-1]];

    for(let [dx, dy] of dirs) {
        let count = 1;

        count += countDir(board, row, col, dx, dy, player);
        count += countDir(board, row, col, -dx, -dy, player);

        if(count >= 5) return true;
    }

    return false;
};

const countDir = (board, r, c, dx, dy, player) => {
    let count = 0;
    let x = r + dx;
    let y = c + dy;

    while(
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
};