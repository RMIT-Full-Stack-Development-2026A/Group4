// Configuration for database: 
import mongoose from 'mongoose';
// Note: Removed dotenv.config() from here because it's 
// already called in index.js. No need to call it twice!

// Connecting to database:
const connectDb = async () => {
    try {
        //const db = await mongoose.connect(process.env.MONGO_URL);
        const db = await mongoose.connect("mongodb+srv://nghoangson0810_db_user:Hoangson0810@cluster0.5mezmei.mongodb.net/?appName=Cluster0");
        console.log(`Successfully connected to ${db.connection.host}`);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}

export default connectDb;
