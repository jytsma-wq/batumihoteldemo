import { usePageMeta } from "../hooks/usePageMeta.js";
import { useI18n } from "../i18n.jsx";

export default function LegalPage({ type }) {
  const isPrivacy = type === "privacy";
  const { t } = useI18n();
  const title = isPrivacy ? t("legal.privacyTitle") : t("legal.termsTitle");

  usePageMeta(`${title} | Small Hotels Batumi`, t("legal.description", { title }));

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">Small Hotels Batumi</p>
        <h1>{title}</h1>
        <p>{t("legal.intro")}</p>
      </section>
      <section className="section article-page">
        <h2>{isPrivacy ? t("legal.privacyHeading") : t("legal.termsHeading")}</h2>
        <p>{t("legal.body")}</p>
      </section>
    </main>
  );
}
