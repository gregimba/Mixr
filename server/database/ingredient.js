const ingredient = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('ingredient', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  Ingredient.associate = (models) => {
    Ingredient.belongsToMany(models.Drinks, {
      through: 'drink_ing',
      foreignKey: 'ingId'
    });
    Ingredient.belongsToMany(models.Users, {
      through: 'user_ing',
      foreignKey: 'ingId'
    });
  };

  return Ingredient;
}

module.exports = ingredient;
