// Importing dependencies: 
import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();
import { ErrorHandler } from './modules/shared/errorHandler.js';
// Importing database:
import connectDb from './pool/db.js';
// Importing route:
import SubscriptionRoute  from './modules/subscriptionModules/subscription.route.js';
import paymentRoutes from './modules/paymentModule/payment.route.js';
import AuthRouter from './modules/authenticationModules/auth.route.js';
import IndexRouter from './modules/shared/index.route.js';
// Configuration:
const app = express();
const port = process.env.PORT
// Connect to database: 
connectDb();
// Middlewares: 
app.use(cors({
    origin: 'http://localhost:5173', // frontend origin:
    methods: [ 'GET', 'POST', 'PUT', 'PATCH', 'DELETE' ], // Setting up http methods
    credentials: true, // for cookies
}));
// Parsing requests into JSON format: 
app.use(express.json()) // Enable json formatting
// Setting routes: 
app.use('/', IndexRouter);
app.use('/subscription', SubscriptionRoute );
app.use('/auth', AuthRouter);
// Error Handler
app.use(ErrorHandler);
// Listening on port: 
app.listen( port,()=>{
    console.log(`Server is running at ${port}`);
})

