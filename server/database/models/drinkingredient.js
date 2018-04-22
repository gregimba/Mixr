module.exports = (sequelize, DataTypes) => {
  var drinkingredient = sequelize.define('drinkingredient', {
    measure: DataTypes.STRING
  });
  drinkingredient.associate = models => {
    drinkingredient.belongsTo(models.drink, {
      foreignKey: 'drinkId'
    });
    drinkingredient.belongsTo(models.ingredient, {
      foreignKey: 'ingredientId'
    });
  };
  return drinkingredient;
};
