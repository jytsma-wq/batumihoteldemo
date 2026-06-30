import { usePageMeta } from "../hooks/usePageMeta.js";

export default function LegalPage({ type }) {
  const isPrivacy = type === "privacy";
  const title = isPrivacy ? "Privacy" : "Terms";

  usePageMeta(`${title} | Small Hotels Batumi`, `${title} information for Small Hotels Batumi.`);

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">Small Hotels Batumi</p>
        <h1>{title}</h1>
        <p>
          This guide is a local accommodation directory. Request forms are simple enquiry forms and
          travellers should confirm all stay details directly with the property.
        </p>
      </section>
      <section className="section article-page">
        <h2>{isPrivacy ? "Privacy basics" : "Use of the guide"}</h2>
        <p>
          Travellers should confirm exact prices, availability, address, payment method and arrival
          details directly with the property before travelling.
        </p>
      </section>
    </main>
  );
}
