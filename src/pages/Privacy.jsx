import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";

const SITE_URL = "https://www.drfanaee.com";
const PHONE = "631-265-2020";

const PAGE_DESC =
  "Privacy policy for drfanaee.com — how Long Island Brain & Spine collects, uses, and protects your information.";

export default function Privacy() {
  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#0f1c2e", background: "white", minHeight: "100vh" }}>
      <Head>
        <title>Privacy Policy | Eric Fanaee, MD — Long Island Brain &amp; Spine</title>
        <meta name="description" content={PAGE_DESC} />
        <link rel="canonical" href={`${SITE_URL}/privacy`} />
      </Head>

      <div style={{ background: "#0a192f", padding: "100px 32px 60px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none", fontFamily: "inherit", marginBottom: 20 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            Home
          </Link>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 38, color: "white", lineHeight: 1.2 }}>Privacy Policy</h1>
        </div>
      </div>

      <section style={{ padding: "64px 32px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", fontSize: 16, color: "#3a4a5c", lineHeight: 1.8 }}>
          <p style={{ marginBottom: 24, fontSize: 14, color: "#94a3b8" }}>This Privacy Policy explains how Long Island Brain &amp; Spine handles information collected through drfanaee.com. Our HIPAA Notice of Privacy Practices, which describes how protected health information is used and disclosed in clinical care, is a separate document provided to patients at their first visit.</p>

          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: "#0a192f", marginTop: 32, marginBottom: 12 }}>Information We Collect</h2>
          <p style={{ marginBottom: 16 }}>When you visit drfanaee.com or use our online appointment request form, we may collect personal information you provide voluntarily, such as your name, email address, phone number, date of birth, insurance details, and a description of your medical concern. We also collect standard analytics data (pages viewed, browser type, IP address) to improve the site.</p>

          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: "#0a192f", marginTop: 32, marginBottom: 12 }}>How We Use Your Information</h2>
          <p style={{ marginBottom: 16 }}>We use the information you submit to schedule appointments, communicate with you about your care, and improve our website and services. We do not sell or rent your personal information to third parties.</p>

          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: "#0a192f", marginTop: 32, marginBottom: 12 }}>Protected Health Information (HIPAA)</h2>
          <p style={{ marginBottom: 16 }}>As a healthcare provider, we are subject to the Health Insurance Portability and Accountability Act (HIPAA) and its implementing regulations. Your protected health information is maintained in our electronic health record system in accordance with HIPAA standards. Our HIPAA Notice of Privacy Practices, which describes how medical information about you may be used and disclosed, is provided to you at your first appointment and is available upon request.</p>

          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: "#0a192f", marginTop: 32, marginBottom: 12 }}>Cookies and Analytics</h2>
          <p style={{ marginBottom: 16 }}>We use cookies and similar technologies to operate the website, remember preferences, and gather analytics. You can control cookies through your browser settings.</p>

          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: "#0a192f", marginTop: 32, marginBottom: 12 }}>Third-Party Services</h2>
          <p style={{ marginBottom: 16 }}>Our site uses third-party services (such as Google Maps and Google Places) that may collect their own data subject to their privacy policies. Appointment requests are transmitted to our office systems via a secure backend.</p>

          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: "#0a192f", marginTop: 32, marginBottom: 12 }}>Your Choices</h2>
          <p style={{ marginBottom: 16 }}>You may request access to, correction of, or deletion of your personal information by contacting our office at {PHONE}. If you submitted an appointment request and changed your mind, contact us promptly so we can update your records.</p>

          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: "#0a192f", marginTop: 32, marginBottom: 12 }}>Updates to This Policy</h2>
          <p style={{ marginBottom: 16 }}>We may update this policy as our practices evolve. The most current version will always be posted on this page.</p>

          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: "#0a192f", marginTop: 32, marginBottom: 12 }}>Contact Us</h2>
          <p style={{ marginBottom: 16 }}>If you have questions about this policy or our privacy practices, please call us at {PHONE} or visit one of our offices.</p>
        </div>
      </section>
    </div>
  );
}
