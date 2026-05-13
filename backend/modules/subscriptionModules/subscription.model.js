import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    type: { type: String, enum: ['DEPOSIT', 'PURCHASE'], required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['WALLET', 'STRIPE'], required: true },
    status: { type: String, enum: ['SUCCESS', 'PENDING', 'FAILED'], default: 'PENDING' },
    stripeId: { type: String }, // For stripe logic
    createdAt: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;