const fs = require('fs');
const db = require('../server/database/models');

let drinks = [];

let json = fs.readFileSync('./drinks.json', 'utf8');

json = JSON.parse(json).result;

for (let drink of json) {
  console.log(drink.name);
}
