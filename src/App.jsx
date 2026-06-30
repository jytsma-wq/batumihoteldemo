import { useEffect, useState } from "react";
import { Link, Navigate, NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
import { switchLocalePath, useI18n, useLocalePath, useLocaleSync } from "./i18n.jsx";

function LanguageSwitcher() {
  const { language, languages, setLanguage, t } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();

  function handleChange(event) {
    const nextLanguage = event.target.value;
    setLanguage(nextLanguage);
    navigate(switchLocalePath(location.pathname, nextLanguage));
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

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

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
      <Link className="brand" to={localePath("/")} aria-label="Small Hotels Batumi home">
        <span className="brand-mark">SH</span>
        <span>
          <strong>Small Hotels</strong>
          <em>Batumi</em>
        </span>
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {nav}
      </nav>
      <div className="header-actions">
        <LanguageSwitcher />
        <Link className="header-cta" to={localePath("/hotels")}>
          {t("common.findRoom")}
        </Link>
        <button
          className="icon-button menu-button"
          type="button"
          aria-label={open ? t("common.closeMenu") : t("common.openMenu")}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {open && (
        <div className="mobile-nav" aria-label="Mobile navigation">
          {nav}
          <Link className="button primary" to={localePath("/hotels")}>
            {t("common.findRoom")}
          </Link>
        </div>
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

  useLocaleSync(location.pathname);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to={`/${language}/`} replace />} />
        <Route path="/hotels" element={<Navigate to={`/${language}/hotels`} replace />} />
        <Route path="/hotels/:slug" element={<Navigate to={`/${language}${location.pathname}`} replace />} />
        <Route path="/for-hotel-owners" element={<Navigate to={`/${language}/for-property-owners`} replace />} />
        <Route path="/contact" element={<Navigate to={`/${language}/contact`} replace />} />

        <Route path="/:locale" element={<HomePage />} />
        <Route path="/:locale/" element={<HomePage />} />
        <Route path="/:locale/hotels" element={<HotelsPage />} />
        <Route path="/:locale/hotels/:slug" element={<HotelDetailPage />} />
        <Route path="/:locale/areas" element={<AreasPage />} />
        <Route path="/:locale/areas/:slug" element={<AreaDetailPage />} />
        <Route path="/:locale/collections" element={<CollectionsPage />} />
        <Route path="/:locale/collections/:slug" element={<CollectionDetailPage />} />
        <Route path="/:locale/map" element={<MapPage />} />
        <Route path="/:locale/guide" element={<GuidePage />} />
        <Route path="/:locale/guide/:slug" element={<GuideDetailPage />} />
        <Route path="/:locale/about" element={<AboutPage />} />
        <Route path="/:locale/contact" element={<ContactPage />} />
        <Route path="/:locale/for-property-owners" element={<OwnersPage />} />
        <Route path="/:locale/privacy" element={<LegalPage type="privacy" />} />
        <Route path="/:locale/terms" element={<LegalPage type="terms" />} />
        <Route path="*" element={<Navigate to={`/${language}/`} replace />} />
      </Routes>
      <Footer />
    </>
  );
}
