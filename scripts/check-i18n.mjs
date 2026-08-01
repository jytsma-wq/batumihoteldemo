import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { areas, hotels, locales } from "../src/data/site.js";
import { ui } from "../src/messages.js";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const allLocaleCodes = Object.keys(ui);
const localeArgument = process.argv.find((argument) => argument.startsWith("--locale="));
const requestedLocaleCodes = localeArgument
  ? localeArgument.slice("--locale=".length).split(",").filter(Boolean)
  : process.argv.includes("--all")
    ? allLocaleCodes
    : locales.map((locale) => locale.code);
const failures = [];

function describeTree(value, prefix = "", result = {}) {
  const type = Array.isArray(value) ? "array" : value === null ? "null" : typeof value;
  result[prefix || "<root>"] = type;

  if (Array.isArray(value)) {
    value.forEach((child, index) => describeTree(child, `${prefix}[${index}]`, result));
  } else if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, child]) =>
      describeTree(child, prefix ? `${prefix}.${key}` : key, result)
    );
  }

  return result;
}

function textByPath(value, prefix = "", result = {}) {
  if (Array.isArray(value)) {
    value.forEach((child, index) => textByPath(child, `${prefix}[${index}]`, result));
  } else if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, child]) =>
      textByPath(child, prefix ? `${prefix}.${key}` : key, result)
    );
  } else if (typeof value === "string") {
    result[prefix] = value;
  }
  return result;
}

function placeholders(value) {
  return [...value.matchAll(/\{\{(\w+)\}\}/g)].map((match) => match[1]).sort();
}

const englishShape = describeTree(ui.en);
const englishText = textByPath(ui.en);
const allowedExactValues = new Set([
  "Small Hotels Batumi",
  "WhatsApp",
  "WhatsApp CTA",
  "Wi-Fi",
  "GEL",
  "GPS",
  "SEO",
  "FAQ"
]);
const targetScripts = {
  ru: /\p{Script=Cyrillic}/u,
  ka: /\p{Script=Georgian}/u,
  he: /\p{Script=Hebrew}/u,
  ar: /\p{Script=Arabic}/u
};
const protectedEnglishPhrases = [
  ...hotels.map((hotel) => hotel.name),
  ...areas.map((area) => area.name),
  "Small Hotels Batumi",
  "Metro City",
  "Mtsvane Kontskhi",
  "WhatsApp CTA",
  "WhatsApp",
  "Wi-Fi",
  "GEL",
  "GPS",
  "SEO",
  "FAQ",
  "Batumi",
  "Gonio",
  "Kvariati",
  "Makhinjauri"
].sort((a, b) => b.length - a.length);
const technicalEnglishWords = new Set(["faq", "gel", "gps", "seo", "whatsapp", "wifi"]);
const sharedWordsByLocale = {
  // These spellings are also ordinary Turkish words, not English fallbacks.
  tr: new Set(["mini", "modern", "transfer"])
};

function getNestedValue(source, key) {
  return key.split(".").reduce((current, part) => current?.[part], source);
}

function regexEscape(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function withoutProtectedEnglish(value) {
  return protectedEnglishPhrases.reduce(
    (result, phrase) => result.replace(new RegExp(regexEscape(phrase), "gi"), " "),
    value
  );
}

function withoutPlaceholders(value) {
  return value.replace(/\{\{\w+\}\}/g, " ");
}

function englishWords(value) {
  return withoutPlaceholders(value).match(/[A-Za-z]+/g) ?? [];
}

function retainedEnglishWord(source, value, locale) {
  const sourceWords =
    withoutProtectedEnglish(withoutPlaceholders(source)).match(/[A-Za-z]{3,}/g) ?? [];
  const targetWords = new Set(
    (withoutProtectedEnglish(withoutPlaceholders(value)).match(/\p{L}+/gu) ?? []).map((word) =>
      word.toLowerCase()
    )
  );
  const sharedWords = sharedWordsByLocale[locale] ?? new Set();

  return (
    sourceWords.find((word) => {
      const normalized = word.toLowerCase();
      return (
        !technicalEnglishWords.has(normalized) &&
        !sharedWords.has(normalized) &&
        targetWords.has(normalized)
      );
    }) ?? ""
  );
}

for (const locale of requestedLocaleCodes) {
  if (!ui[locale]) {
    failures.push(`${locale}: missing complete UI dictionary`);
    continue;
  }

  const shape = describeTree(ui[locale]);
  const text = textByPath(ui[locale]);

  for (const [key, type] of Object.entries(englishShape)) {
    if (!(key in shape)) failures.push(`${locale}: missing ${key}`);
    else if (shape[key] !== type) failures.push(`${locale}: type mismatch in ${key}`);
  }
  for (const key of Object.keys(shape)) {
    if (!(key in englishShape)) failures.push(`${locale}: extra ${key}`);
  }

  for (const [key, englishValue] of Object.entries(englishText)) {
    const value = text[key];
    if (!value?.trim()) failures.push(`${locale}: empty ${key}`);
    if (value && placeholders(value).join("|") !== placeholders(englishValue).join("|")) {
      failures.push(`${locale}: placeholder mismatch in ${key}`);
    }
    if (value && /\?{4,}|�|Ã.|Â.|â€|ðŸ/.test(value)) {
      failures.push(`${locale}: corrupt text in ${key}`);
    }
    if (value && !/[<>]/.test(englishValue) && /[<>]/.test(value)) {
      failures.push(`${locale}: unexpected markup in ${key}`);
    }
    const sourceWords = englishWords(englishValue);
    const untranslated =
      locale !== "en" &&
      value === englishValue &&
      sourceWords.length >= 1 &&
      !allowedExactValues.has(englishValue) &&
      !sourceWords.every((word) => sharedWordsByLocale[locale]?.has(word.toLowerCase()));
    if (untranslated) {
      failures.push(`${locale}: untranslated English UI in ${key}`);
    } else {
      const englishWord =
        locale !== "en" && value && retainedEnglishWord(englishValue, value, locale);
      if (englishWord) {
        failures.push(`${locale}: retained English word ${JSON.stringify(englishWord)} in ${key}`);
      }
    }
    if (
      targetScripts[locale] &&
      sourceWords.length >= 4 &&
      !targetScripts[locale].test(value)
    ) {
      failures.push(`${locale}: expected ${locale} script in ${key}`);
    }
  }
}

const sourceFiles = [
  "src/App.jsx",
  ...(await Promise.all([
    "src/pages",
    "src/components"
  ].map(async (directory) => {
    const { readdir } = await import("node:fs/promises");
    return (await readdir(path.join(rootDir, directory)))
      .filter((file) => /\.[jt]sx?$/.test(file))
      .map((file) => `${directory}/${file}`);
  }))).flat()
];

const referencedTextKeys = new Set();
const referencedListKeys = new Set();
for (const file of sourceFiles) {
  const source = await readFile(path.join(rootDir, file), "utf8");
  for (const match of source.matchAll(/\b(t|list)\(\s*["']([^"']+)["']/g)) {
    (match[1] === "list" ? referencedListKeys : referencedTextKeys).add(match[2]);
  }
}

for (const key of referencedTextKeys) {
  if (typeof getNestedValue(ui.en, key) !== "string") {
    failures.push(`en: t() reference is not a text value: ${key}`);
  }
}
for (const key of referencedListKeys) {
  if (!Array.isArray(getNestedValue(ui.en, key))) {
    failures.push(`en: list() reference is not an array: ${key}`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(
  `${requestedLocaleCodes.length} UI locale(s) checked; ${Object.keys(englishText).length} text values and ${referencedTextKeys.size + referencedListKeys.size} typed source references are complete.`
);
