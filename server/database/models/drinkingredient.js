'use strict';
module.exports = (sequelize, DataTypes) => {
  var DrinkIngredient = sequelize.define('DrinkIngredient', {
    name: DataTypes.STRING
  });
  DrinkIngredient.associate = models => {
    DrinkIngredient.belongsTo(models.Drink, {
      foreignKey: 'drinkId'
    });
    DrinkIngredient.belongsTo(models.Ingredient, {
      foreignKey: 'ingredientId'
    });
  };
  return DrinkIngredient;
};
