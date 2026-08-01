import { Link } from "react-router-dom";
import { MapPin, Waves } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton.jsx";
import { useI18n, useLocalePath } from "../i18n.jsx";

export default function HotelCard({ hotel, priority = false }) {
  const { t } = useI18n();
  const localePath = useLocalePath();
  const areaLabel = hotel.areaLabel ?? hotel.areaName;
  const badges = hotel.badges ?? hotel.tags ?? [];

  return (
    <article className="hotel-card">
      <Link className="hotel-image-link" to={localePath(`/hotels/${hotel.slug}`)}>
        <img
          src={hotel.image}
          alt={t("common.hotelImageAlt", { hotelName: hotel.name, areaName: areaLabel })}
          loading={priority ? "eager" : "lazy"}
        />
      </Link>
      <div className="hotel-card-body">
        <div className="hotel-card-heading">
          <h3><bdi>{hotel.name}</bdi></h3>
          <span>
            <MapPin size={15} />
            {areaLabel}
          </span>
        </div>
        <p>{hotel.shortDescription}</p>
        <div className="tag-row" aria-label={t("common.hotelHighlights", { hotelName: hotel.name })}>
          {badges.slice(0, 4).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="card-facts">
          <span>
            <Waves size={15} />
            {hotel.distanceToBeach}
          </span>
          <strong>
            {t("common.from")} <bdi dir="ltr">{hotel.priceFromGel} {t("common.gel")}</bdi>
          </strong>
        </div>
        <div className="hotel-actions">
          <Link className="button secondary" to={localePath(`/hotels/${hotel.slug}`)}>
            {t("common.viewHotel")}
          </Link>
          <WhatsAppButton phone={hotel.whatsapp} hotelName={hotel.name} text={t("common.whatsapp")} />
        </div>
      </div>
    </article>
  );
}
