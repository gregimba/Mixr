const models = require('../server/database/models');
const express = require('express');
const path = require('path');

const app = express();
const Sequelize = require('sequelize');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passportLocalSequelize = require('passport-local-sequelize');

const User = require('./database');

app.set('view engine', 'ejs');
if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

app.use('/', express.static(path.join(__dirname, '../client/dist/'))); //still working on this line of code to make "isLoggedIn work correctly"

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
  //still working on this get request to make "isLoggedIn work correctly"
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
  User.register(
    new User({ username: req.body.username }),
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
    successRedirect: '/', //still working on this line of code to make "isLoggedIn work correctly"
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

models.sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Example app listening on port 3000!'));
});
