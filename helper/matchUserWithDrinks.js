const { sequelize, Sequelize } = require('../server/database/models');

// Matches given user with drinks based on liked ingredients
// and Returns new matches
const matchUserWithDrinks = async (user = 1) => {
  const db = sequelize.models;
  console.log('MODELS: ', sequelize.models);

  const likedIngredientsData = await db.user_ingredient.findAll({
    where: {
      userId: user,
    },
  });
  const likedIngredients = [];
  likedIngredientsData.forEach((row) => {
    likedIngredients.push(row.dataValues.ingredientId);
  });

  let drinkIngredientMatches = [];
  likedIngredients.forEach((ingredient) => {
    drinkIngredientMatches.push(db.DrinkIngredient.findAll({
      where: {
        ingredientId: ingredient,
      },
    }));
  });
  drinkIngredientMatches = await Promise.all(drinkIngredientMatches);
  const possibleDrinkMatches = [];
  drinkIngredientMatches.forEach((query) => {
    query.forEach((result) => {
      const drinkId = result.dataValues.drinkId;
      if (!possibleDrinkMatches.includes(drinkId)) {
        possibleDrinkMatches.push(drinkId);
      }
    });
  });

  let drinksWithUser = [];
  possibleDrinkMatches.forEach((drink) => {
    drinksWithUser.push(db.DrinkIngredient.findAll({
      where: {
        drinkId: drink,
      },
      include: [
        {
          model: db.Ingredient,
          include: db.User,
        },
      ],
    }));
  });
  drinksWithUser = Promise.all(drinksWithUser);

  const invalidDrinks = [];
  drinksWithUser.forEach((drink) => {
    const id = drink[0].dataValues.drinkId;
    drink.forEach((ingredient) => {
      if (ingredient.Ingredient.Users.length === 0) {
        if (!invalidDrinks.includes(id)) {
          invalidDrinks.push(id);
        }
      }
    });
  });

  const matchedDrinkIds = [];
  possibleDrinkMatches.forEach((drink) => {
    if (!invalidDrinks.includes(drink)) {
      matchedDrinkIds.push(drink);
    }
  });

  const matches = [];
  const newMatches = [];
  matchedDrinkIds.forEach((drink) => {
    matches.push(db.user_drink.findOrCreate({
      where: {
        drinkId: drink,
        userId: user,
      },
    }).spread((item, created) => {
      if (created) { newMatches.push(item); }
    }));
  });
  Promise.all(matches);

  const newDrinkData = [];
  const newDrinks = [];
  newMatches.forEach((match) => {
    newDrinkData.push(db.Drink.find({
      where: {
        id: match.dataValues.drinkId,
      },
    }).then((drink) => {
      const formattedDrink = {
        drinkId: drink.dataValues.id,
        drinkName: drink.dataValues.name,
        drinkImage: drink.dataValues.image,
      };
      newDrinks.push(formattedDrink);
    }));
  });
  Promise.all(newDrinkData);

  return newDrinks;
};

export default matchUserWithDrinks;
