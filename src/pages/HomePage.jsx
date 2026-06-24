import { Link } from "react-router-dom";
import { Camera, Handshake, Heart, Landmark, MapPinned, ShieldCheck } from "lucide-react";
import { areas, hotels } from "../data/hotels.js";
import { usePageMeta } from "../hooks/usePageMeta.js";
import AreaCard from "../components/AreaCard.jsx";
import CTASection from "../components/CTASection.jsx";
import FeatureList from "../components/FeatureList.jsx";
import HotelCard from "../components/HotelCard.jsx";

export default function HomePage() {
  usePageMeta(
    "Small Hotels Batumi | Independent Hotels and Guesthouses",
    "Discover small independent hotels in Batumi, presented with professional photography and direct contact options."
  );

  return (
    <main>
      <section
        className="hero-section image-hero"
        style={{ "--hero-image": `url(${hotels[0].gallery[1]})` }}
      >
        <div className="hero-copy">
          <h1>Discover Small Independent Hotels in Batumi</h1>
          <p>
            Family hotels, guesthouses and local stays presented with professional
            photography and direct contact options.
          </p>
          <div className="hero-actions">
            <Link className="button primary large" to="/hotels">
              View Hotels
            </Link>
            <Link className="button secondary large" to="/for-hotel-owners">
              List Your Hotel
            </Link>
          </div>
        </div>
      </section>

      <section className="section showcase-section">
        <div className="showcase-grid" aria-label="Large hotel photography showcase">
          <img src={hotels[2].image} alt="Sea view hotel room in Batumi" />
          <img src={hotels[0].image} alt="Small hotel exterior in Batumi" />
          <img src={hotels[5].image} alt="Coastal guesthouse view" />
        </div>
      </section>

      <section className="section intro-strip">
        <div className="section-heading">
          <h2>Presented like a boutique travel guide, not a booking directory.</h2>
          <p>
            Every page is designed to make a real local hotel feel trustworthy,
            polished, and easy to contact.
          </p>
        </div>
        <div className="proof-grid">
          <span>
            <Camera size={20} />
            Photography first
          </span>
          <span>
            <Handshake size={20} />
            Direct enquiries
          </span>
          <span>
            <ShieldCheck size={20} />
            No booking commission
          </span>
        </div>
      </section>

      <section className="section">
        <div className="section-heading split">
          <div>
            <h2>Featured Hotels</h2>
            <p>Six demo hotels show how different local properties can be presented with a consistent premium style.</p>
          </div>
          <Link className="text-link" to="/hotels">
            View all hotels
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
          <h2>Explore Areas</h2>
          <p>Owners can see how location becomes part of the sales story, from Old Batumi to quieter coastal villages.</p>
        </div>
        <div className="area-grid">
          {areas.map((area) => (
            <AreaCard key={area.name} area={area} />
          ))}
        </div>
      </section>

      <section className="section editorial-section">
        <div className="editorial-copy">
          <h2>Why Small Hotels?</h2>
          <p>
            Batumi's smaller hotels often have the warmth guests want, but not the
            presentation they need. This demo shows how a better visual story can
            make local ownership feel like an advantage.
          </p>
        </div>
        <FeatureList
          items={[
            {
              title: "Personal service",
              body: "Guests know they are speaking to real owners and hosts, not a distant call center."
            },
            {
              title: "Local ownership",
              body: "Each listing highlights the neighborhood, host style, and story behind the property."
            },
            {
              title: "Authentic experience",
              body: "Small places can compete with character, warmth, and real photography."
            },
            {
              title: "Better value",
              body: "Direct contact supports simple requests without complex booking systems or commissions."
            }
          ]}
        />
      </section>

      <section className="section how-section">
        <div className="section-heading">
          <h2>How It Works</h2>
          <p>Two simple journeys: one for guests, one for hotel owners.</p>
        </div>
        <div className="journey-grid">
          <article>
            <h3>
              <MapPinned size={22} />
              For guests
            </h3>
            <ol>
              <li>Discover hotel</li>
              <li>View photos</li>
              <li>Contact directly</li>
              <li>Book stay</li>
            </ol>
          </article>
          <article>
            <h3>
              <Landmark size={22} />
              For hotel owners
            </h3>
            <ol>
              <li>Photography</li>
              <li>Hotel page</li>
              <li>Direct enquiries</li>
              <li>Increased visibility</li>
            </ol>
          </article>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
