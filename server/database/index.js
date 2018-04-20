const Sequelize = require('sequelize');
const user = require('./models/user');
const ingredient = require('./models/ingredient');
const drink = require('./models/drink');
const drink_ingredient = require('./models/drinkingredient');
const passportLocalSequelize = require('passport-local-sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres'
  }
);

const models = {
  User: user,
  Drink: drink,
  Ingredient: ingredient,
  Drink_ingredient: drink_ingredient
};

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

let User = sequelize.define('user', {
  username: Sequelize.STRING,
  myhash: Sequelize.TEXT,
  mysalt: Sequelize.STRING
});

passportLocalSequelize.attachToUser(User, {
  usernameField: 'username',
  hashField: 'myhash',
  saltField: 'mysalt'
});

sequelize.sync();

models.sequelize = sequelize;
module.exports = models;
module.exports = User;
