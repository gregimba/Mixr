const models = require('../server/database/models');
const express = require('express');
const path = require('path');

const app = express();

app.use('/', express.static(path.join(__dirname, '../client/dist')));

models.sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Example app listening on port 3000!'));
});
