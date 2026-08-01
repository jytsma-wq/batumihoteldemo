import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import HotelCard from "../components/HotelCard.jsx";
import { selectHotelResults } from "../hotel-results.js";
import { usePageMeta } from "../hooks/usePageMeta.js";
import { useI18n, useLocalePath, useSiteData } from "../i18n.jsx";

const defaultFilters = {
  areaSlug: "",
  type: "",
  budget: ""
};

export default function HotelsPage() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState(() => ({
    ...defaultFilters,
    areaSlug: searchParams.get("area") ?? "",
    type: searchParams.get("type") ?? "",
    budget: searchParams.get("budget") ?? ""
  }));
  const { dataLabel, t } = useI18n();
  const localePath = useLocalePath();
  const site = useSiteData();
  const {
    areas,
    budgetRangeOptions,
    collections,
    filterOptions,
    hotelTypeOptions
  } = site;

  usePageMeta(`${t("hotelsPage.title")} | Small Hotels Batumi`, t("hotelsPage.intro"));

  const activeFilters = useMemo(() => {
    const flagFilters = Object.fromEntries(filterOptions.map((option) => [option.key, Boolean(filters[option.key])]));
    return { ...filters, ...flagFilters };
  }, [filterOptions, filters]);

  // Localized hotel objects belong to the current site context. Recalculate the
  // small result set on every render so a locale switch cannot reuse old objects.
  const filteredHotels = selectHotelResults(site, activeFilters);

  function updateFilter(name, value) {
    setFilters((current) => ({ ...current, [name]: value }));
  }

  function clearFilters() {
    setFilters(defaultFilters);
  }

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">{t("hotelsPage.eyebrow")}</p>
        <h1>{t("hotelsPage.title")}</h1>
        <p>{t("hotelsPage.intro")}</p>
      </section>

      <section className="section hotels-layout">
        <aside className="filter-panel" aria-label={t("hotelsPage.filters")}>
          <div className="filter-title">
            <h2>
              <SlidersHorizontal size={19} />
              {t("hotelsPage.filters")}
            </h2>
            <button className="text-button" type="button" onClick={clearFilters}>
              <X size={16} />
              {t("common.clear")}
            </button>
          </div>

          <label>
            {t("hotelsPage.area")}
            <select value={filters.areaSlug} onChange={(event) => updateFilter("areaSlug", event.target.value)}>
              <option value="">{t("common.all")}</option>
              {areas.map((area) => (
                <option key={area.slug} value={area.slug}>
                  {dataLabel("areas", area.name)}
                </option>
              ))}
            </select>
          </label>

          <label>
            {t("hotelsPage.type")}
            <select value={filters.type} onChange={(event) => updateFilter("type", event.target.value)}>
              <option value="">{t("common.all")}</option>
              {hotelTypeOptions.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            {t("hotelsPage.budget")}
            <select value={filters.budget} onChange={(event) => updateFilter("budget", event.target.value)}>
              <option value="">{t("common.all")}</option>
              {budgetRangeOptions.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </label>

          <div className="check-list">
            {filterOptions.map((option) => (
              <label key={option.key} className="check-row">
                <input
                  type="checkbox"
                  checked={Boolean(filters[option.key])}
                  onChange={(event) => updateFilter(option.key, event.target.checked)}
                />
                {dataLabel("filters", option.label)}
              </label>
            ))}
          </div>
        </aside>

        <div className="hotel-results">
          <div className="results-heading">
            <h2>{t("hotelsPage.results", { count: filteredHotels.length })}</h2>
            <p>{t("hotelsPage.helpfulLinks")}</p>
            <div className="inline-link-row">
              {collections.slice(0, 6).map((collection) => (
                <Link key={collection.slug} to={localePath(`/collections/${collection.slug}`)}>
                  {collection.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="hotel-grid results-grid">
            {filteredHotels.map((hotel) => (
              <HotelCard key={hotel.slug} hotel={hotel} />
            ))}
          </div>

          {filteredHotels.length === 0 && (
            <div className="empty-state">
              <h3>{t("hotelsPage.noResults")}</h3>
              <p>{t("hotelsPage.noResultsBody")}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
