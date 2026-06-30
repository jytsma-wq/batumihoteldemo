import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLocalePath } from "../i18n.jsx";

export default function GuideCard({ guide }) {
  const localePath = useLocalePath();

  return (
    <article className="guide-card">
      <p className="eyebrow">{guide.category} / {guide.readingTime}</p>
      <h3>{guide.title}</h3>
      <p>{guide.description}</p>
      <Link className="text-link" to={localePath(`/guide/${guide.slug}`)}>
        Read guide
        <ArrowRight size={16} />
      </Link>
    </article>
  );
}
