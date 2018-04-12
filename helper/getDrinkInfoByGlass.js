const fs = require('fs');
const request = require('request');
let glassData = fs.readFileSync('glasses.json', 'utf8');
const drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

glassData = JSON.parse(glassData);

const glasses = [];

wait = ms => {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
};

for (let glass of glassData.drinks) {
  glasses.push(glass.strGlass.split(' ').join('_'));
}

let count = 0;
for (let glass of glasses) {
  let file = fs.readFileSync('./data/glasses/' + glass + '.json');
  file = JSON.parse(file);
  for (let drink of file.drinks) {
    let url = drinkUrl + drink.idDrink;
    request.get(url, (err, res, body) => {
      if (err) {
        throw err;
      } else {
        if (res.statusCode === 200) {
          fs.writeFile(
            './data/drinks/' + count + '.json',
            res.body,
            'utf8',
            function(err) {
              if (err) {
                return console.log(err);
              }

              console.log('saved: ' + count);
            }
          );
        }
      }
    });
  }
}
