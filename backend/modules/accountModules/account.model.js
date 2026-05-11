import mongoose from 'mongoose';

// Defining schema for user
const accountSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    hashedPassword: { type: String, required: true },
    userRole: { type: String, enum: ['PLAYER', 'ADMIN'], default: 'PLAYER' },
    isActive: { type: Boolean, default: true },
    failedAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date, default: null }
}, { timestamps: true });

// Defining model for user account
const Account = mongoose.model('Account', accountSchema);

// Export
export default Account;