import { Link } from "react-router-dom";
import { Camera, Handshake, Landmark, MapPinned, ShieldCheck } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta.js";
import AreaCard from "../components/AreaCard.jsx";
import CTASection from "../components/CTASection.jsx";
import FeatureList from "../components/FeatureList.jsx";
import HotelCard from "../components/HotelCard.jsx";
import { useI18n, useLocalizedHotelData } from "../i18n.jsx";

export default function HomePage() {
  const { features, list, t } = useI18n();
  const { areas, hotels } = useLocalizedHotelData();

  usePageMeta(t("meta.homeTitle"), t("meta.homeDescription"));

  return (
    <main>
      <section
        className="hero-section image-hero"
        style={{ "--hero-image": `url(${hotels[0].gallery[1]})` }}
      >
        <div className="hero-copy">
          <h1>{t("home.heroTitle")}</h1>
          <p>{t("home.heroBody")}</p>
          <div className="hero-actions">
            <Link className="button primary large" to="/hotels">
              {t("nav.viewHotels")}
            </Link>
            <Link className="button secondary large" to="/for-hotel-owners">
              {t("nav.listYourHotel")}
            </Link>
          </div>
        </div>
      </section>

      <section className="section showcase-section">
        <div className="showcase-grid" aria-label={t("home.showcaseLabel")}>
          <img src={hotels[2].image} alt={t("home.showcaseSeaAlt")} />
          <img src={hotels[0].image} alt={t("home.showcaseExteriorAlt")} />
          <img src={hotels[5].image} alt={t("home.showcaseCoastalAlt")} />
        </div>
      </section>

      <section className="section intro-strip">
        <div className="section-heading">
          <h2>{t("home.introTitle")}</h2>
          <p>{t("home.introBody")}</p>
        </div>
        <div className="proof-grid">
          <span>
            <Camera size={20} />
            {t("home.proofPhotography")}
          </span>
          <span>
            <Handshake size={20} />
            {t("home.proofEnquiries")}
          </span>
          <span>
            <ShieldCheck size={20} />
            {t("home.proofCommission")}
          </span>
        </div>
      </section>

      <section className="section">
        <div className="section-heading split">
          <div>
            <h2>{t("home.featuredTitle")}</h2>
            <p>{t("home.featuredBody")}</p>
          </div>
          <Link className="text-link" to="/hotels">
            {t("home.viewAllHotels")}
          </Link>
        </div>
        <div className="hotel-grid">
          {hotels.map((hotel, index) => (
            <HotelCard key={hotel.slug} hotel={hotel} priority={index < 2} />
          ))}
        </div>
      </section>

      <section className="section area-band">
        <div className="section-heading">
          <h2>{t("home.areasTitle")}</h2>
          <p>{t("home.areasBody")}</p>
        </div>
        <div className="area-grid">
          {areas.map((area) => (
            <AreaCard key={area.name} area={area} />
          ))}
        </div>
      </section>

      <section className="section editorial-section">
        <div className="editorial-copy">
          <h2>{t("home.whyTitle")}</h2>
          <p>{t("home.whyBody")}</p>
        </div>
        <FeatureList items={features("home.features")} />
      </section>

      <section className="section how-section">
        <div className="section-heading">
          <h2>{t("home.howTitle")}</h2>
          <p>{t("home.howBody")}</p>
        </div>
        <div className="journey-grid">
          <article>
            <h3>
              <MapPinned size={22} />
              {t("home.guestsTitle")}
            </h3>
            <ol>
              {list("home.guestSteps").map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>
          <article>
            <h3>
              <Landmark size={22} />
              {t("home.ownersTitle")}
            </h3>
            <ol>
              {list("home.ownerSteps").map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
