import { Link } from "react-router-dom";
import { Camera, MapPinned, MessageCircle, ShieldCheck } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta.js";
import { useI18n, useLocalePath } from "../i18n.jsx";

export default function AboutPage() {
  const { list, t } = useI18n();
  const localePath = useLocalePath();

  usePageMeta(`${t("about.title")} | Small Hotels Batumi`, t("about.intro"));

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">{t("about.eyebrow")}</p>
        <h1>{t("about.title")}</h1>
        <p>{t("about.intro")}</p>
      </section>
      <section className="section trust-section">
        <div>
          <h2>{t("about.statement")}</h2>
          <p>{t("about.body")}</p>
          <Link className="button primary" to={localePath("/hotels")}>
            {t("about.browse")}
          </Link>
        </div>
        <div className="proof-grid">
          {list("about.features").map((label, index) => {
            const Icon = [Camera, MapPinned, MessageCircle, ShieldCheck][index];
            return (
            <span key={label}>
              <Icon size={19} />
              {label}
            </span>
            );
          })}
        </div>
      </section>
    </main>
  );
}
