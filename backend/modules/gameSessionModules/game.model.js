import mongoose from 'mongoose';
// Schema: representing a game session
const gameHistoryModel = new mongoose.Schema({
    startTime:{ type: Date, required: true, },
    endTime: { type: Date, required: true, },
    gameType: {
        enum: ['SINGLE_PLAYER', 'MULTIPLAYER', 'ONLINE'],
        required: true,
    },
    PlayerOne: {
        type: mongoose.Schema.Types.ObjectId, // Storing the id of the player
        ref: 'User',
        required: true,
    },
    onlineSecondPlayer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
    offlineSecondPlayer: {
        type: String,
        required: false
    },
    gridLayout: {

    },
    gameStatus: {
        enum: ['ACTIVE', 'FINISHED'],
        required: true,
    },
    boardSize: {

    },
    boardStyle: {
        
    },
})
// Schema: representing the game history;
const gameSession = new mongoose.Schema({
    
})
// 