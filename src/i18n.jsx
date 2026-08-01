import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { defaultLocale as configuredDefaultLocale, locales } from "./data/site.js";
import { createLocalizedSiteData } from "./data/localized-site.js";
import { ui } from "./messages.js";
import {
  isLocale,
  localeCodes,
  localeFromPathname,
  stripLocale,
  switchLocalePath,
  withLocale
} from "./locale-paths.js";

export {
  isLocale,
  localeCodes,
  localeFromPathname,
  stripLocale,
  switchLocalePath,
  withLocale
} from "./locale-paths.js";

export const languages = locales;
export const defaultLocale = configuredDefaultLocale;

const I18nContext = createContext(null);

function getNestedValue(source, path) {
  return path.split(".").reduce((current, key) => current?.[key], source);
}

function interpolate(value, params = {}) {
  if (typeof value !== "string") return value;
  return value.replace(/\{\{(\w+)\}\}/g, (_, key) => String(params[key] ?? ""));
}

function languageConfig(code) {
  return languages.find((language) => language.code === code) || languages[0];
}

export function I18nProvider({ children, initialLanguage }) {
  const [language, setLanguage] = useState(() => {
    if (initialLanguage && isLocale(initialLanguage)) return initialLanguage;
    if (typeof window !== "undefined") return localeFromPathname(window.location.pathname);
    return defaultLocale;
  });
  const config = languageConfig(language);
  const site = useMemo(() => createLocalizedSiteData(language), [language]);

  useEffect(() => {
    document.documentElement.lang = config.htmlLang;
    document.documentElement.dir = config.dir;
  }, [config.dir, config.htmlLang]);

  const t = useCallback(
    (path, params) => {
      const value = getNestedValue(ui[language], path);
      if (typeof value !== "string") {
        throw new Error(`Missing UI translation: ${language}.${path}`);
      }
      return interpolate(value, params);
    },
    [language]
  );

  const list = useCallback(
    (path) => {
      const value = getNestedValue(ui[language], path);
      if (!Array.isArray(value)) {
        throw new Error(`Missing UI list translation: ${language}.${path}`);
      }
      return value;
    },
    [language]
  );

  const dataLabel = useCallback(
    (section, key) => site.labelFor(section, key),
    [site]
  );

  const value = useMemo(
    () => ({ language, languageConfig: config, languages, setLanguage, t, list, dataLabel, site }),
    [config, dataLabel, language, list, site, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside I18nProvider");
  return context;
}

export function useLocalePath() {
  const { language } = useI18n();
  return useCallback((path = "/") => withLocale(language, path), [language]);
}

export function useSiteData() {
  return useI18n().site;
}

export function useLocaleSync(pathname) {
  const { setLanguage } = useI18n();

  useEffect(() => {
    setLanguage(localeFromPathname(pathname));
  }, [pathname, setLanguage]);
}
