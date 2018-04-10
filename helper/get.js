const fs = require('fs');
const request = require('request');
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
          console.log(JSON.parse(body));
          wait(100);
        }
      });
    }
  }
}

for (let glass of glasses) {
  let url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=' + glass;
  request.get(url, writeFile);
}
