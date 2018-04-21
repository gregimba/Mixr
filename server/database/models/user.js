const passportLocalSequelize = require('passport-local-sequelize');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    myhash: DataTypes.TEXT,
    mysalt: DataTypes.STRING,
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
  passportLocalSequelize.attachToUser(User, {
    usernameField: 'username',
    hashField: 'myhash',
    saltField: 'mysalt',
    isLegalField: 'isLegal'
  });
  return User;
};
