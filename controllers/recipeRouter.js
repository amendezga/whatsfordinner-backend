const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

// index

// delete

// update

// create
router.post('/recipes', async (req, res) => {
    try {
        res.status(201).json(await Recipe.create(req.body))
    } catch (error) {
        res.status(400).json({
            message: 'something went wrong'
        });
    }
});

// show


module.exports = router;