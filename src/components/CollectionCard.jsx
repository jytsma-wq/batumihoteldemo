import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useI18n, useLocalePath, useSiteData } from "../i18n.jsx";

export default function CollectionCard({ collection }) {
  const localePath = useLocalePath();
  const { collectionHotels } = useSiteData();
  const { t } = useI18n();
  const count = collectionHotels(collection).length;

  return (
    <article className="intent-card">
      <p className="eyebrow">{collection.searchIntent}</p>
      <h3>{collection.title}</h3>
      <p>{collection.description}</p>
      <Link className="text-link" to={localePath(`/collections/${collection.slug}`)}>
        {t("common.stays", { count })}
        <ArrowRight size={16} />
      </Link>
    </article>
  );
}
