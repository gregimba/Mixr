const { sequelize } = require('../server/database/models');

// Matches given userId with drinks
// based on that users liked ingredients in DB
// and Returns new matches
const matchUserWithDrinks = async userId =>
  new Promise(async res => {
    const db = sequelize.models;

    const likedIngredientsData = await db.user_ingredient.findAll({
      where: {
        userId
      }
    });
    const likedIngredients = [];
    likedIngredientsData.forEach(row => {
      likedIngredients.push(row.dataValues.ingredientId);
    });

    let drinkIngredientMatches = [];
    likedIngredients.forEach(ingredient => {
      drinkIngredientMatches.push(
        db.drinkingredient.findAll({
          where: {
            ingredientId: ingredient
          }
        })
      );
    });
    drinkIngredientMatches = await Promise.all(drinkIngredientMatches);
    const possibleDrinkMatches = [];
    drinkIngredientMatches.forEach(query => {
      query.forEach(result => {
        const { drinkId } = result.dataValues;
        if (!possibleDrinkMatches.includes(drinkId)) {
          possibleDrinkMatches.push(drinkId);
        }
      });
    });

    let drinksWithUser = [];
    possibleDrinkMatches.forEach(drink => {
      drinksWithUser.push(
        db.drinkingredient.findAll({
          where: {
            drinkId: drink
          },
          include: [
            {
              model: db.ingredient,
              include: db.users
            }
          ]
        })
      );
    });
    drinksWithUser = await Promise.all(drinksWithUser);

    const invalidDrinks = [];
    drinksWithUser.forEach(drink => {
      const id = drink[0].dataValues.drinkId;
      drink.forEach(ingredient => {
        if (ingredient.ingredient.users.length === 0) {
          if (!invalidDrinks.includes(id)) {
            invalidDrinks.push(id);
          }
        }
      });
    });

    const matchedDrinkIds = [];
    possibleDrinkMatches.forEach(drink => {
      if (!invalidDrinks.includes(drink)) {
        matchedDrinkIds.push(drink);
      }
    });

    const matches = [];
    const newMatches = [];
    matchedDrinkIds.forEach(drink => {
      matches.push(
        db.user_drink
          .findOrCreate({
            where: {
              drinkId: drink,
              userId
            }
          })
          .spread((item, created) => {
            if (created) {
              newMatches.push(item);
            }
          })
      );
    });
    await Promise.all(matches);

    const newDrinkData = [];
    const newDrinks = [];
    newMatches.forEach(match => {
      newDrinkData.push(
        db.drink
          .find({
            where: {
              id: match.dataValues.drinkId
            }
          })
          .then(drink => {
            newDrinks.push(drink.dataValues);
          })
      );
    });
    await Promise.all(newDrinkData);
    res(newDrinks);
  });

module.exports = matchUserWithDrinks;
