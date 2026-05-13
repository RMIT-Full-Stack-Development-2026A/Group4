import * as repo from './game.repository.js';
import { gameNotFoundError, gameAlreadyFinishedError, invalidMoveError, notYourTurnError } from './game.error.js';
import { checkWinner } from './game.utils.js';
import { EasyAI, HardAI, MediumAI } from './ai.service.js';

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
        status: 'ACTIVE',
        difficulty: gameData.difficulty || 'MEDIUM'
    });
};

//PLAY MOVE 
export const playMove = async (gameId, userId, row, col) => {
    const game = await repo.findById(gameId);

    if(!game) throw new gameNotFoundError();

    if(game.status !== 'ACTIVE') throw new gameAlreadyFinishedError();

    //Player MOVE
    game.boardState[row][col] = 'X';

    let isWin = checkWinner(game.boardState, row, col, 'X');

    if(isWin){
        game.status = 'FINISHED';
        game.winner = 'X';
        return await repo.save(game);
    }

    //AI MOVE
    let ai;
    switch(game.difficulty){
        case 'EASY':
            ai = new EasyAI();
            break;
        case 'HARD':
            ai = new HardAI();
            break;
        default:
            ai = new MediumAI();
    }

    const move = ai.makeMove(game.boardState);

    if(move) {
        game.boardState[move.row][move.col] = 'O';
        
        isWin = checkWinner(game.boardState, move.row, move.col, 'O');

        if(isWin){
            game.status = 'FINISHED';
            game.winner = 'O';
        }
    }
    await repo.save(game);

    return game;
}

//HISTORY
export const getHistory = async (userId) => {
    return await repo.getHistory(userId);
}