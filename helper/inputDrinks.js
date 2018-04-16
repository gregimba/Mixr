const fs = require('fs');
const db = require('../server/database/models');

let drinks = fs.readdirSync('./data/drinks/');

let drinksArray = [];
drinks.forEach(drink => {
  let drinkData = fs.readFileSync('./data/drinks/' + drink, 'utf8');

  drinkData = JSON.parse(drinkData).drinks[0];
  drinksArray.push({
    name: drinkData.strDrink,
    instruction: drinkData.strInstructions,
    image: drinkData.strDrinkThumb,
    glass: drinkData.strGlass
  });
});

db.Drink.bulkCreate(drinksArray).then(() => {
  console.log('finished bulk create');
});
