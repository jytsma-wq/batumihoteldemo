import { Link } from "react-router-dom";
import { useI18n, useLocalePath } from "../i18n.jsx";

export default function CTASection({
  title,
  body,
  button,
  to = "/contact"
}) {
  const { t } = useI18n();
  const localePath = useLocalePath();
  const resolvedTitle = title ?? t("cta.title");
  const resolvedBody = body ?? t("cta.body");
  const resolvedButton = button ?? t("cta.button");

  return (
    <section className="cta-section">
      <div>
        <h2>{resolvedTitle}</h2>
        <p>{resolvedBody}</p>
      </div>
      <Link className="button primary large" to={localePath(to)}>
        {resolvedButton}
      </Link>
    </section>
  );
}
