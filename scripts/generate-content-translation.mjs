import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  areas,
  budgetRanges,
  collections,
  filterOptions,
  guides,
  hotels,
  hotelTypes
} from "../src/data/site.js";
import { collectContentEntries } from "../src/data/content-schema.js";

const locale = process.argv[2];
if (!locale || !/^[a-z]{2}$/.test(locale)) {
  throw new Error("Usage: node scripts/generate-content-translation.mjs <locale>");
}

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(rootDir, "src", "data", "translations");
const outputPath = path.join(outputDir, `${locale}.js`);
const messages = collectContentEntries({
  areas,
  hotels,
  filterOptions,
  hotelTypes,
  budgetRanges,
  collections,
  guides
});

await mkdir(outputDir, { recursive: true });
await writeFile(
  outputPath,
  `export default ${JSON.stringify(messages, null, 2)};\n`,
  { encoding: "utf8", flag: "wx" }
);

console.log(`Created ${outputPath} with ${Object.keys(messages).length} source entries.`);
