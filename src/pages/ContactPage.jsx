import ContactForm from "../components/ContactForm.jsx";
import { usePageMeta } from "../hooks/usePageMeta.js";
import { useI18n } from "../i18n.jsx";

export default function ContactPage() {
  const { t } = useI18n();

  usePageMeta(`${t("contact.title")} | Small Hotels Batumi`, t("contact.intro"));

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">{t("contact.eyebrow")}</p>
        <h1>{t("contact.title")}</h1>
        <p>{t("contact.intro")}</p>
      </section>
      <section className="section contact-layout">
        <div className="contact-copy">
          <h2>{t("contact.leadTitle")}</h2>
          <p>{t("contact.leadBody")}</p>
          <dl>
            <div>
              <dt>{t("contact.bestFor")}</dt>
              <dd>{t("contact.bestForValue")}</dd>
            </div>
            <div>
              <dt>{t("contact.channels")}</dt>
              <dd>{t("contact.channelsValue")}</dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
