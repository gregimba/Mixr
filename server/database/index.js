const Sequelize = require('sequelize');
const user = require('./users.js');
const ingredient = require('./ingredient.js');
const drinks = require('./drinks.js');


const sequelize = new Sequelize('mixr', 'jakehsiao', 'jakehsiao', {
  dialect: 'postgres'
});

const models = {
  Users: sequelize.import('./users'),
  Drinks: sequelize.import('./drinks'),
  Ingredient: sequelize.import('./ingredient'),
}

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;


module.exports = models;

