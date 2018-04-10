const models = require('../server/database')
const express = require('express');
const path = require('path');

const app = express();

app.use("/", express.static(path.join(__dirname, "../client/dist")));

// Obj. of single drink
app.get("/drinks/:id", (req, res) => {});

// Array of drink matches
app.get("/user/:id/drinks", (req, res) => {});

// Adding user ingrindents to the DB
app.post("/user/:id/ingredients/:id", (req, res) => {});

// Array of ingredients
app.get("/user/:id/ingredients", (req, res) => {});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
