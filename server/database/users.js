const user = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
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

  User.associate = (models) => {
    User.belongsToMany(models.Drinks, {
      through: 'user_drink',
      foreignKey: 'userId'
    });
    User.belongsToMany(models.Ingredient, {
      through: 'user_ing',
      foreignKey: 'userId'
    });
  };

  return User;
}

module.exports = user;
