import { useParams, useNavigate } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { PROCEDURES } from "../data/procedures.js";
import { ProcedurePage } from "./Home.jsx";

const SITE_URL = "https://www.drfanaee.com";

export default function TreatmentDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const procedure = PROCEDURES.find((p) => p.slug === slug);

  if (!procedure) {
    return (
      <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", padding: "120px 32px 80px", textAlign: "center", color: "#0f1c2e" }}>
        <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 36, marginBottom: 12 }}>Treatment not found</h1>
        <p style={{ color: "#5a6b7d", marginBottom: 24 }}>We couldn't find a treatment matching that URL.</p>
        <a href="/treatments" style={{ color: "#2d8cf0", fontWeight: 600, textDecoration: "none" }}>← Back to all treatments</a>
      </div>
    );
  }

  const canonical = `${SITE_URL}/treatments/${procedure.slug}`;
  const pageTitle = `${procedure.title} | Eric Fanaee, MD — Long Island Pain Management`;

  const procedureSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": procedure.title,
    "alternateName": procedure.subtitle,
    "description": procedure.metaDescription,
    "howPerformed": procedure.howItWorks,
    "followup": procedure.recovery,
    "url": canonical,
    "performer": {
      "@type": "Physician",
      "name": "Eric Fanaee, MD",
      "url": SITE_URL,
      "medicalSpecialty": "Pain Medicine",
    },
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={procedure.metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={procedure.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">{JSON.stringify(procedureSchema)}</script>
      </Head>
      <ProcedurePage
        procedure={procedure}
        onBack={() => navigate("/treatments")}
        onSchedule={() => navigate("/contact")}
      />
    </>
  );
}

// SSG: pre-render one HTML file per procedure slug at build time.
export function getStaticPaths() {
  return PROCEDURES.map((p) => `/treatments/${p.slug}`);
}
