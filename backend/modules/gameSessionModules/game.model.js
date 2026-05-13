
import mongoose from 'mongoose';

const gameSessionSchema = new mongoose.Schema({
    host_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    guest_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' }, // Null for AI/Local

    host_name: { type: String, required: true },
    guest_name: { type: String, required: true }, // "AI Bot" or Player 2 Name
    
    gameType: { type: String, enum: ['SINGLE', 'LOCAL'], required: true },

    boardSize: { type: Number, enum: [10, 15], default: 10 },
    
    status: { type: String, enum: ['ACTIVE', 'FINISHED', 'ABORTED'], default: 'ACTIVE' },

    winner: { type: String, default: null }, // 'X', 'O', or 'Draw'
    winningLine: { type: [Number], default: [] }, // Indices of the 5 winning marks
    
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date }
});

const GameSession = mongoose.model('GameSession', gameSessionSchema);
export default GameSession;