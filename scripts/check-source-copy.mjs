import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoots = ["src/App.jsx", "src/pages", "src/components"];
const allowedVisibleText = new Set([
  "SH",
  "Small Hotels",
  "Small Hotels Batumi",
  "Batumi",
  "OpenStreetMap"
]);
const failures = [];

async function sourceFiles(target) {
  const absolute = path.join(rootDir, target);
  if (/\.[jt]sx?$/.test(target)) return [target];

  return (await readdir(absolute, { withFileTypes: true })).flatMap((entry) => {
    if (entry.isDirectory()) return [];
    return /\.[jt]sx?$/.test(entry.name) ? [`${target}/${entry.name}`] : [];
  });
}

function normalized(value) {
  return value.replace(/\s+/g, " ").trim();
}

function isTranslatable(value) {
  return (
    /[A-Za-z]{2,}/.test(value) &&
    !/^["');;\s]*return\s*\($/.test(value) &&
    !allowedVisibleText.has(value)
  );
}

for (const file of (await Promise.all(sourceRoots.map(sourceFiles))).flat()) {
  const source = await readFile(path.join(rootDir, file), "utf8");

  if (/from\s+["'][^"']*\/data\/(?:site|hotels)\.js["']/.test(source)) {
    failures.push(`${file}: UI bypasses the locale-aware site data layer`);
  }

  for (const match of source.matchAll(/>([^<>{}]*)</g)) {
    const value = normalized(match[1]);
    if (isTranslatable(value)) {
      failures.push(`${file}: hardcoded JSX text: ${JSON.stringify(value)}`);
    }
  }

  for (const match of source.matchAll(
    /\b(?:aria-label|placeholder|title|alt|label)\s*=\s*(?:\{\s*)?["'`]([^"'`{}]+)["'`]\s*\}?/g
  )) {
    const value = normalized(match[1]);
    if (isTranslatable(value)) {
      failures.push(`${file}: hardcoded visible attribute: ${JSON.stringify(value)}`);
    }
  }

  for (const match of source.matchAll(
    /\b(?:aria-label|placeholder|title|alt|label)\s*=\s*\{\s*`([^`]*)`\s*\}/g
  )) {
    const value = normalized(match[1].replace(/\$\{[^}]*\}/g, " "));
    if (isTranslatable(value)) {
      failures.push(`${file}: hardcoded visible template text: ${JSON.stringify(value)}`);
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("React source copy is dictionary-backed; only approved brand text remains inline.");
