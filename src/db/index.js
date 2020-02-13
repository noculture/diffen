import Sequelize from "sequelize";

import config from "../config";
import user from "../models/user";

// set up connection
const engine = new Sequelize(config.dbName, config.dbUser, config.dbPass, {
  host: config.dbHost,
  dialect: "mysql",

  pool: {
    max: 15,
    acquire: 30000,
    idle: 10000
  }
});

const db = { Sequelize: Sequelize, engine: engine };

// define models
db.user = user(engine, Sequelize);
// db.customer = require('../models/customer')(engine, Sequelize);

export default db;
