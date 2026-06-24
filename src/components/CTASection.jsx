import { Link } from "react-router-dom";

export default function CTASection({
  title = "Show Your Hotel to More Guests",
  body = "Turn a simple local hotel into a polished online presentation with professional photos, direct enquiries, and a page guests can trust.",
  button = "Request Demo",
  to = "/contact"
}) {
  return (
    <section className="cta-section">
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <Link className="button primary large" to={to}>
        {button}
      </Link>
    </section>
  );
}
