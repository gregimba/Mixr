const Sequelize = require('sequelize');
const user = require('./user');
const ingredient = require('./ingredient');
const drink = require('./drink');
const drink_ingredient = require('./drink_ingredient');
require('dotenv').config();


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres'
});

const models = {
  User: user,
  Drink: drink,
  Ingredient: ingredient,
  Drink_ingredient: drink_ingredient,
}

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


models.sequelize = sequelize;
models.Sequelize = Sequelize;


module.exports = models;

