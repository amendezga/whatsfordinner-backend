const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

// index
router.get('/recipes', async (req, res) => {
    try {
        res.status(200).json(await Recipe.find({}));
    } catch (error) {
        res.status(400).json({
            message: 'something went wrong'
        });
    }
});

// delete

// update

// create
router.post('/recipes', async (req, res) => {
    try {
        res.status(201).json(await Recipe.create(req.body));
    } catch (error) {
        res.status(400).json({
            message: 'something went wrong'
        });
    }
});

// show
router.get('/recipes/:id', async (req, res) => {
    try {
        res.status(200).json(await Recipe.findById(req.params.id));
    } catch (error) {
        res.status(400).json({
            message: 'something went wrong'
        });
    }
});


module.exports = router;