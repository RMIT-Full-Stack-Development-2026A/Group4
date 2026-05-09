// Importing dependencies: 
import mongoose from 'mongoose';
// Schema: representing a game session
const gameSessionSchema = new mongoose.Schema({
    startTime:{ type: Date, default: Date.now ,required: true, },
    endTime: { type: Date },
    gameType: {
        type: String,
        enum: ['SINGLE_PLAYER', 'MULTIPLAYER', 'ONLINE'],
        required: true,
    },
    PlayerOne: {
        type: mongoose.Schema.Types.ObjectId, // Storing the id of the player
        ref: 'User',
        required: true,
    },
    // if it's online:
    onlineSecondPlayer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
    // If it's local: 
    offlineSecondPlayer: {
        type: String,
        required: false
    },
    // Status of the game: 
    gameStatus: {
        type: String,
        enum: ['ACTIVE', 'FINISHED'],
        required: true,
    },
    // Board information:
    boardSize: {
        type: Number,
        enum: [10,15],
        default: 10,
        required: true,
    },
    boardStyle: {
        type: String,
        required: true,
    },
    boardState: {
        type: [[String]],
        default: [],
    },
    // Online information: 
    roomNumber: {
        type: String,
        required: true,
        unique: true,
    }, 
    winner: {
        type: String,
        default: "Undefined"
    },
})
// Creating a model: 
export const GameSession = mongoose.model("GameSession", gameSessionSchema)