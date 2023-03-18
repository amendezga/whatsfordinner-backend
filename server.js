// dependencies
const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose');
const ingredientRouters = require('./controllers/ingredientRouters');
const recipeRouter = require('./controllers/recipes');

// initialize app
const app = express();
const admin = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth');

// configure settings
require('dotenv').config();
const {
  PORT,
  DATABASE_URL,
  PRIVATE_KEY_ID,
  PRIVATE_KEY,
  CLIENT_ID
} = process.env;


admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "what-s-for-dinner-41da2",
    "private_key_id": PRIVATE_KEY_ID,
    "private_key": PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": "firebase-adminsdk-rznfv@what-s-for-dinner-41da2.iam.gserviceaccount.com",
    "client_id": CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-rznfv%40what-s-for-dinner-41da2.iam.gserviceaccount.com"
  })
});

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

app.use(async function (req, res, next) {
  const token = req.get('Authorization');
  if (token) {
    const user = await getAuth().verifyIdToken(token.replace('Bearer ', ''));
    req.user = user;
  } else {
    req.user = null;
  }
  next();
});

function isAuthenticated (req, res, next) {
  if (!req.user) return res.status(401).json({
    message: 'you must be logged in to access'
  });
  next();
}

app.use(isAuthenticated, ingredientRouters)
app.use(isAuthenticated, recipeRouter);

// test route
app.get('/', (req, res) => {
    res.send('hello');
});

// app listen
app.listen(PORT, () => {
    console.log(`express is listening on port: ${PORT}`);
});