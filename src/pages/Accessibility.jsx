import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";

const SITE_URL = "https://www.drfanaee.com";
const PHONE = "631-265-2020";

const PAGE_DESC =
  "Accessibility statement for drfanaee.com — Long Island Brain & Spine's commitment to making our website and offices accessible to all patients.";

// ⚠️ ACCESSIBILITY REVIEW NEEDED ⚠️
// Placeholder accessibility statement. Update once an actual WCAG audit has
// been completed. Office accessibility details on each LocationDetail page
// should also be confirmed by office staff.

export default function Accessibility() {
  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#0f1c2e", background: "white", minHeight: "100vh" }}>
      <Head>
        <title>Accessibility Statement | Eric Fanaee, MD — Long Island Brain &amp; Spine</title>
        <meta name="description" content={PAGE_DESC} />
        <link rel="canonical" href={`${SITE_URL}/accessibility`} />
      </Head>

      <div style={{ background: "#0a192f", padding: "100px 32px 60px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none", fontFamily: "inherit", marginBottom: 20 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            Home
          </Link>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 38, color: "white", lineHeight: 1.2 }}>Accessibility Statement</h1>
        </div>
      </div>

      <section style={{ padding: "64px 32px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", fontSize: 16, color: "#3a4a5c", lineHeight: 1.8 }}>
          <p style={{ marginBottom: 16, padding: "16px 20px", background: "#fff8e1", border: "1px solid #f4d57b", borderRadius: 10, fontSize: 14, color: "#8a6d1f" }}>
            <strong>⚠️ Placeholder content — pending accessibility audit.</strong> Update with results of an actual WCAG 2.1 AA audit before launch.
          </p>

          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: "#0a192f", marginTop: 32, marginBottom: 12 }}>Our Commitment</h2>
          <p style={{ marginBottom: 16 }}>Long Island Brain &amp; Spine is committed to ensuring that drfanaee.com and our physical offices are accessible to people with disabilities. We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.</p>

          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: "#0a192f", marginTop: 32, marginBottom: 12 }}>Website Accessibility Features</h2>
          <p style={{ marginBottom: 16 }}>We have designed this Site with the following accessibility features in mind:</p>
          <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
            <li style={{ marginBottom: 6 }}>Semantic HTML structure for screen readers</li>
            <li style={{ marginBottom: 6 }}>Sufficient color contrast for text readability</li>
            <li style={{ marginBottom: 6 }}>Descriptive link text and image alt attributes</li>
            <li style={{ marginBottom: 6 }}>Keyboard-navigable interfaces</li>
            <li style={{ marginBottom: 6 }}>Responsive design for use on screens of all sizes</li>
          </ul>

          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: "#0a192f", marginTop: 32, marginBottom: 12 }}>Office Accessibility</h2>
          <p style={{ marginBottom: 16 }}>All three of our Long Island offices (West Islip, Smithtown, Bellmore) are wheelchair accessible. Please call ahead at {PHONE} if you have specific mobility, communication, or sensory needs so we can accommodate your visit.</p>

          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: "#0a192f", marginTop: 32, marginBottom: 12 }}>Reporting Accessibility Issues</h2>
          <p style={{ marginBottom: 16 }}>If you experience difficulty accessing any part of this website or our offices, please let us know so we can address it. Call our office at {PHONE} or visit any of our locations and ask to speak with our front office staff.</p>

          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: "#0a192f", marginTop: 32, marginBottom: 12 }}>Ongoing Improvement</h2>
          <p style={{ marginBottom: 16 }}>Accessibility is an ongoing effort. We periodically review the site and make improvements based on user feedback and updated standards.</p>
        </div>
      </section>
    </div>
  );
}
