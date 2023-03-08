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
router.delete('/recipes/:id', async (req, res) => {
    try {
        res.status(200).json(await Recipe.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(400).json({
            message: 'something went wrong'
        });
    }
});

// update
router.put('/recipes/:id', async (req, res) => {
    try {
        res.status(200).json(
            await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
            );
    } catch (error) {
        res.status(400).json({
            message: 'something went wrong'
        });
    }
});

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