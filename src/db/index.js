import Sequelize from "sequelize";

import config from "../config";

// set up connection
const engine = new Sequelize(config.dbName, config.dbUser, config.dbPass, {
  host: config.dbHost,
  dialect: "mysql",
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = { Sequelize: Sequelize, engine: engine };

// define models
db.user = require("../models/user")(engine, Sequelize);
// db.customer = require('../models/customer')(engine, Sequelize);

export default db;
