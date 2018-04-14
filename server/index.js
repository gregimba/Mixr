const express = require("express");
const path = require("path");
const pg = require("pg");
const models = require("./database/models")

const app = express();

app.use("/", express.static(path.join(__dirname, "../client/dist")));

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
<<<<<<< HEAD
  })
  .then( drink => {
    let singleDrink = Object.assign(
      {},
      {
        drinkId: drink.id,
        drinkName: drink.name,
        drinkInstructions: drink.instructions,
        drinkGlass: drink.glass,
        drinkImage: drink.image,
// ??? Not sure if this will work.
// Trying to match ingredient name with measurements for a single drink.
        drinkIngredients: drink.ingredient.map( ingredient => {

        })
      }
    )
    return singleDrink;
  })
  .catch(err => {
    console.log(err)
  })

  // Create a new object which contains the relevant information from the query
  // let singleDrink = {};
  // let singleDrinkIngredientsAndMeasures = {};
  //
  // console.log(singleDrinkQuery);
  //
  // if(singleDrink === undefined){
  //   singleDrink.drinkId = singleDrinkQuery.id;
  //   singleDrink.drinkName = singleDrinkQuery.name;
  //   singleDrink.drinkInstruction = singleDrinkQuery.instrction;
  //   singleDrink.drinkGlass = singleDrinkQuery.glass;
  //   singleDrink.drinkImage = singleDrinkQuery.image;
  //
  //   // singleDrinkIngredientsAndMeasures.ingredientId = singleDrinkQuery.Ingredient.id;
  //   // singleDrinkIngredientsAndMeasures.ingredientName = singleDrinkQuery.Ingredient.name;
  //   //
  //   // singleDrink.ingredient = singleDrinkQuery.DrinkIngredient.measure;
  //
  //   console.log(singleDrink);
  // }

  console.log(singleDrinkQuery)

  res.send(singleDrinkQuery);
});

// Array of drink matches for a user
app.get("/user/:userId/drinks", (req, res) => {
  let userId = req.params.userId;

  let userDrinks = User.findAll({
    where: { user_id: userId },
    include: [{
      model: Drink
    }]
  }).then( user => {
=======
  });
>>>>>>> parent of 373a5fe... rebase: working on the single drink query

  let singleDrink = {};

  console.log(singleDrinkQuery);


<<<<<<< HEAD
  // Add ingredient to user in interjoin table
  res.sendStatus(200);
=======

  res.send(singleDrink);
>>>>>>> parent of 373a5fe... rebase: working on the single drink query
});

// Array of drink matches for a user
app.get("/user/:userId/drinks", (req, res) => {});

// Adding user "liked" ingrindents to the DB
app.post("/user/:userId/ingredients/:ingredientId", (req, res) => {});

// Array of ingredients matches for user
app.get("/user/:userId/ingredients", (req, res) => {});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
