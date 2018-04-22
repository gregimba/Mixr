module.exports = (sequelize, DataTypes) => {
  var ingredient = sequelize.define('ingredient', {
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    description: DataTypes.TEXT,
    strID: DataTypes.STRING
  });
  ingredient.associate = models => {
    ingredient.belongsToMany(models.users, {
      through: 'user_ingredient',
      foreignKey: 'ingredientId'
    });
  };
  return ingredient;
};
