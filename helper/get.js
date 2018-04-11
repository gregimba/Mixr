const fs = require('fs');
const request = require('request');
const db = require('../server/database/models');
let data = fs.readFileSync('drinks.json');

const drink_url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

function wait(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

data = JSON.parse(data);

let glasses = [];

for (let glass of data.drinks) {
  glasses.push(glass.strGlass.split(' ').join('_'));
}

function writeFile(err, res, body) {
  if (err) {
  } else if (res.statusCode === 200) {
    for (let drink of JSON.parse(body).drinks) {
      request.get(drink_url + drink.idDrink, (err, res, body) => {
        if (err) {
        } else if (res.statusCode === 200) {
          let drinkData = JSON.parse(body).drinks[0];

          console.log(drinkData.strDrink);

          db.Drink.create({
            name: drinkData.strDrink,
            glass: drinkData.strGlass,
            instruction: drinkData.strInstructions,
            image: drinkData.strDrinkThumb
          });

          wait(500);
        }
      });
    }
  }
}

db.sequelize.sync().then(() => {
  for (let glass of glasses) {
    let url =
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=' + glass;
    request.get(url, writeFile);
  }
});
