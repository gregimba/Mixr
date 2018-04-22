const fs = require('fs');
const db = require('../server/database/models');
const path = require('path');

let drinks = [];

const pathName = path.join(__dirname, './drinks.json');
let json = fs.readFileSync(pathName, 'utf8');

json = JSON.parse(json).result;

for (let drink of json) {
  drinks.push({
    name: drink.name,
    instruction: drink.descriptionPlain,
    glass: drink.servedIn.text,
    strId: drink.id
  });
}

db.drink.bulkCreate(drinks);
