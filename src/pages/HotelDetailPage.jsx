import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import BookingRequestForm from "../components/BookingRequestForm.jsx";
import CTASection from "../components/CTASection.jsx";
import HotelGallery from "../components/HotelGallery.jsx";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import { usePageMeta } from "../hooks/usePageMeta.js";
import { useI18n, useLocalizedHotelData } from "../i18n.jsx";

export default function HotelDetailPage() {
  const { slug } = useParams();
  const { t } = useI18n();
  const { hotels } = useLocalizedHotelData();
  const hotel = hotels.find((item) => item.slug === slug) || hotels[0];
  const areaLabel = hotel.areaLabel ?? hotel.area;

  usePageMeta(
    t("meta.detailTitle", { hotelName: hotel.name }),
    t("meta.detailDescription", { hotelName: hotel.name, area: areaLabel })
  );

  return (
    <main>
      <section className="hotel-detail-hero">
        <img src={hotel.image} alt={`${hotel.name} hero`} />
        <div className="hotel-detail-copy">
          <Link className="back-link" to="/hotels">
            <ArrowLeft size={17} />
            {t("detail.backToHotels")}
          </Link>
          <h1>{hotel.name}</h1>
          <p className="location-line">
            <MapPin size={18} />
            {areaLabel}
          </p>
          <p>{hotel.intro}</p>
          <div className="detail-contact-row">
            <WhatsAppButton phone={hotel.whatsapp} hotelName={hotel.name} />
            <a className="button secondary" href={`tel:${hotel.phone.replaceAll(" ", "")}`}>
              <Phone size={18} />
              {t("detail.call")}
            </a>
            <a className="button secondary" href={`mailto:${hotel.email}`}>
              <Mail size={18} />
              {t("detail.email")}
            </a>
          </div>
        </div>
      </section>

      <section className="section detail-layout">
        <div className="detail-main">
          <HotelGallery hotel={hotel} />

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
              <h2>{t("detail.rooms")}</h2>
              <ul className="clean-list">
                {hotel.rooms.map((room) => (
                  <li key={room}>{room}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2>{t("detail.facilities")}</h2>
              <ul className="clean-list">
                {hotel.facilities.map((facility) => (
                  <li key={facility}>{facility}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="detail-section location-section">
            <div>
              <h2>{t("detail.location")}</h2>
              <p>{t("detail.locationBody")}</p>
              <h3>{t("detail.nearby")}</h3>
              <ul className="clean-list attraction-list">
                {hotel.nearby.map((place) => (
                  <li key={place}>{place}</li>
                ))}
              </ul>
            </div>
            <div className="map-placeholder" role="img" aria-label={t("common.mapLabel", { hotelName: hotel.name })}>
              <span>{areaLabel}</span>
            </div>
          </section>
        </div>

        <aside className="booking-sidebar">
          <BookingRequestForm hotelName={hotel.name} />
        </aside>
      </section>

      <CTASection
        title={t("detail.ctaTitle")}
        body={t("detail.ctaBody")}
        button={t("detail.ctaButton")}
      />
    </main>
  );
}
