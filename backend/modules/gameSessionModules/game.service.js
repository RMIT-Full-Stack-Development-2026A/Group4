import * as repo from './game.repository.js';
import { gameNotFoundError, gameAlreadyFinishedError, invalidMoveError, notYourTurnError } from './game.error.js';

const createEmptyBoard = (size) => {
    return Array.from({length: size}, () => 
    Array(size).fill('')
    );
};


// Starts the record in the database
export const startGame = async (userId, gameData) => {
    const board = createEmptyBoard(gameData.boardSize || 10);

    return await repo.createGame({
        host_id: userId,
        host_name: gameData.host_name,
        guest_name: gameData.guest_name,
        gameType: gameData.gameType,
        boardSize: gameData.boardSize,

        boardState: board,
        currentTurn: 'X',
        status: 'ACTIVE'
    });
};

//PLAY MOVE 
export const playMove = async (gameId, userId, row, col) => {
    const game = await repo.findById(gameId);

    if(!game) throw new gameNotFoundError();

    if(game.status !== 'ACTIVE') throw new gameAlreadyFinishedError();

    const player = game.host_id.toString() === userId ? 'X' : 'O';
    
    // if(player !== game.currentTurn) {
    //     throw new notYourTurnError();
    // }

    if(game.boardState[row][col] !== ''){
        throw new invalidMoveError();
    }

    //Apply move
    game.boardState[row][col] = player;

    //Checkwin
    const isWin = checkWinner(game.boardState, row, col, player);

    if(isWin){
        game.status = 'FINISHED';
        game.winner = player;
        game.endTime = new Date();
    } else{
        game.currentTurn = player === 'X' ? 'O' : 'X';
    }

    await repo.save(game);

    return game;
}

//WIN CHECK
const checkWinner = (board, row, col, player) => {
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

//HISTORY
export const getHistory = async (userId) => {
    return await repo.getHistory(userId);
}