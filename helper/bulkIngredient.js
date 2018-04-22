const fs = require('fs');
const db = require('../server/database/models');
const path = require('path');

let ingredients = [];

const pathName = path.join(__dirname, './ingredient.json');
console.log(pathName);
let json = fs.readFileSync(pathName, 'utf8');

json = JSON.parse(json).result;

for (let ingredient of json) {
  ingredients.push({
    name: ingredient.name,
    strID: ingredient.id,
    description: ingredient.description
  });
}
db.ingredient.bulkCreate(ingredients);
