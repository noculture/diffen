import express from "express";
import debug from "debug";
import logger from "morgan";
import fileUpload from "express-fileupload";

import config from "./config";
import route from "./routes";

const app = express();
logger.token(
  "body",
  (req, res) => req.method + req.path + JSON.stringify(req.body)
);
app.use(logger(":body"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());

const router = express.Router();

app.use("/", route(router));

app.listen(config.port, () => {
  debug("dev:server")(`Listening on ${config.port}`);
});
