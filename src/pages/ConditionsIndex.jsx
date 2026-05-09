import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { CONDITIONS } from "../data/conditions.js";

const SITE_URL = "https://www.drfanaee.com";
const PHONE = "631-265-2020";

const PAGE_DESC =
  "Conditions we treat at Long Island Brain & Spine: back pain, neck pain, sciatica, herniated discs, joint pain, neuropathy, headaches, sports injuries, post-surgical pain, CRPS, compression fractures, and more. Dr. Eric Fanaee, board-certified pain management.";

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": CONDITIONS.map((c, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": c.name,
    "url": `${SITE_URL}/conditions/${c.slug}`,
  })),
};

export default function ConditionsIndex() {
  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#0f1c2e", background: "#f8fafb", minHeight: "100vh" }}>
      <Head>
        <title>Conditions We Treat | Eric Fanaee, MD — Long Island Pain Management</title>
        <meta name="description" content={PAGE_DESC} />
        <link rel="canonical" href={`${SITE_URL}/conditions`} />
        <meta property="og:title" content="Conditions We Treat | Eric Fanaee, MD" />
        <meta property="og:description" content={PAGE_DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/conditions`} />
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
      </Head>

      {/* Hero */}
      <div style={{ background: "#0a192f", padding: "100px 32px 60px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none", fontFamily: "inherit", marginBottom: 20 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            Home
          </Link>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#4da3ff", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>Conditions We Treat</div>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 44, color: "white", lineHeight: 1.2, marginBottom: 16 }}>Pain Conditions Managed at Our Long Island Offices</h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 700 }}>{PAGE_DESC}</p>
        </div>
      </div>

      {/* Conditions grid */}
      <section style={{ padding: "64px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {CONDITIONS.map((c) => (
            <Link key={c.slug} to={`/conditions/${c.slug}`} style={{ background: "white", borderRadius: 14, padding: "28px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", border: "1px solid #eef2f6", textDecoration: "none", color: "inherit", display: "block", transition: "all 0.3s" }}>
              <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, color: "#0a192f", marginBottom: 10, lineHeight: 1.3 }}>{c.name}</h2>
              <p style={{ fontSize: 14, color: "#5a6b7d", lineHeight: 1.6, marginBottom: 14 }}>{c.desc}</p>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#2d8cf0" }}>Learn more →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "60px 32px", background: "#0a192f", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 28, color: "white", marginBottom: 12 }}>Don't see your condition listed?</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 24 }}>Dr. Fanaee evaluates a wide range of acute and chronic pain conditions. Call or request an appointment to discuss your case.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact" style={{ padding: "14px 28px", background: "#2d8cf0", color: "white", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Request an Appointment</Link>
            <a href={`tel:${PHONE.replace(/-/g, "")}`} style={{ padding: "14px 24px", color: "white", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>{PHONE}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
