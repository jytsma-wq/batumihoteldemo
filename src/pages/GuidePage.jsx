import GuideCard from "../components/GuideCard.jsx";
import { usePageMeta } from "../hooks/usePageMeta.js";
import { guides } from "../data/site.js";
import { useI18n } from "../i18n.jsx";

export default function GuidePage() {
  const { t } = useI18n();

  usePageMeta(`${t("guide.indexTitle")} | Small Hotels Batumi`, t("guide.indexIntro"));

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">Local planning notes</p>
        <h1>{t("guide.indexTitle")}</h1>
        <p>{t("guide.indexIntro")}</p>
      </section>
      <section className="section">
        <div className="guide-grid">
          {guides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </section>
    </main>
  );
}
