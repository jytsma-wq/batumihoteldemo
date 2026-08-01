import { Link } from "react-router-dom";
import { Camera, FileText, MessageCircle, Search, ShieldCheck } from "lucide-react";
import ContactForm from "../components/ContactForm.jsx";
import PricingCard from "../components/PricingCard.jsx";
import { usePageMeta } from "../hooks/usePageMeta.js";
import { useI18n, useLocalePath, useSiteData } from "../i18n.jsx";

export default function OwnersPage() {
  const { list, t } = useI18n();
  const localePath = useLocalePath();
  const { hotels } = useSiteData();

  usePageMeta(`${t("owners.title")} | Small Hotels Batumi`, t("owners.intro"));

  return (
    <main>
      <section
        className="owner-hero image-hero"
        style={{ "--hero-image": `url(${hotels[3].image})` }}
      >
        <div className="owner-copy">
          <p className="eyebrow">{t("owners.title")}</p>
          <h1>{t("owners.h1")}</h1>
          <p>{t("owners.intro")}</p>
          <div className="hero-actions">
            <Link className="button primary large" to={localePath("/contact")}>
              <MessageCircle size={19} />
              {t("owners.contactUs")}
            </Link>
            <Link className="button secondary large" to={localePath("/hotels/old-town-family-hotel")}>
              <Search size={19} />
              {t("owners.examplePage")}
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">{t("owners.serviceEyebrow")}</p>
          <h2>{t("owners.featuresTitle")}</h2>
        </div>
        <div className="service-icons">
          {list("owners.features").map(({ title, body }, index) => {
            const Icon = [FileText, Search, MessageCircle, Camera][index];
            return (
              <article key={title}>
                <Icon size={23} />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section pricing-section">
        <div className="section-heading">
          <p className="eyebrow">{t("owners.packagesEyebrow")}</p>
          <h2>{t("owners.pricing")}</h2>
          <p>{t("owners.pricingIntro")}</p>
        </div>
        <div className="pricing-grid">
          {list("owners.packages").map((packageItem) => (
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

      <section className="section trust-section">
        <div>
          <p className="eyebrow">{t("owners.boundaryEyebrow")}</p>
          <h2>{t("owners.boundaryTitle")}</h2>
          <p>{t("owners.boundaryBody")}</p>
        </div>
        <div className="proof-grid">
          {list("owners.boundaryItems").map((item) => (
            <span key={item}>
              <ShieldCheck size={19} />
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="section contact-layout">
        <div className="contact-copy">
          <h2>{t("owners.contactTitle")}</h2>
          <p>{t("owners.contactBody")}</p>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
