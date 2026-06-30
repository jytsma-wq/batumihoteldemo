import ContactForm from "../components/ContactForm.jsx";
import { usePageMeta } from "../hooks/usePageMeta.js";
import { useI18n } from "../i18n.jsx";

export default function ContactPage() {
  const { t } = useI18n();

  usePageMeta(`${t("contact.title")} | Small Hotels Batumi`, t("contact.intro"));

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">Local accommodation advice</p>
        <h1>{t("contact.title")}</h1>
        <p>{t("contact.intro")}</p>
      </section>
      <section className="section contact-layout">
        <div className="contact-copy">
          <h2>Tell us the trip shape, not just the dates.</h2>
          <p>
            The right Batumi stay depends on area, beach route, room layout, noise tolerance and
            transport. Share the basics and we will point you toward relevant small hotels or areas.
          </p>
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
