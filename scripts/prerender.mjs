import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  SITE_URL,
  areas as baseAreas,
  collections as baseCollections,
  defaultLocale,
  guides as baseGuides,
  hotels as baseHotels,
  locales
} from "../src/data/site.js";
import { createLocalizedSiteData } from "../src/data/localized-site.js";
import { ui } from "../src/messages.js";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(rootDir, "dist");
const template = await readFile(path.join(distDir, "index.html"), "utf8");
const localeCodes = locales.map((locale) => locale.code);
const appBase = new URL(SITE_URL).pathname.replace(/\/$/, "");

const staticRoutes = [
  { path: "/", kind: "home" },
  { path: "/hotels", kind: "hotels" },
  ...baseHotels.map((hotel) => ({ path: `/hotels/${hotel.slug}`, kind: "hotel", slug: hotel.slug })),
  { path: "/areas", kind: "areas" },
  ...baseAreas.map((area) => ({ path: `/areas/${area.slug}`, kind: "area", slug: area.slug })),
  { path: "/collections", kind: "collections" },
  ...baseCollections.map((collection) => ({ path: `/collections/${collection.slug}`, kind: "collection", slug: collection.slug })),
  { path: "/map", kind: "map" },
  { path: "/guide", kind: "guide" },
  ...baseGuides.map((guide) => ({ path: `/guide/${guide.slug}`, kind: "guide-detail", slug: guide.slug })),
  { path: "/about", kind: "about" },
  { path: "/contact", kind: "contact" },
  { path: "/for-property-owners", kind: "owners" },
  { path: "/privacy", kind: "privacy" },
  { path: "/terms", kind: "terms" }
];

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
  ...baseHotels.map((hotel) => ({
    path: `/hotels/${hotel.slug}`,
    targetPath: `/hotels/${hotel.slug}`
  })),
  { path: "/contact", targetPath: "/contact" },
  { path: "/for-hotel-owners", targetPath: "/for-property-owners" }
];

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function stripHtml(value = "") {
  return String(value).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function getNestedValue(source, key) {
  return key.split(".").reduce((current, part) => current?.[part], source);
}

function message(locale, key, params = {}) {
  const value = getNestedValue(ui[locale], key);
  if (typeof value !== "string") throw new Error(`Missing prerender message: ${locale}.${key}`);
  return value.replace(/\{\{(\w+)\}\}/g, (_, name) => String(params[name] ?? ""));
}

function localePath(locale, routePath) {
  return `/${locale}${routePath === "/" ? "/" : routePath}`;
}

function appPath(locale, routePath) {
  return `${appBase}${localePath(locale, routePath)}`;
}

function absoluteUrl(routePath) {
  return `${SITE_URL}${routePath}`;
}

function routeFilePath(routePath) {
  const clean = routePath.replace(/^\/|\/$/g, "");
  return path.join(distDir, clean, "index.html");
}

function listItems(items, mapper) {
  return `<ul>${items.map((item) => `<li>${mapper(item)}</li>`).join("")}</ul>`;
}

function links(items, mapper) {
  return items
    .map((item) => {
      const { href, label } = mapper(item);
      return `<a href="${escapeHtml(href)}">${isolatedName(label)}</a>`;
    })
    .join(" ");
}

function isolatedName(name) {
  return `<bdi>${escapeHtml(name)}</bdi>`;
}

function inferCollectionPath(item) {
  if (item.areaSlug) return `hotels/${item.slug}`;
  if (item.bestAreas) return `collections/${item.slug}`;
  if (item.readingTime) return `guide/${item.slug}`;
  return `areas/${item.slug}`;
}

function itemListSchema(items, name, locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    inLanguage: locale,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name ?? item.title,
      url: absoluteUrl(localePath(locale, `/${inferCollectionPath(item)}`))
    }))
  };
}

function hotelSchema(hotel, locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: hotel.name,
    description: hotel.shortDescription,
    inLanguage: locale,
    image: hotel.gallery.map((image) => image.src),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Batumi",
      addressCountry: "GE",
      streetAddress: hotel.addressApprox
    },
    telephone: hotel.phone,
    priceRange: `${hotel.priceFromGel} GEL+`,
    amenityFeature: hotel.facilities.map((facility) => ({
      "@type": "LocationFeatureSpecification",
      name: facility
    }))
  };
}

function routeMeta(route, site, locale) {
  const suffix = " | Small Hotels Batumi";

  if (route.kind === "hotel") {
    const hotel = site.getHotel(route.slug);
    return {
      title: message(locale, "detail.metaTitle", {
        hotelName: hotel.name,
        hotelType: hotel.typeLabel.toLowerCase(),
        areaName: hotel.areaLabel
      }),
      description: hotel.shortDescription,
      image: hotel.image,
      schema: hotelSchema(hotel, locale)
    };
  }

  if (route.kind === "area") {
    const area = site.getArea(route.slug);
    return {
      title: `${area.title}${suffix}`,
      description: area.description,
      image: area.image,
      schema: itemListSchema(site.filterHotels({ areaSlug: area.slug }), `${area.title}`, locale)
    };
  }

  if (route.kind === "collection") {
    const collection = site.getCollection(route.slug);
    return {
      title: `${collection.h1}${suffix}`,
      description: collection.description,
      image: site.hotels[0].image,
      schema: itemListSchema(site.collectionHotels(collection), collection.title, locale)
    };
  }

  if (route.kind === "guide-detail") {
    const guide = site.getGuide(route.slug);
    return {
      title: `${guide.title}${suffix}`,
      description: guide.description,
      image: site.hotels[2].image,
      schema: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: guide.title,
        description: guide.description,
        dateModified: guide.updated,
        inLanguage: locale
      }
    };
  }

  const common = {
    home: {
      title: `${message(locale, "home.title")}${suffix}`,
      description: message(locale, "home.subtitle"),
      image: site.hotels[2].image
    },
    hotels: {
      title: `${message(locale, "hotelsPage.title")}${suffix}`,
      description: message(locale, "hotelsPage.intro"),
      image: site.hotels[0].image,
      schema: itemListSchema(site.hotels, message(locale, "hotelsPage.title"), locale)
    },
    areas: {
      title: `${message(locale, "areas.indexTitle")}${suffix}`,
      description: message(locale, "areas.indexIntro"),
      image: site.areas[0].image,
      schema: itemListSchema(site.areas, message(locale, "areas.indexTitle"), locale)
    },
    collections: {
      title: `${message(locale, "collections.indexTitle")}${suffix}`,
      description: message(locale, "collections.indexIntro"),
      image: site.hotels[1].image,
      schema: itemListSchema(site.collections, message(locale, "collections.indexTitle"), locale)
    },
    map: {
      title: `${message(locale, "map.title")}${suffix}`,
      description: message(locale, "map.intro"),
      image: site.areas[2].image
    },
    guide: {
      title: `${message(locale, "guide.indexTitle")}${suffix}`,
      description: message(locale, "guide.indexIntro"),
      image: site.hotels[4].image,
      schema: itemListSchema(site.guides, message(locale, "guide.indexTitle"), locale)
    },
    about: {
      title: `${message(locale, "about.title")}${suffix}`,
      description: message(locale, "about.intro"),
      image: site.hotels[0].image
    },
    contact: {
      title: `${message(locale, "contact.title")}${suffix}`,
      description: message(locale, "contact.intro"),
      image: site.hotels[1].image
    },
    owners: {
      title: `${message(locale, "owners.title")}${suffix}`,
      description: message(locale, "owners.intro"),
      image: site.hotels[3].image
    },
    privacy: {
      title: `${message(locale, "legal.privacyTitle")}${suffix}`,
      description: message(locale, "legal.description", { title: message(locale, "legal.privacyTitle") }),
      image: site.hotels[0].image
    },
    terms: {
      title: `${message(locale, "legal.termsTitle")}${suffix}`,
      description: message(locale, "legal.description", { title: message(locale, "legal.termsTitle") }),
      image: site.hotels[0].image
    }
  };

  return common[route.kind];
}

function routeLabel(route, site, locale) {
  if (route.kind === "hotel") return site.getHotel(route.slug).name;
  if (route.kind === "area") return site.getArea(route.slug).title;
  if (route.kind === "collection") return site.getCollection(route.slug).h1;
  if (route.kind === "guide-detail") return site.getGuide(route.slug).title;
  const labels = {
    home: message(locale, "common.home"),
    hotels: message(locale, "nav.hotels"),
    areas: message(locale, "nav.areas"),
    collections: message(locale, "nav.collections"),
    map: message(locale, "nav.map"),
    guide: message(locale, "nav.guide"),
    about: message(locale, "nav.about"),
    contact: message(locale, "footer.contact"),
    owners: message(locale, "owners.title"),
    privacy: message(locale, "legal.privacyTitle"),
    terms: message(locale, "legal.termsTitle")
  };
  return labels[route.kind];
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
  throw new Error(`Missing prerender heading for route kind: ${route.kind}`);
}

function breadcrumbSchema(locale, route, site) {
  const routeParts = route.path.split("/").filter(Boolean);
  const elements = [
    {
      "@type": "ListItem",
      position: 1,
      name: message(locale, "common.home"),
      item: absoluteUrl(localePath(locale, "/"))
    }
  ];

  if (routeParts.length) {
    const sectionKinds = { hotels: "hotels", areas: "areas", collections: "collections", guide: "guide" };
    const section = routeParts[0];
    if (routeParts.length > 1 && sectionKinds[section]) {
      elements.push({
        "@type": "ListItem",
        position: 2,
        name: routeLabel({ kind: sectionKinds[section] }, site, locale),
        item: absoluteUrl(localePath(locale, `/${section}`))
      });
    }
    elements.push({
      "@type": "ListItem",
      position: elements.length + 1,
      name: routeLabel(route, site, locale),
      item: absoluteUrl(localePath(locale, route.path))
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: elements
  };
}

function faqSchema(faqs, locale) {
  if (!faqs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer }
    }))
  };
}

function routeFaqs(route, site) {
  if (route.kind === "hotel") return site.getHotel(route.slug).faqs;
  if (route.kind === "area") return site.getArea(route.slug).faqs;
  return [];
}

function pageStaticMarkup(route, site, locale) {
  const meta = routeMeta(route, site, locale);
  const heading = escapeHtml(routeHeading(route, site, locale));
  const description = escapeHtml(meta.description);

  if (route.kind === "hotel") {
    const hotel = site.getHotel(route.slug);
    return `<main class="seo-static"><h1>${heading}</h1><p>${description}</p>
      <p><strong>${escapeHtml(message(locale, "detail.area"))}:</strong> ${escapeHtml(hotel.areaLabel)}. <strong>${escapeHtml(message(locale, "detail.beach"))}:</strong> ${escapeHtml(hotel.distanceToBeach)}. <strong>${escapeHtml(message(locale, "common.from"))}</strong> ${hotel.priceFromGel} GEL.</p>
      <h2>${escapeHtml(message(locale, "detail.rooms"))}</h2>${listItems(hotel.rooms, (room) => `${escapeHtml(room.name)} — ${escapeHtml(message(locale, "common.sleeps"))} ${room.sleeps}, ${escapeHtml(room.beds)}, ${escapeHtml(room.goodFor)}`)}
      <h2>${escapeHtml(message(locale, "detail.goodToKnow"))}</h2>${listItems(hotel.goodToKnow, escapeHtml)}
      <h2>${escapeHtml(message(locale, "detail.faq"))}</h2>${listItems(hotel.faqs, (faq) => `<strong>${escapeHtml(faq.question)}</strong> ${escapeHtml(faq.answer)}`)}</main>`;
  }

  if (route.kind === "area") {
    const area = site.getArea(route.slug);
    return `<main class="seo-static"><h1>${heading}</h1><p>${description}</p>
      <h2>${escapeHtml(message(locale, "areas.bestFor"))}</h2>${listItems(area.bestFor, escapeHtml)}
      <h2>${escapeHtml(message(locale, "areas.hotelsHere"))}</h2><p>${links(site.filterHotels({ areaSlug: area.slug }), (hotel) => ({ href: appPath(locale, `/hotels/${hotel.slug}`), label: hotel.name }))}</p></main>`;
  }

  if (route.kind === "collection") {
    const collection = site.getCollection(route.slug);
    return `<main class="seo-static"><h1>${heading}</h1><p>${escapeHtml(collection.intro)}</p>
      <h2>${escapeHtml(message(locale, "collections.hotels"))}</h2><p>${links(site.collectionHotels(collection), (hotel) => ({ href: appPath(locale, `/hotels/${hotel.slug}`), label: hotel.name }))}</p></main>`;
  }

  if (route.kind === "guide-detail") {
    const guide = site.getGuide(route.slug);
    return `<main class="seo-static"><h1>${heading}</h1><p>${description}</p>${guide.sections.map((section) => `<h2>${escapeHtml(section.heading)}</h2><p>${escapeHtml(section.body)}</p>`).join("")}</main>`;
  }

  const lists = {
    hotels: () => listItems(site.hotels, (hotel) => `<a href="${appPath(locale, `/hotels/${hotel.slug}`)}">${isolatedName(hotel.name)}</a> — ${escapeHtml(hotel.areaLabel)} — ${escapeHtml(hotel.shortDescription)}`),
    areas: () => listItems(site.areas, (area) => `<a href="${appPath(locale, `/areas/${area.slug}`)}">${escapeHtml(area.name)}</a> — ${escapeHtml(area.description)}`),
    collections: () => listItems(site.collections, (collection) => `<a href="${appPath(locale, `/collections/${collection.slug}`)}">${escapeHtml(collection.title)}</a> — ${escapeHtml(collection.description)}`),
    guide: () => listItems(site.guides, (guide) => `<a href="${appPath(locale, `/guide/${guide.slug}`)}">${escapeHtml(guide.title)}</a> — ${escapeHtml(guide.description)}`)
  };
  const content = lists[route.kind]?.() ?? `<p>${links(site.hotels.slice(0, 6), (hotel) => ({ href: appPath(locale, `/hotels/${hotel.slug}`), label: hotel.name }))}</p>`;
  return `<main class="seo-static"><h1>${heading}</h1><p>${description}</p>${content}</main>`;
}

function headTags({ locale, route, canonicalPath, site }) {
  const language = locales.find((item) => item.code === locale) ?? locales[0];
  const meta = routeMeta(route, site, locale);
  const canonical = absoluteUrl(canonicalPath);
  const alternates = localeCodes.map((code) =>
    `<link rel="alternate" hreflang="${code}" href="${escapeHtml(absoluteUrl(localePath(code, route.path)))}" />`
  );
  alternates.push(`<link rel="alternate" hreflang="x-default" href="${escapeHtml(absoluteUrl(localePath(defaultLocale, route.path)))}" />`);
  const schemas = [meta.schema, breadcrumbSchema(locale, route, site), faqSchema(routeFaqs(route, site), locale)].filter(Boolean);

  return {
    language,
    tags: `<title>${escapeHtml(meta.title)}</title>
    <meta name="description" content="${escapeHtml(stripHtml(meta.description))}" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    ${alternates.join("\n    ")}
    <meta property="og:type" content="${route.kind === "guide-detail" ? "article" : "website"}" />
    <meta property="og:title" content="${escapeHtml(meta.title)}" />
    <meta property="og:description" content="${escapeHtml(stripHtml(meta.description))}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta property="og:image" content="${escapeHtml(meta.image)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
    <meta name="twitter:description" content="${escapeHtml(stripHtml(meta.description))}" />
    <meta name="twitter:image" content="${escapeHtml(meta.image)}" />
    ${schemas.map((schema) => `<script type="application/ld+json" data-route-schema="true">${JSON.stringify(schema)}</script>`).join("\n    ")}`
  };
}

function renderHtml({ locale, route, canonicalPath, site }) {
  const { language, tags } = headTags({ locale, route, canonicalPath, site });
  let html = template
    .replace(/<html[^>]*>/i, `<html lang="${language.htmlLang}" dir="${language.dir}">`)
    .replace(/\s*<title>[\s\S]*?<\/title>/i, "")
    .replace(/\s*<meta\s+name="description"[^>]*>/i, "")
    .replace(/\s*<meta\s+property="og:[^"]+"[^>]*>/gi, "")
    .replace(/\s*<meta\s+name="twitter:[^"]+"[^>]*>/gi, "")
    .replace(/\s*<link\s+rel="canonical"[^>]*>/gi, "")
    .replace(/\s*<link\s+rel="alternate"[^>]*>/gi, "");

  html = html.replace("</head>", `${tags}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${pageStaticMarkup(route, site, locale)}</div>`);
  return html;
}

function renderNotFoundHtml() {
  const language = locales.find((item) => item.code === defaultLocale) ?? locales[0];
  const homePath = localePath(defaultLocale, "/");
  const canonical = absoluteUrl(homePath);
  const homeHref = appPath(defaultLocale, "/");
  const title = "Page not found | Small Hotels Batumi";
  const description = "The requested page does not exist. Continue to the Small Hotels Batumi homepage.";
  const tags = `<title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="noindex,follow" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />`;
  const content = `<main class="seo-static"><h1>Page not found</h1><p>${escapeHtml(description)}</p><p><a href="${escapeHtml(homeHref)}">Go to the English homepage</a></p></main>`;

  let html = template
    .replace(/<html[^>]*>/i, `<html lang="${language.htmlLang}" dir="${language.dir}">`)
    .replace(/\s*<title>[\s\S]*?<\/title>/i, "")
    .replace(/\s*<meta\s+name="description"[^>]*>/i, "")
    .replace(/\s*<meta\s+name="robots"[^>]*>/gi, "")
    .replace(/\s*<meta\s+property="og:[^"]+"[^>]*>/gi, "")
    .replace(/\s*<meta\s+name="twitter:[^"]+"[^>]*>/gi, "")
    .replace(/\s*<link\s+rel="canonical"[^>]*>/gi, "")
    .replace(/\s*<link\s+rel="alternate"[^>]*>/gi, "");

  html = html.replace("</head>", `${tags}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${content}</div>`);
  return html;
}

const sitemapUrls = [];

for (const locale of localeCodes) {
  const site = createLocalizedSiteData(locale);
  for (const route of staticRoutes) {
    const routePath = localePath(locale, route.path);
    sitemapUrls.push(absoluteUrl(routePath));
    const outputFile = routeFilePath(routePath);
    await mkdir(path.dirname(outputFile), { recursive: true });
    await writeFile(
      outputFile,
      renderHtml({ locale, route, canonicalPath: routePath, site }),
      "utf8"
    );
  }
}

for (const alias of legacyAliases) {
  const targetPath = localePath(defaultLocale, alias.targetPath);
  const html = await readFile(routeFilePath(targetPath), "utf8");
  const outputFile = routeFilePath(alias.path);
  await mkdir(path.dirname(outputFile), { recursive: true });
  await writeFile(outputFile, html, "utf8");
}

const homeRoute = staticRoutes[0];
await writeFile(
  path.join(distDir, "index.html"),
  renderHtml({
    locale: defaultLocale,
    route: homeRoute,
    canonicalPath: localePath(defaultLocale, "/"),
    site: createLocalizedSiteData(defaultLocale)
  }),
  "utf8"
);
await writeFile(path.join(distDir, "404.html"), renderNotFoundHtml(), "utf8");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map((url) => `  <url><loc>${escapeHtml(url)}</loc></url>`).join("\n")}
</urlset>
`;
await writeFile(path.join(distDir, "sitemap.xml"), sitemap, "utf8");
await writeFile(
  path.join(distDir, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`,
  "utf8"
);

console.log(
  `Prerendered ${sitemapUrls.length} localized routes, ${legacyAliases.length} legacy aliases and 404.html plus sitemap.xml and robots.txt.`
);
