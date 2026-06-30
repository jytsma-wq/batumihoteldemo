import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import HotelCard from "../components/HotelCard.jsx";
import { usePageMeta } from "../hooks/usePageMeta.js";
import { useI18n, useLocalizedHotelData } from "../i18n.jsx";

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
  const { t } = useI18n();
  const { areas, budgetRanges, hotels, hotelTypes } = useLocalizedHotelData();

  usePageMeta(t("meta.hotelsTitle"), t("meta.hotelsDescription"));

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
          <h1>{t("hotelsPage.title")}</h1>
          <p>{t("hotelsPage.body")}</p>
        </div>
      </section>

      <section className="section hotels-layout">
        <aside className="filter-panel" aria-label={t("hotelsPage.filtersLabel")}>
          <div className="filter-title">
            <h2>
              <SlidersHorizontal size={19} />
              {t("hotelsPage.filtersTitle")}
            </h2>
            <button className="text-button" type="button" onClick={() => setFilters(defaultFilters)}>
              <X size={16} />
              {t("hotelsPage.clear")}
            </button>
          </div>
          <label>
            {t("hotelsPage.area")}
            <select value={filters.area} onChange={(event) => updateFilter("area", event.target.value)}>
              <option value="All">{t("common.all")}</option>
              {areas.map((area) => (
                <option key={area.name} value={area.name}>
                  {area.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t("hotelsPage.type")}
            <select value={filters.type} onChange={(event) => updateFilter("type", event.target.value)}>
              <option value="All">{t("common.all")}</option>
              {hotelTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t("hotelsPage.budget")}
            <select value={filters.budget} onChange={(event) => updateFilter("budget", event.target.value)}>
              <option value="All">{t("common.all")}</option>
              {budgetRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </label>
          <div className="check-list">
            {[
              ["familyFriendly", t("hotelsPage.options.familyFriendly")],
              ["seaView", t("hotelsPage.options.seaView")],
              ["nearBeach", t("hotelsPage.options.nearBeach")],
              ["parking", t("hotelsPage.options.parking")]
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
            <h2>{t("hotelsPage.resultsTitle", { count: filteredHotels.length })}</h2>
            <p>{t("hotelsPage.resultsBody")}</p>
          </div>
          <div className="hotel-grid results-grid">
            {filteredHotels.map((hotel) => (
              <HotelCard key={hotel.slug} hotel={hotel} />
            ))}
          </div>
          {filteredHotels.length === 0 && (
            <div className="empty-state">
              <h3>{t("hotelsPage.emptyTitle")}</h3>
              <p>{t("hotelsPage.emptyBody")}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
