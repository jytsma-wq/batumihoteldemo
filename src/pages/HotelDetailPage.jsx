import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, BedDouble, CalendarClock, Car, Languages, Mail, MapPin, Phone, Utensils, Waves } from "lucide-react";
import BookingRequestForm from "../components/BookingRequestForm.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import FAQSection from "../components/FAQSection.jsx";
import HotelCard from "../components/HotelCard.jsx";
import HotelGallery from "../components/HotelGallery.jsx";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import { usePageMeta } from "../hooks/usePageMeta.js";
import { useI18n, useLocalePath, useSiteData } from "../i18n.jsx";

function QuickFact({ icon: Icon, label, value }) {
  return (
    <div className="quick-fact">
      <Icon size={18} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default function HotelDetailPage() {
  const { slug } = useParams();
  const { dataLabel, t } = useI18n();
  const localePath = useLocalePath();
  const { getArea, getHotel, relatedHotelsFor } = useSiteData();
  const hotel = getHotel(slug);

  const area = hotel ? getArea(hotel.areaSlug) : null;
  const areaLabel = hotel ? dataLabel("areas", hotel.areaName) : "";
  const relatedHotels = hotel ? relatedHotelsFor(hotel, 3) : [];
  const title = hotel
    ? t("detail.metaTitle", {
        hotelName: hotel.name,
        hotelType: hotel.typeLabel.toLowerCase(),
        areaName: areaLabel
      })
    : `${t("hotelsPage.title")} | Small Hotels Batumi`;

  usePageMeta(title, hotel?.shortDescription ?? t("hotelsPage.intro"));

  if (!hotel) return <Navigate to={localePath("/hotels")} replace />;

  return (
    <main>
      <section className="hotel-detail-hero">
        <img src={hotel.image} alt={t("common.hotelImageAlt", { hotelName: hotel.name, areaName: areaLabel })} />
        <div className="hotel-detail-copy">
          <Breadcrumbs
            items={[
              { label: t("nav.hotels"), to: "/hotels" },
              { label: hotel.name }
            ]}
          />
          <Link className="back-link" to={localePath("/hotels")}>
            <ArrowLeft size={17} />
            {t("detail.back")}
          </Link>
          <p className="eyebrow">{hotel.typeLabel} / {areaLabel}</p>
          <h1>{title}</h1>
          <p>{hotel.intro}</p>
          <div className="detail-contact-row">
            <WhatsAppButton phone={hotel.whatsapp} hotelName={hotel.name} text={t("common.requestAvailability")} />
            <a className="button secondary bidi-ltr" href={`tel:${hotel.phone.replaceAll(" ", "")}`}>
              <Phone size={18} />
              {hotel.phone}
            </a>
            <a className="button secondary bidi-ltr" href={`mailto:${hotel.email}`}>
              <Mail size={18} />
              {hotel.email}
            </a>
          </div>
        </div>
      </section>

      <section className="section detail-layout">
        <div className="detail-main">
          <section className="detail-section first-detail-section">
            <h2>{t("detail.quickFacts")}</h2>
            <div className="quick-fact-grid">
              <QuickFact icon={MapPin} label={t("detail.area")} value={areaLabel} />
              <QuickFact icon={Waves} label={t("detail.beach")} value={hotel.distanceToBeach} />
              <QuickFact icon={BedDouble} label={t("detail.rooms")} value={t("common.roomTypes", { count: hotel.rooms.length })} />
              <QuickFact icon={Utensils} label={t("detail.breakfast")} value={hotel.breakfast} />
              <QuickFact icon={Car} label={t("detail.parking")} value={hotel.parkingNote} />
              <QuickFact icon={CalendarClock} label={t("detail.checkIn")} value={hotel.checkInNote} />
              <QuickFact icon={Languages} label={t("detail.languages")} value={hotel.languagesSpoken.join(", ")} />
              <QuickFact icon={Phone} label={t("common.from")} value={<bdi dir="ltr">{hotel.priceFromGel} {t("common.gel")}</bdi>} />
            </div>
          </section>

          <section className="detail-section">
            <h2>{t("detail.photos")}</h2>
            <HotelGallery hotel={hotel} />
          </section>

          <section className="detail-section">
            <h2>{t("detail.whyStay")}</h2>
            <div className="detail-list">
              {hotel.whyStay.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </section>

          <section className="detail-section two-column-detail">
            <div>
              <h2>{t("detail.bestFor")}</h2>
              <ul className="clean-list">
                {hotel.bestFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2>{t("detail.goodToKnow")}</h2>
              <ul className="clean-list">
                {hotel.goodToKnow.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="detail-section">
            <h2>{t("detail.rooms")}</h2>
            <div className="room-grid">
              {hotel.rooms.map((room) => (
                <article key={room.name} className="room-card">
                  <h3>{room.name}</h3>
                  <p>{room.description}</p>
                  <dl>
                    <div><dt>{t("common.sleeps")}</dt><dd>{room.sleeps}</dd></div>
                    <div><dt>{t("common.beds")}</dt><dd>{room.beds}</dd></div>
                    <div><dt>{t("common.bathroom")}</dt><dd>{room.bathroom}</dd></div>
                    <div><dt>{t("common.balcony")}</dt><dd>{room.balcony}</dd></div>
                    <div><dt>{t("common.goodFor")}</dt><dd>{room.goodFor}</dd></div>
                  </dl>
                </article>
              ))}
            </div>
          </section>

          <section className="detail-section two-column-detail">
            <div>
              <h2>{t("detail.facilities")}</h2>
              <ul className="pill-list">
                {hotel.facilities.map((facility) => (
                  <li key={facility}>{facility}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2>{t("detail.localAreaNotes")}</h2>
              <p>{hotel.localAreaNotes}</p>
              {area && (
                <Link className="text-link" to={localePath(`/areas/${area.slug}`)}>
                  {area.title}
                </Link>
              )}
            </div>
          </section>

          <section className="detail-section location-section">
            <div>
              <h2>{t("detail.nearby")}</h2>
              <ul className="clean-list attraction-list">
                {hotel.nearby.map((place) => (
                  <li key={place.name}>
                    <strong>{place.name}</strong>
                    <span>{place.time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="map-placeholder"
              role="img"
              aria-label={`${hotel.name}: ${t("common.approximateMap")} — ${areaLabel}`}
            >
              <span>{areaLabel}</span>
            </div>
          </section>

          <FAQSection title={t("detail.faq")} faqs={hotel.faqs} />

          <section className="detail-section">
            <h2>{t("detail.related")}</h2>
            <div className="hotel-grid">
              {relatedHotels.map((item) => (
                <HotelCard key={item.slug} hotel={item} />
              ))}
            </div>
          </section>
        </div>

        <aside className="booking-sidebar">
          {/* Reset traveller input for a different property, but keep it across locale switches. */}
          <BookingRequestForm key={hotel.slug} hotelName={hotel.name} />
        </aside>
      </section>

      <div className="mobile-sticky-cta">
        <WhatsAppButton phone={hotel.whatsapp} hotelName={hotel.name} text={t("common.requestAvailability")} />
      </div>
    </main>
  );
}
