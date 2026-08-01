import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";

import App from "../src/App.jsx";
import { I18nProvider } from "../src/i18n.jsx";

export function renderRoute(locale, routePath) {
  const localizedPath = `/${locale}${routePath === "/" ? "/" : routePath}`;
  return renderToStaticMarkup(
    <I18nProvider initialLanguage={locale}>
      <MemoryRouter initialEntries={[localizedPath]}>
        <App />
      </MemoryRouter>
    </I18nProvider>
  );
}
