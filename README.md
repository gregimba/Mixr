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
