import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";

const SITE_URL = "https://www.drfanaee.com";
const PHONE = "631-265-2020";

const PAGE_DESC =
  "Terms of use for drfanaee.com — the rules governing your use of the Long Island Brain & Spine website.";

// ⚠️ LEGAL REVIEW NEEDED ⚠️
// Generic placeholder. Replace with terms reviewed by the practice's counsel
// before launch.

export default function Terms() {
  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#0f1c2e", background: "white", minHeight: "100vh" }}>
      <Head>
        <title>Terms of Use | Eric Fanaee, MD — Long Island Brain &amp; Spine</title>
        <meta name="description" content={PAGE_DESC} />
        <link rel="canonical" href={`${SITE_URL}/terms`} />
      </Head>

      <div style={{ background: "#0a192f", padding: "100px 32px 60px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none", fontFamily: "inherit", marginBottom: 20 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            Home
          </Link>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 38, color: "white", lineHeight: 1.2 }}>Terms of Use</h1>
        </div>
      </div>

      <section style={{ padding: "64px 32px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", fontSize: 16, color: "#3a4a5c", lineHeight: 1.8 }}>
          <p style={{ marginBottom: 16, padding: "16px 20px", background: "#fff8e1", border: "1px solid #f4d57b", borderRadius: 10, fontSize: 14, color: "#8a6d1f" }}>
            <strong>⚠️ Placeholder content — pending legal review.</strong> Replace with terms reviewed by the practice's legal counsel before launch.
          </p>

          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: "#0a192f", marginTop: 32, marginBottom: 12 }}>Acceptance of Terms</h2>
          <p style={{ marginBottom: 16 }}>By accessing drfanaee.com (the "Site"), you agree to these Terms of Use. If you do not agree, do not use the Site.</p>

          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: "#0a192f", marginTop: 32, marginBottom: 12 }}>Not Medical Advice</h2>
          <p style={{ marginBottom: 16 }}>The content on this Site is provided for general informational purposes and does not constitute medical advice, diagnosis, or treatment. Information about conditions and procedures is educational in nature; it is not a substitute for in-person evaluation by a qualified healthcare provider. Never disregard professional medical advice or delay seeking it because of something you read on this Site. If you think you may have a medical emergency, call 911 immediately.</p>

          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: "#0a192f", marginTop: 32, marginBottom: 12 }}>No Doctor-Patient Relationship</h2>
          <p style={{ marginBottom: 16 }}>Use of this Site, including submission of an appointment request, does not by itself create a doctor-patient relationship. A doctor-patient relationship is established only after a formal consultation in our office.</p>

          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: "#0a192f", marginTop: 32, marginBottom: 12 }}>Intellectual Property</h2>
          <p style={{ marginBottom: 16 }}>All content on the Site — text, images, logos, and design — is the property of Eric Fanaee, MD or our licensors, and is protected by copyright and trademark laws. You may view and print pages for personal, non-commercial use; you may not reproduce, distribute, or create derivative works without prior written consent.</p>

          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: "#0a192f", marginTop: 32, marginBottom: 12 }}>Third-Party Links</h2>
          <p style={{ marginBottom: 16 }}>The Site may include links to third-party websites for your convenience. We do not control or endorse the content of those sites and are not responsible for their availability or practices.</p>

          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: "#0a192f", marginTop: 32, marginBottom: 12 }}>Disclaimer &amp; Limitation of Liability</h2>
          <p style={{ marginBottom: 16 }}>The Site is provided "as is" without warranties of any kind. To the fullest extent permitted by law, Eric Fanaee, MD and Long Island Brain &amp; Spine disclaim liability for any damages arising from your use of, or inability to use, the Site.</p>

          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: "#0a192f", marginTop: 32, marginBottom: 12 }}>Changes to These Terms</h2>
          <p style={{ marginBottom: 16 }}>We may update these Terms at any time. Continued use of the Site after changes are posted constitutes acceptance.</p>

          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: "#0a192f", marginTop: 32, marginBottom: 12 }}>Contact</h2>
          <p style={{ marginBottom: 16 }}>Questions about these Terms? Call our office at {PHONE}.</p>
        </div>
      </section>
    </div>
  );
}
