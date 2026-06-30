import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton.jsx";
import { useI18n } from "../i18n.jsx";

export default function HotelCard({ hotel, priority = false }) {
  const { t } = useI18n();
  const areaLabel = hotel.areaLabel ?? hotel.area;

  return (
    <article className="hotel-card">
      <Link className="hotel-image-link" to={`/hotels/${hotel.slug}`}>
        <img
          src={hotel.image}
          alt={t("common.hotelImageAlt", { hotelName: hotel.name, area: areaLabel })}
          loading={priority ? "eager" : "lazy"}
        />
      </Link>
      <div className="hotel-card-body">
        <div className="hotel-card-heading">
          <h3>{hotel.name}</h3>
          <span>
            <MapPin size={15} />
            {areaLabel}
          </span>
        </div>
        <div className="tag-row" aria-label={t("common.tagsLabel", { hotelName: hotel.name })}>
          {hotel.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="hotel-actions">
          <Link className="button secondary" to={`/hotels/${hotel.slug}`}>
            {t("hotelCard.viewHotel")}
          </Link>
          <WhatsAppButton phone={hotel.whatsapp} hotelName={hotel.name} text={t("whatsapp.short")} />
        </div>
      </div>
    </article>
  );
}
