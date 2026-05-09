import { useState, useEffect } from "react";
import { PROCEDURES } from "../data/procedures.js";
import { CONDITIONS } from "../data/conditions.js";
import { LOCATIONS } from "../data/locations.js";
import { BLOG_POSTS } from "../data/blog.js";

// Headshot images (base64 encoded)
const IMG_ERIC = "/images/eric.jpg";
const IMG_KONG = "/images/kong.jpg";
const IMG_MARY = "/images/mary.jpg";
const IMG_TOM = "/images/tom.jpg";
const IMG_LISA = "/images/lisa.jpg";
const IMG_CONSULT = "/images/consult.jpg";
const IMG_PROCEDURE = "/images/procedure.jpg";


const PHONE = "631-265-2020";
const API_BASE = "https://web-production-ad8a2.up.railway.app";
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_PLACES_KEY;
const GOOGLE_PLACE_IDS = {
  "west-islip": "ChIJKSsKVgEt6IkRNsgH91-iCZo",
  "smithtown": "ChIJa_o-WEwt6IkRja-AP4Jb618"
};
const FAX = "631-482-8766";
const SITE_URL = "https://www.drfanaee.com";

const PROVIDERS = [
  { name: "Eric Fanaee, MD", role: "Medical Director", credentials: "Board Certified in Pain Medicine & Anesthesiology", initials: "EF", color: "#1e3a5f", bio: "Residency trained in Anesthesiology at the University of Chicago and fellowship trained in Pain Medicine at NYU Langone Medical Center, Dr. Fanaee has been serving Long Island since 2013 and is board certified in both Pain Medicine and Anesthesiology. He founded Long Island Brain & Spine with a mission to provide advanced interventional pain management that reduces pain, restores function, and improves quality of life. He offers sedation for all interventional procedures.", featured: true },
  { name: "Clarence Kong, MD", role: "Assoc. Director, Interventional Spine & Pain Management", credentials: "Board Certified", initials: "CK", img: IMG_KONG, color: "#1e3a5f", bio: "Dr. Kong specializes in interventional spine procedures and pain management, bringing expertise in advanced minimally invasive techniques for chronic spinal conditions." },
  { name: "Mary Milano Carter, MS, ANP-BC, AP-PMN, PMGT-BC, GERO-BC", role: "Board Certified Nurse Practitioner", credentials: "Pain Management & Geriatrics Certified", initials: "MC", img: IMG_MARY, color: "#2d6a8a", bio: "With 28 years of experience in chronic pain management, Mary holds board certifications in adult practice, pain management, and geriatrics. She develops individualized treatment plans for complex pain conditions." },
  { name: "Thomas Yarrobino, FNP, DPT", role: "Nurse Practitioner & Doctor of Physical Therapy", credentials: "Musculoskeletal Specialist", initials: "TY", img: IMG_TOM, color: "#1e3a5f", bio: "Tom brings a unique dual perspective as both a nurse practitioner and physical therapist, specializing in musculoskeletal care including ultrasound-guided joint injections, trigger point therapy, PRP therapy, and individualized rehabilitation." },
  { name: "Lisa Persico, PA-C, MPAS", role: "Physician Assistant", credentials: "Pain Management & Neurosurgery", initials: "LP", img: IMG_LISA, color: "#2d6a8a", bio: "Lisa is a dedicated patient advocate with a Master's in Physician Assistant Studies. She brings focused experience in chronic pain management and neurosurgery, developing personalized treatment plans that enhance quality of life." },
];


const TREATMENTS = [
  { name: "Epidural Steroid Injections", desc: "Targeted delivery of anti-inflammatory medication to reduce spinal nerve inflammation and relieve pain from herniated discs, spinal stenosis, and sciatica." },
  { name: "Radiofrequency Ablation (RFA)", desc: "Uses heat energy to disrupt pain nerve signal transmission, providing long-lasting relief for chronic neck, back, and joint pain lasting 6–18 months." },
  { name: "Spinal Cord Stimulation", desc: "Advanced neuromodulation using a small implanted device that sends electrical impulses to interrupt pain signals before they reach the brain." },
  { name: "Intracept® Procedure", desc: "FDA-cleared minimally invasive treatment targeting the basivertebral nerve for chronic vertebrogenic low back pain unresponsive to conservative care." },
  { name: "Kyphoplasty", desc: "Minimally invasive treatment that stabilizes vertebral compression fractures and restores vertebral height using bone cement." },
  { name: "Nerve Blocks", desc: "Ultrasound and fluoroscopy-guided precision injections to block pain signals from specific nerves. Includes stellate ganglion, intercostal, and peripheral nerve blocks." },
  { name: "PRP Therapy", desc: "Platelet-rich plasma injections using your body's own growth factors to promote natural tissue healing for joint, tendon, and ligament injuries." },
  { name: "Joint & Bursa Injections", desc: "Ultrasound-guided injections for shoulder, hip, knee, SI joint, and bursa pain using corticosteroids or hyaluronic acid." },
  { name: "Trigger Point Injections", desc: "Targeted treatment for painful muscle knots and myofascial trigger points commonly found in the neck, shoulders, and back." },
  { name: "Chronic Pain Management", desc: "Comprehensive multimodal approach combining interventional procedures, medication management, and rehabilitation for long-term pain control." },
];

const FAQS = [
  { q: "What is interventional pain management?", a: "Interventional pain management uses minimally invasive procedures — such as epidural steroid injections, nerve blocks, and radiofrequency ablation — to target the specific source of your pain rather than relying solely on medication. These procedures are performed using image guidance (fluoroscopy or ultrasound) for precision and safety." },
  { q: "Do you offer sedation for procedures?", a: "Yes. Dr. Fanaee offers sedation for all interventional pain procedures. As a board-certified anesthesiologist, he can safely provide sedation to ensure your comfort during any treatment." },
  { q: "Do I need a referral to see a pain management doctor?", a: "Most insurance plans do not require a referral to see a pain management specialist. However, some HMO plans may require one. Our office can verify your insurance coverage and referral requirements when you call to schedule." },
  { q: "What should I expect at my first visit?", a: "Your first visit includes a thorough evaluation of your pain history, physical examination, and review of any imaging (MRI, X-ray, CT scan). Dr. Fanaee or one of our providers will discuss all available treatment options and develop a personalized care plan. Please bring your insurance card, photo ID, and any relevant medical records or imaging." },
  { q: "How long do procedures take?", a: "Most interventional procedures take just 5–10 minutes. With check-in, preparation, and recovery, plan for approximately 1–2 hours total. You will need someone to drive you home if sedation is used." },
  { q: "What insurance plans do you accept?", a: "We accept most major insurance plans including Medicare, Aetna, Blue Cross Blue Shield, Cigna, United Healthcare, Oxford, and many others. Contact our office to verify your specific plan." },
  { q: "What areas of Long Island do you serve?", a: "We have three convenient office locations serving all of Long Island: West Islip (South Shore), Smithtown (North Shore/Suffolk County), and Bellmore (Nassau County). Procedures are performed at Good Samaritan Hospital in West Islip as well as our office-based surgical practice in Babylon, which offers a more convenient and personalized experience for patients who prefer an alternative to a hospital setting." },
  { q: "What is radiofrequency ablation and how long does it last?", a: "Radiofrequency ablation (RFA) uses controlled heat energy to disrupt the nerves that are transmitting pain signals. The procedure typically provides relief lasting 6 to 18 months. When pain returns, the procedure can be safely repeated." },
  { q: "Do you accept workers' compensation and no-fault insurance?", a: "Yes. We treat patients with workers' compensation and no-fault (motor vehicle accident) insurance at all three of our Long Island locations. Our team handles the authorization process and required documentation." },
  { q: "Why choose Dr. Fanaee and his team?", a: "Our patients consistently rate us among the top pain management practices on Long Island, with a 4.9-star average across 1,200+ reviews on Google and Healthgrades. Dr. Fanaee has been serving the Long Island community since 2013 — he and his family live here, and his focus is on providing the same quality of care to his neighbors that he would want for his own family. With fellowship training at NYU Langone, residency at the University of Chicago, and a team of five experienced providers across three convenient locations, we combine elite training with a genuine commitment to the community we serve." },
  { q: "Do you offer same-day or next-day appointments?", a: "We make every effort to see patients as quickly as possible. Same-day and next-day appointments are often available depending on the location and provider schedule. Call our office at 631-265-2020 or submit an online appointment request for the fastest response." },
];




const REVIEWS = [
  { text: "Dr. Fanaee is the most caring physician. He changed the quality of my life.", author: "Google Review", rating: 5 },
  { text: "NYC quality doctor here on Long Island. Truly one of the most compassionate doctors I have ever met.", author: "Google Review", rating: 5 },
  { text: "I have been a patient for over three years. He always listens and offers options for treatment.", author: "Google Review", rating: 5 },
  { text: "Dr. Fanaee and his staff are wonderful. He takes his time to explain everything.", author: "Google Review", rating: 5 },
  { text: "From my first visit, he made me feel comfortable and confident. I returned to a pain-free life.", author: "Google Review", rating: 5 },
  { text: "The entire staff is professional and caring. Best pain management practice on Long Island.", author: "Google Review", rating: 5 },
];


// ============================================================
// SCHEMA.ORG STRUCTURED DATA (injected as JSON-LD)
// ============================================================
const schemaData = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Eric Fanaee, MD – Pain Management",
  "alternateName": "Long Island Brain & Spine",
  "description": "Board-certified interventional pain management physician serving Long Island, NY. University of Chicago residency trained, NYU Langone fellowship trained. Specializing in epidural steroid injections, radiofrequency ablation, spinal cord stimulation, Intracept procedure, kyphoplasty, nerve blocks, PRP therapy, and joint injections. Offices in West Islip, Smithtown, and Bellmore. Accepting Medicare, workers compensation, no-fault, and most major insurance. 4.9 stars with 1,200+ reviews on Google and Healthgrades. Sedation offered for all interventional procedures. Specializing in epidural injections, radiofrequency ablation, spinal cord stimulation, and minimally invasive spine procedures. Three locations: West Islip, Smithtown, and Bellmore.",
  "url": SITE_URL,
  "telephone": "+1-631-265-2020",
  "priceRange": "$$",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "1200", "bestRating": "5" },
  "medicalSpecialty": ["Pain Medicine", "Anesthesiology", "Interventional Pain Management"],
  "availableService": TREATMENTS.map(t => ({ "@type": "MedicalProcedure", "name": t.name, "description": t.desc })),
  "employee": PROVIDERS.map(p => ({ "@type": "Physician", "name": p.name, "description": p.role, "medicalSpecialty": "Pain Medicine" })),
  "location": LOCATIONS.map(l => ({
    "@type": "MedicalClinic",
    "name": `Dr. Fanaee – ${l.name} Office`,
    "address": { "@type": "PostalAddress", "streetAddress": l.address, "addressLocality": l.name, "addressRegion": "NY", "postalCode": l.city.split(" ").pop() },
    "geo": { "@type": "GeoCoordinates", "latitude": l.lat, "longitude": l.lng },
    "telephone": "+1-631-265-2020",
    "openingHours": "Mo-Fr 08:00-17:00"
  })),
  "mainEntityOfPage": {
    "@type": "FAQPage",
    "mainEntity": FAQS.map(f => ({
      "@type": "Question", "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  }
};

// ============================================================
// COMPONENTS
// ============================================================

const MedicalIcon = ({ type, size = 28 }) => {
  const s = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "#2d8cf0", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" };
  const icons = {
    back: <svg {...s}><path d="M12 2v4M12 18v4"/><ellipse cx="12" cy="8" rx="4" ry="2"/><ellipse cx="12" cy="12" rx="3.5" ry="1.8"/><ellipse cx="12" cy="16" rx="3" ry="1.5"/></svg>,
    neck: <svg {...s}><circle cx="12" cy="5" r="3"/><path d="M9 8v4c0 1 1 2 3 2s3-1 3-2V8"/><path d="M8 16h8"/><path d="M7 20h10"/></svg>,
    sciatica: <svg {...s}><path d="M12 2v6"/><path d="M12 8c0 4-6 6-6 12"/><path d="M12 8c0 4 6 6 6 12"/><circle cx="12" cy="8" r="1.5" fill="#2d8cf0"/></svg>,
    joint: <svg {...s}><circle cx="12" cy="8" r="4"/><circle cx="12" cy="18" r="3.5"/><path d="M10 11.5v3M14 11.5v3"/></svg>,
    nerve: <svg {...s}><path d="M12 2v5"/><path d="M12 7l-4 4-3 2"/><path d="M12 7l4 4 3 2"/><path d="M12 7v5l-2 4"/><path d="M12 12l2 4"/><circle cx="12" cy="5" r="2" fill="#2d8cf0" stroke="none" opacity="0.3"/></svg>,
    disc: <svg {...s}><ellipse cx="12" cy="8" rx="6" ry="2.5"/><ellipse cx="12" cy="12" rx="6" ry="2.5"/><ellipse cx="12" cy="16" rx="6" ry="2.5"/><circle cx="16" cy="12" r="1.5" fill="#dc2626" stroke="#dc2626" strokeWidth="1"/></svg>,
    arthritis: <svg {...s}><path d="M9 22V12L6 8l1-4"/><path d="M15 22V12l3-4-1-4"/><circle cx="8" cy="12" r="1" fill="#2d8cf0"/><circle cx="16" cy="12" r="1" fill="#2d8cf0"/><circle cx="12" cy="10" r="1" fill="#2d8cf0"/></svg>,
    headache: <svg {...s}><circle cx="12" cy="10" r="7"/><path d="M8 3l1 2M16 3l-1 2M5 8l2 1M19 8l-2 1M5 14l2-0.5M19 14l-2-0.5"/></svg>,
    sports: <svg {...s}><circle cx="12" cy="5" r="3"/><path d="M12 8v5"/><path d="M12 13l-4 6"/><path d="M12 13l4 6"/><path d="M8 10l8 2"/></svg>,
    surgical: <svg {...s}><path d="M8 4h8v4a4 4 0 01-8 0V4z"/><path d="M12 12v6"/><path d="M8 15h8"/><circle cx="12" cy="20" r="2"/></svg>,
    crps: <svg {...s}><path d="M12 2c-3 4-6 6-6 10a6 6 0 0012 0c0-4-3-6-6-10z"/><path d="M12 8v4M10 10h4" stroke="#dc2626" strokeWidth="2"/></svg>,
    fracture: <svg {...s}><rect x="8" y="3" width="8" height="6" rx="1"/><path d="M8 12h8" strokeDasharray="2 2"/><rect x="8" y="15" width="8" height="6" rx="1"/><path d="M10 9l-1 3h2l-1 3" stroke="#dc2626" strokeWidth="1.5"/></svg>,
  };
  return icons[type] || <svg {...s}><circle cx="12" cy="12" r="8"/></svg>;
};

const StarRow = ({ rating = 5, size = 16, color = "#f4b740" }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {[1,2,3,4,5].map(i => (
      <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= rating ? color : "#334155"}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ))}
  </div>
);

const SectionLabel = ({ text, light = false }) => (
  <div style={{ fontSize: 12, fontWeight: 600, color: light ? "#4da3ff" : "#2d8cf0", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>{text}</div>
);

const SectionTitle = ({ children, light = false }) => (
  <h2 className="section-title" style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 42, fontWeight: 400, color: light ? "white" : "#0a192f", lineHeight: 1.2 }}>{children}</h2>
);

// ============================================================
// MAIN SITE
// ============================================================

export const ProcedurePage = ({ procedure, onBack, onSchedule }) => {
  const [openFaq, setOpenFaq] = useState(null);
  const p = procedure;

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#0f1c2e" }}>
      {/* Breadcrumb nav */}
      <div style={{ background: "#0a192f", padding: "100px 32px 60px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 13, cursor: "pointer", fontFamily: "inherit", marginBottom: 20 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            Back to Services
          </button>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#4da3ff", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>{p.subtitle}</div>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 44, color: "white", lineHeight: 1.2, marginBottom: 16 }}>{p.title}</h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 700 }}>{p.hero}</p>
          <div style={{ display: "flex", gap: 14, marginTop: 28 }}>
            <button onClick={onSchedule} style={{ padding: "14px 28px", background: "#2d8cf0", color: "white", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Request an Appointment</button>
            <a href={`tel:${PHONE.replace(/-/g,"")}`} style={{ padding: "14px 28px", color: "white", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
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
          <p style={{ fontSize: 16, color: "#5a6b7d", lineHeight: 1.8 }}>{p.overview}</p>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "64px 32px", background: "#f8fafb" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 30, color: "#0a192f", marginBottom: 16 }}>How It Works</h2>
          <p style={{ fontSize: 16, color: "#5a6b7d", lineHeight: 1.8 }}>{p.howItWorks}</p>
        </div>
      </section>

      {/* Conditions + Benefits side by side */}
      <section style={{ padding: "64px 32px", background: "white" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          <div>
            <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, color: "#0a192f", marginBottom: 20 }}>Conditions Treated</h2>
            {p.conditions.map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid #eef2f6" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#2d8cf0", flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: "#3a4a5c" }}>{c}</span>
              </div>
            ))}
          </div>
          <div>
            <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, color: "#0a192f", marginBottom: 20 }}>Benefits</h2>
            {p.benefits.map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid #eef2f6" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span style={{ fontSize: 14, color: "#3a4a5c" }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types if available */}
      {p.types.length > 0 && (
        <section style={{ padding: "64px 32px", background: "#f8fafb" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, color: "#0a192f", marginBottom: 20 }}>Types of {p.title}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
              {p.types.map((t, i) => (
                <div key={i} style={{ padding: "14px 18px", background: "white", borderRadius: 10, border: "1px solid #eef2f6", fontSize: 14, color: "#3a4a5c", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#2d8cf0", flexShrink: 0 }} />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recovery */}
      <section style={{ padding: "64px 32px", background: "white" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, color: "#0a192f", marginBottom: 16 }}>Recovery & What to Expect</h2>
          <p style={{ fontSize: 16, color: "#5a6b7d", lineHeight: 1.8 }}>{p.recovery}</p>
        </div>
      </section>

      {/* FAQ */}
      {p.faqs.length > 0 && (
        <section style={{ padding: "64px 32px", background: "#f8fafb" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, color: "#0a192f", marginBottom: 24 }}>Frequently Asked Questions</h2>
            {p.faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: "1px solid #e2e8f0" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", padding: "18px 0", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left" }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#0a192f", paddingRight: 16 }}>{faq.q}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" style={{ transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.3s", flexShrink: 0 }}><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <div style={{ maxHeight: openFaq === i ? 300 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
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
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 30, color: "white", marginBottom: 12 }}>Ready to Explore {p.title}?</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 28 }}>Schedule a consultation with Dr. Fanaee to determine if this treatment is right for you.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
            <button onClick={onSchedule} style={{ padding: "14px 32px", background: "#2d8cf0", color: "white", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Request an Appointment</button>
            <a href={`tel:${PHONE.replace(/-/g,"")}`} style={{ padding: "14px 24px", color: "white", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>{PHONE}</a>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div style={{ padding: "20px 32px", background: "#060d18", display: "flex", justifyContent: "center", alignItems: "center", gap: 16 }}>
        <StarRow size={14} />
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>4.9 out of 5 · 1,200+ Reviews on Google & Healthgrades · Board Certified Pain Medicine & Anesthesiology · Since 2013</span>
      </div>
    </div>
  );
};


export default function DrFanaeeSite() {
  const [showApptModal, setShowApptModal] = useState(false);
  const [activeProcedure, setActiveProcedure] = useState(null);
  const [activeBlog, setActiveBlog] = useState(null);
  const [showBlogIndex, setShowBlogIndex] = useState(false);
  
  // Auto-publish: only show articles where publishDate <= today
  const publishedPosts = BLOG_POSTS.filter(post => {
    const publishDate = new Date(post.publishDate + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return publishDate <= today;
  }).sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
  const [apptForm, setApptForm] = useState({ name: "", phone: "", email: "", location: "", reason: "", new_patient: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleApptSubmit = async () => {
    if (!apptForm.name || !apptForm.phone) return;
    try {
      const res = await fetch(`${API_BASE}/api/appointment-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: apptForm.name,
          phone: apptForm.phone,
          email: apptForm.email || null,
          location: apptForm.location || null,
          new_patient: apptForm.new_patient || null,
          reason: apptForm.reason || null,
        }),
      });
      const data = await res.json();
      setFormSubmitted(true);
    } catch (err) {
      console.error("Appointment submission error:", err);
      setFormSubmitted(true);
    }
  };
  const [activeReview, setActiveReview] = useState(0);
  const [liveReviews, setLiveReviews] = useState(null);
  const [liveRating, setLiveRating] = useState(4.9);
  const [liveReviewCount, setLiveReviewCount] = useState(0);
  const [heroImage, setHeroImage] = useState(0);
  const heroImages = [
    { src: IMG_ERIC, alt: "Dr. Eric Fanaee - Pain Management Specialist", fit: "cover", position: "center center" },
    { src: IMG_CONSULT, alt: "Dr. Fanaee consulting with patient using spine model", fit: "contain", position: "center center" },
    { src: IMG_PROCEDURE, alt: "Dr. Fanaee in the procedure room with fluoroscopy equipment", fit: "cover", position: "center 30%" },
  ];
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const t = setInterval(() => setActiveReview(p => (p + 1) % (liveReviews || REVIEWS).length), 5000);
    const heroTimer = setInterval(() => setHeroImage(p => (p + 1) % 3), 5000);
    
    // Fetch live Google reviews
    const fetchReviews = async () => {
      try {
        const placeIds = Object.values(GOOGLE_PLACE_IDS);
        const allReviews = [];
        for (const placeId of placeIds) {
          const res = await fetch(
            `https://places.googleapis.com/v1/places/${placeId}?fields=reviews,rating,userRatingCount&key=${GOOGLE_API_KEY}`,
            { headers: { "X-Goog-FieldMask": "reviews,rating,userRatingCount" } }
          );
          if (res.ok) {
            const data = await res.json();
            if (data.reviews) {
              allReviews.push(...data.reviews
                .filter(r => r.rating >= 4)
                .map(r => ({
                  text: r.text?.text || "",
                  author: r.authorAttribution?.displayName || "Google Review",
                  rating: r.rating,
                  time: r.relativePublishTimeDescription || ""
                }))
              );
            }
            if (data.rating) setLiveRating(data.rating);
            if (data.userRatingCount) setLiveReviewCount(prev => prev + data.userRatingCount);
          }
        }
        if (allReviews.length > 0) {
          setLiveReviews(allReviews.sort(() => Math.random() - 0.5).slice(0, 8));
        }
      } catch (e) {
        console.log("Using fallback reviews");
      }
    };
    fetchReviews();
    const s = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", s);
    return () => { clearInterval(t); clearInterval(heroTimer); window.removeEventListener("scroll", s); };
  }, []);

  const inp = (key, label, type, placeholder, required = false) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#0a192f", marginBottom: 6 }}>{label}{required ? " *" : ""}</label>
      <input type={type} placeholder={placeholder} value={apptForm[key]}
        onChange={e => setApptForm(p => ({ ...p, [key]: e.target.value }))}
        style={{ width: "100%", padding: "12px 16px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 14, fontFamily: "inherit", outline: "none" }}
        onFocus={e => e.target.style.borderColor = "#2d8cf0"} onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
    </div>
  );

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", color: "#0f1c2e", background: "#fff" }}>
      {/* Blog post view */}
      {activeBlog && (
        <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
          <div style={{ background: "#0a192f", padding: "100px 32px 60px" }}>
            <div style={{ maxWidth: 760, margin: "0 auto" }}>
              <button onClick={() => { setActiveBlog(null); if (!showBlogIndex) window.scrollTo(0, 0); }} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 13, cursor: "pointer", fontFamily: "inherit", marginBottom: 20 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                Back
              </button>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#4da3ff", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>{activeBlog.category}</div>
              <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 38, color: "white", lineHeight: 1.25, marginBottom: 16 }}>{activeBlog.title}</h1>
              <div style={{ display: "flex", alignItems: "center", gap: 16, color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
                <span>{activeBlog.author}</span>
                <span>•</span>
                <span>{activeBlog.date}</span>
                <span>•</span>
                <span>{activeBlog.readTime}</span>
              </div>
            </div>
          </div>
          <div style={{ padding: "48px 32px 80px", background: "white" }}>
            <div style={{ maxWidth: 760, margin: "0 auto" }}>
              {activeBlog.content.map((block, i) => {
                if (block.type === "h2") return <h2 key={i} style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: "#0a192f", marginTop: 36, marginBottom: 12 }}>{block.text}</h2>;
                return <p key={i} style={{ fontSize: 16, color: "#3a4a5c", lineHeight: 1.8, marginBottom: 16 }}>{block.text}</p>;
              })}
              <div style={{ marginTop: 48, padding: "32px", background: "#f8fafb", borderRadius: 16, textAlign: "center" }}>
                <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, color: "#0a192f", marginBottom: 8 }}>Have Questions About Your Pain?</h3>
                <p style={{ fontSize: 14, color: "#5a6b7d", marginBottom: 20 }}>Schedule a consultation with our team to discuss your treatment options.</p>
                <button onClick={() => { setActiveBlog(null); setShowBlogIndex(false); setShowApptModal(true); }} style={{ padding: "14px 28px", background: "#2d8cf0", color: "white", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Request an Appointment</button>
              </div>
            </div>
          </div>
          <div style={{ padding: "20px 32px", background: "#060d18", textAlign: "center" }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>&copy; 2026 Eric Fanaee, MD &middot; Long Island Brain & Spine</span>
          </div>
        </div>
      )}

      {/* Blog index view */}
      {showBlogIndex && !activeBlog && (
        <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
          <div style={{ background: "#0a192f", padding: "100px 32px 60px" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <button onClick={() => { setShowBlogIndex(false); window.scrollTo(0, 0); }} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 13, cursor: "pointer", fontFamily: "inherit", marginBottom: 20 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                Back to Home
              </button>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#4da3ff", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>Pain Management Insights</div>
              <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 44, color: "white" }}>Blog</h1>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", marginTop: 12 }}>Expert advice on pain management, treatment options, and patient education from the team at Long Island Brain & Spine.</p>
            </div>
          </div>
          <div style={{ padding: "48px 32px 80px", background: "#f8fafb" }}>
            <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
              {publishedPosts.map((post, i) => (
                <div key={i} onClick={() => { setActiveBlog(post); window.scrollTo(0, 0); }} style={{ background: "white", borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", border: "1px solid #eef2f6", cursor: "pointer", transition: "all 0.3s" }}
                  onMouseOver={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)"; }}
                  onMouseOut={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"; }}>
                  <div style={{ height: 8, background: "linear-gradient(90deg, #2d8cf0, #1e5fa0)" }} />
                  <div style={{ padding: "24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", background: "#eef4fb", color: "#2d6a8a", borderRadius: 4 }}>{post.category}</span>
                      <span style={{ fontSize: 11, color: "#94a3b8" }}>{post.readTime}</span>
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0a192f", marginBottom: 8, lineHeight: 1.3 }}>{post.title}</h3>
                    <p style={{ fontSize: 13, color: "#7a8a9d", lineHeight: 1.6, marginBottom: 14 }}>{post.excerpt}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: "#94a3b8" }}>{post.date}</span>
                      <span style={{ fontSize: 12, color: "#2d8cf0", fontWeight: 600 }}>Read more →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: "20px 32px", background: "#060d18", textAlign: "center" }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>&copy; 2026 Eric Fanaee, MD &middot; Long Island Brain & Spine</span>
          </div>
        </div>
      )}

      {activeProcedure && (
        <ProcedurePage 
          procedure={activeProcedure} 
          onBack={() => { setActiveProcedure(null); window.scrollTo(0, 0); }}
          onSchedule={() => { setActiveProcedure(null); setShowApptModal(true); }}
        />
      )}
      {!activeProcedure && <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap');
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #2d8cf0; color: white; }
        
        /* Mobile Responsive */
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 0px !important; padding-top: 100px !important; padding-bottom: 0px !important; padding-left: 20px !important; padding-right: 20px !important; }
          .hero-text h1 { font-size: 34px !important; line-height: 1.15 !important; }
          .hero-cta { flex-direction: column !important; }
          .hero-cta a, .hero-cta button { width: 100% !important; justify-content: center !important; }
          .hero-stats { flex-direction: column !important; gap: 12px !important; }
          .hero-stats > div { border-left: none !important; padding-left: 0 !important; }
          .hero-image-container { width: calc(100% + 40px) !important; height: 250px !important; border-radius: 0 !important; margin-top: 16px !important; margin-left: -20px !important; margin-right: -20px !important; }
          .nav-links { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
          .conditions-grid { grid-template-columns: 1fr 1fr !important; }
          .treatments-grid { grid-template-columns: 1fr !important; }
          .providers-other-grid { grid-template-columns: 1fr 1fr !important; }
          .provider-featured { grid-template-columns: 1fr !important; }
          .provider-featured-photo { min-height: 200px !important; }
          .locations-grid { grid-template-columns: 1fr !important; }
          .reviews-grid { grid-template-columns: 1fr !important; }
          .insurance-grid { grid-template-columns: 1fr 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .blog-preview-grid { grid-template-columns: 1fr !important; }
          #instagram-feed { grid-template-columns: repeat(2, 1fr) !important; }
          .blog-preview-header { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; }
          .faq-container { padding: 60px 16px !important; }
          .section-title { font-size: 30px !important; }
          .section-padding { padding: 60px 16px !important; }
          .cta-buttons { flex-direction: column !important; }
          .cta-buttons a, .cta-buttons button { width: 100% !important; justify-content: center !important; }
          .appt-form-grid { grid-template-columns: 1fr !important; }
          .hero-floating-badge { display: none !important; }
          .hero-dot-indicators { bottom: 12px !important; }
          .scroll-indicator { display: none !important; }
          .hero-img-0 { object-fit: cover !important; object-position: center center !important; }
          .hero-img-1 { object-fit: contain !important; object-position: center center !important; background: #0f2340; }
          .hero-img-2 { object-fit: cover !important; object-position: center 30% !important; }
          .credential-tags { flex-wrap: wrap !important; }
          .trust-bar { flex-direction: column !important; gap: 12px !important; text-align: center !important; }
          .since-2013 { font-size: 18px !important; }
          .hero-trust-badges { flex-wrap: wrap !important; gap: 16px !important; }
          .hero-trust-badges > div { padding-left: 0 !important; border-left: none !important; }
        }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .6; } }
      `}</style>

      {/* Schema.org JSON-LD */}
      <div style={{ display: "none" }} dangerouslySetInnerHTML={{ __html: `<script type="application/ld+json">${JSON.stringify(schemaData)}</script>` }} />

      {/* ===== NAV ===== */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(10,25,47,0.97)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none", transition: "all 0.4s", padding: scrolled ? "10px 0" : "18px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #2d8cf0, #1e5fa0)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><ellipse cx="12" cy="3.5" rx="3.5" ry="2"/><ellipse cx="12" cy="8.5" rx="3" ry="1.8"/><ellipse cx="12" cy="13" rx="2.8" ry="1.7"/><ellipse cx="12" cy="17" rx="2.5" ry="1.5"/><ellipse cx="12" cy="20.5" rx="2" ry="1.3"/></svg>
            </div>
            <div>
              <div style={{ color: "white", fontWeight: 700, fontSize: 15, fontFamily: "'Instrument Serif', Georgia, serif" }}>Eric Fanaee, MD</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: 500, letterSpacing: "1.2px", textTransform: "uppercase" }}>Pain Medicine</div>
            </div>
          </a>
          <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {["Services", "Providers", "Locations", "Insurance", "FAQ", "Blog"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={(e) => { e.preventDefault(); if (l === "Blog") { setShowBlogIndex(true); setActiveProcedure(null); setActiveBlog(null); window.scrollTo(0, 0); } else { setShowBlogIndex(false); setActiveBlog(null); setActiveProcedure(null); document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); } }} style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: 13, fontWeight: 500, transition: "color 0.2s", cursor: "pointer" }}
                onMouseOver={e => e.target.style.color = "white"} onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.65)"}>{l}</a>
            ))}
            <a href="https://www.instagram.com/ericfanaeemd/" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.65)", display: "flex", alignItems: "center", transition: "color 0.2s" }}
              onMouseOver={e => e.currentTarget.style.color = "#E1306C"} onMouseOut={e => e.currentTarget.style.color = "rgba(255,255,255,0.65)"}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href={`tel:${PHONE.replace(/-/g,"")}`} style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              {PHONE}
            </a>
            <button onClick={() => setShowApptModal(true)} style={{ padding: "10px 22px", background: "linear-gradient(135deg, #2d8cf0, #1e5fa0)", color: "white", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 2px 12px rgba(45,140,240,0.3)" }}>
              Request Appointment
            </button>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", background: "linear-gradient(165deg, #0a192f 0%, #0f2340 40%, #122a4f 70%, #1a365d 100%)" }}>
        <div style={{ position: "absolute", top: "10%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(45,140,240,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "8%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(45,140,240,0.05) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "140px 32px 80px", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 60, alignItems: "center", className: "hero-grid" }}>
          <div style={{ animation: "fadeInUp 0.8s ease" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", background: "rgba(45,140,240,0.1)", borderRadius: 20, marginBottom: 24, border: "1px solid rgba(45,140,240,0.18)" }}>
              <StarRow size={12} />
              <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: 600, letterSpacing: "0.5px" }}>4.9 STARS · 1,200+ REVIEWS ON GOOGLE & HEALTHGRADES</span>
            </div>
            <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 54, fontWeight: 400, color: "white", lineHeight: 1.1, marginBottom: 12 }}>
              At the Forefront of<br/><span style={{ color: "#4da3ff" }}>Pain Medicine</span><br/><span className="since-2013" style={{ fontSize: 24, color: "rgba(255,255,255,0.4)" }}>Since 2013</span>
            </h1>
            <p style={{ fontSize: 19, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: 32, maxWidth: 540, fontWeight: 500 }}>
              Board-certified interventional pain management serving Long Island. Advanced, non-surgical treatments to reduce pain, restore function, and get you back to the life you love.
            </p>
            <div className="hero-cta" style={{ display: "flex", gap: 14, marginBottom: 40 }}>
              <button onClick={() => setShowApptModal(true)} style={{ padding: "16px 32px", background: "linear-gradient(135deg, #2d8cf0, #1e6dd4)", color: "white", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 20px rgba(45,140,240,0.35)" }}>
                Request an Appointment
              </button>
              <a href={`tel:${PHONE.replace(/-/g,"")}`} style={{ padding: "16px 28px", background: "rgba(255,255,255,0.05)", color: "white", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                {PHONE}
              </a>
            </div>
            <div className="hero-stats hero-trust-badges" style={{ display: "flex", gap: 28 }}>
              {[{ l: "Board Certified", v: "Pain Medicine & Anesthesiology" }, { l: "Training", v: "U of Chicago · NYU Langone" }, { l: "Serving Long Island", v: "Since 2013" }].map((s, i) => (
                <div key={i} style={{ borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none", paddingLeft: i > 0 ? 28 : 0 }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 500 }}>{s.l}</div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", fontWeight: 600, marginTop: 3 }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero right - headshot placeholder */}
          <div style={{ display: "flex", justifyContent: "center", animation: "fadeInUp 1s ease 0.2s both" }}>
            <div className="hero-image-container" style={{ width: 380, height: 440, borderRadius: 24, background: "#0f2340", position: "relative", overflow: "hidden" }}>
              {/* Carousel images */}
              {heroImages.map((img, i) => (
                <img key={i} className={`hero-img-${i}`} src={img.src} alt={img.alt} style={{
                  position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
                  objectFit: img.fit || "cover", objectPosition: img.position || "center center",
                  opacity: heroImage === i ? 1 : 0,
                  transition: "opacity 1s ease-in-out",
                }} />
              ))}
              {/* Dot indicators */}
              <div className="hero-dot-indicators" style={{ position: "absolute", bottom: 76, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 2 }}>
                {heroImages.map((_, i) => (
                  <button key={i} onClick={() => setHeroImage(i)} style={{
                    width: heroImage === i ? 20 : 8, height: 8, borderRadius: 4, border: "none", cursor: "pointer",
                    background: heroImage === i ? "white" : "rgba(255,255,255,0.4)", transition: "all 0.3s"
                  }} />
                ))}
              </div>
              {/* Floating review count */}
              <div className="hero-floating-badge" style={{ position: "absolute", bottom: 20, left: 20, right: 20, background: "rgba(10,25,47,0.85)", backdropFilter: "blur(12px)", borderRadius: 14, padding: "14px 18px", border: "1px solid rgba(45,140,240,0.15)", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 2 }}>
                <div>
                  <StarRow size={14} />
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>1,200+ verified reviews</div>
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#4da3ff" }}>4.9</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section style={{ padding: "24px 32px", background: "white", borderBottom: "1px solid #eef2f6" }}>
        <div className="trust-bar" style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", gap: 2 }}>
              {[1,2,3,4,5].map(i => <svg key={i} width={18} height={18} viewBox="0 0 24 24" fill="#f4b740"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
            </div>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#0a192f" }}>4.9 / 5</span>
            <span style={{ fontSize: 14, color: "#5a6b7d", fontWeight: 500 }}>across 1,200+ reviews</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#4285f4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/></svg>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#5a6b7d" }}>Google</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#00a98f"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6" stroke="white" strokeWidth="2" fill="none"/></svg>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#5a6b7d" }}>Healthgrades</span>
            </div>
          </div>
          <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>Board Certified · Since 2013 · 3 Long Island Locations</div>
        </div>
      </section>

      {/* ===== SEDATION BANNER ===== */}
      <section style={{ padding: "20px 32px", background: "linear-gradient(90deg, #2d8cf0, #1e6dd4)", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, color: "white" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Sedation Offered for All Interventional Pain Procedures</span>
        </div>
      </section>

      {/* ===== CONDITIONS ===== */}
      <section id="services" className="section-padding" style={{ padding: "100px 32px", background: "#f8fafb" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <SectionLabel text="What We Treat" />
            <SectionTitle>Conditions We Treat</SectionTitle>
            <p style={{ fontSize: 16, color: "#4a5a6d", marginTop: 12, maxWidth: 600, margin: "12px auto 0", fontWeight: 500 }}>
              Comprehensive pain management for acute and chronic conditions affecting the spine, joints, and nervous system.
            </p>
          </div>
          <div className="conditions-grid" className="providers-other-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {CONDITIONS.map((c, i) => (
              <div key={i} style={{ background: "white", borderRadius: 14, padding: "24px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", border: "1px solid #eef2f6", transition: "all 0.3s", cursor: "default" }}
                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)"; e.currentTarget.style.borderColor = "rgba(45,140,240,0.2)"; }}
                onMouseOut={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"; e.currentTarget.style.borderColor = "#eef2f6"; }}>
                <div style={{ marginBottom: 10 }}><MedicalIcon type={c.icon} size={32} /></div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#0a192f", marginBottom: 6 }}>{c.name}</div>
                <div style={{ fontSize: 15, color: "#5a6b7d", lineHeight: 1.7, fontWeight: 500 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TREATMENTS ===== */}
      <section className="section-padding" style={{ padding: "100px 32px", background: "#0a192f" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <SectionLabel text="How We Help" light />
            <SectionTitle light>Interventional Services</SectionTitle>
          </div>
          <div className="treatments-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {TREATMENTS.map((t, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 14, padding: "24px 28px", border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.3s", cursor: "pointer" }}
                onMouseOver={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(45,140,240,0.2)"; }}
                onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
                onClick={() => { const proc = PROCEDURES.find(p => p.title === t.name); if (proc) { setActiveProcedure(proc); window.scrollTo(0, 0); } }}>
                <div style={{ display: "flex", gap: 14 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#2d8cf0", marginTop: 7, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "white", marginBottom: 8 }}>{t.name}</div>
                    <div style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.8, fontWeight: 500 }}>{t.desc}</div>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                  <span style={{ fontSize: 13, color: "#4da3ff", fontWeight: 700 }}>Learn more →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROVIDERS ===== */}
      <section id="providers" className="section-padding" style={{ padding: "100px 32px", background: "#f8fafb" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <SectionLabel text="Our Team" />
            <SectionTitle>Our Experienced Team</SectionTitle>
          </div>
          {/* Featured provider - Eric */}
          <div className="provider-featured" style={{ background: "white", borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", border: "1px solid #eef2f6", marginBottom: 24, display: "grid", gridTemplateColumns: "280px 1fr", gap: 0 }}>
            <div className="provider-featured-photo" style={{ background: "linear-gradient(135deg, #0a192f, #1a365d)", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 300 }}>
              <img src={IMG_ERIC} alt="Dr. Eric Fanaee" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }} />
            </div>
            <div style={{ padding: "36px 40px" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#2d8cf0", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>Medical Director</div>
              <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 30, color: "#0a192f", marginBottom: 4 }}>Eric Fanaee, MD</h3>
              <div style={{ fontSize: 16, color: "#4a5a6d", marginBottom: 16, fontWeight: 500 }}>Board Certified in Pain Medicine & Anesthesiology · University of Chicago · NYU Langone</div>
              <p style={{ fontSize: 16, color: "#4a5a6d", lineHeight: 1.8, marginBottom: 20, fontWeight: 500 }}>{PROVIDERS[0].bio}</p>
              <div className="credential-tags" style={{ display: "flex", gap: 8 }}>
                {["Pain Medicine", "Anesthesiology", "Interventional Spine", "NYU Fellowship"].map(t => (
                  <span key={t} style={{ padding: "5px 12px", background: "#eef4fb", color: "#2d6a8a", fontSize: 11, fontWeight: 600, borderRadius: 6 }}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Other providers */}
          <div className="conditions-grid" className="providers-other-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {PROVIDERS.slice(1).map((p, i) => (
              <div key={i} style={{ background: "white", borderRadius: 18, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", border: "1px solid #eef2f6", transition: "all 0.3s" }}
                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.08)"; }}
                onMouseOut={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"; }}>
                <div style={{ height: 220, background: `linear-gradient(135deg, ${p.color}, ${p.color}cc)`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
                </div>
                <div style={{ padding: "20px" }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#0a192f", marginBottom: 4 }}>{p.name}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#2d8cf0", marginBottom: 12, letterSpacing: "0.2px" }}>{p.role}</div>
                  <div style={{ fontSize: 15, color: "#4a5a6d", lineHeight: 1.8, fontWeight: 500 }}>{p.bio}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section id="reviews" className="section-padding" style={{ padding: "100px 32px", background: "white" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <SectionLabel text="Patient Reviews" />
          <SectionTitle>What Our Patients Say</SectionTitle>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, margin: "12px 0 48px" }}>
            <StarRow size={20} />
            <span style={{ fontSize: 14, color: "#5a6b7d", fontWeight: 500 }}>4.9 out of 5 · 1,200+ reviews on Google & Healthgrades</span>
          </div>
          <div style={{ position: "relative", minHeight: 160 }}>
            {(liveReviews || REVIEWS).map((r, i) => (
              <div key={i} style={{ position: i === activeReview ? "relative" : "absolute", top: 0, left: 0, right: 0, opacity: i === activeReview ? 1 : 0, transition: "opacity 0.5s", padding: "32px 40px", background: "#f8fafb", borderRadius: 20, border: "1px solid #eef2f6" }}>
                <StarRow size={18} />
                <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, color: "#0a192f", lineHeight: 1.6, marginTop: 16, fontStyle: "italic" }}>"{r.text}"</p>
                <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 16, fontWeight: 500 }}>— {r.author}{r.time ? ` · ${r.time}` : ""}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
            {(liveReviews || REVIEWS).map((_, i) => (
              <button key={i} onClick={() => setActiveReview(i)} style={{ width: i === activeReview ? 24 : 8, height: 8, borderRadius: 4, border: "none", cursor: "pointer", background: i === activeReview ? "#2d8cf0" : "#d1d9e3", transition: "all 0.3s" }} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== LOCATIONS ===== */}
      <section id="locations" className="section-padding" style={{ padding: "100px 32px", background: "#f8fafb" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <SectionLabel text="Visit Us" />
            <SectionTitle>Conveniently Located Across Long Island</SectionTitle>
          </div>
          <div className="locations-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {LOCATIONS.map((loc, i) => (
              <div key={i} style={{ background: "white", borderRadius: 18, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", border: "1px solid #eef2f6", transition: "all 0.3s" }}
                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.08)"; }}
                onMouseOut={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"; }}>
                <div style={{ height: 180, position: "relative", overflow: "hidden" }}>
                  <iframe
                    title={`Map of ${loc.name} office`}
                    src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=${encodeURIComponent(loc.address + ", " + loc.city)}&zoom=15`}
                    style={{ width: "100%", height: "100%", border: "none" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                  <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(loc.address + ", " + loc.city)}`} target="_blank" rel="noopener noreferrer" style={{ position: "absolute", bottom: 8, right: 8, background: "rgba(255,255,255,0.95)", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 600, color: "#2d8cf0", textDecoration: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", display: "flex", alignItems: "center", gap: 4 }}>
                    📍 Get Directions
                  </a>
                </div>
                <div style={{ padding: "24px" }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0a192f", marginBottom: 12, fontFamily: "'Instrument Serif', Georgia, serif" }}>{loc.name}</h3>
                  <div style={{ fontSize: 16, color: "#4a5a6d", lineHeight: 1.7, marginBottom: 16, fontWeight: 500 }}>{loc.address}<br/>{loc.city}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2d8cf0" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <a href={`tel:${loc.phone.replace(/-/g,"")}`} style={{ fontSize: 14, color: "#2d8cf0", fontWeight: 600, textDecoration: "none" }}>{loc.phone}</a>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span style={{ fontSize: 13, color: "#94a3b8" }}>{loc.hours}</span>
                  </div>
                  {loc.nearby && <div style={{ fontSize: 13, color: "#7a8a9d", lineHeight: 1.6, fontWeight: 500, borderTop: "1px solid #eef2f6", paddingTop: 12 }}>{loc.nearby}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INSURANCE ===== */}
      <section id="insurance" style={{ padding: "80px 32px", background: "#0a192f" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel text="Insurance" light />
            <SectionTitle light>Insurance We Accept</SectionTitle>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", marginTop: 12, maxWidth: 600, margin: "12px auto 0", fontWeight: 500 }}>
              We accept most major insurance plans. Contact our office to verify your specific coverage.
            </p>
          </div>
          <div className="insurance-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 32 }}>
            {["Medicare", "Aetna", "Blue Cross Blue Shield", "Cigna", "United Healthcare", "Oxford", "Humana", "Empire", "Fidelis", "Healthfirst", "Magnacare", "Multiplan", "Workers' Compensation", "No-Fault / Motor Vehicle", "GHI / Emblem Health", "GHI-NYC", "NYSHIP", "UHC Community Plan", "Wellcare", "1199"].map((ins, i) => (
              <div key={i} style={{ padding: "14px 16px", background: "rgba(255,255,255,0.04)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", fontSize: 15, color: "rgba(255,255,255,0.9)", fontWeight: 600, textAlign: "center" }}>
                {ins}
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>Don't see your plan? Call us at <a href="tel:6312652020" style={{ color: "#4da3ff", textDecoration: "none" }}>{PHONE}</a> — we may still accept your insurance.</p>
          </div>
        </div>
      </section>

      {/* ===== FAQ (SEO + AI) ===== */}
      <section id="faq" className="section-padding" style={{ padding: "100px 32px", background: "white" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <SectionLabel text="Questions" />
            <SectionTitle>Frequently Asked Questions</SectionTitle>
          </div>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ borderBottom: "1px solid #eef2f6", overflow: "hidden" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", padding: "20px 0", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left" }}>
                <span style={{ fontSize: 19, fontWeight: 700, color: "#0a192f", paddingRight: 16 }}>{faq.q}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" style={{ transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.3s", flexShrink: 0 }}><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div style={{ maxHeight: openFaq === i ? 300 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
                <p style={{ fontSize: 16, color: "#4a5a6d", lineHeight: 1.8, paddingBottom: 20, fontWeight: 500 }}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== INSTAGRAM FEED ===== */}
      <section className="section-padding" style={{ padding: "80px 32px", background: "#f8fafb" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <SectionLabel text="Follow Us" />
            <SectionTitle>@ericfanaeemd</SectionTitle>
            <p style={{ fontSize: 16, color: "#4a5a6d", marginTop: 12, fontWeight: 500 }}>Follow us on Instagram for practice updates, patient education, and behind-the-scenes content.</p>
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
            <a href="https://www.instagram.com/ericfanaeemd/" target="_blank" rel="noopener noreferrer" 
              style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", background: "linear-gradient(135deg, #833AB4, #E1306C, #F77737)", color: "white", borderRadius: 12, fontSize: 15, fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 16px rgba(225, 48, 108, 0.3)", transition: "all 0.3s" }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(225, 48, 108, 0.4)"; }}
              onMouseOut={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 16px rgba(225, 48, 108, 0.3)"; }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              Follow @ericfanaeemd on Instagram
            </a>
          </div>
          {/* Instagram Profile Embed */}
          <div style={{ maxWidth: 540, margin: "0 auto", background: "white", borderRadius: 16, overflow: "hidden", border: "1px solid #eef2f6", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <iframe
              src="https://www.instagram.com/ericfanaeemd/embed"
              style={{ width: "100%", minHeight: 600, border: "none", overflow: "hidden" }}
              scrolling="no"
              allowTransparency={true}
              loading="lazy"
              title="@ericfanaeemd Instagram feed"
            />
          </div>
        </div>
      </section>

      {/* ===== BLOG PREVIEW ===== */}
      <section style={{ padding: "80px 32px", background: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="blog-preview-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
            <div>
              <SectionLabel text="Insights" />
              <SectionTitle>From Our Blog</SectionTitle>
            </div>
            <button onClick={() => { setShowBlogIndex(true); window.scrollTo(0, 0); }} style={{ fontSize: 14, color: "#2d8cf0", fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>View all articles →</button>
          </div>
          <div className="blog-preview-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {publishedPosts.slice(0, 3).map((post, i) => (
              <div key={i} onClick={() => { setActiveBlog(post); window.scrollTo(0, 0); }} style={{ background: "#f8fafb", borderRadius: 16, overflow: "hidden", cursor: "pointer", transition: "all 0.3s", border: "1px solid #eef2f6" }}
                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)"; }}
                onMouseOut={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ height: 6, background: "linear-gradient(90deg, #2d8cf0, #1e5fa0)" }} />
                <div style={{ padding: "22px" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", background: "#eef4fb", color: "#2d6a8a", borderRadius: 4 }}>{post.category}</span>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0a192f", marginTop: 12, marginBottom: 8, lineHeight: 1.3 }}>{post.title}</h3>
                  <p style={{ fontSize: 15, color: "#5a6b7d", lineHeight: 1.7, fontWeight: 500 }}>{post.excerpt.substring(0, 100)}...</p>
                  <div style={{ marginTop: 14, fontSize: 12, color: "#2d8cf0", fontWeight: 600 }}>Read more →</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ padding: "80px 32px", background: "linear-gradient(135deg, #0a192f, #1a365d)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 36, color: "white", marginBottom: 14 }}>Ready to Start Feeling Better?</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", marginBottom: 32 }}>Take the first step toward pain relief. Request an appointment or call us today.</p>
          <div className="cta-buttons" style={{ display: "flex", gap: 14, justifyContent: "center" }}>
            <button onClick={() => setShowApptModal(true)} style={{ padding: "16px 36px", background: "#2d8cf0", color: "white", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 20px rgba(45,140,240,0.35)" }}>Request an Appointment</button>
            <a href={`tel:${PHONE.replace(/-/g,"")}`} style={{ padding: "16px 28px", color: "white", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12, fontSize: 16, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ padding: "48px 32px 24px", background: "#060d18" }}>
        <div className="footer-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 20, color: "white", marginBottom: 8 }}>Eric Fanaee, MD</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", lineHeight: 1.6, maxWidth: 280 }}>Board-certified Pain Medicine and Anesthesiology. At the forefront of interventional pain management on Long Island.</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>Quick Links</div>
            {["Services", "Providers", "Locations", "Insurance", "FAQ", "Blog"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={(e) => { e.preventDefault(); document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); }} style={{ display: "block", color: "rgba(255,255,255,0.45)", fontSize: 13, textDecoration: "none", marginBottom: 10, cursor: "pointer" }}>{l}</a>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>Locations</div>
            {LOCATIONS.map(l => <div key={l.name} style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, marginBottom: 10 }}>{l.name}, NY</div>)}
          </div>
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>Contact</div>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, marginBottom: 10 }}>Phone: {PHONE}</div>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, marginBottom: 10 }}>Fax: {FAX}</div>
            <a href="https://www.instagram.com/ericfanaeemd/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.45)", fontSize: 13, textDecoration: "none", marginTop: 4 }}
              onMouseOver={e => e.currentTarget.style.color = "#E1306C"} onMouseOut={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              @ericfanaeemd
            </a>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 20, textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>&copy; 2026 Eric Fanaee, MD · Long Island Brain & Spine · All rights reserved</div>
        </div>
      </footer>

      </>}
      {/* ===== APPOINTMENT MODAL ===== */}
      {showApptModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(10,25,47,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}
          onClick={() => { setShowApptModal(false); setFormSubmitted(false); }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "white", borderRadius: 24, width: "100%", maxWidth: 520, maxHeight: "90vh", overflow: "auto", boxShadow: "0 24px 60px rgba(0,0,0,0.25)" }}>
            {!formSubmitted ? (
              <div style={{ padding: "36px 32px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
                  <div>
                    <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, color: "#0a192f", marginBottom: 4 }}>Request an Appointment</h3>
                    <p style={{ fontSize: 13, color: "#94a3b8" }}>Our team will contact you to confirm.</p>
                  </div>
                  <button onClick={() => setShowApptModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 20 }}>✕</button>
                </div>
                {inp("name", "Full Name", "text", "John Smith", true)}
                {inp("phone", "Phone Number", "tel", "(631) 555-1234", true)}
                {inp("email", "Email", "email", "john@email.com")}
                <div className="appt-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#0a192f", marginBottom: 6 }}>Preferred Location</label>
                    <select value={apptForm.location} onChange={e => setApptForm(p => ({ ...p, location: e.target.value }))} style={{ width: "100%", padding: "12px 16px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 14, fontFamily: "inherit", background: "white" }}>
                      <option value="">Select...</option>{LOCATIONS.map(l => <option key={l.name} value={l.name}>{l.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#0a192f", marginBottom: 6 }}>New or Existing?</label>
                    <select value={apptForm.new_patient} onChange={e => setApptForm(p => ({ ...p, new_patient: e.target.value }))} style={{ width: "100%", padding: "12px 16px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 14, fontFamily: "inherit", background: "white" }}>
                      <option value="">Select...</option><option value="new">New Patient</option><option value="existing">Existing Patient</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#0a192f", marginBottom: 6 }}>Reason for Visit</label>
                  <textarea placeholder="Brief description of your pain or condition..." value={apptForm.reason} onChange={e => setApptForm(p => ({ ...p, reason: e.target.value }))}
                    style={{ width: "100%", minHeight: 80, padding: "12px 16px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 14, fontFamily: "inherit", resize: "vertical" }} />
                </div>
                <button onClick={handleApptSubmit} style={{ width: "100%", padding: "16px", background: (!apptForm.name || !apptForm.phone) ? "#e2e8f0" : "linear-gradient(135deg, #2d8cf0, #1e6dd4)", color: (!apptForm.name || !apptForm.phone) ? "#94a3b8" : "white", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: (!apptForm.name || !apptForm.phone) ? "default" : "pointer", fontFamily: "inherit" }}>
                  Submit Request
                </button>
                <p style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", marginTop: 12, lineHeight: 1.6 }}>This is a request only. Our office will contact you to confirm your appointment. By submitting this form, you consent to receive text messages and emails from Dr. Eric Fanaee / Long Island Brain & Spine regarding your appointment. Message and data rates may apply. Reply STOP to opt out.</p>
              </div>
            ) : (
              <div style={{ padding: "48px 32px", textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(45,140,240,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2d8cf0" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, color: "#0a192f", marginBottom: 8 }}>Request Received</h3>
                <p style={{ fontSize: 15, color: "#5a6b7d", lineHeight: 1.6, marginBottom: 20 }}>Thank you, {apptForm.name.split(" ")[0]}. Our team will call you at {apptForm.phone} to confirm your appointment.</p>
                {apptForm.new_patient === "new" && (
                  <div style={{ padding: "14px 18px", background: "#eff6ff", borderRadius: 10, marginBottom: 20, textAlign: "left" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#2563eb", marginBottom: 4 }}>📱 Check your phone!</div>
                    <div style={{ fontSize: 13, color: "#5a6b7d", lineHeight: 1.6 }}>
                      We just sent you a link to complete your new patient intake form. Filling it out ahead of time will speed up your first visit.
                    </div>
                  </div>
                )}
                <button onClick={() => { setShowApptModal(false); setFormSubmitted(false); setApptForm({ name: "", phone: "", email: "", location: "", reason: "", new_patient: "" }); }}
                  style={{ padding: "14px 28px", background: "#0a192f", color: "white", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Done</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
