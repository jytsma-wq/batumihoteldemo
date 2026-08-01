import { useI18n } from "../i18n.jsx";

export default function FAQSection({ title, faqs = [] }) {
  const { t } = useI18n();
  const resolvedTitle = title ?? t("detail.faq");
  if (!faqs.length) return null;

  return (
    <section className="detail-section faq-section">
      {resolvedTitle && <h2>{resolvedTitle}</h2>}
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
