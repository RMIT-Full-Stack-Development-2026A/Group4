import express from 'express';
const IndexRouter = express.Router();

IndexRouter.get('/', ()=>{
    console.log("Hello");
})

export default IndexRouter