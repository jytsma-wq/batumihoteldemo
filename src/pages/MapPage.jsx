import { Link } from "react-router-dom";
import { MapPinned } from "lucide-react";
import HotelCard from "../components/HotelCard.jsx";
import { usePageMeta } from "../hooks/usePageMeta.js";
import { areas, filterHotels } from "../data/site.js";
import { useI18n, useLocalePath } from "../i18n.jsx";

export default function MapPage() {
  const { t } = useI18n();
  const localePath = useLocalePath();

  usePageMeta(`${t("map.title")} | Small Hotels Batumi`, t("map.intro"));

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">Area map</p>
        <h1>{t("map.title")}</h1>
        <p>{t("map.intro")}</p>
      </section>
      <section className="section map-layout">
        <div className="map-board" role="img" aria-label={t("common.approximateMap")}>
          {areas.map((area, index) => (
            <Link
              key={area.slug}
              className={`map-pin pin-${index + 1}`}
              to={localePath(`/areas/${area.slug}`)}
            >
              <MapPinned size={17} />
              {area.name}
            </Link>
          ))}
        </div>
        <div className="map-list">
          <p className="notice">{t("map.disclaimer")}</p>
          {areas.map((area) => {
            const hotels = filterHotels({ areaSlug: area.slug });
            return (
              <article key={area.slug}>
                <h2>{area.name}</h2>
                <p>{area.description}</p>
                <div className="mini-hotel-row">
                  {hotels.slice(0, 2).map((hotel) => (
                    <HotelCard key={hotel.slug} hotel={hotel} />
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
