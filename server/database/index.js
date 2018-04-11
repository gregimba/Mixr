<<<<<<< HEAD
require('dotenv').config();
let Sequelize = require('sequelize');

console.log(process.env.DB_NAME);
const db = new Sequelize(
=======
const Sequelize = require('sequelize');
const user = require('./user');
const ingredient = require('./ingredient');
const drink = require('./drink');
const drink_ingredient = require('./drink_ingredient');
require('dotenv').config();

const sequelize = new Sequelize(
>>>>>>> f5a9bf92f50b9e24ff62406c8baf7a26d7c99671
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
<<<<<<< HEAD
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

db
=======
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
>>>>>>> f5a9bf92f50b9e24ff62406c8baf7a26d7c99671
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
<<<<<<< HEAD
=======

models.sequelize = sequelize;

module.exports = models;
>>>>>>> f5a9bf92f50b9e24ff62406c8baf7a26d7c99671
