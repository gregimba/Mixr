const fs = require('fs');
const db = require('../server/database/models');
const request = require('request');

const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

let listIngredients = [];
request.get(url, (err, res, body) => {
  if (err) {
    console.log(err);
  } else {
    if (res.statusCode === 200) {
      let bodyData = JSON.parse(body).drinks;
      for (let ing of bodyData) {
        listIngredients.push({ name: ing.strIngredient1 });
      }
      db.Ingredient.bulkCreate(listIngredients).then(() => {
        console.log('insert Ingredients done');
      });
    }
  }
});
