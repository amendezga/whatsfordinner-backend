// dependencies
const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose');
const Ingredient = require('./models/Ingredient');
const ingredientRouters = require('./controllers/ingredientRouters');

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

app.use('/refrigerator',ingredientRouters)
// test route
app.get('/', (req, res) => {
    res.send('hello');
});

const inredientData = require('./ingredientData');
const ingredientData = require('./ingredientData');
 app.get("/refrigerator/seed", (req, res) => {
    Ingredient.deleteMany({}).then(function(){
        Ingredient.create(ingredientData).then(()=>res.redirect('/refrigerator'))
    })
 })

  app.get("/refrigerator", async (req, res) => {
    try {
      res.status(200).json(await Ingredient.find({}));
    } catch (error) {
      res.status(400).json({ message: "something went wrong" });
    }
  });
  app.post('/refrigerator', async (req, res) => {
    try {
      res.status(201).json(await Ingredient.create(req.body));
    } catch (error) {
      res.status(400).json({ message: "something went wrong" });
    }
  });
// app listen
app.listen(PORT, () => {
    console.log(`express is listening on port: ${PORT}`);
});