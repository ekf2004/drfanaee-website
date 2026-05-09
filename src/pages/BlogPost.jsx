import { Link, useParams, useNavigate } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { BLOG_POSTS } from "../data/blog.js";

const SITE_URL = "https://www.drfanaee.com";

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", padding: "120px 32px 80px", textAlign: "center", color: "#0f1c2e" }}>
        <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 36, marginBottom: 12 }}>Article not found</h1>
        <p style={{ color: "#5a6b7d", marginBottom: 24 }}>We couldn't find that article.</p>
        <Link to="/blog" style={{ color: "#2d8cf0", fontWeight: 600, textDecoration: "none" }}>← Back to all articles</Link>
      </div>
    );
  }

  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const pageTitle = `${post.title} | Eric Fanaee, MD — Long Island Pain Management`;
  const description = post.excerpt;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": description,
    "datePublished": post.publishDate,
    "dateModified": post.publishDate,
    "author": {
      "@type": "Person",
      "name": post.author || "Eric Fanaee, MD",
      "url": SITE_URL,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Long Island Brain & Spine",
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/favicon.svg`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonical,
    },
    "url": canonical,
    "articleSection": post.category,
  };

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#0f1c2e" }}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="article:published_time" content={post.publishDate} />
        <meta property="article:author" content={post.author || "Eric Fanaee, MD"} />
        <meta property="article:section" content={post.category} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Head>

      {/* Hero */}
      <div style={{ background: "#0a192f", padding: "100px 32px 60px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Link to="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none", fontFamily: "inherit", marginBottom: 20 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            All Articles
          </Link>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#4da3ff", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>{post.category}</div>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 38, color: "white", lineHeight: 1.25, marginBottom: 16 }}>{post.title}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 16, color: "rgba(255,255,255,0.4)", fontSize: 13, flexWrap: "wrap" }}>
            <span>{post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "48px 32px 80px", background: "white" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {post.content.map((block, i) => {
            if (block.type === "h2") return <h2 key={i} style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: "#0a192f", marginTop: 36, marginBottom: 12 }}>{block.text}</h2>;
            return <p key={i} style={{ fontSize: 16, color: "#3a4a5c", lineHeight: 1.8, marginBottom: 16 }}>{block.text}</p>;
          })}
          <div style={{ marginTop: 48, padding: "32px", background: "#f8fafb", borderRadius: 16, textAlign: "center" }}>
            <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, color: "#0a192f", marginBottom: 8 }}>Have Questions About Your Pain?</h3>
            <p style={{ fontSize: 14, color: "#5a6b7d", marginBottom: 20 }}>Schedule a consultation with our team to discuss your treatment options.</p>
            <button onClick={() => navigate("/contact")} style={{ padding: "14px 28px", background: "#2d8cf0", color: "white", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Request an Appointment</button>
          </div>
        </div>
      </div>

      <div style={{ padding: "20px 32px", background: "#060d18", textAlign: "center" }}>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>&copy; 2026 Eric Fanaee, MD &middot; Long Island Brain &amp; Spine</span>
      </div>
    </div>
  );
}

export function getStaticPaths() {
  // Only pre-render posts whose publishDate is on or before today.
  // Future-dated posts get HTML on the next Vercel rebuild after their date.
  const today = new Date().toISOString().slice(0, 10);
  return BLOG_POSTS
    .filter((p) => !p.publishDate || p.publishDate <= today)
    .map((p) => `/blog/${p.slug}`);
}
