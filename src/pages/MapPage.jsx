import InteractiveMap from "../components/InteractiveMap.jsx";
import { usePageMeta } from "../hooks/usePageMeta.js";
import { useI18n } from "../i18n.jsx";

export default function MapPage() {
  const { t } = useI18n();

  usePageMeta(`${t("map.title")} | Small Hotels Batumi`, t("map.intro"));

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">{t("map.eyebrow")}</p>
        <h1>{t("map.title")}</h1>
        <p>{t("map.intro")}</p>
      </section>
      <section className="section">
        <InteractiveMap />
      </section>
    </main>
  );
}
