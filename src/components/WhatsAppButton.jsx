import { MessageCircle } from "lucide-react";

export default function WhatsAppButton({ phone, text = "Ask on WhatsApp", hotelName }) {
  const message = hotelName
    ? `Hello, I am interested in ${hotelName} on Small Hotels Batumi.`
    : "Hello, I would like to request a demo for Small Hotels Batumi.";
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a className="button whatsapp" href={href} target="_blank" rel="noreferrer">
      <MessageCircle size={18} />
      {text}
    </a>
  );
}
