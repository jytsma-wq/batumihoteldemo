import { useState } from "react";
import { Send } from "lucide-react";
import { useI18n } from "../i18n.jsx";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const { t } = useI18n();
  const defaultMessage = t("forms.contactMessage");

  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <form className="form-panel contact-form" onSubmit={handleSubmit}>
      <label>
        {t("forms.name")}
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label>
        {t("forms.hotelName")}
        <input name="hotelName" type="text" autoComplete="organization" required />
      </label>
      <label>
        {t("forms.phone")}
        <input name="phone" type="tel" autoComplete="tel" required />
      </label>
      <label>
        {t("forms.whatsapp")}
        <input name="whatsapp" type="tel" required />
      </label>
      <label>
        {t("forms.email")}
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        {t("forms.message")}
        <textarea
          key={defaultMessage}
          name="message"
          rows="5"
          defaultValue={defaultMessage}
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
