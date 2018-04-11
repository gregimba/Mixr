module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type: Sequelize.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    isLegal: DataTypes.BOOLEAN
  });
  User.associate = models => {
    User.belongsToMany(models.Drink, {
      through: 'user_drink',
      foreignKey: 'userId'
    });
    User.belongsToMany(models.Ingredient, {
      through: 'user_ingredient',
      foreignKey: 'userId'
    }); // associations can be defined here
  };
  return User;
};
