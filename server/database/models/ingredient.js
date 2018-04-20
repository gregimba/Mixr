module.exports = (sequelize, DataTypes) => {
  var Ingredient = sequelize.define('Ingredient', {
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    description: DataTypes.TEXT,
    strID: DataTypes.STRING
  });
  Ingredient.associate = models => {
    Ingredient.belongsToMany(models.User, {
      through: 'user_ingredient',
      foreignKey: 'ingredientId'
    });
  };
  return Ingredient;
};
