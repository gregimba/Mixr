const passportLocalSequelize = require('passport-local-sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    username: Sequelize.STRING,
    myhash: Sequelize.TEXT,
    mysalt: Sequelize.STRING
  });

  users.associate = models => {
    users.belongsToMany(models.drink, {
      through: 'user_drink',
      foreignKey: 'userId'
    });
    users.belongsToMany(models.ingredient, {
      through: 'user_ingredient',
      foreignKey: 'userId'
    }); // associations can be defined here
  };
  passportLocalSequelize.attachToUser(users, {
    usernameField: 'username',
    hashField: 'myhash',
    saltField: 'mysalt'
  });
  return users;
};
