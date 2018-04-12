const fs = require('fs');
let glassData = fs.readFileSync('glasses.json', 'utf8');

glassData = JSON.parse(glassData);

const glasses = [];

for (let glass of glassData.drinks) {
  glasses.push(glass.strGlass.split(' ').join('_'));
}

for (let glass of glasses) {
  let file = fs.readFileSync('./data/glasses/' + glass + '.json');
  file = JSON.parse(file);
  for (let drink of file.drinks) {
    console.log(drink.idDrink);
  }
}
