// Importing dependencies: 
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Shared Utilities:
import { ErrorHandler } from './modules/shared/errorHandler.js';
import AppError from './modules/shared/AppError.js';

// Database:
import connectDb from './pool/db.js';

// Route Imports - Updated to match our new consolidated folders
import AccountRouter from './modules/accountModules/account.route.js';
import SubscriptionRouter from './modules/subscriptionModules/subscription.route.js';
import AdminRouter from './modules/adminModules/admin.route.js';
import ProfileRouter from './modules/profileModules/profile.route.js';
import IndexRouter from './modules/shared/index.route.js';
import GameRouter from './modules/gameSessionModules/game.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to database:
connectDb();

// Middlewares:
app.use(cors({
    origin: `${process.env.CLIENT_URL}`,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Setting routes
app.use('/', IndexRouter);
app.use('/auth', AccountRouter);
app.use('/subscription', SubscriptionRouter);
app.use('/admin', AdminRouter);
app.use('/profile', ProfileRouter);
app.use('/game', GameRouter); 

// Any undefined route: 
app.all('/{*splat}', (req, res, next) => {
    next(new AppError(404, `The route ${req.originalUrl} does not exist on this server.`)); 
});

// Global Error Handler
app.use(ErrorHandler);

// Listening on port
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});