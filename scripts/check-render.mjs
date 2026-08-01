import path from "node:path";
import { fileURLToPath } from "node:url";

import { createServer } from "vite";

import {
  areas,
  collections,
  guides,
  hotels,
  locales
} from "../src/data/site.js";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const routePaths = [
  "/",
  "/hotels",
  ...hotels.map((hotel) => `/hotels/${hotel.slug}`),
  "/areas",
  ...areas.map((area) => `/areas/${area.slug}`),
  "/collections",
  ...collections.map((collection) => `/collections/${collection.slug}`),
  "/map",
  "/guide",
  ...guides.map((guide) => `/guide/${guide.slug}`),
  "/about",
  "/contact",
  "/for-property-owners",
  "/privacy",
  "/terms"
];
const failures = [];
const englishMarkup = new Map();
const englishFragments = new Map();
const server = await createServer({
  root: rootDir,
  appType: "custom",
  logLevel: "error",
  server: {
    middlewareMode: true,
    watch: { ignored: ["**/*"] }
  }
});

try {
  const { renderRoute } = await server.ssrLoadModule("/scripts/render-harness.jsx");

  for (const locale of locales) {
    for (const routePath of routePaths) {
      let markup;
      const renderWarnings = [];
      const originalConsoleError = console.error;
      try {
        console.error = (...arguments_) => renderWarnings.push(arguments_.join(" "));
        markup = renderRoute(locale.code, routePath);
      } catch (error) {
        failures.push(`${locale.code}${routePath}: ${error.message}`);
        continue;
      } finally {
        console.error = originalConsoleError;
      }
      if (renderWarnings.length) {
        failures.push(`${locale.code}${routePath}: React warning: ${renderWarnings[0]}`);
      }

      if (!markup.includes("<main")) {
        failures.push(`${locale.code}${routePath}: no rendered main element`);
      }
      if (/\?{4,}|�|Ã.|Â.|â€|ðŸ/.test(markup)) {
        failures.push(`${locale.code}${routePath}: corrupt rendered text`);
      }
      for (const match of markup.matchAll(/\shref="([^"]+)"/g)) {
        const href = match[1].replaceAll("&amp;", "&");
        if (href.startsWith("/") && !href.startsWith(`/${locale.code}/`)) {
          failures.push(`${locale.code}${routePath}: unscoped or cross-locale link ${href}`);
        }
      }

      const fragmentTargets = new Set(
        [...markup.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1])
      );
      const fragmentLinks = [...markup.matchAll(/\shref="#([^"]+)"/g)].map(
        (match) => match[1]
      );
      for (const fragment of fragmentLinks) {
        if (!fragmentTargets.has(fragment)) {
          failures.push(`${locale.code}${routePath}: missing fragment target #${fragment}`);
        }
      }

      if (locale.code === "en") {
        englishMarkup.set(routePath, markup);
        englishFragments.set(routePath, fragmentLinks);
      } else {
        if (markup === englishMarkup.get(routePath)) {
          failures.push(`${locale.code}${routePath}: render is identical to English`);
        }
        if (fragmentLinks.join("|") !== englishFragments.get(routePath).join("|")) {
          failures.push(`${locale.code}${routePath}: fragment links differ from English`);
        }
      }
    }
  }
} finally {
  await server.close();
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(
  `${locales.length * routePaths.length} React routes rendered across ${locales.length} locale(s); runtime translations and internal links are complete.`
);
