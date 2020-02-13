import jwt from "jsonwebtoken";
import debug from "debug";
import bcrypt from "bcrypt";

import config from "../config";

export default class Service {
  static async createToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
      is_admin: user.is_admin
    };

    try {
      return await jwt.sign(payload, config.secret, { expiresIn: "1d" });
    } catch (error) {
      debug("dev:auth:create-token")(error);
      throw error;
    }
  }

  static async userIsVerified(user, suppliedPassword) {
    try {
      return await bcrypt.compare(suppliedPassword, user.password);
    } catch (error) {
      throw error;
    }
  }
}
