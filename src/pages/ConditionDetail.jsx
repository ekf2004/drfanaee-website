import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { CONDITIONS } from "../data/conditions.js";
import { PROCEDURES } from "../data/procedures.js";

const SITE_URL = "https://www.drfanaee.com";
const PHONE = "631-265-2020";

export default function ConditionDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const condition = CONDITIONS.find((c) => c.slug === slug);

  if (!condition) {
    return (
      <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", padding: "120px 32px 80px", textAlign: "center", color: "#0f1c2e" }}>
        <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 36, marginBottom: 12 }}>Condition not found</h1>
        <p style={{ color: "#5a6b7d", marginBottom: 24 }}>We couldn't find a condition matching that URL.</p>
        <Link to="/conditions" style={{ color: "#2d8cf0", fontWeight: 600, textDecoration: "none" }}>← Back to all conditions</Link>
      </div>
    );
  }

  const c = condition;
  const canonical = `${SITE_URL}/conditions/${c.slug}`;
  const pageTitle = `${c.name} | Eric Fanaee, MD — Long Island Pain Management`;

  // Resolve treatment slugs to procedure objects for display
  const offeredTreatments = c.treatments
    .map((s) => PROCEDURES.find((p) => p.slug === s))
    .filter(Boolean);

  const conditionSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    "name": c.name,
    "description": c.metaDescription,
    "signOrSymptom": c.symptoms.map((s) => ({ "@type": "MedicalSignOrSymptom", "name": s })),
    "cause": c.causes.map((cause) => ({ "@type": "MedicalCause", "name": cause })),
    "possibleTreatment": offeredTreatments.map((p) => ({
      "@type": "MedicalProcedure",
      "name": p.title,
      "url": `${SITE_URL}/treatments/${p.slug}`,
    })),
    "url": canonical,
  };

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#0f1c2e" }}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={c.metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={c.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">{JSON.stringify(conditionSchema)}</script>
      </Head>

      {/* Breadcrumb hero */}
      <div style={{ background: "#0a192f", padding: "100px 32px 60px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Link to="/conditions" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none", fontFamily: "inherit", marginBottom: 20 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            Back to All Conditions
          </Link>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#4da3ff", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>Condition</div>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 44, color: "white", lineHeight: 1.2, marginBottom: 16 }}>{c.name}</h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 700 }}>{c.hero}</p>
          <div style={{ display: "flex", gap: 14, marginTop: 28 }}>
            <button onClick={() => navigate("/contact")} style={{ padding: "14px 28px", background: "#2d8cf0", color: "white", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Request an Appointment</button>
            <a href={`tel:${PHONE.replace(/-/g, "")}`} style={{ padding: "14px 28px", color: "white", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call {PHONE}
            </a>
          </div>
        </div>
      </div>

      {/* Overview */}
      <section style={{ padding: "64px 32px", background: "white" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 30, color: "#0a192f", marginBottom: 16 }}>Overview</h2>
          <p style={{ fontSize: 16, color: "#5a6b7d", lineHeight: 1.8 }}>{c.overview}</p>
        </div>
      </section>

      {/* Causes + Symptoms side by side */}
      <section style={{ padding: "64px 32px", background: "#f8fafb" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          <div>
            <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, color: "#0a192f", marginBottom: 20 }}>Common Causes</h2>
            {c.causes.map((cause, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid #eef2f6" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#2d8cf0", flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: "#3a4a5c" }}>{cause}</span>
              </div>
            ))}
          </div>
          <div>
            <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, color: "#0a192f", marginBottom: 20 }}>Typical Symptoms</h2>
            {c.symptoms.map((symptom, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid #eef2f6" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4da3ff", flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: "#3a4a5c" }}>{symptom}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatments offered */}
      {offeredTreatments.length > 0 && (
        <section style={{ padding: "64px 32px", background: "white" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, color: "#0a192f", marginBottom: 8 }}>Treatments We Offer for {c.name}</h2>
            <p style={{ fontSize: 15, color: "#5a6b7d", lineHeight: 1.7, marginBottom: 24 }}>Dr. Fanaee tailors treatment to the specific source of your pain. Common options for this condition include:</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
              {offeredTreatments.map((p) => (
                <Link key={p.slug} to={`/treatments/${p.slug}`} style={{ padding: "18px 20px", background: "#f8fafb", borderRadius: 12, border: "1px solid #eef2f6", textDecoration: "none", color: "inherit", transition: "all 0.3s" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#4da3ff", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 6 }}>{p.subtitle}</div>
                  <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 18, color: "#0a192f", marginBottom: 8 }}>{p.title}</div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#2d8cf0" }}>Learn more →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {c.faqs.length > 0 && (
        <section style={{ padding: "64px 32px", background: "#f8fafb" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, color: "#0a192f", marginBottom: 24 }}>Frequently Asked Questions</h2>
            {c.faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: "1px solid #e2e8f0" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", padding: "18px 0", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left" }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#0a192f", paddingRight: 16 }}>{faq.q}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" style={{ transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.3s", flexShrink: 0 }}><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <div style={{ maxHeight: openFaq === i ? 400 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
                  <p style={{ fontSize: 15, color: "#4a5a6d", lineHeight: 1.8, fontWeight: 500, paddingBottom: 18 }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ padding: "64px 32px", background: "#0a192f", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 30, color: "white", marginBottom: 12 }}>Living with {c.name}?</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 28 }}>Schedule a consultation with Dr. Fanaee to discuss your symptoms and treatment options.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("/contact")} style={{ padding: "14px 32px", background: "#2d8cf0", color: "white", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Request an Appointment</button>
            <a href={`tel:${PHONE.replace(/-/g, "")}`} style={{ padding: "14px 24px", color: "white", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>{PHONE}</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export function getStaticPaths() {
  return CONDITIONS.map((c) => `/conditions/${c.slug}`);
}
