const Ingredient = sequelize.define('ingredient', {
  name: {
    type: DataTypes.STRING,
    unique: true
  }
});

Ingredient.associate = models => {
  Ingredient.belongsToMany(models.User, {
    through: 'user_ingredient',
    foreignKey: 'ingredientId'
  });
};

module.export.Ingredient = Ingredient;
