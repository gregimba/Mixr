module.exports = (sequelize, DataTypes) => {
  var Ingredient = sequelize.define('Ingredient', {
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
  return Ingredient;
};
