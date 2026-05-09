# drfanaee.com Website Restructure — Plan & Context

This document is a complete handoff for an AI assistant (Claude Code, future Claude sessions, etc.) or a human developer to execute the SEO-focused restructure of this site. Read it fully before making any changes.

## Background

This is the new website for Eric Fanaee, MD — a board-certified pain management physician with three offices on Long Island (West Islip, Smithtown, Bellmore). It will replace the current Tebra-hosted site at `drfanaee.com` in **August 2026**.

The current code is a single-file Vite + React SPA (`src/App.jsx`, ~1,870 lines) deployed to Vercel. The site looks great visually but has critical SEO problems that must be fixed before it replaces the existing Tebra site.

## SEO Problems with the Current Build

1. **Client-side rendering only.** When Google or any other crawler fetches the homepage, they get an empty HTML shell with no content — only meta tags. The actual page content is loaded by JavaScript at runtime. Google can JS-render but it's slower and less reliable; AI crawlers (ChatGPT, Perplexity, Claude search, etc.) are much worse at it.
2. **Single-page architecture.** All "pages" (procedures, conditions, locations, providers, blog, FAQ) are sections of the homepage or state-based view swaps inside one URL. Procedure detail pages render via `setActiveProcedure(...)` rather than as separate URLs. Result: Google sees one indexable page where the old Tebra site has ~45–50 indexed URLs each ranking for different keywords.
3. **No 301 redirect map.** The old Tebra site has dozens of indexed URLs (`/services/intracept`, `/location/ny/west-islip`, individual blog posts, etc.). When the new site goes live on `drfanaee.com`, every one of those old URLs will 404 unless we set up redirects. This will catastrophically tank rankings.
4. **No `sitemap.xml` or `robots.txt`.**
5. **Schema markup is global.** It's defined once at the top of `App.jsx` instead of per-page. Google wants `MedicalProcedure` schema on procedure pages, `LocalBusiness` on location pages, `Physician` on provider pages, etc.

## Goals of the Restructure

1. Each procedure (10), condition (10), location (3), and blog post (~15) becomes its own URL.
2. Every route pre-renders to static HTML at build time so crawlers see real content immediately. (Vite SPA → static site generation.)
3. Per-route `<title>`, meta description, Open Graph, canonical URL, and schema markup.
4. Full 301 redirect map from every old Tebra URL to the closest equivalent on the new site.
5. Auto-generated `sitemap.xml` listing all routes.
6. `robots.txt` allowing crawl and pointing to sitemap.
7. **Preserve every old URL** via 301 redirect — no 404s on launch.

## The Existing Tebra URL Inventory (must be redirected)

These URLs are confirmed indexed on the old Tebra site at `https://www.drfanaee.com`:

**Top-level:**
- `/` → new `/`
- `/about` → new `/about`
- `/services` → new `/treatments`
- `/blog` → new `/blog`
- `/testimonials` → new `/reviews` (or `/#reviews`)
- `/telehealth` → new homepage section or dedicated page
- `/schedule` → new `/contact` or homepage appointment form
- `/contactus` → new `/contact`
- `/contents/contacts` → new `/contact`
- `/contents/providers1` → new `/team`
- `/contents/testimonials/video-testimonials` → new `/reviews`
- `/your-privacy` → new `/privacy`
- `/our-terms` → new `/terms`
- `/accessibility-statement` → new `/accessibility`

**Services (each redirects to corresponding `/treatments/<slug>`):**
- `/services/neck-pain` → `/conditions/neck-pain`
- `/services/back-pain` → `/conditions/back-pain`
- `/services/disease-statesdx` → `/conditions`
- `/services/epidurals` → `/treatments/epidural-steroid-injections`
- `/services/intracept` → `/treatments/intracept-procedure`
- `/services/prp` → `/treatments/prp-therapy`
- `/services/spinal-cord-stimulator` → `/treatments/spinal-cord-stimulation`
- `/services/chronic-pain` → `/treatments/chronic-pain-management`
- `/services/herniated-disc` → `/conditions/herniated-disc`
- `/services/radio-frequency-ablation` → `/treatments/radiofrequency-ablation`

**Locations:**
- `/location/ny/west-islip` → `/locations/west-islip`
- `/location/ny/smithtown` → `/locations/smithtown`
- `/location/ny/bellmore` → `/locations/bellmore`

**Blog:** ~15–20 posts. Each old `/blog/<slug>` URL must redirect somewhere — either to a same-named new post if we create one, or to the most relevant procedure/condition page. Run a crawl (or check Google Search Console once available) to enumerate them all.

## Recommended New URL Structure

```
/                                    Home (overview)
/about                               Dr. Fanaee bio
/team                                All providers
/treatments                          Index of all procedures
/treatments/:slug                    10 procedure detail pages
/conditions                          Index of conditions treated
/conditions/:slug                    10 condition detail pages
/locations/west-islip                West Islip office
/locations/smithtown                 Smithtown office
/locations/bellmore                  Bellmore office
/insurance                           Insurance + workers' comp + no-fault info
/contact                             Contact + appointment form
/blog                                Blog index
/blog/:slug                          Individual blog posts
/reviews                             Reviews / testimonials
/privacy                             Privacy policy
/terms                               Terms of service
/accessibility                       Accessibility statement
```

## Recommended Tooling

- **`react-router-dom`** for routing.
- **`vite-react-ssg`** (the React port of vite-ssg, by Daydreamer-riri) for static site generation. Note: do NOT use `vite-ssg` directly — that's the Vue version. We need the React fork.
- **`react-helmet-async`** for per-route head tags.
- Vercel handles 301 redirects via a `vercel.json` file at repo root with a `redirects` array.
- `sitemap.xml` and `robots.txt` go in `public/`. The sitemap can be hand-written initially (it's small) or generated at build time by a script that imports the route list.

## Step-by-Step Plan

Each step should be a separate commit / working state. **Run `npm install` and `npm run build` after each step to verify nothing broke.**

### Step 1: Routing skeleton + SSG plumbing
- Update `package.json` to add `react-router-dom`, `react-helmet-async`, and `vite-react-ssg`.
- Update `vite.config.js` per `vite-react-ssg` docs.
- Update `src/main.jsx` to use the `ViteReactSSG` API (it requires a specific export shape — see the docs).
- Create `src/routes.jsx` listing all routes with their components.
- At this stage, all routes can render the existing single-page App as a placeholder. We just want routing + SSG working end-to-end. Verify build produces static HTML files for at least `/` and `/about`.

### Step 2: Page split — extract the homepage
- Move the homepage rendering (hero, services overview, providers preview, locations preview, insurance summary, FAQ preview, contact CTA) into `src/pages/Home.jsx`.
- Trim it: the homepage should be an overview that links into deep pages. Don't try to keep every section on the homepage AND on its own page — pick where each piece of content lives canonically.

### Step 3: Procedure detail pages
- The existing `PROCEDURES` array in `App.jsx` (line ~701) already has rich data per procedure — `slug`, `title`, `metaDescription`, `hero`, `overview`, `howItWorks`, `conditions`, `types`, `benefits`, `recovery`, `faqs`. This is excellent — we just need to render them at `/treatments/:slug`.
- Create `src/pages/TreatmentDetail.jsx` that takes the slug from the URL and renders the matching procedure.
- Add `MedicalProcedure` schema markup per page.
- Add `<Helmet>` per page for title, meta description (use the `metaDescription` field), canonical, OG.
- Create `src/pages/TreatmentsIndex.jsx` listing all procedures with links.

### Step 4: Condition detail pages
- The `CONDITIONS` array (line ~37) currently has only `name`, `icon`, `desc`. **This needs to be expanded** to match the depth of the procedure data: each condition should have at least an overview, common causes, symptoms, treatment options offered, and 2–3 FAQs to be SEO-competitive. This is a content task as much as a code task.
- Create `src/pages/ConditionDetail.jsx` and `src/pages/ConditionsIndex.jsx`.
- Add `MedicalCondition` schema per page.

### Step 5: Location pages
- The `LOCATIONS` array (line ~31) has basic data. Expand to match Tebra's location pages: full address, phone, hours, parking info, public transit, accessibility, photo, "What to expect at this office," and a list of which procedures/services are offered there.
- Create `src/pages/LocationDetail.jsx` and one route per office (`/locations/west-islip`, `/locations/smithtown`, `/locations/bellmore`).
- Add `LocalBusiness` and `MedicalBusiness` schema per page with full NAP (Name, Address, Phone) and `geo` coordinates.
- This is critical for local SEO. Each office should rank for "pain management west islip", etc.

### Step 6: Blog system
- The `BLOG_POSTS` array already has slugs and rich content. Create `src/pages/BlogIndex.jsx` and `src/pages/BlogPost.jsx` at `/blog` and `/blog/:slug`.
- Add `BlogPosting` schema per post.
- Make sure the SSG plugin is configured to pre-render every blog slug. With `vite-react-ssg`, this typically means listing dynamic routes via `includedRoutes` in `vite.config.js`.

### Step 7: Other pages
- `/about`, `/team`, `/insurance`, `/contact`, `/reviews`, `/privacy`, `/terms`, `/accessibility`. Most of these can be extracted from the existing single-page content.

### Step 8: Sitemap + robots.txt
- Create `public/robots.txt`:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://www.drfanaee.com/sitemap.xml
  ```
- Generate `public/sitemap.xml` either by hand (it's manageable — maybe 50 URLs total) or via a build-time script. List every URL with `<lastmod>` and a reasonable `<priority>`.

### Step 9: 301 redirects
- Create `vercel.json` at repo root with the redirect map listed in the URL inventory above. Format:
  ```json
  {
    "redirects": [
      { "source": "/services", "destination": "/treatments", "permanent": true },
      { "source": "/services/intracept", "destination": "/treatments/intracept-procedure", "permanent": true },
      ...
    ]
  }
  ```
- Use `"permanent": true` for 301 (vs. 302 for `false`). Permanent is what we want — it tells Google to transfer link equity.

### Step 10: Pre-launch verification
- Run `npm run build` and inspect `dist/` — every route should have its own `index.html` with full content (not an empty React shell).
- Use Google's Rich Results Test (https://search.google.com/test/rich-results) on each page type to verify schema parses.
- Run Lighthouse on each page type — target 90+ on Performance, Accessibility, Best Practices, and SEO.
- Check that `/sitemap.xml` and `/robots.txt` are reachable on the deploy.
- Once deployed to `drfanaee.com`: submit sitemap to Google Search Console, monitor crawl errors for the first 2 weeks.

## Important Implementation Notes

### SSR-safe code
`vite-react-ssg` runs the React tree in Node at build time to generate HTML. Anything that touches `window`, `document`, or `fetch` directly will crash the build. Wrap browser-only code in:

```js
useEffect(() => {
  // browser-only code here
}, []);
```

…or check `typeof window !== 'undefined'` / `import.meta.env.SSR` for conditionals.

The current `App.jsx` has a Google Places API fetch in a `useEffect` (line ~1153), which is fine — `useEffect` doesn't run during SSR. But verify any direct `window.scrollTo`, `document.querySelector`, etc. is properly guarded.

### Google Places API key — SECURITY ISSUE
Line 15 of `App.jsx` has the Google API key in plain text:
```js
const GOOGLE_API_KEY = "AIzaSyCh0-HapCkZHkzgLQ7tpMDUm5WIdSMZwSU";
```

This repo has been public, so the key is exposed in git history forever (toggling the repo to private later does NOT remove it from anyone who already cloned).

**Required actions:**
1. Rotate the key in Google Cloud Console (Credentials → click the key → Regenerate).
2. Restrict the new key to:
   - HTTP referrers: `*.drfanaee.com/*`, `*.vercel.app/*`, `localhost:*`
   - APIs: `Places API` only.
3. **Better long-term fix:** Move the Google Places call to your Railway backend. The frontend calls your backend, your backend calls Google. The key never appears in client code.

### Design preservation
The current site has hand-tuned visual design that should be preserved. When extracting components, copy the exact JSX and inline styles. Don't redesign while restructuring — that's a separate workstream.

### Live Google Reviews
The current code fetches live Google reviews on mount. After the SSG conversion, this still works the same way — pre-rendered HTML shows the static `REVIEWS` fallback array, then on hydration the live reviews load and replace them. This is fine for SEO (the fallback content is real and indexable).

### Appointment form
The form posts to a Railway backend at `https://web-production-ad8a2.up.railway.app/api/appointment-request`. Keep this functional. After SSG, hydration is what makes the form interactive.

## Data Files to Extract from `App.jsx`

To make the refactor cleaner, move data arrays into `src/data/`:

- `src/data/procedures.js` — the `PROCEDURES` array (line ~701)
- `src/data/conditions.js` — the `CONDITIONS` array (line ~37) — and expand it
- `src/data/locations.js` — the `LOCATIONS` array (line ~31) — and expand it
- `src/data/providers.js` — the `PROVIDERS` array (line ~23)
- `src/data/treatments.js` — the `TREATMENTS` array (line ~52)
- `src/data/faqs.js` — the `FAQS` array (line ~65)
- `src/data/blog.js` — the `BLOG_POSTS` array (line ~79)
- `src/data/reviews.js` — the `REVIEWS` array (line ~692)
- `src/data/redirects.js` — the redirect map for `vercel.json`

## Reference: Practice Details

- **Phone:** 631-265-2020
- **Fax:** 631-482-8766
- **Domain:** https://www.drfanaee.com
- **Locations:** West Islip, Smithtown, Bellmore (NY)
- **Procedures performed at:** Good Samaritan Hospital (West Islip), Babylon office-based surgical practice
- **Insurance:** Most major plans + workers' comp + no-fault
- **Backend API:** https://web-production-ad8a2.up.railway.app

## Working with This Repo via Claude Code

If you're picking this up via Claude Code, the recommended first session is:

1. Read this entire document.
2. Run `git status` and `git log --oneline -10` to see current state.
3. Read `src/App.jsx` fully (it's long but it's the single source of truth right now).
4. Confirm the plan with the user, propose any adjustments based on what you see.
5. Start with Step 1 above. Run `npm install` and `npm run build` after each step. Show the user the build output.
6. Don't try to do all 10 steps in one session — each step is ~30–60 minutes of careful work plus verification.
