import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { I18nProvider } from "./i18n.jsx";
import { localeFromPathname } from "./locale-paths.js";
import { loadLocaleResources } from "./locale-resources.js";
import "./styles.css";

const basename = import.meta.env.BASE_URL === "/" ? undefined : import.meta.env.BASE_URL.replace(/\/$/, "");

async function bootstrap() {
  const initialLanguage = localeFromPathname(window.location.pathname);
  const initialResources = await loadLocaleResources(initialLanguage);

  createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <I18nProvider initialLanguage={initialLanguage} initialResources={initialResources}>
        <BrowserRouter basename={basename}>
          <App />
        </BrowserRouter>
      </I18nProvider>
    </React.StrictMode>
  );
}

void bootstrap().catch((error) => {
  console.error("Unable to load the initial locale resources.", error);
});
