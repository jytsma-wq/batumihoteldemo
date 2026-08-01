import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";

import App from "../src/App.jsx";
import { contentTranslations } from "../src/data/localized-site.js";
import { I18nProvider } from "../src/i18n.jsx";
import { ui } from "../src/messages.js";

export function renderRoute(locale, routePath) {
  const localizedPath = `/${locale}${routePath === "/" ? "/" : routePath}`;
  return renderToStaticMarkup(
    <I18nProvider
      initialLanguage={locale}
      initialResources={{ ui: ui[locale], content: contentTranslations[locale] }}
    >
      <MemoryRouter initialEntries={[localizedPath]}>
        <App />
      </MemoryRouter>
    </I18nProvider>
  );
}
