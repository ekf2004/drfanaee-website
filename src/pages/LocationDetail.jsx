import { Link, useParams, useNavigate } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { LOCATIONS } from "../data/locations.js";
import { PROCEDURES } from "../data/procedures.js";

const SITE_URL = "https://www.drfanaee.com";
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_PLACES_KEY;

const DAY_LABELS = { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" };
const SCHEMA_DAYS = { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" };

function buildOpeningHoursSpec(hoursDetailed) {
  return Object.entries(hoursDetailed)
    .filter(([, v]) => v && v.toLowerCase() !== "closed")
    .map(([day, value]) => {
      // value like "8:00 AM – 5:00 PM"
      const m = value.match(/(\d{1,2}):(\d{2})\s*(AM|PM)\s*[–-]\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i);
      if (!m) return null;
      const to24 = (h, ampm) => {
        let n = parseInt(h, 10) % 12;
        if (ampm.toUpperCase() === "PM") n += 12;
        return n.toString().padStart(2, "0");
      };
      return {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": SCHEMA_DAYS[day],
        "opens": `${to24(m[1], m[3])}:${m[2]}`,
        "closes": `${to24(m[4], m[6])}:${m[5]}`,
      };
    })
    .filter(Boolean);
}

export default function LocationDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = LOCATIONS.find((l) => l.slug === slug);

  if (!location) {
    return (
      <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", padding: "120px 32px 80px", textAlign: "center", color: "#0f1c2e" }}>
        <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 36, marginBottom: 12 }}>Office not found</h1>
        <p style={{ color: "#5a6b7d", marginBottom: 24 }}>We couldn't find an office at that URL.</p>
        <Link to="/" style={{ color: "#2d8cf0", fontWeight: 600, textDecoration: "none" }}>← Back home</Link>
      </div>
    );
  }

  const l = location;
  const canonical = `${SITE_URL}/locations/${l.slug}`;
  const pageTitle = `${l.name} Office | Eric Fanaee, MD — Long Island Pain Management`;

  const offeredTreatments = (l.procedures || [])
    .map((s) => PROCEDURES.find((p) => p.slug === s))
    .filter(Boolean);

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": l.fullName || `Eric Fanaee, MD — ${l.name}`,
    "alternateName": "Long Island Brain & Spine",
    "url": canonical,
    "telephone": l.phone,
    "faxNumber": l.fax,
    "image": `${SITE_URL}/images/eric.jpg`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": l.streetAddress,
      "addressLocality": l.addressLocality,
      "addressRegion": l.addressRegion,
      "postalCode": l.postalCode,
      "addressCountry": "US",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": l.lat,
      "longitude": l.lng,
    },
    "openingHoursSpecification": buildOpeningHoursSpec(l.hoursDetailed),
    "areaServed": l.nearby,
    "medicalSpecialty": "Pain Medicine",
    "physician": {
      "@type": "Physician",
      "name": "Eric Fanaee, MD",
      "url": SITE_URL,
      "medicalSpecialty": "Pain Medicine",
    },
    "availableService": offeredTreatments.map((p) => ({
      "@type": "MedicalProcedure",
      "name": p.title,
      "url": `${SITE_URL}/treatments/${p.slug}`,
    })),
  };

  const fullAddress = `${l.streetAddress}, ${l.addressLocality}, ${l.addressRegion} ${l.postalCode}`;

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#0f1c2e" }}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={l.metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={l.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Head>

      {/* Breadcrumb hero */}
      <div style={{ background: "#0a192f", padding: "100px 32px 60px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none", fontFamily: "inherit", marginBottom: 20 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            Home
          </Link>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#4da3ff", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>Office Location</div>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 44, color: "white", lineHeight: 1.2, marginBottom: 16 }}>{l.fullName || `${l.name} Office`}</h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 700 }}>{l.hero}</p>
          <div style={{ display: "flex", gap: 14, marginTop: 28 }}>
            <button onClick={() => navigate("/contact")} style={{ padding: "14px 28px", background: "#2d8cf0", color: "white", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Request an Appointment</button>
            <a href={`tel:${l.phone.replace(/-/g, "")}`} style={{ padding: "14px 28px", color: "white", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call {l.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Address + Hours + Map */}
      <section style={{ padding: "64px 32px", background: "white" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          <div>
            <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, color: "#0a192f", marginBottom: 20 }}>Address & Contact</h2>
            <div style={{ fontSize: 16, color: "#3a4a5c", lineHeight: 1.8, marginBottom: 18 }}>
              {l.streetAddress}<br />
              {l.addressLocality}, {l.addressRegion} {l.postalCode}
            </div>
            <div style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 600, marginRight: 8 }}>PHONE</span>
              <a href={`tel:${l.phone.replace(/-/g, "")}`} style={{ fontSize: 15, color: "#2d8cf0", fontWeight: 600, textDecoration: "none" }}>{l.phone}</a>
            </div>
            {l.fax && (
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 600, marginRight: 8 }}>FAX</span>
                <span style={{ fontSize: 15, color: "#3a4a5c", fontWeight: 500 }}>{l.fax}</span>
              </div>
            )}

            <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, color: "#0a192f", marginBottom: 14, marginTop: 32 }}>Hours</h3>
            <div style={{ background: "#f8fafb", borderRadius: 10, padding: "16px 20px", border: "1px solid #eef2f6" }}>
              {Object.entries(l.hoursDetailed).map(([day, value]) => (
                <div key={day} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 14, color: "#3a4a5c" }}>
                  <span style={{ fontWeight: 600 }}>{DAY_LABELS[day]}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>

            <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 20, fontSize: 14, fontWeight: 600, color: "#2d8cf0", textDecoration: "none" }}>
              📍 Get Directions
            </a>
          </div>

          <div>
            <iframe
              title={`Map of ${l.name} office`}
              src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=${encodeURIComponent(fullAddress)}&zoom=15`}
              style={{ width: "100%", height: 360, border: "none", borderRadius: 14 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Overview */}
      <section style={{ padding: "64px 32px", background: "#f8fafb" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 30, color: "#0a192f", marginBottom: 16 }}>About This Office</h2>
          <p style={{ fontSize: 16, color: "#5a6b7d", lineHeight: 1.8 }}>{l.overview}</p>
        </div>
      </section>

      {/* Practical info */}
      <section style={{ padding: "64px 32px", background: "white" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          <div>
            <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, color: "#0a192f", marginBottom: 10 }}>Parking</h3>
            <p style={{ fontSize: 14, color: "#5a6b7d", lineHeight: 1.7 }}>{l.parking}</p>
          </div>
          <div>
            <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, color: "#0a192f", marginBottom: 10 }}>Public Transit</h3>
            <p style={{ fontSize: 14, color: "#5a6b7d", lineHeight: 1.7 }}>{l.transit}</p>
          </div>
          <div>
            <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, color: "#0a192f", marginBottom: 10 }}>Accessibility</h3>
            <p style={{ fontSize: 14, color: "#5a6b7d", lineHeight: 1.7 }}>{l.accessibility}</p>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section style={{ padding: "64px 32px", background: "#f8fafb" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, color: "#0a192f", marginBottom: 16 }}>What to Expect at Your First Visit</h2>
          <p style={{ fontSize: 16, color: "#5a6b7d", lineHeight: 1.8 }}>{l.whatToExpect}</p>
        </div>
      </section>

      {/* Procedures offered */}
      {offeredTreatments.length > 0 && (
        <section style={{ padding: "64px 32px", background: "white" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, color: "#0a192f", marginBottom: 8 }}>Procedures Offered at This Office</h2>
            <p style={{ fontSize: 15, color: "#5a6b7d", lineHeight: 1.7, marginBottom: 24 }}>Dr. Fanaee performs the following procedures at this location. Some advanced procedures may be performed at Good Samaritan Hospital in West Islip.</p>
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

      {/* CTA */}
      <section style={{ padding: "64px 32px", background: "#0a192f", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 30, color: "white", marginBottom: 12 }}>Schedule a Visit at Our {l.name} Office</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 28 }}>Call us, or request an appointment online and we'll be in touch.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("/contact")} style={{ padding: "14px 32px", background: "#2d8cf0", color: "white", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Request an Appointment</button>
            <a href={`tel:${l.phone.replace(/-/g, "")}`} style={{ padding: "14px 24px", color: "white", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>{l.phone}</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export function getStaticPaths() {
  return LOCATIONS.map((l) => `/locations/${l.slug}`);
}
