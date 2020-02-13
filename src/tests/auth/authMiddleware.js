import { assert } from "chai";
import { spy } from "sinon";
import jwt from "jsonwebtoken";

import AuthMiddleware from "../../middleware/auth";
import config from "../../config";

describe("Auth Middleware", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      body: {}
    };
    res = {
      status: spy(),
      json: spy()
    };
    next = spy();
  });

  describe("#verifyUser", () => {
    it("should return a 401 on messages without proper Authorization headers", () => {
      AuthMiddleware.authenticateUser(req, res, next);

      assert(res.status.calledWithExactly(400));
      assert(
        res.json.calledWithExactly({
          error: "NO_AUTH_HEADER",
          message: "There is no authentication header attached to this request"
        })
      );
    });

    it("should accept requests from valid users", async () => {
      const user = {
        id: 1,
        name: "joe"
      };
      req.body.token = await jwt.sign(user, config.secret, { expiresIn: "1d" });
      AuthMiddleware.authenticateUser(req, res, next);

      assert(next.calledOnce);
    });
  });
});
