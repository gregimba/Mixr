const Drink_ingredient = sequelize.define('drink_ingredient', {
  measure: {
    type: DataTypes.STRING
  }
});

Drink_ingredient.associate = models => {
  Drink_ingredient.belongsTo(models.Drink, {
    foreignKey: 'drinkId'
  });
  Drink_ingredient.belongsTo(models.Ingredient, {
    foreignKey: 'ingredientId'
  });
};

module.export.Drink_ingredient = Drink_ingredient;
