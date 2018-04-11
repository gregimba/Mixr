const express = require("express");
const path = require("path");
const pg = require("pg");
const db = require("./database/models")

const app = express();

app.use("/", express.static(path.join(__dirname, "../client/dist")));

// Will be quering a drinkId and send back the object of a single drink.
app.get("/drink/:drinkId", (req, res) => {
  let drinkId = req.params.drinkId;

  let drink = Drink.findById({
    where: { drink_id: drinkId },
    include: [{
        model: Drink_ingredient,
        include: [{
            model: Ingredient
          }]
      }]
  });

  res.send(drink);
});

// Array of drink matches for a user
app.get("/user/:userId/drinks", (req, res) => {});

// Adding user "liked" ingrindents to the DB
app.post("/user/:userId/ingredients/:ingredientId", (req, res) => {});

// Array of ingredients matches for user
app.get("/user/:userId/ingredients", (req, res) => {});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
