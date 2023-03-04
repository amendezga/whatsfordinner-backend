// dependencies
const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

// initialize app
const app = express();

// configure settings
require('dotenv').config();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL

// connect database
mongoose.set('strictQuery', false)
mongoose.connect(DATABASE_URL);
mongoose.connection
  .on("open", () => console.log("You are connected to MongoDB"))
  .on("close", () => console.log("You are disconnected from MongoDB"))
  .on("error", (error) => console.log(`MongoDB Error: ${error.message}`));

// mount middleware
app.use(cors()); 
app.use(morgan("dev")); 
app.use(express.json()); 

// test route
app.get('/', (req, res) => {
    res.send('hello');
});

// app listen
app.listen(PORT, () => {
    console.log(`express is listening on port: ${PORT}`);
});