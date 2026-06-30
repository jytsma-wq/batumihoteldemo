export default function FAQSection({ title = "FAQ", faqs = [] }) {
  if (!faqs.length) return null;

  return (
    <section className="detail-section faq-section">
      <h2>{title}</h2>
      <div className="faq-list">
        {faqs.map((faq) => (
          <details key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
