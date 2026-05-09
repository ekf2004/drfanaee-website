import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";

const SITE_URL = "https://www.drfanaee.com";
const PHONE = "631-265-2020";

const PAGE_DESC =
  "Insurance accepted at Long Island Brain & Spine — most major plans including Medicare, workers' compensation, and no-fault. Eric Fanaee, MD, board-certified pain management.";

// Common plans most pain practices accept on Long Island.
// PRACTICE REVIEW NEEDED: confirm/edit this list to match what your billing actually accepts.
const ACCEPTED_PLANS = [
  "Aetna",
  "Anthem Blue Cross",
  "Cigna",
  "Empire BlueCross BlueShield",
  "Emblem Health (GHI / HIP)",
  "Healthfirst",
  "Humana",
  "Medicare",
  "Medicare Advantage",
  "Multiplan",
  "Oxford / United Healthcare",
  "1199 SEIU",
];

export default function Insurance() {
  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#0f1c2e", background: "#f8fafb", minHeight: "100vh" }}>
      <Head>
        <title>Insurance &amp; Billing | Eric Fanaee, MD — Long Island Pain Management</title>
        <meta name="description" content={PAGE_DESC} />
        <link rel="canonical" href={`${SITE_URL}/insurance`} />
        <meta property="og:title" content="Insurance &amp; Billing | Eric Fanaee, MD" />
        <meta property="og:description" content={PAGE_DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/insurance`} />
      </Head>

      <div style={{ background: "#0a192f", padding: "100px 32px 60px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none", fontFamily: "inherit", marginBottom: 20 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            Home
          </Link>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#4da3ff", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>Insurance &amp; Billing</div>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 44, color: "white", lineHeight: 1.2, marginBottom: 16 }}>We Accept Most Major Insurance</h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 700 }}>{PAGE_DESC}</p>
        </div>
      </div>

      <section style={{ padding: "64px 32px", background: "white" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 30, color: "#0a192f", marginBottom: 16 }}>Plans We Accept</h2>
          <p style={{ fontSize: 15, color: "#5a6b7d", lineHeight: 1.7, marginBottom: 28 }}>The following is a partial list of insurance plans accepted at our offices. Coverage and benefits vary by plan and policy. Please call our office at {PHONE} to verify your specific coverage before your visit.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
            {ACCEPTED_PLANS.map((plan) => (
              <div key={plan} style={{ background: "#f8fafb", borderRadius: 10, padding: "14px 18px", border: "1px solid #eef2f6", fontSize: 15, color: "#3a4a5c", display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                {plan}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 32px", background: "#f8fafb" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          <div>
            <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: "#0a192f", marginBottom: 12 }}>Workers' Compensation</h3>
            <p style={{ fontSize: 15, color: "#5a6b7d", lineHeight: 1.7 }}>We treat patients with work-related injuries under New York Workers' Compensation. Bring your case number, employer information, and claim adjuster contact when you schedule.</p>
          </div>
          <div>
            <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: "#0a192f", marginBottom: 12 }}>No-Fault (Motor Vehicle)</h3>
            <p style={{ fontSize: 15, color: "#5a6b7d", lineHeight: 1.7 }}>If you've been injured in a motor vehicle accident, we accept New York No-Fault insurance. We can help you understand your benefits and coordinate care with your attorney if you have one.</p>
          </div>
          <div>
            <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: "#0a192f", marginBottom: 12 }}>Medicare</h3>
            <p style={{ fontSize: 15, color: "#5a6b7d", lineHeight: 1.7 }}>We are a Medicare-participating provider and accept original Medicare as well as most Medicare Advantage plans. Bring your red, white, and blue Medicare card to your appointment.</p>
          </div>
          <div>
            <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: "#0a192f", marginBottom: 12 }}>Self-Pay &amp; Out-of-Network</h3>
            <p style={{ fontSize: 15, color: "#5a6b7d", lineHeight: 1.7 }}>If your insurance plan isn't listed or you prefer to pay directly, we offer self-pay options. Please call our office to discuss pricing for the specific service you need.</p>
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 32px", background: "#0a192f", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 28, color: "white", marginBottom: 12 }}>Have Insurance Questions?</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 24 }}>Our front office staff can verify your specific plan and benefits. Call before you schedule to confirm coverage.</p>
          <a href={`tel:${PHONE.replace(/-/g, "")}`} style={{ padding: "14px 32px", background: "#2d8cf0", color: "white", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>Call {PHONE}</a>
        </div>
      </section>
    </div>
  );
}
