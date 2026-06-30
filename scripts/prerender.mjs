import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  SITE_URL,
  areas,
  collectionHotels,
  collections,
  defaultLocale,
  filterHotels,
  getArea,
  getCollection,
  getGuide,
  getHotel,
  guides,
  hotels,
  locales
} from "../src/data/site.js";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(rootDir, "dist");
const template = await readFile(path.join(distDir, "index.html"), "utf8");
const localeCodes = locales.map((locale) => locale.code);

const staticRoutes = [
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

function localePath(locale, routePath) {
  return `/${locale}${routePath === "/" ? "/" : routePath}`;
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
  return items.map((item) => {
    const { href, label } = mapper(item);
    return `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
  }).join(" ");
}

function routeMeta(route) {
  if (route.kind === "hotel") {
    const hotel = getHotel(route.slug);
    return {
      title: `${hotel.name} - small ${hotel.type.toLowerCase()} in ${hotel.areaName}, Batumi`,
      description: hotel.shortDescription,
      image: hotel.image,
      schema: hotelSchema(hotel)
    };
  }

  if (route.kind === "area") {
    const area = getArea(route.slug);
    return {
      title: `${area.title} | Small Hotels Batumi`,
      description: area.description,
      image: area.image,
      schema: itemListSchema(filterHotels({ areaSlug: area.slug }), "Hotels in " + area.name)
    };
  }

  if (route.kind === "collection") {
    const collection = getCollection(route.slug);
    return {
      title: `${collection.h1} | Small Hotels Batumi`,
      description: collection.description,
      image: hotels[0].image,
      schema: itemListSchema(collectionHotels(collection), collection.title)
    };
  }

  if (route.kind === "guide-detail") {
    const guide = getGuide(route.slug);
    return {
      title: `${guide.title} | Small Hotels Batumi`,
      description: guide.description,
      image: hotels[2].image,
      schema: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: guide.title,
        description: guide.description,
        dateModified: guide.updated,
        inLanguage: "en"
      }
    };
  }

  const common = {
    home: {
      title: "Small hotels in Batumi - independent guesthouses, rooms and local stays",
      description:
        "Traveller-first guide to independent hotels, guesthouses and local rooms in Batumi, Georgia.",
      image: hotels[2].image
    },
    hotels: {
      title: "Small hotels and guesthouses in Batumi | Small Hotels Batumi",
      description:
        "Browse independent hotels, guesthouses, mini hotels and local rooms across Batumi by area, budget and practical trip needs.",
      image: hotels[0].image,
      schema: itemListSchema(hotels, "Small hotels and guesthouses in Batumi")
    },
    areas: {
      title: "Where to stay in Batumi | Small Hotels Batumi",
      description:
        "Compare Old Batumi, Boulevard, New Boulevard, Gonio, Kvariati, Makhinjauri and other Batumi accommodation areas.",
      image: areas[0].image,
      schema: itemListSchema(areas, "Batumi accommodation areas")
    },
    collections: {
      title: "Batumi hotel collections by travel intent | Small Hotels Batumi",
      description:
        "Find Batumi stays by beach access, family travel, quiet areas, sea views, parking, airport access and budget.",
      image: hotels[1].image,
      schema: itemListSchema(collections, "Batumi hotel collections")
    },
    map: {
      title: "Small hotels by Batumi area map | Small Hotels Batumi",
      description:
        "Map-style guide to small hotels and guesthouses by approximate Batumi area.",
      image: areas[2].image
    },
    guide: {
      title: "Batumi accommodation guide | Small Hotels Batumi",
      description:
        "Practical local advice for choosing where to stay in Batumi, from old-town streets to quieter beach villages.",
      image: hotels[4].image,
      schema: itemListSchema(guides, "Batumi accommodation guides")
    },
    about: {
      title: "About Small Hotels Batumi",
      description:
        "A local accommodation guide for travellers who prefer independent stays, practical details and direct contact.",
      image: hotels[0].image
    },
    contact: {
      title: "Ask for local accommodation advice | Small Hotels Batumi",
      description:
        "Contact Small Hotels Batumi for local advice on areas, shortlists and direct small-hotel requests.",
      image: hotels[1].image
    },
    owners: {
      title: "For property owners | Small Hotels Batumi",
      description:
        "Information for local property owners who want a clearer hotel page and direct traveller requests.",
      image: hotels[3].image
    },
    privacy: {
      title: "Privacy | Small Hotels Batumi",
      description: "Privacy information for Small Hotels Batumi.",
      image: hotels[0].image
    },
    terms: {
      title: "Terms | Small Hotels Batumi",
      description: "Terms information for Small Hotels Batumi.",
      image: hotels[0].image
    }
  };

  return common[route.kind];
}

function hotelSchema(hotel) {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: hotel.name,
    description: hotel.shortDescription,
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

function itemListSchema(items, name) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name ?? item.title,
      url: item.slug ? absoluteUrl(`/en/${inferCollectionPath(item)}`) : SITE_URL
    }))
  };
}

function inferCollectionPath(item) {
  if (item.areaSlug) return `hotels/${item.slug}`;
  if (item.bestAreas) return `collections/${item.slug}`;
  if (item.readingTime) return `guide/${item.slug}`;
  return `areas/${item.slug}`;
}

function breadcrumbSchema(locale, routePath, route) {
  const parts = routePath.split("/").filter(Boolean).slice(1);
  const elements = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: absoluteUrl(localePath(locale, "/"))
    }
  ];

  parts.forEach((part, index) => {
    const pathPart = `/${[locale, ...parts.slice(0, index + 1)].join("/")}`;
    elements.push({
      "@type": "ListItem",
      position: index + 2,
      name: index === parts.length - 1 ? routeMeta(route).title.replace(" | Small Hotels Batumi", "") : part,
      item: absoluteUrl(pathPart)
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: elements
  };
}

function faqSchema(faqs) {
  if (!faqs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

function routeFaqs(route) {
  if (route.kind === "hotel") return getHotel(route.slug).faqs;
  if (route.kind === "area") return getArea(route.slug).faqs;
  return [];
}

function pageStaticMarkup(route, localeRoutePath) {
  const meta = routeMeta(route);
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);

  if (route.kind === "hotel") {
    const hotel = getHotel(route.slug);
    return `
      <main class="seo-static">
        <h1>${title}</h1>
        <p>${description}</p>
        <p><strong>Area:</strong> ${escapeHtml(hotel.areaName)}. <strong>Beach:</strong> ${escapeHtml(hotel.distanceToBeach)}. <strong>From:</strong> ${hotel.priceFromGel} GEL.</p>
        <h2>Rooms</h2>
        ${listItems(hotel.rooms, (room) => `${escapeHtml(room.name)} - sleeps ${room.sleeps}, ${escapeHtml(room.beds)}, ${escapeHtml(room.goodFor)}`)}
        <h2>Good to know</h2>
        ${listItems(hotel.goodToKnow, escapeHtml)}
        <h2>FAQ</h2>
        ${listItems(hotel.faqs, (faq) => `<strong>${escapeHtml(faq.question)}</strong> ${escapeHtml(faq.answer)}`)}
      </main>`;
  }

  if (route.kind === "area") {
    const area = getArea(route.slug);
    const areaHotels = filterHotels({ areaSlug: area.slug });
    return `
      <main class="seo-static">
        <h1>${title}</h1>
        <p>${description}</p>
        <h2>Best for</h2>
        ${listItems(area.bestFor, escapeHtml)}
        <h2>Hotels in this area</h2>
        <p>${links(areaHotels, (hotel) => ({ href: `/en/hotels/${hotel.slug}`, label: hotel.name }))}</p>
      </main>`;
  }

  if (route.kind === "collection") {
    const collection = getCollection(route.slug);
    const matchingHotels = collectionHotels(collection);
    return `
      <main class="seo-static">
        <h1>${escapeHtml(collection.h1)}</h1>
        <p>${escapeHtml(collection.intro)}</p>
        <h2>Matching stays</h2>
        <p>${links(matchingHotels, (hotel) => ({ href: `/en/hotels/${hotel.slug}`, label: hotel.name }))}</p>
      </main>`;
  }

  if (route.kind === "guide-detail") {
    const guide = getGuide(route.slug);
    return `
      <main class="seo-static">
        <h1>${escapeHtml(guide.title)}</h1>
        <p>${escapeHtml(guide.description)}</p>
        ${guide.sections.map((section) => `<h2>${escapeHtml(section.heading)}</h2><p>${escapeHtml(section.body)}</p>`).join("")}
      </main>`;
  }

  if (route.kind === "hotels") {
    return `
      <main class="seo-static">
        <h1>${title}</h1>
        <p>${description}</p>
        <h2>Featured small hotels</h2>
        ${listItems(hotels, (hotel) => `<a href="/en/hotels/${hotel.slug}">${escapeHtml(hotel.name)}</a> - ${escapeHtml(hotel.areaName)} - ${escapeHtml(hotel.shortDescription)}`)}
      </main>`;
  }

  if (route.kind === "areas") {
    return `
      <main class="seo-static">
        <h1>${title}</h1>
        <p>${description}</p>
        ${listItems(areas, (area) => `<a href="/en/areas/${area.slug}">${escapeHtml(area.name)}</a> - ${escapeHtml(area.description)}`)}
      </main>`;
  }

  if (route.kind === "collections") {
    return `
      <main class="seo-static">
        <h1>${title}</h1>
        <p>${description}</p>
        ${listItems(collections, (collection) => `<a href="/en/collections/${collection.slug}">${escapeHtml(collection.title)}</a> - ${escapeHtml(collection.description)}`)}
      </main>`;
  }

  if (route.kind === "guide") {
    return `
      <main class="seo-static">
        <h1>${title}</h1>
        <p>${description}</p>
        ${listItems(guides, (guide) => `<a href="/en/guide/${guide.slug}">${escapeHtml(guide.title)}</a> - ${escapeHtml(guide.description)}`)}
      </main>`;
  }

  return `
    <main class="seo-static">
      <h1>${title}</h1>
      <p>${description}</p>
      <p>${links(hotels.slice(0, 6), (hotel) => ({ href: `/en/hotels/${hotel.slug}`, label: hotel.name }))}</p>
      <p><a href="${escapeHtml(localeRoutePath)}">Open Small Hotels Batumi</a></p>
    </main>`;
}

function headTags({ locale, routePath, canonicalPath, route }) {
  const language = locales.find((item) => item.code === locale) ?? locales[0];
  const meta = routeMeta(route);
  const canonical = absoluteUrl(canonicalPath);
  const altPath = route.path;
  const alternates = localeCodes.map((code) => {
    const href = absoluteUrl(localePath(code, altPath));
    return `<link rel="alternate" hreflang="${code}" href="${escapeHtml(href)}" />`;
  });
  alternates.push(`<link rel="alternate" hreflang="x-default" href="${escapeHtml(absoluteUrl(localePath(defaultLocale, altPath)))}" />`);

  const schemas = [meta.schema, breadcrumbSchema(locale, routePath, route), faqSchema(routeFaqs(route))].filter(Boolean);

  return {
    language,
    tags: `
    <title>${escapeHtml(meta.title)}</title>
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
    ${schemas.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join("\n    ")}
    `
  };
}

function renderHtml({ locale, route, routePath, canonicalPath = routePath }) {
  const { language, tags } = headTags({ locale, routePath, canonicalPath, route });
  let html = template
    .replace(/<html[^>]*>/i, `<html lang="${language.htmlLang}" dir="${language.dir}">`)
    .replace(/\s*<title>[\s\S]*?<\/title>/i, "")
    .replace(/\s*<meta\s+name="description"[^>]*>/i, "")
    .replace(/\s*<meta\s+property="og:[^"]+"[^>]*>/gi, "")
    .replace(/\s*<meta\s+name="twitter:[^"]+"[^>]*>/gi, "")
    .replace(/\s*<link\s+rel="canonical"[^>]*>/gi, "")
    .replace(/\s*<link\s+rel="alternate"[^>]*>/gi, "");

  html = html.replace("</head>", `${tags}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${pageStaticMarkup(route, routePath)}</div>`);
  return html;
}

const sitemapUrls = [];

for (const locale of localeCodes) {
  for (const route of staticRoutes) {
    const routePath = localePath(locale, route.path);
    sitemapUrls.push(absoluteUrl(routePath));
    const outputFile = routeFilePath(routePath);
    await mkdir(path.dirname(outputFile), { recursive: true });
    await writeFile(outputFile, renderHtml({ locale, route, routePath }), "utf8");
  }
}

const homeRoute = staticRoutes[0];
await writeFile(
  path.join(distDir, "index.html"),
  renderHtml({
    locale: defaultLocale,
    route: homeRoute,
    routePath: "/",
    canonicalPath: localePath(defaultLocale, "/")
  }),
  "utf8"
);

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

console.log(`Prerendered ${sitemapUrls.length} localized routes plus sitemap.xml and robots.txt.`);
