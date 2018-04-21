const passportLocalSequelize = require('passport-local-sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    username: Sequelize.STRING,
    myhash: Sequelize.TEXT,
    mysalt: Sequelize.STRING
    // isLegal: DataTypes.BOOLEAN
  });
  passportLocalSequelize.attachToUser(users, {
    usernameField: 'username',
    hashField: 'myhash',
    saltField: 'mysalt'
    // isLegalField: 'isLegal'
  });
  users.associate = models => {
    users.belongsToMany(models.Drink, {
      through: 'user_drink',
      foreignKey: 'userId'
    });
    users.belongsToMany(models.Ingredient, {
      through: 'user_ingredient',
      foreignKey: 'userId'
    }); // associations can be defined here
  };

  return users;
};
