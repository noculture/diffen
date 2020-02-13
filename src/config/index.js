import { config } from "dotenv";

config();

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  secret: process.env.SECRET,
  dbUser: process.env.DATABASE_USER,
  dbPass: process.env.DATABASE_PASSWORD,
  dbName: process.env.DATABASE_NAME,
  dbHost: process.env.DATABASE_HOST
};
