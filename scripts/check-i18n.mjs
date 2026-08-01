import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { locales } from "../src/data/site.js";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = await readFile(path.join(rootDir, "src", "i18n.jsx"), "utf8");
const objectStart = source.indexOf("const ui = ") + "const ui = ".length;
const objectEnd = source.indexOf("\n\nconst labelMaps");

if (objectStart < "const ui = ".length || objectEnd < objectStart) {
  throw new Error("Unable to locate the UI translation dictionary");
}

const dictionarySource = source
  .slice(objectStart, objectEnd)
  .trim()
  .replace(/;$/, "");
const ui = Function(`"use strict"; return (${dictionarySource})`)();

function textByPath(value, prefix = "", result = {}) {
  if (Array.isArray(value)) {
    value.forEach((child, index) =>
      textByPath(child, `${prefix}[${index}]`, result)
    );
    return result;
  }

  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, child]) =>
      textByPath(child, prefix ? `${prefix}.${key}` : key, result)
    );
    return result;
  }

  if (typeof value === "string") result[prefix] = value;
  return result;
}

function placeholders(value) {
  return [...value.matchAll(/\{\{(\w+)\}\}/g)]
    .map((match) => match[1])
    .sort();
}

const english = textByPath(ui.en);
const failures = [];

for (const locale of locales) {
  const messages = textByPath(ui[locale.code] ?? {});

  for (const [key, englishValue] of Object.entries(english)) {
    const value = messages[key];
    if (!value?.trim()) failures.push(`${locale.code}: missing ${key}`);
    if (value && placeholders(value).join("|") !== placeholders(englishValue).join("|")) {
      failures.push(`${locale.code}: placeholder mismatch in ${key}`);
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(
  `${locales.length} published locale checked; ${Object.keys(english).length} UI values are complete.`
);
