import {
  areas as baseAreas,
  budgetRanges as baseBudgetRanges,
  collections as baseCollections,
  filterOptions as baseFilterOptions,
  guides as baseGuides,
  hotels as baseHotels,
  hotelTypes as baseHotelTypes
} from "./site.js";
import { contentFieldSchema, localizeEntities } from "./content-schema.js";

const cache = new Map();

function translatedOption(messages, path, value) {
  if (!Object.hasOwn(messages, path)) {
    throw new Error(`Missing localized hotel content: ${path}`);
  }
  return { value, label: messages[path] };
}

function buildLabelMap(baseValues, localizedValues, getBase, getLocalized) {
  return Object.fromEntries(
    baseValues.map((value, index) => [getBase(value), getLocalized(localizedValues[index])])
  );
}

export function createLocalizedSiteDataFromMessages(locale = "en", messages) {
  if (cache.has(locale)) return cache.get(locale);

  const areas = messages
    ? localizeEntities("areas", baseAreas, contentFieldSchema.areas, messages)
    : baseAreas;
  const hotels = messages
    ? localizeEntities("hotels", baseHotels, contentFieldSchema.hotels, messages)
    : baseHotels;
  const collections = messages
    ? localizeEntities(
        "collections",
        baseCollections,
        contentFieldSchema.collections,
        messages
      )
    : baseCollections;
  const guides = messages
    ? localizeEntities("guides", baseGuides, contentFieldSchema.guides, messages)
    : baseGuides;

  const filterOptions = messages
    ? baseFilterOptions.map((option) => ({
        ...option,
        label: messages[`filterOptions.${option.key}`]
      }))
    : baseFilterOptions;
  const hotelTypeOptions = messages
    ? baseHotelTypes.map((type, index) =>
        translatedOption(messages, `hotelTypes.${index}`, type)
      )
    : baseHotelTypes.map((type) => ({ value: type, label: type }));
  const budgetRangeOptions = messages
    ? baseBudgetRanges.map((range, index) =>
        translatedOption(messages, `budgetRanges.${index}`, range)
      )
    : baseBudgetRanges.map((range) => ({ value: range, label: range }));

  const areaLabels = buildLabelMap(
    baseAreas,
    areas,
    (area) => area.name,
    (area) => area.name
  );
  const filterLabels = buildLabelMap(
    baseFilterOptions,
    filterOptions,
    (option) => option.label,
    (option) => option.label
  );
  const hotelTypeLabels = Object.fromEntries(
    hotelTypeOptions.map((option) => [option.value, option.label])
  );
  const budgetLabels = Object.fromEntries(
    budgetRangeOptions.map((option) => [option.value, option.label])
  );

  const localizedHotels = hotels.map((hotel) => ({
    ...hotel,
    areaLabel: areaLabels[hotel.areaName] ?? hotel.areaName,
    typeLabel: hotelTypeLabels[hotel.type] ?? hotel.type,
    budgetLabel: budgetLabels[hotel.budget] ?? hotel.budget
  }));
  const localizedAreas = areas.map((area) => ({ ...area, label: area.name }));

  function getHotel(slug) {
    return localizedHotels.find((hotel) => hotel.slug === slug);
  }

  function getArea(slug) {
    return localizedAreas.find((area) => area.slug === slug);
  }

  function getCollection(slug) {
    return collections.find((collection) => collection.slug === slug);
  }

  function getGuide(slug) {
    return guides.find((guide) => guide.slug === slug);
  }

  function filterHotels(filters = {}) {
    return localizedHotels.filter((hotel) => {
      if (filters.areaSlug && hotel.areaSlug !== filters.areaSlug) return false;
      if (filters.type && hotel.type !== filters.type) return false;
      if (filters.budget && hotel.budget !== filters.budget) return false;
      for (const option of baseFilterOptions) {
        if (filters[option.key] && !hotel.flags[option.key]) return false;
      }
      return true;
    });
  }

  function relatedHotelsFor(hotel, limit = 3) {
    const sourceHotel = baseHotels.find((candidate) => candidate.slug === hotel.slug) ?? hotel;
    return localizedHotels
      .filter((candidate) => candidate.slug !== hotel.slug)
      .map((candidate) => {
        const sourceCandidate =
          baseHotels.find((item) => item.slug === candidate.slug) ?? candidate;
        return {
          hotel: candidate,
          score:
            (sourceCandidate.areaSlug === sourceHotel.areaSlug ? 3 : 0) +
            (sourceCandidate.type === sourceHotel.type ? 2 : 0) +
            sourceCandidate.badges.filter((badge) => sourceHotel.badges.includes(badge)).length
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((item) => item.hotel);
  }

  function collectionHotels(collection) {
    return filterHotels(collection.filters).slice(0, 12);
  }

  function labelFor(section, key) {
    const maps = {
      areas: areaLabels,
      filters: filterLabels,
      hotelTypes: hotelTypeLabels,
      budgets: budgetLabels
    };
    return maps[section]?.[key] ?? key;
  }

  const result = {
    areas: localizedAreas,
    budgetRangeOptions,
    collections,
    collectionHotels,
    filterHotels,
    filterOptions,
    getArea,
    getCollection,
    getGuide,
    getHotel,
    guides,
    hotels: localizedHotels,
    hotelTypeOptions,
    labelFor,
    relatedHotelsFor
  };

  cache.set(locale, result);
  return result;
}
