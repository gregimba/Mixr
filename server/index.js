const express = require("express");
const path = require("path");
const pg = require("pg");
const models = require("./database/models");
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

// console.log(models.sequelize)

const app = express();

app.use("/", express.static(path.join(__dirname, "../client/dist")));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use(function(req, res, next) {
//   req.models = require('./database/models');
//   next();
// });

// Will be quering a drinkId and send back the object of a single drink.
app.get("/drink/:drinkId", (req, res) => {
  let drinkId = req.params.drinkId;
  console.log('******DRINK ID:', drinkId)
  console.log("**********", typeof models.DrinkIngredient)

  let singleDrinkQuery = models.DrinkIngredient.findAll({
    where: { drinkId: drinkId },
    include: [{
        model: 'DrinkIngredient',
        include: [{
            model: 'Ingredient'
          }]
      }]
  })
  .then( drink => {
    return Object.assign(
      {},
      {
        drinkId: drink.id,
        drinkName: drink.name,
        drinkInstructions: drink.instructions,
        drinkGlass: drink.glass,
        drinkImage: drink.image,
        ingredients: drink.ingredient
      }
    )
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

  })

  let userDrinksList = [];
  let singleDrink = {};

// forEach drink that belong to a user
  singleDrink.Drink.id;
  singleDrink.Drink.name;
  singleDrink.Drink.image;

  res.send(userDrinksList)
});

// Adding user "liked" ingrindents to the DB
app.post("/user/:userId/ingredients/:ingredientId", (req, res) => {

  let userIdToStore = req.params.userId;
  let username = req.body.username;
  let ingredientIdToStore = req.params.ingredientId;
  let ingredient = req.body.ingredient;

  // Add ingredient to user in interjoin table

});

// Array of ingredients matches for user, returns array of all 'liked' ingredients
app.get("/user/:userId/ingredients", (req, res) => {
  let userId = req.params.userId;

  let likedIngredientList = User.findAll({
    where: { userId: userId},
    include:[{
      model: Ingredient,

    }]
  })
});

// Returns a Single "non-liked" ingredient (reverse of "liked" ingredients list)
app.get("/user/:userId/ingredient", (req, res) => {});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
