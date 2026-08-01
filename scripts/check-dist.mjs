import { access, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  SITE_URL,
  areas,
  collections,
  defaultLocale,
  guides,
  hotels,
  locales
} from "../src/data/site.js";
import { createLocalizedSiteData } from "../src/data/localized-site.js";
import { ui } from "../src/messages.js";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(rootDir, "dist");
const appBase = new URL(SITE_URL).pathname.replace(/\/$/, "");
const localeCodes = locales.map((locale) => locale.code);
const routes = [
  { path: "/", kind: "home" },
  { path: "/hotels", kind: "hotels" },
  ...hotels.map((hotel) => ({ path: `/hotels/${hotel.slug}`, kind: "hotel", slug: hotel.slug })),
  { path: "/areas", kind: "areas" },
  ...areas.map((area) => ({ path: `/areas/${area.slug}`, kind: "area", slug: area.slug })),
  { path: "/collections", kind: "collections" },
  ...collections.map((collection) => ({ path: `/collections/${collection.slug}`, kind: "collection", slug: collection.slug })),
  { path: "/map", kind: "map" },
  { path: "/guide", kind: "guide" },
  ...guides.map((guide) => ({ path: `/guide/${guide.slug}`, kind: "guide-detail", slug: guide.slug })),
  { path: "/about", kind: "about" },
  { path: "/contact", kind: "contact" },
  { path: "/for-property-owners", kind: "owners" },
  { path: "/privacy", kind: "privacy" },
  { path: "/terms", kind: "terms" }
];
const routePaths = routes.map((route) => route.path);
const routesByPath = new Map(routes.map((route) => [route.path, route]));
const overviewHeadingKeys = {
  home: "home.title",
  hotels: "hotelsPage.title",
  areas: "areas.indexTitle",
  collections: "collections.indexTitle",
  map: "map.title",
  guide: "guide.indexTitle",
  about: "about.title",
  contact: "contact.title",
  owners: "owners.h1"
};
const legacyAliases = [
  { path: "/hotels", targetPath: "/hotels" },
  ...hotels.map((hotel) => ({
    path: `/hotels/${hotel.slug}`,
    targetPath: `/hotels/${hotel.slug}`
  })),
  { path: "/contact", targetPath: "/contact" },
  { path: "/for-hotel-owners", targetPath: "/for-property-owners" }
];
const failures = [];

function localePath(locale, routePath) {
  return `/${locale}${routePath === "/" ? "/" : routePath}`;
}

function outputPath(routePath) {
  return path.join(distDir, routePath.replace(/^\/|\/$/g, ""), "index.html");
}

function firstMatch(source, pattern) {
  return source.match(pattern)?.[1] ?? "";
}

function staticMain(source) {
  return firstMatch(source, /<main class="seo-static">([\s\S]*?)<\/main>/i)
    .replace(/\s+/g, " ")
    .trim();
}

function staticHeading(source) {
  return firstMatch(source, /<main class="seo-static">[\s\S]*?<h1>([\s\S]*?)<\/h1>/i)
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getNestedValue(source, key) {
  return key.split(".").reduce((current, part) => current?.[part], source);
}

function message(locale, key, params = {}) {
  const value = getNestedValue(ui[locale], key);
  if (typeof value !== "string") throw new Error(`Missing dist-check message: ${locale}.${key}`);
  return value.replace(/\{\{(\w+)\}\}/g, (_, name) => String(params[name] ?? ""));
}

function routeHeading(route, site, locale) {
  if (route.kind === "hotel") {
    const hotel = site.getHotel(route.slug);
    return message(locale, "detail.metaTitle", {
      hotelName: hotel.name,
      hotelType: hotel.typeLabel.toLowerCase(),
      areaName: hotel.areaLabel
    });
  }
  if (route.kind === "area") return site.getArea(route.slug).title;
  if (route.kind === "collection") return site.getCollection(route.slug).h1;
  if (route.kind === "guide-detail") return site.getGuide(route.slug).title;
  if (overviewHeadingKeys[route.kind]) return message(locale, overviewHeadingKeys[route.kind]);
  if (route.kind === "privacy") return message(locale, "legal.privacyTitle");
  if (route.kind === "terms") return message(locale, "legal.termsTitle");
  throw new Error(`Missing expected heading for route kind: ${route.kind}`);
}

function checkHeading(html, expected, context) {
  const actual = staticHeading(html);
  if (!actual) {
    failures.push(`${context}: missing static H1`);
  } else if (actual !== escapeHtml(expected).replace(/\s+/g, " ").trim()) {
    failures.push(`${context}: wrong static H1; expected "${expected}", found "${actual}"`);
  }
}

function decodedAttribute(value) {
  return value.replaceAll("&amp;", "&").replaceAll("&#38;", "&");
}

async function outputTargetExists(pathname) {
  let relativePath;
  try {
    relativePath = decodeURIComponent(pathname.slice(appBase.length)).replace(/^\/+/, "");
  } catch {
    return false;
  }

  const targetFile = path.extname(relativePath)
    ? path.resolve(distDir, relativePath)
    : path.resolve(distDir, relativePath, "index.html");
  const distPrefix = `${path.resolve(distDir)}${path.sep}`;
  if (targetFile !== path.join(path.resolve(distDir), "index.html") && !targetFile.startsWith(distPrefix)) {
    return false;
  }

  try {
    await access(targetFile);
    return true;
  } catch {
    return false;
  }
}

async function checkRootRelativeTarget(href, context) {
  let pathname;
  try {
    pathname = new URL(decodedAttribute(href), `${SITE_URL}/`).pathname;
  } catch {
    failures.push(`${context}: invalid internal link ${href}`);
    return "";
  }

  if (pathname !== appBase && !pathname.startsWith(`${appBase}/`)) {
    failures.push(`${context}: root-relative link misses required ${appBase} base: ${href}`);
    return "";
  }
  if (!(await outputTargetExists(pathname))) {
    failures.push(`${context}: broken internal link ${href}`);
  }
  return pathname;
}

async function checkInternalLinks(html, context, expectedLocale) {
  const links = [...html.matchAll(/<a\s[^>]*href="([^"]+)"/gi)].map((match) => match[1]);
  for (const href of links) {
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const pathname = await checkRootRelativeTarget(href, context);
    if (!pathname || !expectedLocale) continue;

    const localeBase = `${appBase}/${expectedLocale}`;
    if (pathname !== localeBase && !pathname.startsWith(`${localeBase}/`)) {
      failures.push(`${context}: cross-locale or unscoped link ${href}`);
    }
  }
}

const englishMarkup = new Map();

for (const locale of localeCodes) {
  const language = locales.find((item) => item.code === locale);
  const site = createLocalizedSiteData(locale);
  for (const route of routes) {
    const localizedPath = localePath(locale, route.path);
    const filePath = outputPath(localizedPath);
    let html;
    try {
      html = await readFile(filePath, "utf8");
    } catch {
      failures.push(`${locale}: missing output ${localizedPath}`);
      continue;
    }

    if (!new RegExp(`<html[^>]+lang="${language.htmlLang}"[^>]+dir="${language.dir}"`, "i").test(html)) {
      failures.push(`${locale}: wrong lang/dir in ${localizedPath}`);
    }

    const canonical = firstMatch(html, /<link rel="canonical" href="([^"]+)"/i);
    const expectedCanonical = `${SITE_URL}${localizedPath}`;
    if (canonical !== expectedCanonical) failures.push(`${locale}: wrong canonical in ${localizedPath}`);

    const alternates = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/gi)];
    if (alternates.length !== localeCodes.length + 1) {
      failures.push(`${locale}: wrong hreflang count in ${localizedPath}`);
    }
    for (const code of [...localeCodes, "x-default"]) {
      const expectedLocale = code === "x-default" ? defaultLocale : code;
      const expectedHref = `${SITE_URL}${localePath(expectedLocale, route.path)}`;
      const alternate = alternates.find((match) => match[1] === code);
      if (!alternate) {
        failures.push(`${locale}: missing hreflang ${code} in ${localizedPath}`);
      } else if (alternate[2] !== expectedHref) {
        failures.push(`${locale}: wrong hreflang ${code} URL in ${localizedPath}`);
      }
    }

    for (const match of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
      try {
        const schema = JSON.parse(match[1]);
        if (schema.inLanguage && schema.inLanguage !== locale) {
          failures.push(`${locale}: wrong JSON-LD language in ${localizedPath}`);
        }
      } catch {
        failures.push(`${locale}: invalid JSON-LD in ${localizedPath}`);
      }
    }

    await checkInternalLinks(html, `${locale}:${localizedPath}`, locale);
    checkHeading(html, routeHeading(route, site, locale), `${locale}:${localizedPath}`);

    const markup = staticMain(html);
    if (!markup) failures.push(`${locale}: missing static main content in ${localizedPath}`);
    if (locale === defaultLocale) englishMarkup.set(route.path, markup);
    else if (markup === englishMarkup.get(route.path)) {
      failures.push(`${locale}: English-identical static content in ${localizedPath}`);
    }
  }
}

const defaultLanguage = locales.find((item) => item.code === defaultLocale);
const defaultSite = createLocalizedSiteData(defaultLocale);
const rootHtml = await readFile(path.join(distDir, "index.html"), "utf8");
const rootCanonical = firstMatch(rootHtml, /<link rel="canonical" href="([^"]+)"/i);
if (rootCanonical !== `${SITE_URL}/${defaultLocale}/`) failures.push("root: wrong canonical");
if (!new RegExp(`<html[^>]+lang="${defaultLanguage.htmlLang}"[^>]+dir="${defaultLanguage.dir}"`, "i").test(rootHtml)) {
  failures.push("root: wrong lang/dir");
}
const rootAlternates = [...rootHtml.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/gi)];
for (const code of [...localeCodes, "x-default"]) {
  const expectedLocale = code === "x-default" ? defaultLocale : code;
  const expectedHref = `${SITE_URL}/${expectedLocale}/`;
  if (!rootAlternates.some((match) => match[1] === code && match[2] === expectedHref)) {
    failures.push(`root: missing or wrong hreflang ${code}`);
  }
}
if (!staticMain(rootHtml)) failures.push("root: missing static main content");
checkHeading(rootHtml, routeHeading(routesByPath.get("/"), defaultSite, defaultLocale), "root");
await checkInternalLinks(rootHtml, "root", defaultLocale);

const rootModuleScript = rootHtml.match(/<script\s[^>]*type="module"[^>]*>/i)?.[0] ?? "";
const rootModuleSource = firstMatch(rootModuleScript, /src="([^"]+)"/i);
if (!rootModuleSource) {
  failures.push("root: missing module entrypoint");
} else {
  const entryPathname = new URL(rootModuleSource, `${SITE_URL}/`).pathname;
  const entryRelativePath = entryPathname.slice(appBase.length).replace(/^\/+/, "");
  try {
    const entryStats = await stat(path.join(distDir, entryRelativePath));
    if (entryStats.size > 500_000) {
      failures.push(`bundle: main entrypoint is ${entryStats.size} bytes; locale splitting regressed`);
    }
  } catch {
    failures.push(`root: missing module entrypoint target ${rootModuleSource}`);
  }
}

const localePreloadPattern = new RegExp(
  `/assets/(?:${localeCodes.join("|")})-[^"']+\\.js`,
  "i"
);
for (const match of rootHtml.matchAll(/<link\s[^>]*rel="modulepreload"[^>]*href="([^"]+)"/gi)) {
  if (localePreloadPattern.test(match[1])) {
    failures.push(`bundle: locale chunk must load on demand, not via modulepreload: ${match[1]}`);
  }
}

for (const alias of legacyAliases) {
  const targetLocalizedPath = localePath(defaultLocale, alias.targetPath);
  const targetRoute = routesByPath.get(alias.targetPath);
  let aliasHtml;
  let targetHtml;
  try {
    [aliasHtml, targetHtml] = await Promise.all([
      readFile(outputPath(alias.path), "utf8"),
      readFile(outputPath(targetLocalizedPath), "utf8")
    ]);
  } catch {
    failures.push(`alias: missing ${alias.path} or target ${targetLocalizedPath}`);
    continue;
  }

  if (aliasHtml !== targetHtml) failures.push(`alias: ${alias.path} is not byte-identical to ${targetLocalizedPath}`);
  const canonical = firstMatch(aliasHtml, /<link rel="canonical" href="([^"]+)"/i);
  if (canonical !== `${SITE_URL}${targetLocalizedPath}`) {
    failures.push(`alias: wrong canonical in ${alias.path}`);
  }
  if (!targetRoute) {
    failures.push(`alias: unknown target route ${alias.targetPath}`);
  } else {
    checkHeading(
      aliasHtml,
      routeHeading(targetRoute, defaultSite, defaultLocale),
      `alias:${alias.path}`
    );
  }
  await checkInternalLinks(aliasHtml, `alias:${alias.path}`, defaultLocale);
}

const notFoundHtml = await readFile(path.join(distDir, "404.html"), "utf8");
if (!new RegExp(`<html[^>]+lang="${defaultLanguage.htmlLang}"[^>]+dir="${defaultLanguage.dir}"`, "i").test(notFoundHtml)) {
  failures.push("404: wrong lang/dir");
}
if (!/<meta\s+name="robots"\s+content="noindex,follow"\s*\/?>/i.test(notFoundHtml)) {
  failures.push("404: missing noindex,follow robots meta");
}
const notFoundCanonical = firstMatch(notFoundHtml, /<link rel="canonical" href="([^"]+)"/i);
if (notFoundCanonical !== `${SITE_URL}/${defaultLocale}/`) failures.push("404: wrong canonical");
if (!staticMain(notFoundHtml)) failures.push("404: missing useful static content");
checkHeading(notFoundHtml, "Page not found", "404");
if (/<script type="application\/ld\+json"[^>]*data-route-schema="true"/i.test(notFoundHtml)) {
  failures.push("404: must not contain route JSON-LD");
}
if (!notFoundHtml.includes('<div id="root">')) failures.push("404: missing application root");
await checkInternalLinks(notFoundHtml, "404", defaultLocale);
const moduleScript = notFoundHtml.match(/<script\s[^>]*type="module"[^>]*>/i)?.[0] ?? "";
const moduleSource = firstMatch(moduleScript, /src="([^"]+)"/i);
if (!moduleSource || !moduleSource.startsWith("/") || moduleSource.startsWith("//")) {
  failures.push("404: missing root-relative module entrypoint");
} else {
  await checkRootRelativeTarget(moduleSource, "404 module entrypoint");
}

const sitemap = await readFile(path.join(distDir, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const expectedCount = localeCodes.length * routePaths.length;
if (sitemapUrls.length !== expectedCount || new Set(sitemapUrls).size !== expectedCount) {
  failures.push(`sitemap: expected ${expectedCount} unique URLs, found ${sitemapUrls.length}`);
}
for (const locale of localeCodes) {
  for (const routePath of routePaths) {
    const url = `${SITE_URL}${localePath(locale, routePath)}`;
    if (!sitemapUrls.includes(url)) failures.push(`sitemap: missing ${url}`);
  }
}
for (const alias of legacyAliases) {
  const aliasUrl = `${SITE_URL}${alias.path}`;
  if (sitemapUrls.includes(aliasUrl)) failures.push(`sitemap: legacy alias must not be listed ${aliasUrl}`);
}

const robots = await readFile(path.join(distDir, "robots.txt"), "utf8");
if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) failures.push("robots: wrong sitemap URL");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(
  `${expectedCount} localized pages, ${legacyAliases.length} legacy aliases and 404.html checked across ${localeCodes.length} locale(s); H1s, canonical, hreflang, root-relative links, targets, JSON-LD, sitemap and robots are consistent.`
);
