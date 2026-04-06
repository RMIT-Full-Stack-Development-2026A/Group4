// Model representing a subscription
import mongoose from 'mongoose';
// Defining the schema:
const subscriptionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    purchasedTime: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        enum: [],
        required: true,
    }
});
// Creating the model:
const Subscription = mongoose.model('Subscription',subscriptionSchema)
// Exporting: 
export default Subscription;