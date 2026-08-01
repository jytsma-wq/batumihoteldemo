export const contentFieldSchema = {
  areas: [
    "name",
    "title",
    "description",
    "bestFor",
    "goodToKnow",
    "beachAccess",
    "transport",
    "noiseLevel",
    "parking",
    "faqs"
  ],
  hotels: [
    "priceNote",
    "shortDescription",
    "intro",
    "addressApprox",
    "lastVerified",
    "gallery",
    "badges",
    "distanceToBeach",
    "distanceToBoulevard",
    "distanceToAirport",
    "noiseLevel",
    "transportNote",
    "parkingNote",
    "checkInNote",
    "languagesSpoken",
    "breakfast",
    "paymentNote",
    "whyStay",
    "bestFor",
    "goodToKnow",
    "rooms",
    "facilities",
    "localAreaNotes",
    "nearby",
    "faqs"
  ],
  collections: ["title", "h1", "description", "searchIntent", "intro"],
  guides: ["title", "description", "category", "readingTime", "sections"]
};

const ignoredNestedKeys = new Set(["src", "type"]);

function collectLeaves(value, path, entries) {
  if (typeof value === "string") {
    entries[path] = value;
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((child, index) => collectLeaves(child, `${path}.${index}`, entries));
    return;
  }

  if (!value || typeof value !== "object") return;

  Object.entries(value).forEach(([key, child]) => {
    if (ignoredNestedKeys.has(key)) return;
    collectLeaves(child, `${path}.${key}`, entries);
  });
}

function collectEntities(root, entities, fields, entries) {
  entities.forEach((entity) => {
    fields.forEach((field) => {
      collectLeaves(entity[field], `${root}.${entity.slug}.${field}`, entries);
    });
  });
}

export function collectContentEntries({
  areas,
  hotels,
  filterOptions,
  hotelTypes,
  budgetRanges,
  collections,
  guides
}) {
  const entries = {};

  collectEntities("areas", areas, contentFieldSchema.areas, entries);
  collectEntities("hotels", hotels, contentFieldSchema.hotels, entries);
  collectEntities("collections", collections, contentFieldSchema.collections, entries);
  collectEntities("guides", guides, contentFieldSchema.guides, entries);

  filterOptions.forEach((option) => {
    entries[`filterOptions.${option.key}`] = option.label;
  });
  hotelTypes.forEach((type, index) => {
    entries[`hotelTypes.${index}`] = type;
  });
  budgetRanges.forEach((range, index) => {
    entries[`budgetRanges.${index}`] = range;
  });

  return entries;
}

function localizeLeaves(value, path, messages) {
  if (typeof value === "string") {
    if (!Object.hasOwn(messages, path)) {
      throw new Error(`Missing localized hotel content: ${path}`);
    }
    return messages[path];
  }

  if (Array.isArray(value)) {
    return value.map((child, index) => localizeLeaves(child, `${path}.${index}`, messages));
  }

  if (!value || typeof value !== "object") return value;

  return Object.fromEntries(
    Object.entries(value).map(([key, child]) => [
      key,
      ignoredNestedKeys.has(key)
        ? child
        : localizeLeaves(child, `${path}.${key}`, messages)
    ])
  );
}

export function localizeEntities(root, entities, fields, messages) {
  return entities.map((entity) => {
    const localized = { ...entity };
    fields.forEach((field) => {
      localized[field] = localizeLeaves(
        entity[field],
        `${root}.${entity.slug}.${field}`,
        messages
      );
    });
    return localized;
  });
}
