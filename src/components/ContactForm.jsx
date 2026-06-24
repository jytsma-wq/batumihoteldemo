import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <form className="form-panel contact-form" onSubmit={handleSubmit}>
      <label>
        Name
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label>
        Hotel Name
        <input name="hotelName" type="text" autoComplete="organization" required />
      </label>
      <label>
        Phone
        <input name="phone" type="tel" autoComplete="tel" required />
      </label>
      <label>
        WhatsApp
        <input name="whatsapp" type="tel" required />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Message
        <textarea
          name="message"
          rows="5"
          defaultValue="I would like to see how my hotel can be presented on Small Hotels Batumi."
        />
      </label>
      <button className="button primary" type="submit">
        <Send size={17} />
        Request a Demo
      </button>
      {sent && <p className="success-note">Demo enquiry received locally for this sales demo.</p>}
    </form>
  );
}
