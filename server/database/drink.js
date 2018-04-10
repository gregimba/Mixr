const drink = (sequelize, DataTypes) => {
  const Drinks = sequelize.define('drinks', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    instruction: {
      type: DataTypes.STRING,
      unique: true,
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
    Drinks.belongsToMany(models.User, {
      through: 'user_drink',
      foreignKey: 'drinkId'
    });
  };

  return Drinks;
}


module.exports = drink;
