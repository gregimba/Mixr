const fs = require('fs');
const db = require('../server/database/models');

let ingredient = {};

let json = fs.readFileSync('./ingredient.json', 'utf8');

json = JSON.parse(json).result;

for (let drink of json) {
  console.log(drink.name);
}

// db.Drink.bulkCreate({});
