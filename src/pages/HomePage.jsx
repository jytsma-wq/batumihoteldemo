import { Link } from "react-router-dom";
import { BedDouble, Car, MapPinned, Search, ShieldCheck, Sparkles, Waves } from "lucide-react";
import ActionShowcase from "../components/ActionShowcase.jsx";
import AreaCard from "../components/AreaCard.jsx";
import CollectionCard from "../components/CollectionCard.jsx";
import GuideCard from "../components/GuideCard.jsx";
import HotelCard from "../components/HotelCard.jsx";
import { usePageMeta } from "../hooks/usePageMeta.js";
import { useI18n, useLocalePath, useSiteData } from "../i18n.jsx";

const intentIcons = [Waves, ShieldCheck, BedDouble, Car];
const intentCollections = [
  "hotels-near-batumi-beach",
  "quiet-hotels-batumi",
  "family-hotels-batumi",
  "hotels-with-parking-batumi"
];

export default function HomePage() {
  const { list, t } = useI18n();
  const localePath = useLocalePath();
  const { areas, collections, guides, hotels } = useSiteData();
  const featuredCollections = collections.filter((collection) => intentCollections.includes(collection.slug));

  usePageMeta(
    `${t("home.title")} | Small Hotels Batumi`,
    t("home.subtitle")
  );

  return (
    <main>
      <section
        className="hero-section image-hero"
        style={{ "--hero-image": `url(${hotels[2].image})` }}
      >
        <div className="hero-copy">
          <p className="eyebrow">Small Hotels Batumi</p>
          <h1>{t("home.title")}</h1>
          <p>{t("home.subtitle")}</p>
          <div className="hero-actions">
            <Link className="button primary large" to={localePath("/hotels")}>
              <Search size={19} />
              {t("common.exploreHotels")}
            </Link>
            <Link className="button secondary large" to={localePath("/areas")}>
              <MapPinned size={19} />
              {t("common.exploreAreas")}
            </Link>
          </div>
        </div>
      </section>

      <ActionShowcase />

      <section className="section intent-section">
        <div className="section-heading split">
          <div>
            <p className="eyebrow">{t("home.intentEyebrow")}</p>
            <h2>{t("home.intentTitle")}</h2>
          </div>
          <Link className="text-link" to={localePath("/collections")}>
            {t("nav.collections")}
          </Link>
        </div>
        <div className="intent-grid">
          {featuredCollections.map((collection, index) => {
            const Icon = intentIcons[index] ?? Sparkles;

            return (
              <Link className="intent-tile" key={collection.slug} to={localePath(`/collections/${collection.slug}`)}>
                <Icon size={23} />
                <strong>{collection.title}</strong>
                <span>{collection.description}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="section-heading split">
          <div>
            <p className="eyebrow">{t("home.featuredEyebrow")}</p>
            <h2>{t("home.featuredTitle")}</h2>
            <p>{t("home.featuredBody")}</p>
          </div>
          <Link className="text-link" to={localePath("/hotels")}>
            {t("common.exploreHotels")}
          </Link>
        </div>
        <div className="hotel-grid">
          {hotels.slice(0, 6).map((hotel, index) => (
            <HotelCard key={hotel.slug} hotel={hotel} priority={index < 2} />
          ))}
        </div>
      </section>

      <section className="section area-band">
        <div className="section-heading split">
          <div>
            <p className="eyebrow">{t("home.areasEyebrow")}</p>
            <h2>{t("home.areasTitle")}</h2>
            <p>{t("home.areasBody")}</p>
          </div>
          <Link className="text-link" to={localePath("/areas")}>
            {t("common.exploreAreas")}
          </Link>
        </div>
        <div className="area-grid">
          {areas.slice(0, 4).map((area) => (
            <AreaCard key={area.slug} area={area} />
          ))}
        </div>
      </section>

      <section className="section trust-section">
        <div>
          <p className="eyebrow">{t("home.trustEyebrow")}</p>
          <h2>{t("home.trustTitle")}</h2>
          <p>{t("home.trustBody")}</p>
        </div>
        <div className="proof-grid">
          {list("home.trustItems").map((item) => (
            <span key={item}>
              <ShieldCheck size={19} />
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading split">
          <div>
            <p className="eyebrow">{t("home.collectionsEyebrow")}</p>
            <h2>{t("home.collectionsTitle")}</h2>
          </div>
          <Link className="text-link" to={localePath("/guide")}>
            {t("common.readGuide")}
          </Link>
        </div>
        <div className="collection-grid">
          {collections.slice(0, 6).map((collection) => (
            <CollectionCard key={collection.slug} collection={collection} />
          ))}
        </div>
      </section>

      <section className="section guide-band">
        <div className="section-heading">
          <p className="eyebrow">{t("home.guideEyebrow")}</p>
          <h2>{t("home.guideTitle")}</h2>
        </div>
        <div className="guide-grid">
          {guides.slice(0, 3).map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </section>
    </main>
  );
}
