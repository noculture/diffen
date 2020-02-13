const Diff = require("diff");

import stream from "event-stream";
import fs from "fs";

export default class Differentiator {
  readAndCompare(original, comparision) {
    const file = fs.readFileSync(comparision, "utf-8");
    const fileTwo = fs.readFileSync(original, "utf-8");

    const changes = this.compare(file, fileTwo);

    if (changes.length === 1) return { similarityPercentage: 100, changes };

    let words = 0;
    let changedWords = 0;
    changes.forEach(change => {
      words += change.count;
      if (change.added || change.removed) changedWords += change.count;
    });

    return {
      similarityPercentage: ((words - changedWords) / words) * 100,
      changes
    };
  }

  compare(lineOne, lineTwo) {
    return Diff.diffSentences(lineOne, lineTwo, { newlineIsToken: true });
  }
}
