export default function HotelGallery({ hotel }) {
  return (
    <div className="hotel-gallery" aria-label={`${hotel.name} photo gallery`}>
      {hotel.gallery.map((image, index) => (
        <img
          key={image}
          src={image}
          alt={`${hotel.name} gallery ${index + 1}`}
          loading={index === 0 ? "eager" : "lazy"}
        />
      ))}
    </div>
  );
}
