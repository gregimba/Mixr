# Mixr

Tinder for drinks

## Database setup

Open Postgres Console
`psql postgres`
Create datbase in postgres
`CREATE DATABASE mixr;`

Go to database directory
`cd server/database`

`sequelize init:config`
Edit config with your db values

Create actual tables
`sequelize db:migrate`
