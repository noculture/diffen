import { assert } from "chai";
import Differentiator from "../../differentiator";
import path from "path";

describe("Diff Service", () => {
  describe("#readAndCompare", () => {
    it("read and compare two text files", async () => {
      const diff = new Differentiator();
      const fileOne = path.resolve("./src/tests/differentiator/one.txt");
      const fileTwo = path.resolve("./src/tests/differentiator/two.txt");

      const similarity = diff.readAndCompare(fileOne, fileTwo);
      assert.equal(92.5925925925926, similarity.similarityPercentage);
    });
  });
});
