'use strict';
module.exports = (sequelize, DataTypes) => {
  var Ingredient = sequelize.define('Ingredient', {
    name: DataTypes.STRING
  });
  Ingredient.associate = models => {
    Ingredient.belongsToMany(models.User, {
      through: 'user_ingredient',
      foreignKey: 'ingredientId'
    });
  };
  return Ingredient;
};
