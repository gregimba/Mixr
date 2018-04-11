'use strict';
module.exports = (sequelize, DataTypes) => {
  var Ingredient = sequelize.define('Ingredient', {
    name: {
      type: Sequelize.STRING,
      unique: true
    }
  });
  Ingredient.associate = models => {
    Ingredient.belongsToMany(models.User, {
      through: 'user_ingredient',
      foreignKey: 'ingredientId'
    });
  };
  return Ingredient;
};
