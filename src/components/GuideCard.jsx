import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useI18n, useLocalePath } from "../i18n.jsx";

export default function GuideCard({ guide }) {
  const localePath = useLocalePath();
  const { t } = useI18n();

  return (
    <article className="guide-card">
      <p className="eyebrow">{guide.category} / {guide.readingTime}</p>
      <h3>{guide.title}</h3>
      <p>{guide.description}</p>
      <Link className="text-link" to={localePath(`/guide/${guide.slug}`)}>
        {t("common.readGuide")}
        <ArrowRight size={16} />
      </Link>
    </article>
  );
}
