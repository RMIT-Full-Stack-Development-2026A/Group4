import * as repo from './game.repository.js';


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

    if(!game) throw new Error('Game not found');
    if(game.status !== 'ACTIVE') throw new Error('Game Finished');

    const player = game.host_id.toString() === userId ? 'X' : 'O';
    
    if(player !== game.currentTurn) {
        throw new Error('Not your turn');
    }

    if(game.boardState[row][col] !== ''){
        throw new Error('Cell occupied');
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


// Finalizes the record
export const finishGame = async (gameId, resultData) => {
    const result = {
        status: resultData.status, // 'FINISHED' or 'ABORTED'
        endTime: Date.now()
    };

    // Only record winner/line if the game was actually completed
    if (resultData.status === 'FINISHED') {
        result.winner = resultData.winner;
        result.winningLine = resultData.winningLine;
    }

    return await repo.updateSessionData(gameId, result);
};

// Fetching history for the profile page
export const getPlayerHistory = async (userId) => {
    return await repo.getHistoryByUser(userId);
};