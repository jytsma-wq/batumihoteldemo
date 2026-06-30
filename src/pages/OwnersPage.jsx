import { Link } from "react-router-dom";
import { Camera, FileText, MessageCircle, Search, ShieldCheck } from "lucide-react";
import ContactForm from "../components/ContactForm.jsx";
import PricingCard from "../components/PricingCard.jsx";
import { usePageMeta } from "../hooks/usePageMeta.js";
import { hotels } from "../data/site.js";
import { useI18n, useLocalePath } from "../i18n.jsx";

const ownerFeatures = [
  ["Traveller-first hotel page", "A clear page with photos, room details, FAQ, area notes and direct request buttons."],
  ["Search-intent placement", "Relevant collection and area pages can send travellers to your hotel page."],
  ["Direct WhatsApp requests", "Guests can ask about dates and rooms without a heavy booking engine."],
  ["Practical local copy", "We describe what travellers actually ask about: parking, beach access, noise and room fit."]
];

const pricing = [
  {
    title: "Starter listing",
    price: "from 350 GEL",
    note: "One hotel page with direct request setup.",
    items: ["Hotel profile", "Photo selection", "WhatsApp CTA", "Basic SEO copy"]
  },
  {
    title: "Full presentation",
    price: "from 750 GEL",
    note: "Better for properties that need a stronger page.",
    items: ["Room sections", "FAQ", "Area notes", "Collection placement"]
  },
  {
    title: "Ongoing updates",
    price: "from 120 GEL / month",
    note: "Useful for seasonal room and price changes.",
    items: ["Content updates", "New photos", "Guide links", "Availability messaging"]
  }
];

export default function OwnersPage() {
  const { t } = useI18n();
  const localePath = useLocalePath();

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
              Contact us
            </Link>
            <Link className="button secondary large" to={localePath("/hotels/old-town-family-hotel")}>
              <Search size={19} />
              See example page
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Owner service</p>
          <h2>{t("owners.featuresTitle")}</h2>
        </div>
        <div className="service-icons">
          {ownerFeatures.map(([title, body], index) => {
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
          <p className="eyebrow">Simple packages</p>
          <h2>{t("owners.pricing")}</h2>
          <p>Pricing depends on photos, copy depth, languages and update frequency.</p>
        </div>
        <div className="pricing-grid">
          {pricing.map((packageItem) => (
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
          <p className="eyebrow">Important boundary</p>
          <h2>This page is for property owners only.</h2>
          <p>
            The public traveller pages stay focused on helping guests choose where to stay. Owner
            pricing and sales copy are kept here so the main guide remains useful and trusted.
          </p>
        </div>
        <div className="proof-grid">
          {["No public commission pitch", "Traveller-first hotel pages", "Direct guest contact", "Clear update workflow"].map((item) => (
            <span key={item}>
              <ShieldCheck size={19} />
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="section contact-layout">
        <div className="contact-copy">
          <h2>Ask about listing your property</h2>
          <p>
            Send the hotel name, location, room count and whether you already have photos. We will
            reply with the practical next step.
          </p>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
