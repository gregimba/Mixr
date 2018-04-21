if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}
const express = require('express');
const path = require('path');
const pg = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize, Sequelize } = require('../server/database/models');
const db = sequelize.models;
const Op = Sequelize.Op;
const matchUserWithDrinks = require('../helper/matchUserWithDrinks');
const searchImage = require('../helper/imageSearch');

const app = express();
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passportLocalSequelize = require('passport-local-sequelize');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../client/dist')));

const User = require('./database');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  require('express-session')({
    secret: 'process.env.SESSION_SECRET',
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', isLoggedIn, function(req, res) {
  res.render('');
});

app.get('/home', function(req, res) {
  res.render('home');
});

app.get('/secret', isLoggedIn, function(req, res) {
  res.render('secret');
});

app.get('/accountCreated', isLoggedIn, function(req, res) {
  res.render('accountCreated');
});

app.get('/register', function(req, res) {
  res.render('register');
});

app.post('/register', function(req, res) {
  console.log(req.body);
  db.User.register(
    new db.User({ username: req.body.username }),
    req.body.password,
    function(err, user) {
      if (err) {
        console.log(err);
        return res.render('/register');
      }
      passport.authenticate('local')(req, res, function() {
        res.redirect('/accountCreated');
      });
    }
  );
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/secret'
  }),
  function(req, res) {}
);

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/home');
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

app.get('/session', isLoggedIn, function(req, res) {
  console.log(req.session.passport.user);
  db.User.find({
    where: {
      username: req.session.passport.user
    }
    // include: [
    //   {
    //     model: db.Ingredient,
    //     attributes: ['id']
    //   }
    // ]
  }).then(function(a) {
    console.log(a.dataValues.id);
    let string = a.dataValues.id + '';
    res.send(string);
  });
  // res.send(req.session);
});

// Adding user "liked" ingrindents to the DB
app.post('/user/:userId/ingredients/:ingredientId', (req, res) => {
  let userID = req.params.userId;
  let ingredientID = req.params.ingredientId;

  // Add ingredient to user in interjoin table
  db.user_ingredient
    .findOrCreate({
      where: {
        userId: userID,
        ingredientId: ingredientID
      }
    })
    .then(async () => {
      console.log('****You Created A User!!!');
      const newMatches = await matchUserWithDrinks(userID);
      res.json(newMatches);
    })
    .catch('Error Posting to DB');
});

// Will be quering a drinkId and send back the object of
// all the information about a single drink.
app.get('/drink/:drinkId', (req, res) => {
  let drinkID = req.params.drinkId;

  db.Drink.find({
    where: { id: drinkID }
  })
    .then(singleDrink => {
      db.DrinkIngredient.findAll({
        where: { drinkId: drinkID },
        include: [
          {
            model: db.Ingredient
          }
        ]
      })
        .then(singleDrinkIngredients => {
          let drinkIngredients = {};

          singleDrinkIngredients.forEach(drinkIngredient => {
            let ingredientName = drinkIngredient.Ingredient.dataValues.name;
            let ingredientMeasure = drinkIngredient.dataValues.measure;

            drinkIngredients[ingredientName] = ingredientMeasure;
          });
          singleDrink.dataValues.ingredients = drinkIngredients;

          singleDrink = singleDrink.dataValues;
          res.json(singleDrink);
        })
        .catch(err => {
          console.log('Error:', err);
        });
    })
    .catch(err => {
      console.log('Error:', err);
    });
});

// Array of drink matches for a user
app.get('/user/:userId/drinks', (req, res) => {
  let userID = req.params.userId;
  db.User.findAll({
    where: { id: userID },
    include: [
      {
        model: db.Drink,
      }
    ]
  })
    .then(user => {
      let userDrinkList = [];
      user[0].Drinks.forEach(userDrink => {
        userDrinkList.push(userDrink.dataValues);
      });
      res.json(userDrinkList);
    })
    .catch(err => {
      console.log('!!!Error:', err);
    });
});

// Array of ingredients matches for user, returns array of all 'liked' ingredients
app.get('/user/:userId/ingredients', (req, res) => {
  let userID = req.params.userId;

  db.User.findAll({
    where: { id: userID },
    include: [
      {
        model: db.Ingredient,
      }
    ]
  })
    .then(user => {
      let likedIngredientList = [];
      user[0].Ingredients.forEach(ingredient => {
        let userIngredient = Object.assign(
          {},
          {
            ingredientId: ingredient.dataValues.id,
            ingredientName: ingredient.dataValues.name
          }
        );
        likedIngredientList.push(userIngredient);
      });
      console.log(likedIngredientList);
      res.send(likedIngredientList);
    })
    res.json(likedIngredientList)
  })
  .catch( err => {
    console.log("!!!Error:", err)
  });
});

// Returns a Single "non-liked" ingredient
// (reverse of "liked" ingredients list and then send back a single random 'non-liked' ingredient)
app.get('/user/:userId/randomIngredient', (req, res) => {
  let userID = req.params.userId;

  db.Ingredient.findAll({})
  .then( ingredients => {
    db.User.findAll({
      where: { id: userID },
      include: [{
        model: db.Ingredient,
      }]
      }).then(async user => {
        // Creates a list of all the ingrdients in the database
        let listOfAllIngredients = [];
        ingredients.forEach(allIngredients => {
          listOfAllIngredients.push(allIngredients.dataValues);
        });

        // Creates a list of all the 'liked' ingredients for a user
        let likedIngredientList = [];
        user[0].Ingredients.forEach(userIngredient => {
          likedIngredientList.push(userIngredient.dataValues);
        });

        // Creates a list of 'non-liked' ingredients
        let notLikedIngredientList = [];

        listOfAllIngredients.forEach( allIngredient => {
          let notLikedCheck = likedIngredientList.filter(ingredient => (ingredient.strID === allIngredient.strID ));

          if( notLikedCheck.length === 0 ){
            notLikedIngredientList.push(allIngredient);
          }
      });
      // Selects a random index in the 'non-liked' list and
      // sends back an object with one random 'non-liked' ingredient
      let randomIngredient;
      if (notLikedIngredientList.length > 0){
        randomIngredient = notLikedIngredientList[Math.floor(Math.random()*notLikedIngredientList.length)];
        randomIngredient.image = await searchImage(randomIngredient.name);
        randomIngredient.image = randomIngredient.image[0].url;
      } else {
        randomIngredient = null;
      }
      res.json(randomIngredient)
    })
  })
  .catch(err => {
    console.log('!!!Error:', err);
  });
});

// sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Example app listening on port 3000!'));
// });
