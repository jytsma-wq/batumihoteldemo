import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useI18n, useLocalePath } from "../i18n.jsx";

export default function Breadcrumbs({ items = [] }) {
  const localePath = useLocalePath();
  const { t } = useI18n();

  return (
    <nav className="breadcrumbs" aria-label={t("common.breadcrumb")}>
      <Link to={localePath("/")}>{t("common.home")}</Link>
      {items.map((item) => (
        <span key={item.label}>
          <ChevronRight size={14} />
          {item.to ? <Link to={localePath(item.to)}><bdi>{item.label}</bdi></Link> : <bdi>{item.label}</bdi>}
        </span>
      ))}
    </nav>
  );
}
