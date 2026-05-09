import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { PROVIDERS } from "../data/providers.js";

const SITE_URL = "https://www.drfanaee.com";
const PHONE = "631-265-2020";

const PAGE_DESC =
  "The Long Island Brain & Spine team — Dr. Eric Fanaee, MD plus board-certified nurse practitioners and physician assistants providing interventional pain management across our three Long Island offices.";

export default function Team() {
  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#0f1c2e", background: "#f8fafb", minHeight: "100vh" }}>
      <Head>
        <title>Our Team | Long Island Brain &amp; Spine — Eric Fanaee, MD</title>
        <meta name="description" content={PAGE_DESC} />
        <link rel="canonical" href={`${SITE_URL}/team`} />
        <meta property="og:title" content="Our Team | Long Island Brain &amp; Spine" />
        <meta property="og:description" content={PAGE_DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/team`} />
      </Head>

      <div style={{ background: "#0a192f", padding: "100px 32px 60px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none", fontFamily: "inherit", marginBottom: 20 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            Home
          </Link>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#4da3ff", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>Our Team</div>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 44, color: "white", lineHeight: 1.2, marginBottom: 16 }}>Meet Our Providers</h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 700 }}>{PAGE_DESC}</p>
        </div>
      </div>

      <section style={{ padding: "64px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {PROVIDERS.map((p) => (
            <div key={p.slug} style={{ background: "white", borderRadius: 14, padding: "28px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", border: "1px solid #eef2f6" }}>
              {p.img && (
                <img src={p.img} alt={p.name} style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", marginBottom: 18 }} />
              )}
              {!p.img && (
                <div style={{ width: 120, height: 120, borderRadius: "50%", background: p.color, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: 600, fontFamily: "'Instrument Serif', Georgia, serif", marginBottom: 18 }}>{p.initials}</div>
              )}
              <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, color: "#0a192f", marginBottom: 6, lineHeight: 1.3 }}>{p.name}</h2>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#4da3ff", marginBottom: 6 }}>{p.role}</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 14 }}>{p.credentials}</div>
              <p style={{ fontSize: 14, color: "#5a6b7d", lineHeight: 1.7 }}>{p.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "60px 32px", background: "#0a192f", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 28, color: "white", marginBottom: 12 }}>Schedule a Consultation</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 24 }}>Most major insurance accepted · Three Long Island offices.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact" style={{ padding: "14px 28px", background: "#2d8cf0", color: "white", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Request an Appointment</Link>
            <a href={`tel:${PHONE.replace(/-/g, "")}`} style={{ padding: "14px 24px", color: "white", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>{PHONE}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
