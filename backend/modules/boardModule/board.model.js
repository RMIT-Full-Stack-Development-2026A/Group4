// Defining a board layout for css styling
import mongoose from "mongoose";

// Defining the schema
const boardSchema = mongoose.Schema({
    // The grid layouts - normal 10x10, large 15x15
    name: { type: String},
    layout: { type: String, enum: ['NORMAL', 'LARGE'], required },
    // The background color - string of hex code
    backgroundColor: {type: String, required},
    // The border color
    borderColor: {type: String, required},
    // Marker set: 
    markerX: {type: String},
    markerO: {type: String}
});

// Creating model
const Board = mongoose.model("Board", boardSchema);

// Exporting
export default Board;
