// Importing dependencies: 
import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import { ErrorHandler } from './modules/shared/errorHandler.js';

// Configuration:
dotenv.config();
const app = express();
const port = process.env.PORT

// Connect to database: 
connectDb();

// Middlewares: 
app.use(express.json()) // Enable json formatting
app.use(cors({
    origin: 'http://localhost:5143', // frontend origin:
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Setting up http methods
    credentials: true // for cookies
}))

app.use(errorHandler);

// Importing database:
import connectDb from './pool/db.js';
<<<<<<< HEAD
// Connect to database: 
connectDb();

// Importing route:
import subscriptionRoute from './modules/subscriptionModules/subscription.route.js';
// Setting routes: 
app.use( '/subscription', subscriptionRoute );
=======
>>>>>>> origin/main

// Listening on port: 
app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})

