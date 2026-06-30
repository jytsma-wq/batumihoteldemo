import { Link, Navigate, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import CollectionCard from "../components/CollectionCard.jsx";
import HotelCard from "../components/HotelCard.jsx";
import { usePageMeta } from "../hooks/usePageMeta.js";
import { collections, filterHotels, getArea, getGuide } from "../data/site.js";
import { useI18n, useLocalePath } from "../i18n.jsx";

export default function GuideDetailPage() {
  const { slug } = useParams();
  const guide = getGuide(slug);
  const { t } = useI18n();
  const localePath = useLocalePath();

  const guideCollections = guide
    ? collections.filter((collection) => guide.relatedCollections.includes(collection.slug))
    : [];
  const guideHotels = guide ? filterHotels({ areaSlug: guide.relatedAreas[0] }).slice(0, 3) : [];

  usePageMeta(guide ? `${guide.title} | Small Hotels Batumi` : t("guide.indexTitle"), guide?.description ?? t("guide.indexIntro"));

  if (!guide) return <Navigate to={localePath("/guide")} replace />;

  return (
    <main>
      <article className="article-page">
        <Breadcrumbs items={[{ label: t("nav.guide"), to: "/guide" }, { label: guide.title }]} />
        <p className="eyebrow">{guide.category} / {guide.readingTime}</p>
        <h1>{guide.title}</h1>
        <p className="article-lede">{guide.description}</p>
        <p className="updated-note">{t("guide.updated")}: {guide.updated}</p>

        <div className="toc-panel">
          <h2>{t("guide.tableOfContents")}</h2>
          <ol>
            {guide.sections.map((section) => (
              <li key={section.heading}>
                <a href={`#${section.heading.toLowerCase().replaceAll(" ", "-")}`}>{section.heading}</a>
              </li>
            ))}
          </ol>
        </div>

        {guide.sections.map((section) => (
          <section key={section.heading} id={section.heading.toLowerCase().replaceAll(" ", "-")}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </article>

      <section className="section">
        <div className="section-heading">
          <h2>{t("guide.relatedAreas")}</h2>
        </div>
        <div className="inline-link-row">
          {guide.relatedAreas.map((areaSlug) => {
            const area = getArea(areaSlug);
            if (!area) return null;
            return (
              <Link key={area.slug} to={localePath(`/areas/${area.slug}`)}>
                {area.name}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>{t("guide.relatedHotels")}</h2>
        </div>
        <div className="hotel-grid">
          {guideHotels.map((hotel) => (
            <HotelCard key={hotel.slug} hotel={hotel} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>{t("guide.relatedCollections")}</h2>
        </div>
        <div className="collection-grid">
          {guideCollections.map((collection) => (
            <CollectionCard key={collection.slug} collection={collection} />
          ))}
        </div>
      </section>
    </main>
  );
}
