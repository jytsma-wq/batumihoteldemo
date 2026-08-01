import AreaCard from "../components/AreaCard.jsx";
import { usePageMeta } from "../hooks/usePageMeta.js";
import { useI18n, useSiteData } from "../i18n.jsx";

export default function AreasPage() {
  const { t } = useI18n();
  const { areas } = useSiteData();

  usePageMeta(`${t("areas.indexTitle")} | Small Hotels Batumi`, t("areas.indexIntro"));

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">{t("areas.eyebrow")}</p>
        <h1>{t("areas.indexTitle")}</h1>
        <p>{t("areas.indexIntro")}</p>
      </section>
      <section className="section">
        <div className="area-grid broad-area-grid">
          {areas.map((area) => (
            <AreaCard key={area.slug} area={area} />
          ))}
        </div>
      </section>
    </main>
  );
}
