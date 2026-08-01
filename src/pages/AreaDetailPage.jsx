import { Link, Navigate, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import CollectionCard from "../components/CollectionCard.jsx";
import FAQSection from "../components/FAQSection.jsx";
import HotelCard from "../components/HotelCard.jsx";
import { usePageMeta } from "../hooks/usePageMeta.js";
import { useI18n, useLocalePath, useSiteData } from "../i18n.jsx";

export default function AreaDetailPage() {
  const { slug } = useParams();
  const { dataLabel, t } = useI18n();
  const localePath = useLocalePath();
  const { collections, filterHotels, getArea } = useSiteData();
  const area = getArea(slug);

  const hotelsHere = area ? filterHotels({ areaSlug: area.slug }) : [];
  const relatedCollections = area
    ? collections.filter((collection) => collection.bestAreas.includes(area.slug)).slice(0, 3)
    : [];
  const label = area ? dataLabel("areas", area.name) : "";

  usePageMeta(area ? `${area.title} | Small Hotels Batumi` : t("areas.indexTitle"), area?.description ?? t("areas.indexIntro"));

  if (!area) return <Navigate to={localePath("/areas")} replace />;

  return (
    <main>
      <section className="split-hero">
        <div>
          <Breadcrumbs items={[{ label: t("nav.areas"), to: "/areas" }, { label }]} />
          <p className="eyebrow">{t("areas.detailEyebrow")}</p>
          <h1>{area.title}</h1>
          <p>{area.description}</p>
          <Link className="button primary" to={localePath(`/hotels?area=${area.slug}`)}>
            {t("common.exploreHotels")}
          </Link>
        </div>
        <img src={area.image} alt={t("common.areaImageAlt", { areaName: label })} />
      </section>

      <section className="section area-detail-grid">
        <article>
          <h2>{t("areas.bestFor")}</h2>
          <ul className="pill-list">
            {area.bestFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article>
          <h2>{t("areas.goodToKnow")}</h2>
          <ul className="clean-list">
            {area.goodToKnow.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article>
          <h2>{t("areas.beachAccess")}</h2>
          <p>{area.beachAccess}</p>
        </article>
        <article>
          <h2>{t("areas.transport")}</h2>
          <p>{area.transport}</p>
        </article>
        <article>
          <h2>{t("areas.noiseLevel")}</h2>
          <p>{area.noiseLevel}</p>
        </article>
        <article>
          <h2>{t("areas.parking")}</h2>
          <p>{area.parking}</p>
        </article>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>{t("areas.hotelsHere")}</h2>
        </div>
        <div className="hotel-grid">
          {hotelsHere.map((hotel) => (
            <HotelCard key={hotel.slug} hotel={hotel} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>{t("areas.relatedCollections")}</h2>
        </div>
        <div className="collection-grid">
          {relatedCollections.map((collection) => (
            <CollectionCard key={collection.slug} collection={collection} />
          ))}
        </div>
      </section>

      <section className="section">
        <FAQSection title={t("areas.faq")} faqs={area.faqs} />
      </section>
    </main>
  );
}
