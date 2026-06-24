import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import HomePage from "./pages/HomePage.jsx";
import HotelsPage from "./pages/HotelsPage.jsx";
import HotelDetailPage from "./pages/HotelDetailPage.jsx";
import OwnersPage from "./pages/OwnersPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  const nav = (
    <>
      <NavLink to="/hotels">Hotels</NavLink>
      <NavLink to="/for-hotel-owners">For Hotel Owners</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </>
  );

  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Small Hotels Batumi home">
        <span className="brand-mark">SH</span>
        <span>
          <strong>Small Hotels</strong>
          <em>Batumi</em>
        </span>
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {nav}
      </nav>
      <Link className="header-cta" to="/for-hotel-owners">
        List Your Hotel
      </Link>
      <button
        className="icon-button menu-button"
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={21} /> : <Menu size={21} />}
      </button>
      {open && (
        <div className="mobile-nav" aria-label="Mobile navigation">
          {nav}
          <Link className="button primary" to="/for-hotel-owners">
            List Your Hotel
          </Link>
        </div>
      )}
    </header>
  );
}

function Footer() {
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
        <p>
          A premium demo platform for local hotels, guesthouses, aparthotels, and
          family stays in Batumi.
        </p>
      </div>
      <div className="footer-links">
        <Link to="/hotels">View Hotels</Link>
        <Link to="/for-hotel-owners">For Hotel Owners</Link>
        <Link to="/contact">Request Demo</Link>
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
