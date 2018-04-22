const fs = require('fs');
const db = require('../server/database/models');
const path = require('path');

let drinks = [];

const pathName = path.join(__dirname, './drinks.json');
let jsonDrinks = fs.readFileSync(pathName, 'utf8');

jsonDrinks = JSON.parse(jsonDrinks).result;

let joins = [];

for (let drink of jsonDrinks) {
  for (let ingredient of drink.ingredients) {
    joins.push({
      drink: drink.id,
      ingredient: ingredient.id,
      measure: ingredient.textPlain
    });
  }
}

let final_array = [];
for (let join in joins) {
  db.drink.findOne({ where: { strId: joins[join].drink } }).then(drink => {
    db.ingredient
      .findOne({ where: { strID: joins[join].ingredient } })
      .then(ingredient => {
        final_array.push({
          drinkId: drink.id,
          ingredientId: ingredient.id,
          measure: joins[join].measure
        });
      });
  });
}

setTimeout(function() {
  db.drinkingredient.bulkCreate(final_array);
}, 30000);
