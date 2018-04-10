const drink_ingredient = (sequelize, DataTypes) => {
  const Drink_ingredient = sequelize.define('drink_ingredient', {
    measure: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  Drink_ingredient.associate = (models) => {
    Drink_ingredient.belongsTo(models.Drink, {
      foreignKey: 'drinkId'
    });
    Drink_ingredient.belongsTo(models.Ingredient, {
      foreignKey: 'ingredientdId'
    });
  };

  return Drink_ingredient;
}

module.exports = drink_ingredient;
