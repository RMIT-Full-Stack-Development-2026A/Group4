
import mongoose from 'mongoose';

const gameSessionSchema = new mongoose.Schema({
    host_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    guest_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' }, // Null for AI/Local

    host_name: { type: String, required: true },
    guest_name: { type: String, required: true }, // "AI Bot" or Player 2 Name
    
    gameType: { type: String, enum: ['MULTIPLAYER', 'AI'], required: true },
    
    boardSize: { type: Number, enum: [10, 15], default: 10 },
    status: { type: String, enum: [ 'ACTIVE', 'FINISHED', 'ABORTED' ], default: 'ACTIVE' },

    winner: { type: String, default: null }, // 'X', 'O', or 'Draw'
    winningLine: { type: [ { _id: false, row:{ type: Number, required: true,}, col: {type: Number, required: true} }], default: [] }, // Indices of the 5 winning marks
    
    // game info:
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date },

    // Board state
    board: {type: [[String]], required: true},
    markers: { type: [String], default: ['X', 'O'], required: true },

    // First player and marker:
    currentPlayer: {type: String, required: true},
    currentMarker: {type: String, required: true},
});

const GameSession = mongoose.model('GameSession', gameSessionSchema);
export default GameSession;