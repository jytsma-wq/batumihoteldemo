import {
  areas,
  budgetRanges,
  collections,
  filterOptions,
  guides,
  hotels,
  hotelTypes,
  locales
} from "../src/data/site.js";
import { isDeepStrictEqual } from "node:util";
import {
  collectContentEntries,
  contentFieldSchema
} from "../src/data/content-schema.js";
import {
  contentTranslations,
  createLocalizedSiteData
} from "../src/data/localized-site.js";

const expected = collectContentEntries({
  areas,
  hotels,
  filterOptions,
  hotelTypes,
  budgetRanges,
  collections,
  guides
});
const localeArgument = process.argv.find((argument) => argument.startsWith("--locale="));
const requestedLocaleCodes = localeArgument
  ? localeArgument.slice("--locale=".length).split(",").filter(Boolean)
  : process.argv.includes("--all")
    ? ["en", "ru", "ka", "tr", "he", "ar"]
    : locales.map((locale) => locale.code);
const failures = [];
const englishSite = createLocalizedSiteData("en");
const allowedExactValues = new Set([
  "Small Hotels Batumi",
  "WhatsApp",
  "Wi-Fi",
  "FAQ",
  "GEL",
  "GPS",
  "SEO",
  "Metro City",
  "Gonio",
  "Kvariati",
  "Makhinjauri",
  "Piazza",
  "Sarpi"
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
  "Europe Square",
  "Batumi Boulevard",
  "New Boulevard",
  "Old Batumi",
  "Mtsvane Kontskhi",
  "Batumi Botanical Garden",
  "Piazza",
  "Sarpi"
].sort((a, b) => b.length - a.length);
const technicalEnglishWords = new Set(["faq", "gel", "gps", "seo", "whatsapp", "wifi"]);
const sharedWordsByLocale = {
  // These spellings are also ordinary Turkish words, not English fallbacks.
  tr: new Set(["mini", "modern", "transfer"])
};
const guardedMeaning = {
  "hotels.green-garden-mini-hotel.faqs.1.answer": {
    en: /\bmay\b/i,
    ru: /возможно/iu,
    ka: /შესაძლოა/u,
    tr: /mümkün olabilir/iu,
    he: /ייתכן/u,
    ar: /قد/u
  }
};

function tokens(value, pattern) {
  return [...value.matchAll(pattern)].map((match) => match[0]);
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

function checkEntityFacts(locale, root, baseEntities, localizedEntities) {
  if (baseEntities.length !== localizedEntities.length) {
    failures.push(`${locale}: ${root} entity count changed`);
    return;
  }

  const translatedFields = new Set(contentFieldSchema[root]);
  baseEntities.forEach((baseEntity, index) => {
    const localizedEntity = localizedEntities[index];
    for (const [key, value] of Object.entries(baseEntity)) {
      if (translatedFields.has(key)) continue;
      if (!isDeepStrictEqual(value, localizedEntity[key])) {
        failures.push(`${locale}: technical fact changed in ${root}.${baseEntity.slug}.${key}`);
      }
    }
  });
}

function slugs(items) {
  return items.map((item) => item.slug).join("|");
}

function checkSelectionBehavior(locale, localized) {
  for (const baseHotel of hotels) {
    const expected = englishSite.relatedHotelsFor(baseHotel, hotels.length);
    const localizedHotel = localized.getHotel(baseHotel.slug);
    const actual = localized.relatedHotelsFor(localizedHotel, hotels.length);
    if (slugs(actual) !== slugs(expected)) {
      failures.push(`${locale}: related-hotel ranking changed for ${baseHotel.slug}`);
    }
  }

  for (const baseCollection of collections) {
    const expected = englishSite.collectionHotels(baseCollection);
    const localizedCollection = localized.getCollection(baseCollection.slug);
    const actual = localized.collectionHotels(localizedCollection);
    if (slugs(actual) !== slugs(expected)) {
      failures.push(`${locale}: collection selection changed for ${baseCollection.slug}`);
    }
  }
}

for (const [key, markers] of Object.entries(guardedMeaning)) {
  if (!markers.en.test(expected[key])) {
    failures.push(`en: guarded uncertainty was removed from ${key}`);
  }
}

for (const locale of requestedLocaleCodes) {
  if (locale === "en") continue;
  const messages = contentTranslations[locale];
  if (!messages) {
    failures.push(`${locale}: missing content translation module`);
    continue;
  }

  for (const [key, source] of Object.entries(expected)) {
    const value = messages[key];
    if (typeof value !== "string" || !value.trim()) {
      failures.push(`${locale}: missing ${key}`);
      continue;
    }
    const meaningMarker = guardedMeaning[key]?.[locale];
    if (meaningMarker && !meaningMarker.test(value)) {
      failures.push(`${locale}: guarded uncertainty was removed from ${key}`);
    }
    if (tokens(value, /\d+(?:[.,]\d+)?/g).join("|") !== tokens(source, /\d+(?:[.,]\d+)?/g).join("|")) {
      failures.push(`${locale}: numeric fact mismatch in ${key}`);
    }
    if (tokens(value, /\{\{\w+\}\}/g).join("|") !== tokens(source, /\{\{\w+\}\}/g).join("|")) {
      failures.push(`${locale}: placeholder mismatch in ${key}`);
    }
    if (/\?{4,}|�|Ã.|Â.|â€|ðŸ/.test(value)) {
      failures.push(`${locale}: corrupt text in ${key}`);
    }
    if (!/[<>]/.test(source) && /[<>]/.test(value)) {
      failures.push(`${locale}: unexpected markup in ${key}`);
    }
    const sourceWords = englishWords(source);
    const untranslated =
      value === source &&
      sourceWords.length >= 1 &&
      !allowedExactValues.has(source) &&
      !sourceWords.every((word) => sharedWordsByLocale[locale]?.has(word.toLowerCase()));
    if (untranslated) {
      failures.push(`${locale}: untranslated English value in ${key}`);
    } else {
      const englishWord = retainedEnglishWord(source, value, locale);
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

  for (const key of Object.keys(messages)) {
    if (!(key in expected)) failures.push(`${locale}: extra ${key}`);
  }

  const localized = createLocalizedSiteData(locale);
  checkEntityFacts(locale, "areas", areas, localized.areas);
  checkEntityFacts(locale, "hotels", hotels, localized.hotels);
  checkEntityFacts(locale, "collections", collections, localized.collections);
  checkEntityFacts(locale, "guides", guides, localized.guides);
  checkSelectionBehavior(locale, localized);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(
  `${requestedLocaleCodes.length} content locale(s) checked; ${Object.keys(expected).length} translatable paths preserve structure and numeric facts.`
);
