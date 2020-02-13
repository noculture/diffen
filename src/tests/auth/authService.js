import { assert } from "chai";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import AuthService from "../../auth/service";
import config from "../../config";

describe("Auth Service", () => {
  describe("#hashPassword", () => {
    it("should properly create jwt tokens", async () => {
      const user = {
        id: 1,
        name: "joe"
      };

      const token = await AuthService.createToken(user);
      const expectedToken = await jwt.sign(user, config.secret, {
        expiresIn: "1d"
      });

      assert.equal(token, expectedToken);
    });
  });

  describe("#verifyPassword", () => {
    it("should return true on a correct password", async () => {
      const user = {
        password: await bcrypt.hash("solo", 12)
      };
      assert.equal(await AuthService.userIsVerified(user, "solo"), true);
    });

    it("should return false on wrong passwords", async () => {
      const user = {
        password: await bcrypt.hash("solo", 12)
      };
      assert.equal(await AuthService.userIsVerified(user, "soldo"), false);
    });
  });
});
