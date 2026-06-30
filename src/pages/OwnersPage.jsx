import { Link } from "react-router-dom";
import { Camera, FileText, MessageCircle, Percent, Send, Sparkles } from "lucide-react";
import CTASection from "../components/CTASection.jsx";
import FeatureList from "../components/FeatureList.jsx";
import PricingCard from "../components/PricingCard.jsx";
import { usePageMeta } from "../hooks/usePageMeta.js";
import { useI18n, useLocalizedHotelData } from "../i18n.jsx";

export default function OwnersPage() {
  const { features, list, t } = useI18n();
  const { hotels } = useLocalizedHotelData();
  const serviceIcons = [MessageCircle, Percent, FileText, Sparkles];

  usePageMeta(t("meta.ownersTitle"), t("meta.ownersDescription"));

  return (
    <main>
      <section
        className="owner-hero image-hero"
        style={{ "--hero-image": `url(${hotels[2].image})` }}
      >
        <div className="owner-copy">
          <h1>{t("owners.heroTitle")}</h1>
          <p>{t("owners.heroBody")}</p>
          <div className="hero-actions">
            <Link className="button primary large" to="/contact">
              {t("owners.requestDemo")}
            </Link>
            <Link className="button secondary large" to="/hotels/old-town-family-hotel">
              {t("owners.seeExample")}
            </Link>
          </div>
        </div>
      </section>

      <section className="section editorial-section">
        <div className="editorial-copy">
          <h2>{t("owners.includesTitle")}</h2>
          <p>{t("owners.includesBody")}</p>
        </div>
        <FeatureList items={features("owners.features")} />
      </section>

      <section className="section service-icons">
        {list("owners.services").map(([title, body], index) => {
          const Icon = serviceIcons[index];

          return (
          <article key={title}>
            <Icon size={23} />
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
          );
        })}
      </section>

      <section className="section pricing-section">
        <div className="section-heading">
          <h2>{t("owners.pricingTitle")}</h2>
          <p>{t("owners.pricingBody")}</p>
        </div>
        <div className="pricing-grid">
          {list("owners.pricing").map((packageItem) => (
            <PricingCard
              key={packageItem.title}
              title={packageItem.title}
              price={packageItem.price}
              note={packageItem.note}
              items={packageItem.items}
            />
          ))}
        </div>
      </section>

      <section className="section owner-process">
        <div className="section-heading">
          <h2>{t("owners.processTitle")}</h2>
          <p>{t("owners.processBody")}</p>
        </div>
        <div className="process-row">
          {list("owners.processSteps").map((step, index) => {
            const Icon = [Camera, FileText, MessageCircle, Send][index];

            return (
              <span key={step}>
                <Icon size={20} />
                {step}
              </span>
            );
          })}
        </div>
      </section>

      <CTASection />
    </main>
  );
}
