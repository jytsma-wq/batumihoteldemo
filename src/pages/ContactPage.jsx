import ContactForm from "../components/ContactForm.jsx";
import { usePageMeta } from "../hooks/usePageMeta.js";
import { useI18n } from "../i18n.jsx";

export default function ContactPage() {
  const { t } = useI18n();

  usePageMeta(t("meta.contactTitle"), t("meta.contactDescription"));

  return (
    <main>
      <section className="page-hero contact-hero">
        <div>
          <h1>{t("contact.title")}</h1>
          <p>{t("contact.body")}</p>
        </div>
      </section>
      <section className="section contact-layout">
        <div className="contact-copy">
          <h2>{t("contact.builtTitle")}</h2>
          <p>{t("contact.builtBody")}</p>
          <dl>
            <div>
              <dt>{t("contact.bestForLabel")}</dt>
              <dd>{t("contact.bestFor")}</dd>
            </div>
            <div>
              <dt>{t("contact.channelsLabel")}</dt>
              <dd>{t("contact.channels")}</dd>
            </div>
            <div>
              <dt>{t("contact.focusLabel")}</dt>
              <dd>{t("contact.focus")}</dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
