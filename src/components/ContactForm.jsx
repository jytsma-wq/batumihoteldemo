import { useState } from "react";
import { Send } from "lucide-react";
import { useI18n } from "../i18n.jsx";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const { t } = useI18n();

  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <form className="form-panel contact-form" onSubmit={handleSubmit}>
      <h3>{t("contact.title")}</h3>
      <label>
        {t("forms.name")}
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label>
        {t("forms.phone")}
        <input name="phone" type="tel" autoComplete="tel" required />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" />
      </label>
      <label>
        {t("forms.message")}
        <textarea
          name="message"
          rows="5"
          defaultValue="I am looking for a small hotel in Batumi. Dates, area and budget:"
        />
      </label>
      <button className="button primary" type="submit">
        <Send size={17} />
        {t("forms.contactButton")}
      </button>
      {sent && <p className="success-note">{t("forms.contactSuccess")}</p>}
    </form>
  );
}
