// dependencies
const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose');
const Ingredient = require('./models/Ingredient');
const ingredientRouters = require('./controllers/ingredientRouters');
const recipeRouter = require('./controllers/recipes');

// initialize app
const app = express();

// configure settings
require('dotenv').config();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL

// connect database
mongoose.set('strictQuery', true)
mongoose.connect(DATABASE_URL);
mongoose.connection
  .on("open", () => console.log("You are connected to MongoDB"))
  .on("close", () => console.log("You are disconnected from MongoDB"))
  .on("error", (error) => console.log(`MongoDB Error: ${error.message}`));
  
// mount middleware
app.use(cors()); 
app.use(morgan("dev")); 
app.use(express.json()); 

<<<<<<< HEAD
const ingredientData = require('./ingredientData');

app.use(ingredientRouters)
=======
app.use('/refrigerator',ingredientRouters)
app.use(recipeRouter);

>>>>>>> main
// test route
app.get('/', (req, res) => {
    res.send('hello');
});

// app listen
app.listen(PORT, () => {
    console.log(`express is listening on port: ${PORT}`);
});