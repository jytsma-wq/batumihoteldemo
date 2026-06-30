import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import HomePage from "./pages/HomePage.jsx";
import HotelsPage from "./pages/HotelsPage.jsx";
import HotelDetailPage from "./pages/HotelDetailPage.jsx";
import OwnersPage from "./pages/OwnersPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import { useI18n } from "./i18n.jsx";

function LanguageSwitcher() {
  const { language, languages, setLanguage, t } = useI18n();

  return (
    <label className="language-switcher">
      <span>{t("common.language")}</span>
      <select
        aria-label={t("common.language")}
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
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

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  const nav = (
    <>
      <NavLink to="/hotels">{t("nav.hotels")}</NavLink>
      <NavLink to="/for-hotel-owners">{t("nav.owners")}</NavLink>
      <NavLink to="/contact">{t("nav.contact")}</NavLink>
    </>
  );

  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label={t("common.brandHome")}>
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
        <Link className="header-cta" to="/for-hotel-owners">
          {t("nav.listYourHotel")}
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
          <Link className="button primary" to="/for-hotel-owners">
            {t("nav.listYourHotel")}
          </Link>
        </div>
      )}
    </header>
  );
}

function Footer() {
  const { t } = useI18n();

  return (
    <footer className="site-footer">
      <div>
        <Link className="brand footer-brand" to="/">
          <span className="brand-mark">SH</span>
          <span>
            <strong>Small Hotels</strong>
            <em>Batumi</em>
          </span>
        </Link>
        <p>{t("footer.text")}</p>
      </div>
      <div className="footer-links">
        <Link to="/hotels">{t("footer.viewHotels")}</Link>
        <Link to="/for-hotel-owners">{t("footer.owners")}</Link>
        <Link to="/contact">{t("footer.requestDemo")}</Link>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/hotels/:slug" element={<HotelDetailPage />} />
        <Route path="/for-hotel-owners" element={<OwnersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </>
  );
}
