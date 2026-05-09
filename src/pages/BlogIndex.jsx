import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { BLOG_POSTS } from "../data/blog.js";

const SITE_URL = "https://www.drfanaee.com";

const PAGE_DESC =
  "Articles from Long Island Brain & Spine on pain management, interventional procedures, and patient education by Dr. Eric Fanaee and team.";

export default function BlogIndex() {
  // Auto-publish: only show posts whose publishDate is on or before today.
  const today = new Date().toISOString().slice(0, 10);
  const published = BLOG_POSTS
    .filter((p) => !p.publishDate || p.publishDate <= today)
    .slice()
    .sort((a, b) => (b.publishDate || "").localeCompare(a.publishDate || ""));

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": published.map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": p.title,
      "url": `${SITE_URL}/blog/${p.slug}`,
    })),
  };

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#0f1c2e", background: "#f8fafb", minHeight: "100vh" }}>
      <Head>
        <title>Pain Management Articles | Eric Fanaee, MD — Long Island Brain &amp; Spine</title>
        <meta name="description" content={PAGE_DESC} />
        <link rel="canonical" href={`${SITE_URL}/blog`} />
        <meta property="og:title" content="Pain Management Articles | Eric Fanaee, MD" />
        <meta property="og:description" content={PAGE_DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/blog`} />
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
      </Head>

      {/* Hero */}
      <div style={{ background: "#0a192f", padding: "100px 32px 60px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none", fontFamily: "inherit", marginBottom: 20 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            Home
          </Link>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#4da3ff", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>Pain Management Articles</div>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 44, color: "white", lineHeight: 1.2, marginBottom: 16 }}>Articles & Patient Education</h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 700 }}>{PAGE_DESC}</p>
        </div>
      </div>

      {/* Posts grid */}
      <section style={{ padding: "64px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
          {published.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`} style={{ background: "white", borderRadius: 14, padding: "28px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", border: "1px solid #eef2f6", textDecoration: "none", color: "inherit", display: "block", transition: "all 0.3s" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#4da3ff", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 8 }}>{p.category}</div>
              <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, color: "#0a192f", marginBottom: 10, lineHeight: 1.3 }}>{p.title}</h2>
              <p style={{ fontSize: 14, color: "#5a6b7d", lineHeight: 1.6, marginBottom: 14 }}>{p.excerpt}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "#94a3b8" }}>
                <span>{p.date}</span>
                <span>•</span>
                <span>{p.readTime}</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#2d8cf0", display: "inline-block", marginTop: 14 }}>Read article →</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
