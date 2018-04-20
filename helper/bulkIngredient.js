const fs = require('fs');
const db = require('../server/database/models');

let ingredients = [];

let json = fs.readFileSync('./ingredient.json', 'utf8');

json = JSON.parse(json).result;

for (let ingredient of json) {
  ingredients.push({
    name: ingredient.name,
    strID: ingredient.id,
    description: ingredient.description
  });
}
db.Ingredient.bulkCreate(ingredients);
