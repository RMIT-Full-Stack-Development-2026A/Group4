// Importing dependencies: 
import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';

// Configuration:
dotenv.config();
const app = express();
const port = process.env.PORT

// Middlewares: 
app.use(express.json()) // Enable json formatting
app.use(cors({
    origin: 'http://localhost:5143', // frontend origin:
    methods: ['GET', 'POST', 'PUT', 'DELETE'] // Setting up http methods
}))

// Importing database:
import connectDb from './pool/db.js';

// Connect to database: 
connectDb();

// Listening on port: 
app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})

