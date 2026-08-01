import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { useI18n, useLocalePath, useSiteData } from "../i18n.jsx";

const BATUMI_CENTER = [41.621, 41.635];
const APP_BASE = import.meta.env.BASE_URL === "/" ? "" : import.meta.env.BASE_URL.replace(/\/$/, "");

export default function InteractiveMap() {
  const { areas, hotels } = useSiteData();
  const [activeArea, setActiveArea] = useState("");
  const [selectedSlug, setSelectedSlug] = useState(hotels[0].slug);
  const [isReady, setIsReady] = useState(false);
  const mapNodeRef = useRef(null);
  const mapRef = useRef(null);
  const leafletRef = useRef(null);
  const layerRef = useRef(null);
  const markerRefs = useRef(new Map());
  const { dataLabel, t } = useI18n();
  const localePath = useLocalePath();

  const visibleHotels = useMemo(
    () => hotels.filter((hotel) => !activeArea || hotel.areaSlug === activeArea),
    [activeArea, hotels]
  );

  const selectedHotel = hotels.find((hotel) => hotel.slug === selectedSlug) ?? visibleHotels[0] ?? hotels[0];

  useEffect(() => {
    let cancelled = false;

    async function loadMap() {
      const leaflet = await import("leaflet");
      if (cancelled || !mapNodeRef.current || mapRef.current) return;

      leafletRef.current = leaflet;
      const map = leaflet
        .map(mapNodeRef.current, {
          center: BATUMI_CENTER,
          zoom: 11,
          scrollWheelZoom: false,
          zoomControl: true
        });

      leaflet
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18
        })
        .addTo(map);

      layerRef.current = leaflet.layerGroup().addTo(map);
      mapRef.current = map;
      setIsReady(true);
      window.setTimeout(() => map.invalidateSize(), 120);
    }

    loadMap();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        layerRef.current = null;
        markerRefs.current.clear();
      }
    };
  }, []);

  useEffect(() => {
    const leaflet = leafletRef.current;
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!isReady || !leaflet || !map || !layer) return;

    map.closePopup();
    layer.clearLayers();
    markerRefs.current.clear();

    visibleHotels.forEach((hotel, index) => {
      const marker = leaflet.marker([hotel.coordinates.lat, hotel.coordinates.lng], {
        icon: leaflet.divIcon({
          className: "hotel-map-marker-wrap",
          html: `<span class="hotel-map-marker ${hotel.slug === selectedHotel.slug ? "active" : ""}"><span>${index + 1}</span></span>`,
          iconSize: [38, 38],
          iconAnchor: [19, 34],
          popupAnchor: [0, -28]
        }),
        title: hotel.name
      });

      const areaLabel = dataLabel("areas", hotel.areaName);
      const href = `${APP_BASE}${localePath(`/hotels/${hotel.slug}`)}`;
      marker.bindPopup(`
        <strong><bdi>${hotel.name}</bdi></strong>
        <span>${areaLabel} / ${hotel.distanceToBeach}</span>
        <a href="${href}">${t("common.viewHotel")}</a>
      `);
      marker.on("click", () => setSelectedSlug(hotel.slug));
      marker.addTo(layer);
      markerRefs.current.set(hotel.slug, marker);
    });

    if (visibleHotels.length > 1) {
      const bounds = leaflet.latLngBounds(
        visibleHotels.map((hotel) => [hotel.coordinates.lat, hotel.coordinates.lng])
      ).pad(0.24);
      map.fitBounds(bounds, { animate: true, duration: 0.7, maxZoom: 13 });
    } else if (visibleHotels[0]) {
      map.setView([visibleHotels[0].coordinates.lat, visibleHotels[0].coordinates.lng], 14, {
        animate: true,
        duration: 0.7
      });
    }
  }, [activeArea, dataLabel, isReady, localePath, selectedHotel.slug, t, visibleHotels]);

  useEffect(() => {
    const map = mapRef.current;
    const marker = markerRefs.current.get(selectedHotel.slug);
    if (!isReady || !map || !marker || !selectedHotel.coordinates) return;
    map.setView([selectedHotel.coordinates.lat, selectedHotel.coordinates.lng], activeArea ? 14 : 12, {
      animate: true,
      duration: 0.55
    });
    marker.openPopup();
  }, [activeArea, isReady, selectedHotel]);

  function chooseArea(areaSlug) {
    setActiveArea(areaSlug);
    const firstHotel = hotels.find((hotel) => !areaSlug || hotel.areaSlug === areaSlug);
    if (firstHotel) setSelectedSlug(firstHotel.slug);
  }

  function chooseHotel(hotel) {
    setSelectedSlug(hotel.slug);
    setActiveArea(hotel.areaSlug);
  }

  return (
    <div className="interactive-map-shell">
      <div className="map-toolbar" aria-label={t("map.filterAria")}>
        <button className={!activeArea ? "active" : ""} type="button" onClick={() => chooseArea("")}>
          {t("map.allStays")}
        </button>
        {areas.map((area) => (
          <button
            key={area.slug}
            className={activeArea === area.slug ? "active" : ""}
            type="button"
            onClick={() => chooseArea(area.slug)}
          >
            {dataLabel("areas", area.name)}
          </button>
        ))}
      </div>

      <div className="map-experience">
        <div className="leaflet-map-frame">
          <div ref={mapNodeRef} className="leaflet-map" aria-label={t("common.approximateMap")} />
          {!isReady && <div className="map-loading">{t("map.loading")}</div>}
          <div className="map-help">
            <MapPin size={16} />
            {t("map.help")}
          </div>
        </div>

        <aside className="map-hotel-panel">
          <p className="notice">{t("map.disclaimer")}</p>
          <article className="selected-map-hotel">
            <img
              src={selectedHotel.image}
              alt={t("map.hotelAlt", {
                hotelName: selectedHotel.name,
                areaName: dataLabel("areas", selectedHotel.areaName)
              })}
            />
            <div>
              <p className="eyebrow">{dataLabel("areas", selectedHotel.areaName)}</p>
              <h2><bdi>{selectedHotel.name}</bdi></h2>
              <p>{selectedHotel.shortDescription}</p>
              <Link className="button primary" to={localePath(`/hotels/${selectedHotel.slug}`)}>
                {t("common.viewHotel")}
              </Link>
            </div>
          </article>

          <div className="map-hotel-list" aria-label={t("map.hotelsAria")}>
            {visibleHotels.map((hotel, index) => (
              <button
                key={hotel.slug}
                className={hotel.slug === selectedHotel.slug ? "active" : ""}
                type="button"
                onClick={() => chooseHotel(hotel)}
              >
                <span>{index + 1}</span>
                <strong><bdi>{hotel.name}</bdi></strong>
                <em>{dataLabel("areas", hotel.areaName)} / {hotel.distanceToBeach}</em>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
