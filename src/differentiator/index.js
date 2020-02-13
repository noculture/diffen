const Diff = require("diff");

import stream from "event-stream";
import fs from "fs";

export default class Differentiator {
  readAndCompare(original, comparision) {
    const file = fs.readFileSync(comparision, "utf-8");
    const fileTwo = fs.readFileSync(original, "utf-8");

    this.compare(file, fileTwo);
  }

  compare(lineOne, lineTwo) {
    return Diff.diffSentences(lineOne, lineTwo, { newlineIsToken: true });
  }
}
