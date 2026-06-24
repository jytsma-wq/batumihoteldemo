import { Link } from "react-router-dom";
import { Camera, FileText, MessageCircle, Percent, Send, Sparkles } from "lucide-react";
import CTASection from "../components/CTASection.jsx";
import FeatureList from "../components/FeatureList.jsx";
import PricingCard from "../components/PricingCard.jsx";
import { hotels } from "../data/hotels.js";
import { usePageMeta } from "../hooks/usePageMeta.js";

export default function OwnersPage() {
  usePageMeta(
    "For Hotel Owners | Small Hotels Batumi",
    "Get your small Batumi hotel professionally presented online with photography, a dedicated page, direct WhatsApp enquiries, and simple pricing."
  );

  return (
    <main>
      <section
        className="owner-hero image-hero"
        style={{ "--hero-image": `url(${hotels[2].image})` }}
      >
        <div className="owner-copy">
          <h1>Get Your Hotel Professionally Presented Online</h1>
          <p>
            A focused sales page, professional photography, and direct contact options
            for small hotels that need a better online presence without building a full website.
          </p>
          <div className="hero-actions">
            <Link className="button primary large" to="/contact">
              Request Demo
            </Link>
            <Link className="button secondary large" to="/hotels/old-town-family-hotel">
              See Example Page
            </Link>
          </div>
        </div>
      </section>

      <section className="section editorial-section">
        <div className="editorial-copy">
          <h2>What the service includes</h2>
          <p>
            The platform is intentionally simple. It helps an owner look professional,
            collect direct enquiries, and show guests the property clearly.
          </p>
        </div>
        <FeatureList
          items={[
            {
              title: "Professional photography",
              body: "Rooms, bathrooms, exterior, breakfast areas, facilities, and surroundings are presented with care."
            },
            {
              title: "Dedicated hotel page",
              body: "Each property gets a polished page with photos, location, facilities, and practical guest details."
            },
            {
              title: "Direct WhatsApp enquiries",
              body: "Guests can contact the owner directly without learning a complicated system."
            },
            {
              title: "Direct booking requests",
              body: "Simple request forms create clear leads without accounts, payments, or PMS integrations."
            }
          ]}
        />
      </section>

      <section className="section service-icons">
        {[
          [MessageCircle, "WhatsApp ready", "Fast contact in the channel owners already use."],
          [Percent, "No booking commission", "Keep the direct enquiry instead of losing margin."],
          [FileText, "Simple lead collection", "Requests are structured so follow-up is easier."],
          [Sparkles, "Premium first impression", "A better page makes a small hotel feel more valuable."]
        ].map(([Icon, title, body]) => (
          <article key={title}>
            <Icon size={23} />
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </section>

      <section className="section pricing-section">
        <div className="section-heading">
          <h2>Pricing</h2>
          <p>Clear packages for a sales conversation with hotel owners.</p>
        </div>
        <div className="pricing-grid">
          <PricingCard
            title="Starter Listing"
            price="100 GEL/month"
            note="During high season"
            items={["Hotel profile", "Gallery", "Contact buttons", "Booking request form", "Area listing"]}
          />
          <PricingCard
            title="Photography Package"
            price="One-time fee"
            note="Professional image set for the hotel page"
            items={["Rooms", "Bathrooms", "Exterior", "Breakfast area", "Facilities", "Surroundings"]}
          />
          <PricingCard
            title="Booking Request Setup"
            price="One-time fee"
            note="Direct enquiry setup for simple guest leads"
            items={["Contact form", "WhatsApp integration", "Lead collection", "Simple booking flow"]}
          />
        </div>
      </section>

      <section className="section owner-process">
        <div className="section-heading">
          <h2>From ordinary listing to premium presentation</h2>
          <p>The sales demo is designed to make the difference visible on a phone in under a minute.</p>
        </div>
        <div className="process-row">
          <span>
            <Camera size={20} />
            Photos
          </span>
          <span>
            <FileText size={20} />
            Page
          </span>
          <span>
            <MessageCircle size={20} />
            Enquiries
          </span>
          <span>
            <Send size={20} />
            Leads
          </span>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
