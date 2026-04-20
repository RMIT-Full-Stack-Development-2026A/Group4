// Model representing a subscription
import mongoose from 'mongoose';
// Defining the schema:
const subscriptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    purchasedTime: {
        type: Date,
    },
    subscriptionStatus: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'
    },
    price: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'paypal', 'bank_transfer'],
        required: true,
    }
});
// Creating the model:
const Subscription = mongoose.model('Subscription',subscriptionSchema)
// Exporting: 
export default Subscription;