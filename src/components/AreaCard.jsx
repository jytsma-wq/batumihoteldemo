import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n, useLocalePath } from "../i18n.jsx";

export default function AreaCard({ area }) {
  const { t } = useI18n();
  const localePath = useLocalePath();
  const label = area.label ?? area.name;

  return (
    <article className="area-card">
      <img src={area.image} alt={t("common.areaImageAlt", { areaName: label })} loading="lazy" />
      <div className="area-card-body">
        <div>
          <h3>{label}</h3>
          <p>{area.description}</p>
        </div>
        <Link to={localePath(`/areas/${area.slug}`)}>
          <span>{t("common.smallStays", { count: area.hotelCount })}</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
