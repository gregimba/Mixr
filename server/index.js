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

// Will be quering a drinkId and send back the object of a single drink.
app.get("/drink/:drinkId", (req, res) => {
  let drinkID = req.params.drinkId;
  let drinkInfo = {};
  let singleDrinkIngredients = [];
  console.log('******DRINK ID:', drinkId)
  console.log("**********", typeof models.DrinkIngredient)

  models.Drink.find({
    where: { id: drinkID}
  })
  .then(drinkIn => {
    // console.log(JSON.stringify(drinkIn))
    return drinkInfo = JSON.stringify(drinkIn);
  })
  .catch( err => {
    console.log("Error:", err)
  });

  models.DrinkIngredient.findAll({
    where: { drinkId: drinkID },
    // include: [{
        // model: models.Drink,
        include: [{
            model: models.Ingredient
          }]
      // }]
  })
  .then( drink => {
    // console.log(JSON.stringify(drink));
    return singleDrinkIngredients = JSON.stringify(drink)
    // res.json(drink);
  })
  .catch(err => {
    console.log("Error:", err)
  });

  console.log("DRINK INFO:", drinkInfo)
  console.log("INGREDIENTS:", singleDrinkIngredients)
  let singleDrink = Object.assign(
    {},
    {
      // drinkId: drinkInfo.id,
    })
  res.send(singleDrink)
});

// Array of drink matches for a user
app.get("/user/:userId/drinks", (req, res) => {
  let userID = req.params.userId;
  models.User.findAll({
    where: { id: userID },
    include: [{
        model: models.Drink,
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

// Adding user "liked" ingrindents to the DB
app.post("/user/:userId/ingredients/:ingredientId", (req, res) => {

  let userIdToStore = req.params.userId;
  let username = req.body.username;
  let ingredientIdToStore = req.params.ingredientId;
  let ingredient = req.body.ingredient;

  // Add ingredient to user in interjoin table
  res.sendStatus(200);
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

// models.sequelize.sync().then(() => {
  app.listen(3000, () => console.log("Example app listening on port 3000!"));
// });
