import { useCallback, useEffect, useRef, useState } from "react";
import { Link, Navigate, NavLink, Outlet, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { Menu, X } from "lucide-react";
import HomePage from "./pages/HomePage.jsx";
import HotelsPage from "./pages/HotelsPage.jsx";
import HotelDetailPage from "./pages/HotelDetailPage.jsx";
import OwnersPage from "./pages/OwnersPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import AreasPage from "./pages/AreasPage.jsx";
import AreaDetailPage from "./pages/AreaDetailPage.jsx";
import CollectionsPage from "./pages/CollectionsPage.jsx";
import CollectionDetailPage from "./pages/CollectionDetailPage.jsx";
import MapPage from "./pages/MapPage.jsx";
import GuidePage from "./pages/GuidePage.jsx";
import GuideDetailPage from "./pages/GuideDetailPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import LegalPage from "./pages/LegalPage.jsx";
import { isLocale, switchLocalePath, useI18n, useLocalePath, useLocaleSync } from "./i18n.jsx";
import { loadLocaleResources } from "./locale-resources.js";

function LocaleGuard() {
  const { locale } = useParams();
  return isLocale(locale) ? <Outlet /> : <Navigate to="/en/" replace />;
}

function LanguageSwitcher() {
  const { activateLanguage, language, languages, t } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const latestChange = useRef(0);

  useEffect(() => {
    latestChange.current += 1;
  }, [location.hash, location.pathname, location.search]);

  if (languages.length < 2) return null;

  async function handleChange(event) {
    const nextLanguage = event.target.value;
    const request = ++latestChange.current;
    try {
      const resources = await loadLocaleResources(nextLanguage);
      if (request !== latestChange.current) return;
      activateLanguage(nextLanguage, resources);
      navigate({
        pathname: switchLocalePath(location.pathname, nextLanguage),
        search: location.search,
        hash: location.hash
      });
    } catch (error) {
      if (request === latestChange.current) {
        console.error(`Unable to load locale: ${nextLanguage}`, error);
      }
    }
  }

  return (
    <label className="language-switcher">
      <span>{t("common.language")}</span>
      <select
        aria-label={t("common.language")}
        value={language}
        onChange={handleChange}
      >
        {languages.map((item) => (
          <option key={item.code} value={item.code}>
            {item.nativeName}
          </option>
        ))}
      </select>
    </label>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { t } = useI18n();
  const localePath = useLocalePath();
  const menuButtonRef = useRef(null);

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      requestAnimationFrame(() => menuButtonRef.current?.focus());
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const nav = (
    <>
      <NavLink to={localePath("/hotels")}>{t("nav.hotels")}</NavLink>
      <NavLink to={localePath("/areas")}>{t("nav.areas")}</NavLink>
      <NavLink to={localePath("/collections")}>{t("nav.collections")}</NavLink>
      <NavLink to={localePath("/map")}>{t("nav.map")}</NavLink>
      <NavLink to={localePath("/guide")}>{t("nav.guide")}</NavLink>
      <NavLink to={localePath("/about")}>{t("nav.about")}</NavLink>
    </>
  );

  return (
    <header className="site-header">
      <Link className="brand" to={localePath("/")} aria-label={t("common.brandHome")}>
        <span className="brand-mark">SH</span>
        <span>
          <strong>Small Hotels</strong>
          <em>Batumi</em>
        </span>
      </Link>
      <nav className="desktop-nav" aria-label={t("common.primaryNavigation")}>
        {nav}
      </nav>
      <div className="header-actions">
        <LanguageSwitcher />
        <Link className="header-cta" to={localePath("/hotels")}>
          {t("common.findRoom")}
        </Link>
        <button
          ref={menuButtonRef}
          className="icon-button menu-button"
          type="button"
          aria-label={open ? t("common.closeMenu") : t("common.openMenu")}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {open && (
        <nav id="mobile-navigation" className="mobile-nav" aria-label={t("common.mobileNavigation")}>
          {nav}
          <Link className="button primary" to={localePath("/hotels")}>
            {t("common.findRoom")}
          </Link>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  const { t } = useI18n();
  const localePath = useLocalePath();

  return (
    <footer className="site-footer">
      <div>
        <Link className="brand footer-brand" to={localePath("/")}>
          <span className="brand-mark">SH</span>
          <span>
            <strong>Small Hotels</strong>
            <em>Batumi</em>
          </span>
        </Link>
        <p>{t("footer.text")}</p>
      </div>
      <div className="footer-links">
        <Link to={localePath("/hotels")}>{t("nav.hotels")}</Link>
        <Link to={localePath("/areas")}>{t("nav.areas")}</Link>
        <Link to={localePath("/guide")}>{t("nav.guide")}</Link>
        <Link to={localePath("/contact")}>{t("footer.contact")}</Link>
        <Link to={localePath("/for-property-owners")}>{t("footer.propertyOwners")}</Link>
        <Link to={localePath("/privacy")}>{t("footer.privacy")}</Link>
        <Link to={localePath("/terms")}>{t("footer.terms")}</Link>
      </div>
    </footer>
  );
}

export default function App() {
  const location = useLocation();
  const { language } = useI18n();
  const navigate = useNavigate();
  const displayedLocation = useRef(location);

  const handleLocaleLoadError = useCallback(
    (error, targetLanguage) => {
      console.error(`Unable to activate locale: ${targetLanguage}`, error);
      navigate(
        {
          pathname: switchLocalePath(location.pathname, language),
          search: location.search,
          hash: location.hash
        },
        { replace: true }
      );
    },
    [language, location.hash, location.pathname, location.search, navigate]
  );

  const localeReady = useLocaleSync(location.pathname, handleLocaleLoadError);

  if (localeReady) displayedLocation.current = location;

  return (
    <>
      <div
        className={localeReady ? "locale-content" : "locale-content locale-content-loading"}
        aria-hidden={localeReady ? undefined : true}
      >
        <Header />
        <Routes location={displayedLocation.current}>
          <Route path="/" element={<Navigate to={`/${language}/`} replace />} />
          <Route path="/hotels" element={<Navigate to={`/${language}/hotels`} replace />} />
          <Route path="/hotels/:slug" element={<Navigate to={`/${language}${location.pathname}`} replace />} />
          <Route path="/for-hotel-owners" element={<Navigate to={`/${language}/for-property-owners`} replace />} />
          <Route path="/contact" element={<Navigate to={`/${language}/contact`} replace />} />

          <Route path="/:locale" element={<LocaleGuard />}>
            <Route index element={<HomePage />} />
            <Route path="hotels" element={<HotelsPage />} />
            <Route path="hotels/:slug" element={<HotelDetailPage />} />
            <Route path="areas" element={<AreasPage />} />
            <Route path="areas/:slug" element={<AreaDetailPage />} />
            <Route path="collections" element={<CollectionsPage />} />
            <Route path="collections/:slug" element={<CollectionDetailPage />} />
            <Route path="map" element={<MapPage />} />
            <Route path="guide" element={<GuidePage />} />
            <Route path="guide/:slug" element={<GuideDetailPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="for-property-owners" element={<OwnersPage />} />
            <Route path="privacy" element={<LegalPage type="privacy" />} />
            <Route path="terms" element={<LegalPage type="terms" />} />
          </Route>
          <Route path="*" element={<Navigate to={`/${language}/`} replace />} />
        </Routes>
        <Footer />
      </div>
      {!localeReady && <div className="locale-loading-overlay" aria-busy="true" />}
    </>
  );
}
