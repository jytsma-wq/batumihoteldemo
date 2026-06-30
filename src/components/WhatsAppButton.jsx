import { MessageCircle } from "lucide-react";
import { useI18n } from "../i18n.jsx";

export default function WhatsAppButton({ phone, text, hotelName }) {
  const { t } = useI18n();
  const message = hotelName
    ? t("whatsapp.hotelMessage", { hotelName })
    : t("whatsapp.demoMessage");
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  const label = text ?? t("whatsapp.ask");

  return (
    <a className="button whatsapp" href={href} target="_blank" rel="noreferrer">
      <MessageCircle size={18} />
      {label}
    </a>
  );
}
