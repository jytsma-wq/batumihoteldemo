import ContactForm from "../components/ContactForm.jsx";
import { usePageMeta } from "../hooks/usePageMeta.js";

export default function ContactPage() {
  usePageMeta(
    "Request a Demo | Small Hotels Batumi",
    "Request a demo for your small hotel, guesthouse, aparthotel, or mini hotel in Batumi."
  );

  return (
    <main>
      <section className="page-hero contact-hero">
        <div>
          <h1>Request a Demo</h1>
          <p>
            Share a few details about your hotel. The demo shows how your property
            could look with professional photography, a dedicated page, WhatsApp,
            and direct booking requests.
          </p>
        </div>
      </section>
      <section className="section contact-layout">
        <div className="contact-copy">
          <h2>Built for small hotels in Batumi</h2>
          <p>
            The goal is simple: help owners look professional online without an expensive
            custom website or complicated booking system.
          </p>
          <dl>
            <div>
              <dt>Best for</dt>
              <dd>Family hotels, guesthouses, aparthotels, mini hotels</dd>
            </div>
            <div>
              <dt>Main channels</dt>
              <dd>WhatsApp, phone, email, booking request form</dd>
            </div>
            <div>
              <dt>Demo focus</dt>
              <dd>Photography, trust, simplicity, direct contact</dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
