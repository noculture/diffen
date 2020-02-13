import { config } from "dotenv";

config();

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  secret: process.env.SECRET,
  dbUrl: process.env.DATABASE_URL
};
