// Importing dependencies: 
import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();
import { ErrorHandler } from './modules/shared/errorHandler.js';
import cookieParser from 'cookie-parser'
// Importing database:
import connectDb from './pool/db.js';
// Importing route:
import SubscriptionRoute  from './modules/subscriptionModules/subscription.route.js';
import paymentRoutes from './modules/paymentModule/payment.route.js';
import AuthRouter from './modules/authenticationModules/auth.route.js';
import IndexRouter from './modules/shared/index.route.js';
import AdminRouter from './modules/adminModules/admin.route.js';
import ProfileRouter from './modules/profileModules/profile.route.js';
// Configuration:
const app = express();
const port = process.env.PORT || 5000;
// Connect to database: 
connectDb();
// Middlewares: 
app.use(cors({
    origin: 'http://localhost:5173', // frontend origin:
    credentials: true, // for cookies
}));
app.use(cookieParser());
// Parsing requests into JSON format: 
app.use(express.json()) // Enable json formatting
// Setting routes: 
app.use('/', IndexRouter);
app.use('/subscriptions', SubscriptionRoute );
app.use('/auth', AuthRouter);
app.use('/payment', paymentRoutes);
app.use('/admin', AdminRouter);
app.use('/profile', ProfileRouter);

// invalid routes:
app.all('{*path}', (req, res, next) => {
    next(new AppError(404, `The route ${req.originalUrl} does not exist on this server.`)); 
});

// Error Handler
app.use(ErrorHandler);
// Listening on port: 
app.listen( port,()=>{
    console.log(`Server is running at ${port}`);
})

