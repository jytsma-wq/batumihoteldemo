import { Link, Navigate, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import CollectionCard from "../components/CollectionCard.jsx";
import FAQSection from "../components/FAQSection.jsx";
import HotelCard from "../components/HotelCard.jsx";
import { usePageMeta } from "../hooks/usePageMeta.js";
import { useI18n, useLocalePath, useSiteData } from "../i18n.jsx";

function collectionFaq(collection, t) {
  return [
    {
      question: t("collections.chooseQuestion", { collectionTitle: collection.title.toLowerCase() }),
      answer: t("collections.chooseAnswer")
    },
    {
      question: t("collections.directQuestion"),
      answer: t("collections.directAnswer")
    }
  ];
}

export default function CollectionDetailPage() {
  const { slug } = useParams();
  const { t } = useI18n();
  const localePath = useLocalePath();
  const { areas, collectionHotels, collections, getCollection } = useSiteData();
  const collection = getCollection(slug);

  const hotels = collection ? collectionHotels(collection) : [];
  const bestAreas = collection ? areas.filter((area) => collection.bestAreas.includes(area.slug)) : [];
  const related = collection ? collections.filter((item) => collection.relatedCollections.includes(item.slug)) : [];

  usePageMeta(
    collection ? `${collection.h1} | Small Hotels Batumi` : t("collections.indexTitle"),
    collection?.description ?? t("collections.indexIntro")
  );

  if (!collection) return <Navigate to={localePath("/collections")} replace />;

  return (
    <main>
      <section className="page-hero">
        <Breadcrumbs items={[{ label: t("nav.collections"), to: "/collections" }, { label: collection.title }]} />
        <p className="eyebrow">{collection.searchIntent}</p>
        <h1>{collection.h1}</h1>
        <p>{collection.intro}</p>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>{t("collections.hotels")}</h2>
          <p>{collection.description}</p>
        </div>
        <div className="hotel-grid">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.slug} hotel={hotel} />
          ))}
        </div>
      </section>

      <section className="section collection-detail-grid">
        <article>
          <h2>{t("collections.bestAreas")}</h2>
          <div className="inline-link-row stacked">
            {bestAreas.map((area) => (
              <Link key={area.slug} to={localePath(`/areas/${area.slug}`)}>
                {area.name}
              </Link>
            ))}
          </div>
        </article>
        <article>
          <h2>{t("collections.faq")}</h2>
          <FAQSection title="" faqs={collectionFaq(collection, t)} />
        </article>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>{t("collections.related")}</h2>
        </div>
        <div className="collection-grid">
          {related.map((item) => (
            <CollectionCard key={item.slug} collection={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
