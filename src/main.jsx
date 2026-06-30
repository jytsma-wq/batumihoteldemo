import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { I18nProvider } from "./i18n.jsx";
import "./styles.css";

const basename = import.meta.env.BASE_URL === "/" ? undefined : import.meta.env.BASE_URL.replace(/\/$/, "");

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nProvider>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </I18nProvider>
  </React.StrictMode>
);
