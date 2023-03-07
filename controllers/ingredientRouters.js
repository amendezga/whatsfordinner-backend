const express = require('express')
const router =express.Router();
const Ingredient = require('../models/Ingredient');
const inredientData = require('../ingredientData')

router.get("/refrigerator/seed", (req, res) => {
    Ingredient.deleteMany({}, (error, results) => {
        Ingredient.create(data, (error, ingredients) => {
        // console.log(error, teachers);
        res.redirect("/refrigerator");
      });
    });
  });

router.get("/refrigerator", async (req, res) => {
    try {
      res.status(200).json(await Ingredient.find({}));
    } catch (error) {
      res.status(400).json({ message: "something went wrong" });
    }
  });

  router.post('/refrigerator', async (req, res) => {
    try {
      res.status(201).json(await Ingredient.create(req.body));
    } catch (error) {
      res.status(400).json({ message: "something went wrong" });
    }
  });
  module.exports = router