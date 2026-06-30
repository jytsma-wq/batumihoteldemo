import CollectionCard from "../components/CollectionCard.jsx";
import { usePageMeta } from "../hooks/usePageMeta.js";
import { collections } from "../data/site.js";
import { useI18n } from "../i18n.jsx";

export default function CollectionsPage() {
  const { t } = useI18n();

  usePageMeta(`${t("collections.indexTitle")} | Small Hotels Batumi`, t("collections.indexIntro"));

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">Helpful searches</p>
        <h1>{t("collections.indexTitle")}</h1>
        <p>{t("collections.indexIntro")}</p>
      </section>
      <section className="section">
        <div className="collection-grid">
          {collections.map((collection) => (
            <CollectionCard key={collection.slug} collection={collection} />
          ))}
        </div>
      </section>
    </main>
  );
}
