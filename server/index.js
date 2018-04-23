if (process.env.NODE_ENV !== 'production') {
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

// const User = require('./database');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'process.env.SESSION_SECRET',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(db.users.createStrategy());
passport.serializeUser(db.users.serializeUser());
passport.deserializeUser(db.users.deserializeUser());

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/home');
};

app.get('/', isLoggedIn, (req, res) => {
  res.render('');
});

app.get('/home', (req, res) => {
  res.render('home');
});

app.get('/secret', (req, res) => {
  res.render('secret');
});

app.get('/accountCreated', isLoggedIn, (req, res) => {
  res.render('accountCreated');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  db.users.register(
    new db.users({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        return res.redirect('/register');
      }
      passport.authenticate('local')(req, res, () => {
        res.redirect('/accountCreated');
      });
    },
  );
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/secret',
  }),
  (req, res) => {},
);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/home');
});

// Checking on session to retrieve userId
app.get('/session', isLoggedIn, (req, res) => {
  db.users.find({
    where: {
      username: req.session.passport.user,
    },
  }).then((user) => {
    res.send(user);
  }).catch((err) => {
    console.error('!!Err: ', err);
    res.sendStatus(404);
  });
});

// Adding user "liked" ingrindents to the DB
app.post('/user/:userId/ingredients/:ingredientId', (req, res) => {
  let userID = req.params.userId;
  let ingredientID = req.params.ingredientId;

  // Add ingredient to user in interjoin table
  db.user_ingredient.findOrCreate({
    where: {
      userId: userID,
      ingredientId: ingredientID,
    },
  }).then(async () => {
    console.log('****You Created A User!!!');
    const newMatches = await matchUserWithDrinks(userID);
    res.json(newMatches);
  }).catch('Error Posting to DB');
});

// Will be quering a drinkId and send back the object of
// all the information about a single drink.
app.get('/drink/:drinkId', (req, res) => {
  let drinkID = req.params.drinkId;

  db.drink.find({
    where: { id: drinkID },
  }).then((singleDrink) => {
    db.drinkingredient
      .findAll({
        where: { drinkId: drinkID },
        include: [
          {
            model: db.ingredient,
          },
        ],
      })
      .then((singleDrinkIngredients) => {
        const drinkIngredients = {};

        singleDrinkIngredients.forEach((drinkIngredient) => {
          const ingredientName = drinkIngredient.ingredient.dataValues.name;
          const ingredientMeasure = drinkIngredient.dataValues.measure;
          console.log('****Drink IDs', drinkIngredient.ingredient.dataValues.id);
          drinkIngredients[ingredientName] = ingredientMeasure;
        });

        const strID = singleDrink.dataValues.strId;
        singleDrink.dataValues.ingredients = drinkIngredients;
        singleDrink.dataValues.image = `http://assets.absolutdrinks.com/drinks/400x400/${strID}.png`;
        singleDrink = singleDrink.dataValues;

        res.json(singleDrink);
      }).catch((err) => {
        console.log('Error:', err);
      });
  }).catch((err) => {
    console.log('Error:', err);
  });
});

// Array of drink matches for a user
app.get('/user/:userId/drinks', (req, res) => {
  const userID = req.params.userId;
  db.users.findAll({
    where: { id: userID },
    include: [{
      model: db.drink,
    }],
  }).then((user) => {
    const userDrinkList = [];
    user[0].drinks.forEach((userDrink) => {
      userDrink = userDrink.dataValues;
      const strID = userDrink.strId;
      userDrink.image = `http://assets.absolutdrinks.com/drinks/400x400/${strID}.png`;
      userDrinkList.unshift(userDrink);
    });
    res.json(userDrinkList);
  }).catch((err) => {
    console.log('!!!Error:', err);
  });
});

// Returns a Single "non-liked" ingredient
// (reverse of "liked" ingredients list and then send back a single random 'non-liked' ingredient)
app.get('/user/:userId/randomIngredient', (req, res) => {
  const userID = req.params.userId;

  db.ingredient.findAll({
  }).then((ingredients) => {
    db.users.findAll({
      where: { id: userID },
      include: [{
        model: db.ingredient,
      }],
    }).then((user) => {
      // Creates a list of all the ingrdients in the database
      const listOfAllIngredients = [];
      ingredients.forEach((allIngredients) => {
        listOfAllIngredients.push(allIngredients.dataValues);
      });

      // Creates a list of all the 'liked' ingredients for a user
      const likedIngredientList = [];
      user[0].ingredients.forEach((userIngredient) => {
        likedIngredientList.push(userIngredient.dataValues);
      });

      // Creates a list of 'non-liked' ingredients
      const notLikedIngredientList = [];

      listOfAllIngredients.forEach((allIngredient) => {
        const notLikedCheck = likedIngredientList
          .filter(ingredient => ingredient.strID === allIngredient.strID);
        if (notLikedCheck.length === 0) {
          notLikedIngredientList.push(allIngredient);
        }
      });
      // Selects a random index in the 'non-liked' list and
      // sends back an object with one random 'non-liked' ingredient
      let randomIngredient;
      if (notLikedIngredientList.length > 0) {
        randomIngredient =
          notLikedIngredientList[
            Math.floor(Math.random() * notLikedIngredientList.length)
          ];
        // retrieve first image from google images
        // try {
        //   randomIngredient.image = await searchImage(randomIngredient.name);
        //   randomIngredient.image = randomIngredient.image[0].url;
        // } catch (err) {
        //   console.error('ERROR RETRIEVING IMAGE: ', err);
        // }
      } else {
        randomIngredient = null;
      }
      res.json(randomIngredient);
    });
  }).catch((err) => {
    console.log('!!!Error:', err);
  });
});

// sequelize.sync().then(() => {
app.listen(3000, () => console.log('Example app listening on port 3000!'));
// });
