const { sequelize, Sequelize } = require('../server/database/models');

<<<<<<< HEAD
//Returns array of matched Drink Ids
=======
>>>>>>> 954027a57bbe7e9a675d9721fecbbea08ed83722
const findDrinks = async (user = 1) => {
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
  drinksWithUser = await Promise.all(drinksWithUser);
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
  return matchedDrinkIds;
};
