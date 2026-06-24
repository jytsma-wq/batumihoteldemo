import { Check } from "lucide-react";

export default function PricingCard({ title, price, note, items }) {
  return (
    <article className="pricing-card">
      <h3>{title}</h3>
      <strong>{price}</strong>
      <p>{note}</p>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <Check size={16} />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
