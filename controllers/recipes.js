const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

// index
router.get('/recipes', async (req, res) => {
    try {
        res.status(200).json(await Recipe.find({
            addedBy: req.user.uid
        }));
    } catch (error) {
        res.status(400).json({
            message: 'something went wrong'
        });
    }
});

// delete
router.delete('/recipes/:id', async (req, res) => {
    try {
        res.status(200).json(await Recipe.findOneAndDelete({
            addedBy: req.user.uid,
            _id: req.params.id
        }));
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
            await Recipe.findOneAndUpdate({
                addedBy: req.user.uid,
                _id: req.params.id
            }, req.body, {
                new: true
            })
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
        req.user.addedBy = req.user.uid;
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
        res.status(200).json(await Recipe.findOne({
            addedBy: req.user.uid,
            _id: req.params.id
        }));
    } catch (error) {
        res.status(400).json({
            message: 'something went wrong'
        });
    }
});


module.exports = router;