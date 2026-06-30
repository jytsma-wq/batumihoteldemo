import { useState } from "react";
import { Send } from "lucide-react";
import { useI18n } from "../i18n.jsx";

export default function BookingRequestForm({ hotelName = "this hotel" }) {
  const [sent, setSent] = useState(false);
  const { t } = useI18n();
  const defaultMessage = t("forms.bookingMessage", { hotelName });

  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <form className="form-panel" onSubmit={handleSubmit}>
      <h3>{t("forms.bookingTitle")}</h3>
      <p>{t("forms.bookingBody")}</p>
      <label>
        {t("forms.name")}
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label>
        {t("forms.phone")}
        <input name="phone" type="tel" autoComplete="tel" required />
      </label>
      <input name="hotel" type="hidden" value={hotelName} />
      <div className="form-row">
        <label>
          {t("forms.checkIn")}
          <input name="checkIn" type="date" required />
        </label>
        <label>
          {t("forms.checkOut")}
          <input name="checkOut" type="date" required />
        </label>
      </div>
      <label>
        {t("forms.guests")}
        <input name="guests" type="number" min="1" max="12" defaultValue="2" required />
      </label>
      <label>
        {t("forms.message")}
        <textarea
          key={defaultMessage}
          name="message"
          rows="4"
          defaultValue={defaultMessage}
        />
      </label>
      <button className="button primary" type="submit">
        <Send size={17} />
        {t("forms.send")}
      </button>
      {sent && <p className="success-note">{t("forms.bookingSuccess")}</p>}
    </form>
  );
}
