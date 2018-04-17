module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    },
    isLegal: {
      type: DataTypes.BOOLEAN
    }
  });

  User.associate = models => {
    User.belongsToMany(models.Drink, {
      through: 'user_drink',
      foreignKey: 'userId'
    });
    User.belongsToMany(models.Ingredient, {
      through: 'user_ingredient',
      foreignKey: 'userId'
    });
  };
  return User;
};
