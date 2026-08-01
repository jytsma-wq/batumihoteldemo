import { SITE_URL, defaultLocale, locales } from "./data/site.js";
import { isLocale, stripRouterBase, withLocale } from "./locale-paths.js";

export function routeMetaContext(pathname, title, description, base) {
  const appPathname = stripRouterBase(pathname, base);
  const routeParts = appPathname.split("/").filter(Boolean);
  const locale = isLocale(routeParts[0]) ? routeParts.shift() : defaultLocale;
  const routePath = `/${routeParts.join("/")}` || "/";
  const canonicalUrl = `${SITE_URL}${appPathname}`;

  return {
    canonicalUrl,
    locale,
    routePath,
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url: canonicalUrl,
      inLanguage: locale
    }
  };
}

export function alternateRouteLinks(routePath) {
  const links = locales.map((language) => ({
    hreflang: language.code,
    href: `${SITE_URL}${withLocale(language.code, routePath)}`
  }));
  links.push({
    hreflang: "x-default",
    href: `${SITE_URL}${withLocale(defaultLocale, routePath)}`
  });
  return links;
}

export function shouldReplaceRouteSchemas(currentCanonicalUrl, canonicalUrl, routeSchemas) {
  return (
    currentCanonicalUrl !== canonicalUrl ||
    routeSchemas.some((schema) => schema.dataset.clientRouteSchema === "true")
  );
}

export function replaceRouteSchemas(documentRef, schemaValue) {
  documentRef
    .querySelectorAll('script[data-route-schema="true"]')
    .forEach((schema) => schema.remove());

  const schema = documentRef.createElement("script");
  schema.type = "application/ld+json";
  schema.dataset.routeSchema = "true";
  schema.dataset.clientRouteSchema = "true";
  schema.textContent = JSON.stringify(schemaValue);
  documentRef.head.appendChild(schema);
  return schema;
}
