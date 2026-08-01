import { defaultLocale, locales } from "./data/site.js";

export const localeCodes = locales.map((locale) => locale.code);

function normalizeRouterBase(base = "/") {
  if (!base || base === "/") return "";
  return `/${base.replace(/^\/+|\/+$/g, "")}`;
}

export const routerBase = normalizeRouterBase(import.meta.env?.BASE_URL);

export function isLocale(value) {
  return localeCodes.includes(value);
}

export function stripRouterBase(pathname = "/", base = routerBase) {
  const normalizedBase = normalizeRouterBase(base);
  if (!normalizedBase) return pathname || "/";
  if (pathname === normalizedBase) return "/";
  if (!pathname.startsWith(`${normalizedBase}/`)) return pathname || "/";
  return pathname.slice(normalizedBase.length) || "/";
}

export function localeFromPathname(pathname = "/", base = routerBase) {
  const first = stripRouterBase(pathname, base).split("/").filter(Boolean)[0];
  return isLocale(first) ? first : defaultLocale;
}

export function stripLocale(pathname = "/", base = routerBase) {
  const parts = stripRouterBase(pathname, base).split("/").filter(Boolean);
  if (isLocale(parts[0])) parts.shift();
  return `/${parts.join("/")}`.replace(/\/$/, "") || "/";
}

export function withLocale(locale, path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (clean === "/") return `/${locale}/`;
  return `/${locale}${clean}`;
}

export function switchLocalePath(pathname, locale, base = routerBase) {
  return withLocale(locale, stripLocale(pathname, base));
}
