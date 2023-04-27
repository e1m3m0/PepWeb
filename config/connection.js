const Sequelize = require('sequelize');

require('dotenv').config();

// create connection to our db
const sequelize = process.env.CLEARDB_JADE_URL
  ? new Sequelize(process.env.CLEARDB_JADE_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    });

module.exports = sequelize;
