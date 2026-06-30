import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { collectionHotels } from "../data/site.js";
import { useLocalePath } from "../i18n.jsx";

export default function CollectionCard({ collection }) {
  const localePath = useLocalePath();
  const count = collectionHotels(collection).length;

  return (
    <article className="intent-card">
      <p className="eyebrow">{collection.searchIntent}</p>
      <h3>{collection.title}</h3>
      <p>{collection.description}</p>
      <Link className="text-link" to={localePath(`/collections/${collection.slug}`)}>
        {count} stays
        <ArrowRight size={16} />
      </Link>
    </article>
  );
}
