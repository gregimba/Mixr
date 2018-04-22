module.exports = (sequelize, DataTypes) => {
  var drink = sequelize.define('drink', {
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    instruction: DataTypes.TEXT,
    strId: DataTypes.STRING,
    glass: DataTypes.STRING,
    image: DataTypes.STRING
  });
  drink.associate = models => {
    drink.belongsToMany(models.users, {
      through: 'user_drink',
      foreignKey: 'drinkId'
    });
  };
  return drink;
};
