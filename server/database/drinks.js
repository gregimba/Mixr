const drinks = (sequelize, DataTypes) => {
  const Drinks = sequelize.define('drinks', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    instruction: {
      type: DataTypes.STRING,
      uniquie: true,
    },
    glass: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  Drinks.associate = (models) => {
    Drinks.belongsToMany(models.Users, {
      through: 'user_drink',
      foreignKey: 'drinkId'
    });
    Drinks.belongsToMany(models.Ingredient, {
      through: 'drink_ing',
      foreignKey: 'drinkId'
    });
  };

  return Drinks;
}


module.exports = drinks;
