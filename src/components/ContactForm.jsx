import { useState } from "react";
import { Send } from "lucide-react";
import { useI18n } from "../i18n.jsx";
import { useLocalizedTemplate } from "../hooks/useLocalizedTemplate.js";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const { t } = useI18n();
  const [message, setMessage] = useLocalizedTemplate(t("forms.contactMessage"));

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
        {t("forms.email")}
        <input name="email" type="email" autoComplete="email" />
      </label>
      <label>
        {t("forms.message")}
        <textarea
          name="message"
          rows="5"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </label>
      <button className="button primary" type="submit">
        <Send size={17} />
        {t("forms.contactButton")}
      </button>
      {sent && <p className="success-note" role="status" aria-live="polite">{t("forms.contactSuccess")}</p>}
    </form>
  );
}
