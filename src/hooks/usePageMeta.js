import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  alternateRouteLinks,
  replaceRouteSchemas,
  routeMetaContext,
  shouldReplaceRouteSchemas
} from "../route-meta.js";

function upsertMeta(selector, attributes, content) {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertLink(selector, attributes) {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
  return element;
}

export function usePageMeta(title, description) {
  const location = useLocation();

  useEffect(() => {
    document.title = title;
    const { canonicalUrl, routePath, schema } = routeMetaContext(
      location.pathname,
      title,
      description
    );
    const canonical = document.querySelector('link[rel="canonical"]');
    const routeSchemas = Array.from(
      document.querySelectorAll('script[data-route-schema="true"]')
    );
    const replaceSchemas = shouldReplaceRouteSchemas(
      canonical?.getAttribute("href"),
      canonicalUrl,
      routeSchemas
    );

    upsertMeta('meta[name="description"]', { name: "description" }, description);
    upsertMeta('meta[property="og:title"]', { property: "og:title" }, title);
    upsertMeta('meta[property="og:description"]', { property: "og:description" }, description);
    upsertMeta('meta[property="og:url"]', { property: "og:url" }, canonicalUrl);
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title" }, title);
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description" }, description);
    upsertLink('link[rel="canonical"]', { rel: "canonical", href: canonicalUrl });

    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((link) => link.remove());
    for (const alternate of alternateRouteLinks(routePath)) {
      upsertLink(`link[rel="alternate"][hreflang="${alternate.hreflang}"]`, {
        rel: "alternate",
        hreflang: alternate.hreflang,
        href: alternate.href
      });
    }

    if (replaceSchemas) {
      replaceRouteSchemas(document, schema);
    }
  }, [description, location.pathname, title]);
}
