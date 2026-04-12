import mongoose from 'mongoose'

// Defining schema for user profile
const userProfileSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    country: { type: String, required: true },
    avatarUrl: { type: String, default: null },
    wallet_balance: { type: Number, default: 0.00, min: 0 },
    isPremium: { type: Boolean, default: false },
    premiumExpiryDate: { type: Date, default: null }
});

// Defining model for user profile
const Profile = mongoose.model('UserProfile', userProfileSchema);

// Export
export default Profile;