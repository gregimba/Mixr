const Drink = sequelize.define('Drink', {
  name: {
    type: DataTypes.STRING,
    unique: true
  },
  instruction: {
    type: DataTypes.STRING
  },
  glass: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  }
});

Drink.associate = models => {
  Drink.belongsToMany(models.User, {
    through: 'user_drink',
    foreignKey: 'drinkId'
  });
};

module.export.Drink = Drink;
