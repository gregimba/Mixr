module.exports = function(sequelize, DataTypes) {
  const Ingredient = sequelize.define('ingredient', {
    name: {
      type: sequelize.STRING,
      unique: true
    }
  });

  Ingredient.associate = models => {
    Ingredient.belongsToMany(models.User, {
      through: 'user_ingredient',
      foreignKey: 'ingredientId'
    });
  };
};
