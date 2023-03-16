const express = require('express')
const router = express.Router();
const inredientData = require('../ingredientData')
const Ingredient = require('../models/Ingredient');

router.get("/refrigerator/seed", (req, res) => {
  Ingredient.deleteMany({}, (error, results) => {
    Ingredient.create(data, (error, ingredients) => {

      res.redirect("/refrigerator");
    });
  });
});

//Index routes
router.get("/refrigerator", async (req, res) => {
  try {
    res.status(200).json(await Ingredient.find({
      addedBy: req.user.uid
    }));
  } catch (error) {
    res.status(400).json({
      message: "something went wrong"
    });
  }
});

//Delete routes
router.delete('/refrigerator/:objId', async (req, res) => {
  try {
    res.status(200).json(await Ingredient.findOneAndDelete({
      addedBy: req.user.uid,
      _id: req.params.objId
    }))
  } catch (error) {
    res.status(400).json({
      message: "something went wrong"
    })
  }
});

//Updates routes
router.put('/refrigerator/:objId', async (req, res) => {
  try {
    res.status(200).json(
      await Ingredient.findOneAndUpdate({
        addedBy: req.user.uid,
        _id: req.params.objId
      }, req.body, {
        new: true
      })
    );
  } catch (error) {
    res.status(400).json({
      message: "something went wrong"
    });
  }
});

//Create routes
router.post('/refrigerator', async (req, res) => {
  try {
    req.body.addedBy = req.user.uid;
    res.status(201).json(await Ingredient.create(req.body));
  } catch (error) {
    res.status(400).json({
      message: "something went wrong"
    });
  }
});

module.exports = router