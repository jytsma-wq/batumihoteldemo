import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MapPinned, Pause, Play, Waves } from "lucide-react";
import { hotels } from "../data/site.js";
import { useI18n, useLocalePath } from "../i18n.jsx";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function ActionShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const { dataLabel, list, t } = useI18n();
  const localePath = useLocalePath();
  const featured = useMemo(() => hotels.slice(0, 5), []);
  const tickerItems = list("home.motionTickerItems");
  const activeHotel = featured[activeIndex];
  const activeAreaLabel = dataLabel("areas", activeHotel.areaName);

  useEffect(() => {
    if (!playing || prefersReducedMotion()) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % featured.length);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [featured.length, playing]);

  return (
    <section className="section action-showcase" aria-label={t("home.motionAria")}>
      <div className="action-copy">
        <h2>{t("home.motionTitle")}</h2>
        <p>{t("home.motionBody")}</p>
        <div className="hero-actions">
          <Link className="button primary" to={localePath("/map")}>
            <MapPinned size={18} />
            {t("home.motionMapCta")}
          </Link>
          <button className="button secondary" type="button" onClick={() => setPlaying((value) => !value)}>
            {playing ? <Pause size={18} /> : <Play size={18} />}
            {playing ? t("home.motionPause") : t("home.motionPlay")}
          </button>
        </div>
      </div>

      <div className="motion-panel">
        <div className="moving-route" aria-hidden="true">
          <div className="route-line" />
          <span className="route-runner">
            <Waves size={16} />
          </span>
          {featured.map((hotel, index) => (
            <button
              key={hotel.slug}
              className={`route-stop ${index === activeIndex ? "active" : ""}`}
              style={{ "--stop-index": index }}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={t("home.motionShowHotel", { hotelName: hotel.name })}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <article className="motion-hotel-card" key={activeHotel.slug}>
          <img
            src={activeHotel.image}
            alt={t("home.motionHotelAlt", { hotelName: activeHotel.name, areaName: activeAreaLabel })}
          />
          <div>
            <p className="eyebrow">{activeAreaLabel} / {activeHotel.distanceToBeach}</p>
            <h3>{activeHotel.name}</h3>
            <p>{activeHotel.shortDescription}</p>
            <Link className="text-link" to={localePath(`/hotels/${activeHotel.slug}`)}>
              {t("home.motionViewStay")}
            </Link>
          </div>
        </article>

        <div className="motion-ticker" aria-label={t("home.motionTickerAria")}>
          <div>
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
