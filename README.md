# Mixr

Tinder for drinks

## Database setup

#### Open Postgres and create DB

* `psql postgres`
* `CREATE DATABASE mixr;`

#### Create tables

* `npm install -g sequelize-cli` install cli global
* `cd server/database` Go to database directory
* `node models/index.js` Create actual tables

### Populate database

*`cd helper/` Go to helper directory
*`node buildIngredient.js` Populate ingredients table
*`node builddrinks.js` Populate drinks table with data from drinks.json
*In `builddrinks.js` Change `7 const pathName = path.join(__dirname, './drinks.json');` to read from `drinks2.json`
*`node builddrinks.js` again: Populate drinks table with data from drinks2.json
*Repeat for drinks3.son and drinks4.json
*`node bulkJoin.js` Populate the drinkingredient table with data from drinks.json
*Change file path in bulkJoin.js to the next drinks.json file like above, repeat for all files

### Build and Run server

*`npm run react` Build bundle.js with webpack and watch files
*`npm start` start server on port 3000

### env variables

`DB_USERNAME` and `DB_PASSWORD` for your database
