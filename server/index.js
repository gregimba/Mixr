const express = require("express");
const path = require("path");
const pg = require("pg");
// const models = require("./database/models");
const bodyParser = require('body-parser');
const { sequelize, Sequelize } = require('../server/database/models');
const db = sequelize.models;
const Op = Sequelize.Op
// const Sequelize = require('sequelize');

const app = express();

app.use("/", express.static(path.join(__dirname, "../client/dist")));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Adding user "liked" ingrindents to the DB
app.post("/user/:userId/ingredients/:ingredientId", (req, res) => {

  // console.log("REQ", req.params)

  let userID = req.params.userId;
  let ingredientID = req.params.ingredientId;
  // console.log("UserID", userID)
  // console.log("ingredientID", ingredientID)
  // console.log("models:", models.sequelize.models)

  // Add ingredient to user in interjoin table
  db.user_ingredient.findOrCreate({
      where: {
        userId: userID,
        ingredientId: ingredientID,
      },
    })
  .then((data) => {
    console.log("****You Created A User!!!")
    // res.send.bind(res)
    res.send(data)
    // res.sendStatus(201);
  })
  .catch("Error Posting to DB")
});

// Will be quering a drinkId and send back the object of a single drink.
app.get("/drink/:drinkId", (req, res) => {
  let drinkID = req.params.drinkId;

  db.Drink.find({
    where: { id: drinkID}
  })
  .then(drinkInfo => {
    db.DrinkIngredient.findAll({
      where: { drinkId: drinkID },
      include: [{
        model: db.Ingredient
      }]
    })
    .then( singleDrinkIngredients => {

      let drinkIngredients = {};

      singleDrinkIngredients.forEach( ingredient => {

        let ingredientName = ingredient.Ingredient.dataValues.name;
        let ingredientMeasure = ingredient.dataValues.measure;

        drinkIngredients[ingredientName] = ingredientMeasure;
      })

      let singleDrink = Object.assign(
        {},
        {
          drinkId: drinkInfo.id,
          drinkName: drinkInfo.name,
          drinkInstructions: drinkInfo.instructions,
          drinkGlass: drinkInfo.glass,
          drinkImage: drinkInfo.image,
          DrinkIngredients: drinkIngredients,
        })
        res.json(singleDrink)
    })
    .catch(err => {
      console.log("Error:", err)
    });
  })
  .catch( err => {
    console.log("Error:", err)
  });
});

// Array of drink matches for a user
app.get("/user/:userId/drinks", (req, res) => {
  let userID = req.params.userId;
  db.User.findAll({
    where: { id: userID },
    include: [{
        model: db.Drink,
        attributes: ['id', 'name', 'image'],
      }]
  })
  .then( user => {
    let userDrinkList = [];
    user[0].Drinks.forEach( drink => {
      let userDrink = Object.assign(
        {},
        {
          drinkId: drink.dataValues.id,
          drinkName: drink.dataValues.name,
          drinkImage: drink.dataValues.image
        }
      )
      userDrinkList.push(userDrink);
    })
    res.send(userDrinkList)
  })
  .catch( err => {
    console.log("!!!Error:", err)
  })
});

// Array of ingredients matches for user, returns array of all 'liked' ingredients
app.get("/user/:userId/ingredients", (req, res) => {
  let userID = req.params.userId;

  db.User.findAll({
    where: { id: userID },
    include: [{
        model: db.Ingredient,
        attributes: ['id', 'name'], // 'image'
      }]
  })
  .then( user => {
    let likedIngredientList = [];
    user[0].Ingredients.forEach( ingredient => {
      let userIngredient = Object.assign(
        {},
        {
          ingredientId: ingredient.dataValues.id,
          ingredientName: ingredient.dataValues.name,
    //       drinkImage: drink.dataValues.image
        }
      )
      likedIngredientList.push(userIngredient);
    })
    res.send(likedIngredientList)
  })
  .catch( err => {
    console.log("!!!Error:", err)
  });
});

// Returns a Single "non-liked" ingredient
// (reverse of "liked" ingredients list and then send back a single random 'non-liked' ingredient)
app.get("/user/:userId/randomIngredient", (req, res) => {
  let userID = req.params.userId;

  db.Ingredient.findAll({
    attributes: ['id', 'name'],
  })
  .then( ingredients => {
    db.User.findAll({
      where: { id: userID },
      include: [{
        model: db.Ingredient,
        attributes: ['id', 'name'],  // 'image'
      }]
    })
    .then( user => {

      // Creates a list of all the ingrdients in the database
      let listOfAllIngredients = [];
      ingredients.forEach( ingredient => {
        let allIngredients = Object.assign(
          {},
          {
            ingredientId: ingredient.dataValues.id,
            ingredientName: ingredient.dataValues.name,
            // drinkImage: drink.dataValues.image
          }
        )
        listOfAllIngredients.push(allIngredients);
      })
      listOfAllIngredients.pop();

      // Creates a list of all the 'liked' ingredients for a user
      let likedIngredientList = [];
      user[0].Ingredients.forEach( ingredient => {
        let userIngredient = Object.assign(
          {},
          {
            ingredientId: ingredient.dataValues.id,
            ingredientName: ingredient.dataValues.name,
            // drinkImage: drink.dataValues.image
          }
        )
        likedIngredientList.push(userIngredient);
      })

      console.log('INGR', listOfAllIngredients)
      console.log('LikedIngr', likedIngredientList)

      // Creates a list of 'non-liked' ingredients
      // let notLikedIngredientList = [];
      //
      // likedIngredientList.forEach( likedIngredient => {
      //
      //   if( allIngredient.ingredientName !== likedIngredient.ingredientName ){
      //     notLikedIngredientList.push()
      //   }
      //
      // })

      // Selects a random index in the 'non-liked' list and
      // sends back an object with the ingredient's name, id and image??

      // res.send(likedIngredientList)
    })

  })
  .catch( err => {
    console.log("!!!Error:", err)
  })
});

// db.sequelize.sync().then(() => {
  app.listen(3000, () => console.log("Example app listening on port 3000!"));
// });
