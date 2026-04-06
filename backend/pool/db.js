// Configuration for database: 
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Connecting to database:
const connectDb = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Successfully connected to ${db.connection.host}`);
    }
    catch (err) {
        console.error(err);
    }
}

export default connectDb;
