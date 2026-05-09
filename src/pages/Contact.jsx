import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { LOCATIONS } from "../data/locations.js";

const SITE_URL = "https://www.drfanaee.com";
const PHONE = "631-265-2020";
const FAX = "631-482-8766";
const API_BASE = "https://web-production-ad8a2.up.railway.app";

const PAGE_DESC =
  "Schedule an appointment with Eric Fanaee, MD on Long Island. Three offices: West Islip, Smithtown, Bellmore. Call 631-265-2020 or request an appointment online.";

export default function Contact() {
  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#0f1c2e", background: "#f8fafb", minHeight: "100vh" }}>
      <Head>
        <title>Contact &amp; Appointments | Eric Fanaee, MD — Long Island Pain Management</title>
        <meta name="description" content={PAGE_DESC} />
        <link rel="canonical" href={`${SITE_URL}/contact`} />
        <meta property="og:title" content="Contact &amp; Appointments | Eric Fanaee, MD" />
        <meta property="og:description" content={PAGE_DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/contact`} />
      </Head>

      <div style={{ background: "#0a192f", padding: "100px 32px 60px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none", fontFamily: "inherit", marginBottom: 20 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            Home
          </Link>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#4da3ff", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>Contact</div>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 44, color: "white", lineHeight: 1.2, marginBottom: 16 }}>Schedule an Appointment</h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 700 }}>{PAGE_DESC}</p>
          <div style={{ display: "flex", gap: 14, marginTop: 28, flexWrap: "wrap" }}>
            <a href={`tel:${PHONE.replace(/-/g, "")}`} style={{ padding: "14px 28px", background: "#2d8cf0", color: "white", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call {PHONE}
            </a>
            <a href={`https://${SITE_URL}/#appointment`} style={{ padding: "14px 28px", color: "white", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Online Form (homepage)</a>
          </div>
        </div>
      </div>

      {/* General contact */}
      <section style={{ padding: "64px 32px", background: "white" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 30, color: "#0a192f", marginBottom: 24 }}>Get in Touch</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 8 }}>Phone</div>
              <a href={`tel:${PHONE.replace(/-/g, "")}`} style={{ fontSize: 18, fontWeight: 600, color: "#2d8cf0", textDecoration: "none" }}>{PHONE}</a>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 8 }}>Fax</div>
              <span style={{ fontSize: 18, fontWeight: 600, color: "#3a4a5c" }}>{FAX}</span>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 8 }}>Hours</div>
              <span style={{ fontSize: 15, color: "#3a4a5c" }}>Mon–Fri, 8 AM – 5 PM</span>
            </div>
          </div>
        </div>
      </section>

      {/* Office locations */}
      <section style={{ padding: "64px 32px", background: "#f8fafb" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 30, color: "#0a192f", marginBottom: 24 }}>Three Long Island Offices</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {LOCATIONS.map((l) => (
              <Link key={l.slug} to={`/locations/${l.slug}`} style={{ background: "white", borderRadius: 14, padding: "24px 22px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", border: "1px solid #eef2f6", textDecoration: "none", color: "inherit", display: "block", transition: "all 0.3s" }}>
                <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, color: "#0a192f", marginBottom: 10 }}>{l.name}</h3>
                <div style={{ fontSize: 14, color: "#5a6b7d", lineHeight: 1.7, marginBottom: 12 }}>{l.address}<br />{l.city}</div>
                <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 12 }}>{l.hours}</div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#2d8cf0" }}>Office details →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 32px", background: "#0a192f", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 28, color: "white", marginBottom: 12 }}>Need an Appointment Today?</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 24 }}>Call us — same-day evaluations are often available for new acute pain. Most major insurance accepted, including Medicare, workers' compensation, and no-fault.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`tel:${PHONE.replace(/-/g, "")}`} style={{ padding: "14px 28px", background: "#2d8cf0", color: "white", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Call {PHONE}</a>
            <Link to="/" style={{ padding: "14px 24px", color: "white", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Online Form</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
