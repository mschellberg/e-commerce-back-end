const express = require('express');
const routes = require('./routes');
const mysql = require('mysql');
const { sequelize } = require('./models/Tag');
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turns on the routes
app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false}).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});

