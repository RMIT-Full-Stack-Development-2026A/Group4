// Representing a user model: 
import mongoose from 'mongoose';

// Defining schema for user:
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, unique: true, required: true },
    hashedPassword: { type: String, required: true },
    userRole: { type: String, enum: ['PLAYER', 'ADMIN'] }, 
    premiumStatus: { enum: ['DEACTIVATED', 'NOT_PURCHASED', 'ACTIVE']},
    country: { type: String }, 
    walletBalance: { type: Number, default: 0 },
    logoUrl : { type: String, default: ''},
})

// Defining model for user: 
const User = mongoose.model('User', userSchema);

// Export:
export default User;