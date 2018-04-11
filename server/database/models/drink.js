'use strict';
module.exports = (sequelize, DataTypes) => {
  var Drink = sequelize.define('Drink', {
    name: {
      type: Sequelize.STRING,
      unique: true
    },
    instruction: DataTypes.STRING,
    glass: DataTypes.STRING,
    image: DataTypes.STRING
  });
  Drink.associate = models => {
    Drink.belongsToMany(models.User, {
      through: 'user_drink',
      foreignKey: 'drinkId'
    });
  };
  return Drink;
};
