import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import BookingRequestForm from "../components/BookingRequestForm.jsx";
import CTASection from "../components/CTASection.jsx";
import HotelGallery from "../components/HotelGallery.jsx";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import { hotels } from "../data/hotels.js";
import { usePageMeta } from "../hooks/usePageMeta.js";

export default function HotelDetailPage() {
  const { slug } = useParams();
  const hotel = hotels.find((item) => item.slug === slug) || hotels[0];

  usePageMeta(
    `${hotel.name} | Small Hotels Batumi`,
    `${hotel.name} in ${hotel.area}. View photos, facilities, nearby attractions, and direct contact options.`
  );

  return (
    <main>
      <section className="hotel-detail-hero">
        <img src={hotel.image} alt={`${hotel.name} hero`} />
        <div className="hotel-detail-copy">
          <Link className="back-link" to="/hotels">
            <ArrowLeft size={17} />
            Hotels
          </Link>
          <h1>{hotel.name}</h1>
          <p className="location-line">
            <MapPin size={18} />
            {hotel.area}
          </p>
          <p>{hotel.intro}</p>
          <div className="detail-contact-row">
            <WhatsAppButton phone={hotel.whatsapp} hotelName={hotel.name} />
            <a className="button secondary" href={`tel:${hotel.phone.replaceAll(" ", "")}`}>
              <Phone size={18} />
              Call
            </a>
            <a className="button secondary" href={`mailto:${hotel.email}`}>
              <Mail size={18} />
              Email
            </a>
          </div>
        </div>
      </section>

      <section className="section detail-layout">
        <div className="detail-main">
          <HotelGallery hotel={hotel} />

          <section className="detail-section">
            <h2>Why stay here</h2>
            <div className="detail-list">
              {hotel.whyStay.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </section>

          <section className="detail-section two-column-detail">
            <div>
              <h2>Room overview</h2>
              <ul className="clean-list">
                {hotel.rooms.map((room) => (
                  <li key={room}>{room}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Facilities</h2>
              <ul className="clean-list">
                {hotel.facilities.map((facility) => (
                  <li key={facility}>{facility}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="detail-section location-section">
            <div>
              <h2>Location</h2>
              <p>
                This demo map area shows where a lightweight local page can explain access,
                nearby attractions, and neighborhood context without becoming a complex booking tool.
              </p>
              <h3>Nearby attractions</h3>
              <ul className="clean-list attraction-list">
                {hotel.nearby.map((place) => (
                  <li key={place}>{place}</li>
                ))}
              </ul>
            </div>
            <div className="map-placeholder" role="img" aria-label={`Map placeholder for ${hotel.name}`}>
              <span>{hotel.area}</span>
            </div>
          </section>
        </div>

        <aside className="booking-sidebar">
          <BookingRequestForm hotelName={hotel.name} />
        </aside>
      </section>

      <CTASection
        title="Want Your Hotel Presented Like This?"
        body="This detail page is the sales argument: professional photos, simple contact, and a premium story for a local property."
        button="Request Demo"
      />
    </main>
  );
}
