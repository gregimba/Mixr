const fs = require('fs');
const request = require('request');
let data = fs.readFileSync('glasses.json', 'utf8');

wait = ms => {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
};

data = JSON.parse(data);

let glasses = [];

for (let glass of data.drinks) {
  glasses.push(glass.strGlass.split(' ').join('_'));
}

for (let glass of glasses) {
  let url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=' + glass;
  request.get(url, (err, res, body) => {
    if (err) {
      throw err;
    } else {
      if (res.statusCode === 200) {
        fs.writeFileSync('./data/glasses/' + glass + '.json', res.body);
      }
    }
  });
}
