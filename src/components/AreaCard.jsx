import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function AreaCard({ area }) {
  return (
    <article className="area-card">
      <img src={area.image} alt={`${area.name} in Batumi`} loading="lazy" />
      <div className="area-card-body">
        <div>
          <h3>{area.name}</h3>
          <p>{area.description}</p>
        </div>
        <Link to={`/hotels?area=${encodeURIComponent(area.name)}`}>
          <span>{area.count} hotels</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
