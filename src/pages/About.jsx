import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { PROVIDERS } from "../data/providers.js";

const SITE_URL = "https://www.drfanaee.com";
const PHONE = "631-265-2020";

const PAGE_DESC =
  "Eric Fanaee, MD — board-certified pain management physician serving Long Island. University of Chicago and NYU Langone trained. Treating chronic pain since 2013.";

export default function About() {
  const dr = PROVIDERS.find((p) => p.featured) || PROVIDERS[0];

  const physicianSchema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": dr.name,
    "description": dr.bio,
    "jobTitle": dr.role,
    "image": `${SITE_URL}${dr.img}`,
    "url": `${SITE_URL}/about`,
    "medicalSpecialty": ["Pain Medicine", "Anesthesiology"],
    "alumniOf": [
      { "@type": "CollegeOrUniversity", "name": "University of Chicago" },
      { "@type": "CollegeOrUniversity", "name": "NYU Langone Medical Center" },
    ],
    "memberOf": {
      "@type": "Organization",
      "name": "Long Island Brain & Spine",
      "url": SITE_URL,
    },
  };

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#0f1c2e" }}>
      <Head>
        <title>About Dr. Eric Fanaee | Long Island Pain Management</title>
        <meta name="description" content={PAGE_DESC} />
        <link rel="canonical" href={`${SITE_URL}/about`} />
        <meta property="og:title" content="About Dr. Eric Fanaee | Long Island Pain Management" />
        <meta property="og:description" content={PAGE_DESC} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={`${SITE_URL}/about`} />
        <script type="application/ld+json">{JSON.stringify(physicianSchema)}</script>
      </Head>

      {/* Hero */}
      <div style={{ background: "#0a192f", padding: "100px 32px 60px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none", fontFamily: "inherit", marginBottom: 20 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            Home
          </Link>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#4da3ff", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>About</div>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 44, color: "white", lineHeight: 1.2, marginBottom: 16 }}>{dr.name}</h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 700 }}>{dr.role} · {dr.credentials}</p>
        </div>
      </div>

      {/* Bio + headshot */}
      <section style={{ padding: "64px 32px", background: "white" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "260px 1fr", gap: 48, alignItems: "start" }}>
          <div>
            <img src={dr.img} alt={dr.name} style={{ width: "100%", borderRadius: 14, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }} />
          </div>
          <div>
            <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 30, color: "#0a192f", marginBottom: 20 }}>About Dr. Fanaee</h2>
            <p style={{ fontSize: 16, color: "#3a4a5c", lineHeight: 1.8, marginBottom: 20 }}>{dr.bio}</p>
          </div>
        </div>
      </section>

      {/* Training + credentials */}
      <section style={{ padding: "64px 32px", background: "#f8fafb" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#4da3ff", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 10 }}>Residency</div>
            <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 20, color: "#0a192f", marginBottom: 6 }}>University of Chicago</h3>
            <p style={{ fontSize: 14, color: "#5a6b7d" }}>Anesthesiology</p>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#4da3ff", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 10 }}>Fellowship</div>
            <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 20, color: "#0a192f", marginBottom: 6 }}>NYU Langone Medical Center</h3>
            <p style={{ fontSize: 14, color: "#5a6b7d" }}>Pain Medicine</p>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#4da3ff", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 10 }}>Board Certifications</div>
            <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 20, color: "#0a192f", marginBottom: 6 }}>Pain Medicine · Anesthesiology</h3>
            <p style={{ fontSize: 14, color: "#5a6b7d" }}>Serving Long Island since 2013</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "64px 32px", background: "#0a192f", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 30, color: "white", marginBottom: 12 }}>Schedule a Consultation</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 28 }}>Three Long Island offices · Most major insurance accepted · Sedation offered for all interventional procedures.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact" style={{ padding: "14px 32px", background: "#2d8cf0", color: "white", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Request an Appointment</Link>
            <a href={`tel:${PHONE.replace(/-/g, "")}`} style={{ padding: "14px 24px", color: "white", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>{PHONE}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
