import AuthService from "../auth/service";
import { users } from "../db";
import { UserNotFound } from "../errors/responses";

export default class AuthController {
  static async signIn(req, res) {
    let name = req.body.name;
    try {
      const user = await users.findOne({
        where: { name: name }
      });

      if (!user) throw new UserNotFound();

      if (!(await AuthService.userIsVerified(user, req.body.password))) {
        return res.json(AuthController.buildWrongPasswordResponse());
      }

      const token = await AuthService.createToken(user);
      return res.json(AuthController.buildSuccessfulAuthResponse(user, token));
    } catch (error) {
      if (error instanceof UserNotFound) return UserNotFound.respond(res);
      return res.status(500).json({
        status: "INTERNAL_ERROR",
        error: "Internal server error"
      });
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
