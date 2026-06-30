import { MessageCircle } from "lucide-react";
import { useI18n } from "../i18n.jsx";

export default function WhatsAppButton({ phone, text, hotelName, className = "" }) {
  const { t } = useI18n();
  const message = hotelName
    ? t("forms.bookingMessage", { hotelName })
    : "Hello, I found Small Hotels Batumi and would like accommodation advice.";
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  const label = text ?? t("common.whatsapp");

  return (
    <a className={`button whatsapp ${className}`.trim()} href={href} target="_blank" rel="noreferrer">
      <MessageCircle size={18} />
      {label}
    </a>
  );
}
