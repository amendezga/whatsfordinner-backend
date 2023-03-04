// dependencies
const express = require('express');

// initialize app
const app = express();

// configure settings
require('dotenv').config();
const PORT = process.env.PORT;

// connect database


// mount middleware


// test route
app.get('/', (req, res) => {
    res.send('hello');
});

// app listen
app.listen(PORT, () => {
    console.log(`express is listening on port: ${PORT}`);
});