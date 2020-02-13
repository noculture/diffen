import jwt from "jsonwebtoken";

import config from "../config";
import { noHeaderError, invalidTokenError } from "../errors";

export default class AuthMiddleware {
  static authenticateUser(req, res, next) {
    if ((!req.headers || !req.headers.authorization) && !req.body.token) {
      return AuthMiddleware.returnErrorResponse(res, noHeaderError);
    }

    const user = AuthMiddleware.verify(req, res);
    req.body.user_id = user.id;

    return next();
  }

  static verify(req, res) {
    const token =
      req.headers && req.headers.authorization
        ? req.headers.authorization.replace("Bearer ", "")
        : req.body.token;
    try {
      return jwt.verify(token, config.secret);
    } catch (error) {
      return AuthMiddleware.returnErrorResponse(res, invalidTokenError);
    }
  }

  static returnErrorResponse(res, error) {
    res.status(error.code);
    return res.json(error.json);
  }
}
