import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton.jsx";

export default function HotelCard({ hotel, priority = false }) {
  return (
    <article className="hotel-card">
      <Link className="hotel-image-link" to={`/hotels/${hotel.slug}`}>
        <img src={hotel.image} alt={`${hotel.name} in ${hotel.area}`} loading={priority ? "eager" : "lazy"} />
      </Link>
      <div className="hotel-card-body">
        <div className="hotel-card-heading">
          <h3>{hotel.name}</h3>
          <span>
            <MapPin size={15} />
            {hotel.area}
          </span>
        </div>
        <div className="tag-row" aria-label={`${hotel.name} tags`}>
          {hotel.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="hotel-actions">
          <Link className="button secondary" to={`/hotels/${hotel.slug}`}>
            View Hotel
          </Link>
          <WhatsAppButton phone={hotel.whatsapp} hotelName={hotel.name} text="WhatsApp" />
        </div>
      </div>
    </article>
  );
}
