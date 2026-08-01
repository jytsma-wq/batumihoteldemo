import { createLocalizedSiteDataFromMessages } from "./localized-site-core.js";
import ar from "./translations/ar.js";
import he from "./translations/he.js";
import ka from "./translations/ka.js";
import ru from "./translations/ru.js";
import tr from "./translations/tr.js";

export const contentTranslations = { ar, he, ka, ru, tr };

export function createLocalizedSiteData(locale = "en") {
  return createLocalizedSiteDataFromMessages(locale, contentTranslations[locale]);
}
