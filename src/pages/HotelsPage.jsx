import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import HotelCard from "../components/HotelCard.jsx";
import { areas, budgetRanges, hotels, hotelTypes } from "../data/hotels.js";
import { usePageMeta } from "../hooks/usePageMeta.js";

const defaultFilters = {
  area: "All",
  type: "All",
  budget: "All",
  familyFriendly: false,
  seaView: false,
  nearBeach: false,
  parking: false
};

export default function HotelsPage() {
  const [searchParams] = useSearchParams();
  const initialArea = searchParams.get("area") || "All";
  const [filters, setFilters] = useState({ ...defaultFilters, area: initialArea });

  usePageMeta(
    "Hotels in Batumi | Small Hotels Batumi",
    "Browse demo small hotels, family hotels, guesthouses, aparthotels, and mini hotels in Batumi."
  );

  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      if (filters.area !== "All" && hotel.area !== filters.area) return false;
      if (filters.type !== "All" && hotel.type !== filters.type) return false;
      if (filters.budget !== "All" && hotel.budget !== filters.budget) return false;
      if (filters.familyFriendly && !hotel.familyFriendly) return false;
      if (filters.seaView && !hotel.seaView) return false;
      if (filters.nearBeach && !hotel.nearBeach) return false;
      if (filters.parking && !hotel.parking) return false;
      return true;
    });
  }, [filters]);

  function updateFilter(name, value) {
    setFilters((current) => ({ ...current, [name]: value }));
  }

  return (
    <main>
      <section className="page-hero compact">
        <div>
          <h1>Hotels in Batumi</h1>
          <p>
            A mobile-first grid view for family hotels, guesthouses, aparthotels, and mini hotels.
            Filters are local for this demo.
          </p>
        </div>
      </section>

      <section className="section hotels-layout">
        <aside className="filter-panel" aria-label="Hotel filters">
          <div className="filter-title">
            <h2>
              <SlidersHorizontal size={19} />
              Filters
            </h2>
            <button className="text-button" type="button" onClick={() => setFilters(defaultFilters)}>
              <X size={16} />
              Clear
            </button>
          </div>
          <label>
            Area
            <select value={filters.area} onChange={(event) => updateFilter("area", event.target.value)}>
              <option>All</option>
              {areas.map((area) => (
                <option key={area.name}>{area.name}</option>
              ))}
            </select>
          </label>
          <label>
            Hotel Type
            <select value={filters.type} onChange={(event) => updateFilter("type", event.target.value)}>
              <option>All</option>
              {hotelTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>
          <label>
            Budget Range
            <select value={filters.budget} onChange={(event) => updateFilter("budget", event.target.value)}>
              <option>All</option>
              {budgetRanges.map((range) => (
                <option key={range}>{range}</option>
              ))}
            </select>
          </label>
          <div className="check-list">
            {[
              ["familyFriendly", "Family Friendly"],
              ["seaView", "Sea View"],
              ["nearBeach", "Near Beach"],
              ["parking", "Parking"]
            ].map(([key, label]) => (
              <label key={key} className="check-row">
                <input
                  type="checkbox"
                  checked={filters[key]}
                  onChange={(event) => updateFilter(key, event.target.checked)}
                />
                {label}
              </label>
            ))}
          </div>
        </aside>

        <div className="hotel-results">
          <div className="results-heading">
            <h2>{filteredHotels.length} hotels available</h2>
            <p>Each card keeps photos, area, tags, WhatsApp, and detail-page access close together.</p>
          </div>
          <div className="hotel-grid results-grid">
            {filteredHotels.map((hotel) => (
              <HotelCard key={hotel.slug} hotel={hotel} />
            ))}
          </div>
          {filteredHotels.length === 0 && (
            <div className="empty-state">
              <h3>No hotels match these filters.</h3>
              <p>Clear a filter to see more demo properties.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
