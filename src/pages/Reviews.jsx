import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";

const SITE_URL = "https://www.drfanaee.com";
const PHONE = "631-265-2020";

const PAGE_DESC =
  "Patient reviews and testimonials for Eric Fanaee, MD on Long Island — 4.9 stars across 1,200+ reviews on Google and Healthgrades. Pain management you can trust.";

// Static fallback reviews (Google reviews are still fetched live on the homepage).
const REVIEWS = [
  { text: "Dr. Fanaee is the most caring physician. He changed the quality of my life.", author: "Google Review", rating: 5 },
  { text: "NYC quality doctor here on Long Island. Truly one of the most compassionate doctors I have ever met.", author: "Google Review", rating: 5 },
  { text: "I have been a patient for over three years. He always listens and offers options for treatment.", author: "Google Review", rating: 5 },
  { text: "Dr. Fanaee and his staff are wonderful. He takes his time to explain everything.", author: "Google Review", rating: 5 },
  { text: "From my first visit, he made me feel comfortable and confident. I returned to a pain-free life.", author: "Google Review", rating: 5 },
  { text: "The entire staff is professional and caring. Best pain management practice on Long Island.", author: "Google Review", rating: 5 },
];

const aggregateSchema = {
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Eric Fanaee, MD",
  "url": SITE_URL,
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "1200",
    "bestRating": "5",
    "worstRating": "1",
  },
};

function StarRow({ rating = 5 }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i <= rating ? "#f4b740" : "#e2e8f0"} stroke={i <= rating ? "#f4b740" : "#e2e8f0"}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#0f1c2e", background: "#f8fafb", minHeight: "100vh" }}>
      <Head>
        <title>Patient Reviews | Eric Fanaee, MD — Long Island Pain Management</title>
        <meta name="description" content={PAGE_DESC} />
        <link rel="canonical" href={`${SITE_URL}/reviews`} />
        <meta property="og:title" content="Patient Reviews | Eric Fanaee, MD" />
        <meta property="og:description" content={PAGE_DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/reviews`} />
        <script type="application/ld+json">{JSON.stringify(aggregateSchema)}</script>
      </Head>

      <div style={{ background: "#0a192f", padding: "100px 32px 60px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none", fontFamily: "inherit", marginBottom: 20 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            Home
          </Link>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#4da3ff", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>Patient Reviews</div>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 44, color: "white", lineHeight: 1.2, marginBottom: 16 }}>What Our Patients Say</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12 }}>
            <StarRow rating={5} />
            <span style={{ color: "white", fontSize: 16, fontWeight: 600 }}>4.9 out of 5</span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>· 1,200+ reviews on Google &amp; Healthgrades</span>
          </div>
        </div>
      </div>

      <section style={{ padding: "64px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
          {REVIEWS.map((r, i) => (
            <div key={i} style={{ background: "white", borderRadius: 14, padding: "28px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", border: "1px solid #eef2f6" }}>
              <StarRow rating={r.rating} />
              <p style={{ fontSize: 15, color: "#3a4a5c", lineHeight: 1.7, marginTop: 14, marginBottom: 14 }}>"{r.text}"</p>
              <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>— {r.author}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "60px 32px", background: "#0a192f", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 28, color: "white", marginBottom: 12 }}>Want to Leave a Review?</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 24 }}>If you've been treated by Dr. Fanaee or our team, we'd love to hear about your experience. Reviews help other patients find quality pain management care on Long Island.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://g.page/r/long-island-brain-and-spine/review" target="_blank" rel="noopener noreferrer" style={{ padding: "14px 28px", background: "#2d8cf0", color: "white", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Leave a Google Review</a>
            <Link to="/contact" style={{ padding: "14px 24px", color: "white", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
