import { CheckCircle2 } from "lucide-react";

export default function FeatureList({ items }) {
  return (
    <div className="feature-list">
      {items.map((item) => (
        <article key={item.title}>
          <CheckCircle2 size={22} />
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </article>
      ))}
    </div>
  );
}
