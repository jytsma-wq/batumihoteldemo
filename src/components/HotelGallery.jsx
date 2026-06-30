import { useI18n } from "../i18n.jsx";

export default function HotelGallery({ hotel }) {
  const { t } = useI18n();

  return (
    <div className="hotel-gallery" aria-label={t("common.photoGallery", { hotelName: hotel.name })}>
      {hotel.gallery.map((image, index) => (
        <figure key={image.src ?? image}>
          <img
            src={image.src ?? image}
            alt={image.alt ?? `${hotel.name} ${index + 1}`}
            loading={index === 0 ? "eager" : "lazy"}
          />
          {image.caption && <figcaption>{image.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}
