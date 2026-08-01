import { isLocale } from "./locale-paths.js";

const loaders = {
  en: async () => ({
    ui: (await import("./messages/en.js")).default,
    content: undefined
  }),
  ru: async () => {
    const [ui, content] = await Promise.all([
      import("./messages/ru.js"),
      import("./data/translations/ru.js")
    ]);
    return { ui: ui.default, content: content.default };
  },
  ka: async () => {
    const [ui, content] = await Promise.all([
      import("./messages/ka.js"),
      import("./data/translations/ka.js")
    ]);
    return { ui: ui.default, content: content.default };
  },
  tr: async () => {
    const [ui, content] = await Promise.all([
      import("./messages/tr.js"),
      import("./data/translations/tr.js")
    ]);
    return { ui: ui.default, content: content.default };
  },
  he: async () => {
    const [ui, content] = await Promise.all([
      import("./messages/he.js"),
      import("./data/translations/he.js")
    ]);
    return { ui: ui.default, content: content.default };
  },
  ar: async () => {
    const [ui, content] = await Promise.all([
      import("./messages/ar.js"),
      import("./data/translations/ar.js")
    ]);
    return { ui: ui.default, content: content.default };
  }
};

const cache = new Map();

export function loadLocaleResources(locale) {
  if (!isLocale(locale)) {
    return Promise.reject(new Error(`Unsupported locale: ${locale}`));
  }

  if (!cache.has(locale)) {
    const request = loaders[locale]().catch((error) => {
      cache.delete(locale);
      throw error;
    });
    cache.set(locale, request);
  }

  return cache.get(locale);
}

export function createLatestLocaleRequest(loadResources = loadLocaleResources) {
  let latestRequest = 0;

  async function requestLocale(locale) {
    const request = ++latestRequest;
    try {
      const resources = await loadResources(locale);
      return request === latestRequest ? resources : undefined;
    } catch (error) {
      if (request !== latestRequest) return undefined;
      throw error;
    }
  }

  requestLocale.invalidate = () => {
    latestRequest += 1;
  };

  return requestLocale;
}
