// Importing dependencies: 
const express = require('express');
const app = express();
require('dotenv').config();
// Importing environment variables:
const port = process.env.PORT
// Routes: 


app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})
