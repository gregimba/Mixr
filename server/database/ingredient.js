const ingredient = (sequelize, DataTypes) => {
  const Ingredients = sequelize.define('ingredient', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  Ingredients.associate = (models) => {
    Ingredients.belongsToMany(models.User, {
      through: 'user_ingredient',
      foreignKey: 'ingredientd'
    });
  };

  return Ingredients;
}

module.exports = ingredient;
