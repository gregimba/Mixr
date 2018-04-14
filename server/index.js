<<<<<<< HEAD
const models = require('../server/database')
const express = require('express');
const path = require('path');
=======
const express = require("express");
const path = require("path");
const pg = require("pg");
const models = require("./database/models")
>>>>>>> parent of 373a5fe... rebase: working on the single drink query

const app = express();

app.use("/", express.static(path.join(__dirname, "../client/dist")));
<<<<<<< HEAD

// Obj. of single drink
app.get("/drinks/:id", (req, res) => {});

// Array of drink matches
app.get("/user/:id/drinks", (req, res) => {});

// Adding user ingrindents to the DB
app.post("/user/:id/ingredients/:id", (req, res) => {});

// Array of ingredients
app.get("/user/:id/ingredients", (req, res) => {});
=======

// Will be quering a drinkId and send back the object of a single drink.
app.get("/drink/:drinkId", (req, res) => {
  let drinkId = req.params.drinkId;

  let singleDrinkQuery = Drink.findById({
    where: { drink_id: drinkId },
    include: [{
        model: Drink_ingredient,
        include: [{
            model: Ingredient
          }]
      }]
  });

  let singleDrink = {};

  console.log(singleDrinkQuery);



  res.send(singleDrink);
});

// Array of drink matches for a user
app.get("/user/:userId/drinks", (req, res) => {});

// Adding user "liked" ingrindents to the DB
app.post("/user/:userId/ingredients/:ingredientId", (req, res) => {});

// Array of ingredients matches for user
app.get("/user/:userId/ingredients", (req, res) => {});
>>>>>>> parent of 373a5fe... rebase: working on the single drink query

app.listen(3000, () => console.log("Example app listening on port 3000!"));
