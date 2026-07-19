# Ecoconnect Services — Corporate Website

Official website for **Ecoconnect Services**, an execution-focused company enabling the transition towards clean energy and sustainable mobility through three integrated capabilities: **Skilling, Simulation, and Services**.

Built to the *Ecoconnect Services Website Requirement Specification (WRS)* — a fully responsive corporate site with a built-in Content Management System, working enquiry forms with email routing, site-wide search, and SEO/security best practices.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) + React 19 |
| Styling | Tailwind CSS 4 (design tokens in `app/globals.css`) |
| Fonts | Poppins (headings) + Inter (body) via `next/font` |
| 3D hero | Three.js |
| Email | Nodemailer (SMTP, optional) |
| CMS storage | File-backed JSON store (`lib/cms.js`) — single swap point for a database |
| Hosting | Vercel (any Node.js host works) |

---

## Getting Started (Local Development)

```bash
# 1. Clone and install
git clone https://github.com/salonikashyap7899/Ecoconnect-.git
cd Ecoconnect-
npm install

# 2. (Optional) configure environment
cp .env.example .env.local   # then edit values — everything has safe dev defaults

# 3. Run the dev server
npm run dev                  # http://localhost:3000
```

### Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (must pass before deploying) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

---

## Project Structure

```
app/
  page.js                  Home (CMS-driven featured projects, partners, insights)
  about/  capabilities/  skilling/  simulation/  services/
  projects/ [slug]/        Project portfolio + detail pages (CMS-driven)
  insights/ [slug]/        Blog/news/events hub + article pages (CMS-driven)
  careers/  contact/       Careers (jobs + application) and contact (enquiry form)
  search/                  Site-wide search (pages, projects, articles, events, jobs)
  legal/  thank-you/       Privacy/Terms/Cookies, form-success page
  error.js  not-found.js   Branded 500 / 404 pages
  sitemap.js  robots.js    SEO metadata routes
  admin/                   CMS admin panel (login + dashboard + managers)
  api/
    forms/                 Public form endpoints (enquiry, application, newsletter)
    admin/                 Authenticated CMS endpoints (login, collections, submissions)
components/
  SiteHeader / SiteFooter  Global navigation, cookie consent, back-to-top
  pages/                   Page-level client components
  admin/                   CMS UI (CollectionManager, SubmissionsManager)
  ui.js                    Reusable primitives (PageHero, buttons, cards, CTA band)
lib/
  data.js                  Seed content for every collection (single content source)
  cms.js                   CMS store: collections, schemas, submissions, CSV export
  adminAuth.js             Admin session helpers (HMAC cookie)
  mailer.js                SMTP email helper (no-op when unconfigured)
public/downloads/          Corporate profile PDF and other downloadables
```

---

## Backend Setup

All backend behaviour is configured through environment variables — see `.env.example` for the full annotated list. Locally, put them in `.env.local`; on Vercel, add them under **Project → Settings → Environment Variables**.

### 1. Admin (CMS) credentials — required for production

```bash
ADMIN_USERNAME=youradmin
ADMIN_PASSWORD=a-strong-password
ADMIN_SECRET=a-long-random-string        # signs the session cookie
```

> ⚠️ Without these, the CMS uses the development defaults `admin` / `ecoconnect2026`. **Always override them in production.** Sessions expire after 8 hours.

### 2. Email notifications (SMTP) — recommended

Form submissions are always stored in the CMS. To *also* have them emailed to your team (with the resume attached for career applications), configure SMTP:

```bash
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_USER=notifications@ecoconnectservices.com
SMTP_PASS=app-password
MAIL_FROM=notifications@ecoconnectservices.com
MAIL_TO=info@ecoconnectservices.com      # where submissions are delivered
```

Leave these unset and email sending is silently skipped — nothing breaks.

### 3. CMS storage location

Content edits and submissions persist to `DATA_DIR/cms.json` (default `./.data/`, git-ignored).

```bash
DATA_DIR=/var/data/ecoconnect            # point at a persistent volume in production
```

> **Serverless note (Vercel):** the filesystem is ephemeral, so CMS edits made in production reset on each redeploy. Options, in order of effort:
> 1. Treat `lib/data.js` as the source of truth and edit content via pull requests (works today).
> 2. Set `DATA_DIR` to a mounted volume on a Node host (VPS, Railway, Render…).
> 3. Swap `lib/cms.js`'s read/write functions for a database client (Vercel Postgres, Supabase…). All pages and admin UI go through this one module, so nothing else changes.

### 4. Analytics (optional)

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX           # Google Analytics 4
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX           # Google Tag Manager
```

Scripts are only injected when the variable is present.

---

## CMS Workflow

1. Go to **`/admin`** and sign in.
2. **Dashboard** shows new submissions and content counts at a glance.
3. **Submissions** — Enquiries, Career Applications, Newsletter Subscribers:
   - Track each item through **New → In Progress → Closed**
   - **Export CSV** for Excel or a CRM import
4. **Content** — add/edit/delete without code:
   - Articles (blog, news, case studies, technical articles, announcements)
   - Projects (with challenge/solution/outcomes, gallery, technologies)
   - Training Programmes, Job Openings, Partners, Testimonials, Leadership, Events, Announcements
5. Edits go live on the public site immediately (pages render from the CMS store on every request).

Seed content lives in `lib/data.js`; a collection uses its seed until an administrator saves an edited copy, which then takes precedence.

---

## Form & API Endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/forms/enquiry` | POST (JSON) | Contact-form enquiries, category-routed |
| `/api/forms/application` | POST (multipart) | Career applications with resume (PDF/DOC/DOCX ≤ 5 MB) |
| `/api/forms/newsletter` | POST (JSON) | Newsletter signup (dedupes by email) |
| `/api/admin/login` / `logout` | POST | Admin session management |
| `/api/admin/collections/[name]` | GET / PUT | Read / save a content collection (auth required) |
| `/api/admin/submissions/[type]` | GET / PATCH | List / update submissions; `?format=csv` exports (auth required) |

All form endpoints validate server-side and include honeypot spam protection (`website` field must be empty).

---

## Deployment Workflow

1. **Branch → PR → merge to `main`.** Vercel builds a preview deployment for every PR and promotes `main` to production on merge.
2. Before merging, verify locally:
   ```bash
   npm run build && npm run lint
   ```
3. After the first production deploy, complete the **launch checklist**:
   - [ ] Set `ADMIN_USERNAME` / `ADMIN_PASSWORD` / `ADMIN_SECRET`
   - [ ] Configure SMTP so enquiries reach your inbox
   - [ ] Add `NEXT_PUBLIC_GA_ID` (and Search Console verification)
   - [ ] Point your custom domain at Vercel; SSL is automatic
   - [ ] Decide on durable CMS storage (see Backend Setup §3)
   - [ ] Replace placeholder imagery/logos with brand assets via the CMS

---

## SEO, Security & Accessibility

- `sitemap.xml` and `robots.txt` generated automatically (`/admin` and `/api` excluded)
- Organization + Article JSON-LD structured data, Open Graph tags, per-page meta descriptions
- HTTP security headers (HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy) in `next.config.mjs`
- Cookie consent banner with Accept / Reject / Customise, persisted per visitor
- Keyboard-accessible navigation, ARIA labels, `prefers-reduced-motion` support
