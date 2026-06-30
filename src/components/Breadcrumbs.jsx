import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useLocalePath } from "../i18n.jsx";

export default function Breadcrumbs({ items = [] }) {
  const localePath = useLocalePath();

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link to={localePath("/")}>Home</Link>
      {items.map((item) => (
        <span key={item.label}>
          <ChevronRight size={14} />
          {item.to ? <Link to={localePath(item.to)}>{item.label}</Link> : <span>{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}
