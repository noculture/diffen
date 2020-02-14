import AuthService from "../auth/service";
import db from "../db";
import { UserNotFound, UserAlreadyExists } from "../errors/responses";

export default class AuthController {
  static async signUp(req, res) {
    console.log(db.users);
    try {
      const result = await db.users.create({
        name: req.body.name,
        password: await AuthService.hashPassword(req.body.password)
      });
      const token = await AuthService.createToken(result);
      const response = AuthController.buildSuccessfulAuthResponse(
        result,
        token
      );
      return res.json(response);
    } catch (e) {
      return res.status(500).json({
        status: "INTERNAL_ERROR",
        error: "Internal server error"
      });
    }
  }

  static async signIn(req, res) {
    let name = req.body.name;
    try {
      const user = await db.users.findOne({
        where: { name: name }
      });

      if (!user) throw new UserNotFound();

      if (!(await AuthService.userIsVerified(user, req.body.password))) {
        return res.json(AuthController.buildWrongPasswordResponse());
      }

      const token = await AuthService.createToken(user);
      return res.json(AuthController.buildSuccessfulAuthResponse(user, token));
    } catch (error) {
      return UserNotFound.respond(res);
    }
  }

  static buildSuccessfulAuthResponse(user, token) {
    return {
      status: "success",
      data: {
        user_id: user.id,
        token
      }
    };
  }

  static buildWrongPasswordResponse() {
    return {
      status: "failure",
      message: "WRONG_PASSWORD"
    };
  }
}
