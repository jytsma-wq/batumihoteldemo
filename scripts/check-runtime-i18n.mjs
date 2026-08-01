import assert from "node:assert/strict";

import { createLocalizedSiteData } from "../src/data/localized-site.js";
import { selectHotelResults } from "../src/hotel-results.js";
import {
  localeFromPathname,
  stripLocale,
  stripRouterBase,
  switchLocalePath
} from "../src/locale-paths.js";
import {
  alternateRouteLinks,
  replaceRouteSchemas,
  routeMetaContext,
  shouldReplaceRouteSchemas
} from "../src/route-meta.js";
import { resolveLocalizedTemplate } from "../src/hooks/useLocalizedTemplate.js";

const productionBase = "/batumihoteldemo/";

assert.equal(
  stripRouterBase("/batumihoteldemo/ru/hotels", productionBase),
  "/ru/hotels"
);
assert.equal(stripRouterBase("/batumihoteldemo", productionBase), "/");
assert.equal(
  stripRouterBase("/batumihoteldemo-preview/ru/hotels", productionBase),
  "/batumihoteldemo-preview/ru/hotels"
);
assert.equal(localeFromPathname("/batumihoteldemo/ru/hotels", productionBase), "ru");
assert.equal(stripLocale("/batumihoteldemo/ru/hotels", productionBase), "/hotels");
assert.equal(
  switchLocalePath("/batumihoteldemo/ru/hotels", "ka", productionBase),
  "/ka/hotels"
);

const meta = routeMetaContext(
  "/batumihoteldemo/ru/hotels",
  "Russian title",
  "Russian description",
  productionBase
);
assert.equal(meta.canonicalUrl, "https://jytsma-wq.github.io/batumihoteldemo/ru/hotels");
assert.equal(meta.locale, "ru");
assert.equal(meta.routePath, "/hotels");
assert.equal(meta.schema.url, meta.canonicalUrl);
assert.equal(meta.schema.inLanguage, "ru");
const alternates = alternateRouteLinks(meta.routePath);
assert.equal(alternates.length, 7);
assert.deepEqual(alternates.find(({ hreflang }) => hreflang === "ka"), {
  hreflang: "ka",
  href: "https://jytsma-wq.github.io/batumihoteldemo/ka/hotels"
});
assert.deepEqual(alternates.find(({ hreflang }) => hreflang === "x-default"), {
  hreflang: "x-default",
  href: "https://jytsma-wq.github.io/batumihoteldemo/en/hotels"
});
assert.ok(
  alternates.every(
    ({ href }) => !href.includes("/batumihoteldemo/batumihoteldemo/")
  )
);

const oldSchemas = [
  { dataset: {}, removed: false, remove() { this.removed = true; } },
  { dataset: {}, removed: false, remove() { this.removed = true; } }
];
const appendedSchemas = [];
const fakeDocument = {
  querySelectorAll(selector) {
    assert.equal(selector, 'script[data-route-schema="true"]');
    return oldSchemas;
  },
  createElement(tagName) {
    assert.equal(tagName, "script");
    return { dataset: {} };
  },
  head: {
    appendChild(schema) {
      appendedSchemas.push(schema);
    }
  }
};

assert.equal(
  shouldReplaceRouteSchemas("https://example.test/en/hotels", meta.canonicalUrl, oldSchemas),
  true
);
assert.equal(
  shouldReplaceRouteSchemas(meta.canonicalUrl, meta.canonicalUrl, oldSchemas),
  false
);
assert.equal(
  shouldReplaceRouteSchemas(meta.canonicalUrl, meta.canonicalUrl, [
    { dataset: { clientRouteSchema: "true" } }
  ]),
  true
);
replaceRouteSchemas(fakeDocument, meta.schema);
assert.ok(oldSchemas.every((schema) => schema.removed));
assert.equal(appendedSchemas.length, 1);
assert.deepEqual(JSON.parse(appendedSchemas[0].textContent), meta.schema);
assert.equal(appendedSchemas[0].dataset.routeSchema, "true");
assert.equal(appendedSchemas[0].dataset.clientRouteSchema, "true");

assert.equal(
  resolveLocalizedTemplate(
    { template: "English template", value: "English template" },
    "Русский шаблон"
  ),
  "Русский шаблон"
);
assert.equal(
  resolveLocalizedTemplate(
    { template: "English template", value: "A traveller's own message" },
    "Русский шаблон"
  ),
  "A traveller's own message"
);

const filters = { areaSlug: "old-batumi" };
const englishResults = selectHotelResults(createLocalizedSiteData("en"), filters);
const russianResults = selectHotelResults(createLocalizedSiteData("ru"), filters);
assert.deepEqual(
  russianResults.map((hotel) => hotel.slug),
  englishResults.map((hotel) => hotel.slug)
);
assert.notStrictEqual(russianResults, englishResults);
assert.ok(
  russianResults.some(
    (hotel, index) => hotel.shortDescription !== englishResults[index].shortDescription
  ),
  "current-locale hotel results must contain localized objects"
);

console.log(
  "Runtime i18n checks passed: current-locale hotel results, controlled templates, basename-safe metadata and stale JSON-LD replacement."
);
