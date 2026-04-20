// Importing dependencies: 
import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import { ErrorHandler } from './modules/shared/errorHandler.js';
// Importing database:
import connectDb from './pool/db.js';
// Importing route:
import subscriptionRoute from './modules/subscriptionModules/subscription.route.js';

// Configuration:
dotenv.config();
const app = express();
const port = process.env.PORT

// Connect to database: 
connectDb();

// Middlewares: 
app.use(cors({
    origin: 'http://localhost:5143', // frontend origin:
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Setting up http methods
    credentials: true // for cookies
}))
app.use(errorHandler);

// Setting routes: 
app.use( '/subscription', subscriptionRoute );
//Route for payment
// Parsing requests into JSON format: 
app.use(express.json()) // Enable json formatting

// Listening on port: 
app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})

