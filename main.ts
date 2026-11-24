import { writeFileSync, mkdirSync } from "node:fs";

// One-line dog excuse for make.fun's "The Dog Ate My Homework:
// Funniest Excuse". The dog was caught eating the homework and
// explains itself: it was helping. A 10-page essay is now zero
// pages, and the dog is proud of the favour, not sorry at all.
const EXCUSE =
  "I was helping. Your homework had a 10-page essay in it and now it has zero pages. You're welcome.";

// The gate only accepts UTF-8 text of 1 to 200 characters that is not
// whitespace-only, so verify the excuse meets the gate before writing it.
const chars = [...EXCUSE].length;
if (chars < 1 || chars > 200 || EXCUSE.trim().length === 0) {
  throw new Error(`excuse is ${chars} characters, outside the 1-200 gate`);
}

// A dash would break the clean read-aloud rhythm the judge weighs, so
// refuse any em or en dash in the excuse. The brief demands a single
// line, so a newline anywhere in the excuse is a defect too.
if (EXCUSE.includes("\u2014") || EXCUSE.includes("\u2013")) {
  throw new Error("excuse must not contain a dash");
}
if (EXCUSE.includes("\n") || EXCUSE.includes("\r")) {
  throw new Error("excuse must be a single line");
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, EXCUSE, "utf8");
