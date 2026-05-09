// Build-time sitemap generator.
// Walks the route list and emits dist/sitemap.xml.
// Runs after `vite-react-ssg build`. Reads from src/data/* and the route
// list so additions are automatic — no manual sitemap edits.

import { writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
const dataUrl = (rel) => pathToFileURL(resolve(repoRoot, rel)).href;

const SITE = "https://www.drfanaee.com";
const today = new Date().toISOString().slice(0, 10);

// Static routes that always exist.
const STATIC = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.8", changefreq: "monthly" },
  { path: "/team", priority: "0.7", changefreq: "monthly" },
  { path: "/treatments", priority: "0.9", changefreq: "monthly" },
  { path: "/conditions", priority: "0.9", changefreq: "monthly" },
  { path: "/insurance", priority: "0.6", changefreq: "monthly" },
  { path: "/contact", priority: "0.8", changefreq: "monthly" },
  { path: "/blog", priority: "0.7", changefreq: "weekly" },
  { path: "/reviews", priority: "0.6", changefreq: "monthly" },
  { path: "/privacy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms", priority: "0.3", changefreq: "yearly" },
  { path: "/accessibility", priority: "0.3", changefreq: "yearly" },
];

const { PROCEDURES } = await import(dataUrl("src/data/procedures.js"));
const { CONDITIONS } = await import(dataUrl("src/data/conditions.js"));
const { LOCATIONS } = await import(dataUrl("src/data/locations.js"));
const { BLOG_POSTS } = await import(dataUrl("src/data/blog.js"));

const urls = [];

for (const r of STATIC) {
  urls.push({ loc: SITE + r.path, lastmod: today, changefreq: r.changefreq, priority: r.priority });
}
for (const p of PROCEDURES) {
  urls.push({ loc: `${SITE}/treatments/${p.slug}`, lastmod: today, changefreq: "monthly", priority: "0.8" });
}
for (const c of CONDITIONS) {
  urls.push({ loc: `${SITE}/conditions/${c.slug}`, lastmod: today, changefreq: "monthly", priority: "0.8" });
}
for (const l of LOCATIONS) {
  urls.push({ loc: `${SITE}/locations/${l.slug}`, lastmod: today, changefreq: "monthly", priority: "0.9" });
}
for (const post of BLOG_POSTS) {
  if (post.publishDate && post.publishDate > today) continue; // only published
  urls.push({ loc: `${SITE}/blog/${post.slug}`, lastmod: post.publishDate || today, changefreq: "yearly", priority: "0.6" });
}

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `  <url>\n` +
        `    <loc>${u.loc}</loc>\n` +
        `    <lastmod>${u.lastmod}</lastmod>\n` +
        `    <changefreq>${u.changefreq}</changefreq>\n` +
        `    <priority>${u.priority}</priority>\n` +
        `  </url>`,
    )
    .join("\n") +
  `\n</urlset>\n`;

const outPath = resolve(repoRoot, "dist/sitemap.xml");
writeFileSync(outPath, xml, "utf8");
console.log(`[sitemap] wrote ${urls.length} URLs to ${outPath}`);
