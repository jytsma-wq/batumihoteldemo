import { useState } from "react";
import { Send } from "lucide-react";

export default function BookingRequestForm({ hotelName = "this hotel" }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <form className="form-panel" onSubmit={handleSubmit}>
      <h3>Booking request</h3>
      <p>Send a simple enquiry directly to the hotel owner. No payment is taken here.</p>
      <label>
        Name
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label>
        Phone or WhatsApp
        <input name="phone" type="tel" autoComplete="tel" required />
      </label>
      <div className="form-row">
        <label>
          Arrival
          <input name="arrival" type="date" required />
        </label>
        <label>
          Nights
          <input name="nights" type="number" min="1" max="60" defaultValue="3" required />
        </label>
      </div>
      <label>
        Message
        <textarea
          name="message"
          rows="4"
          defaultValue={`Hello, I would like to check availability at ${hotelName}.`}
        />
      </label>
      <button className="button primary" type="submit">
        <Send size={17} />
        Send Request
      </button>
      {sent && <p className="success-note">Demo request captured. In production this would go to the hotel owner.</p>}
    </form>
  );
}
