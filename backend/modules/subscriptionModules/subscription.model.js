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
    },
    stripeSubscriptionId: {
        type: String,
        required: true,
        unique: true,
    }
});

// All plans offered by the application:
const subscriptionPlanSchema = new mongoose.Schema({
    name: {type: String, required: true},
    stripePriceId: {type: String, required: true},
    price: {
        type: Number,
        required: true,
    },
    features: [String],
    isActive: {type: Boolean, default: true}

});
// Creating the model:
const Subscription = mongoose.model('Subscription',subscriptionSchema)
export const SubscriptionPlan = mongoose.model('SubscriptionPlan', subscriptionPlanSchema)
// Exporting: 
export default Subscription;