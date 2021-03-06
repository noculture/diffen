import Sequelize from "sequelize";

import config from "../config";
import user from "../models/user";
import comparison from "../models/comparison";

// set up connection
const engine = new Sequelize(config.dbUrl, { native: true });

const db = { Sequelize: Sequelize, engine: engine };

// define models
db.users = user(engine, Sequelize);
db.comparison = comparison(engine, Sequelize);

export default db;
