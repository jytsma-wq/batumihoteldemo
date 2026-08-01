import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { defaultLocale as configuredDefaultLocale, locales } from "./data/site.js";
import { createLocalizedSiteDataFromMessages } from "./data/localized-site-core.js";
import { createLatestLocaleRequest } from "./locale-resources.js";
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

export function I18nProvider({ children, initialLanguage, initialResources }) {
  const startingLanguage = (() => {
    if (initialLanguage && isLocale(initialLanguage)) return initialLanguage;
    if (typeof window !== "undefined") return localeFromPathname(window.location.pathname);
    return defaultLocale;
  })();
  const [localeState, setLocaleState] = useState(() => {
    if (!initialResources?.ui) {
      throw new Error(`Missing initial locale resources: ${startingLanguage}`);
    }
    return { language: startingLanguage, resources: initialResources };
  });
  const requestLocale = useRef(createLatestLocaleRequest()).current;
  const { language, resources } = localeState;
  const config = languageConfig(language);
  const site = useMemo(
    () => createLocalizedSiteDataFromMessages(language, resources.content),
    [language, resources.content]
  );

  const setLanguage = useCallback(async (nextLanguage) => {
    if (!isLocale(nextLanguage)) {
      throw new Error(`Unsupported locale: ${nextLanguage}`);
    }

    const nextResources = await requestLocale(nextLanguage);
    if (!nextResources) return false;

    setLocaleState((current) =>
      current.language === nextLanguage
        ? current
        : { language: nextLanguage, resources: nextResources }
    );
    return true;
  }, [requestLocale]);

  const activateLanguage = useCallback(
    (nextLanguage, nextResources) => {
      if (!isLocale(nextLanguage) || !nextResources?.ui) {
        throw new Error(`Invalid locale activation: ${nextLanguage}`);
      }
      requestLocale.invalidate();
      setLocaleState((current) =>
        current.language === nextLanguage
          ? current
          : { language: nextLanguage, resources: nextResources }
      );
    },
    [requestLocale]
  );

  useEffect(() => {
    document.documentElement.lang = config.htmlLang;
    document.documentElement.dir = config.dir;
  }, [config.dir, config.htmlLang]);

  const t = useCallback(
    (path, params) => {
      const value = getNestedValue(resources.ui, path);
      if (typeof value !== "string") {
        throw new Error(`Missing UI translation: ${language}.${path}`);
      }
      return interpolate(value, params);
    },
    [language, resources.ui]
  );

  const list = useCallback(
    (path) => {
      const value = getNestedValue(resources.ui, path);
      if (!Array.isArray(value)) {
        throw new Error(`Missing UI list translation: ${language}.${path}`);
      }
      return value;
    },
    [language, resources.ui]
  );

  const dataLabel = useCallback(
    (section, key) => site.labelFor(section, key),
    [site]
  );

  const value = useMemo(
    () => ({
      activateLanguage,
      language,
      languageConfig: config,
      languages,
      setLanguage,
      t,
      list,
      dataLabel,
      site
    }),
    [activateLanguage, config, dataLabel, language, list, setLanguage, site, t]
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

export function useLocaleSync(pathname, onError) {
  const { language, setLanguage } = useI18n();
  const targetLanguage = localeFromPathname(pathname);

  useEffect(() => {
    let active = true;
    void setLanguage(targetLanguage).catch((error) => {
      if (active) onError?.(error, targetLanguage);
    });
    return () => {
      active = false;
    };
  }, [onError, pathname, setLanguage, targetLanguage]);

  return targetLanguage === language;
}
