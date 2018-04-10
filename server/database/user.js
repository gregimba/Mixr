const user = (sequelize, DataTypes) => {
  const Users = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    isLegal: {
      type: DataTypes.BOOLEAN,
      unique: true,
    },
  });

  Users.associate = (models) => {
    User.belongsToMany(models.Drink, {
      through: 'user_drink',
      foreignKey: 'userId'
    });
    Users.belongsToMany(models.Ingredient, {
      through: 'user_ingredient',
      foreignKey: 'userId'
    });
  };

  return Users;
}

module.exports = user;
