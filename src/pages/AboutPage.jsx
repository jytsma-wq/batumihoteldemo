import { Link } from "react-router-dom";
import { Camera, MapPinned, MessageCircle, ShieldCheck } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta.js";
import { useI18n, useLocalePath } from "../i18n.jsx";

export default function AboutPage() {
  const { t } = useI18n();
  const localePath = useLocalePath();

  usePageMeta(`${t("about.title")} | Small Hotels Batumi`, t("about.intro"));

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">Independent local guide</p>
        <h1>{t("about.title")}</h1>
        <p>{t("about.intro")}</p>
      </section>
      <section className="section trust-section">
        <div>
          <h2>Built for choosing better, not scrolling longer.</h2>
          <p>{t("about.body")}</p>
          <Link className="button primary" to={localePath("/hotels")}>
            Browse small hotels
          </Link>
        </div>
        <div className="proof-grid">
          {[
            [Camera, "Real photo-led listings"],
            [MapPinned, "Area notes before room choice"],
            [MessageCircle, "Direct request workflow"],
            [ShieldCheck, "Good-to-know details upfront"]
          ].map(([Icon, label]) => (
            <span key={label}>
              <Icon size={19} />
              {label}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
