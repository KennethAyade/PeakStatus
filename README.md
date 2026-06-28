# Peak Status — Website

Marketing website for **Peak Status**, a Cebu-based creative and digital growth
studio. Built as a polished, single-page site with anchored sections.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **ESLint** (flat config, `eslint-config-next`)
- Component-based, content-driven from `src/data/site.ts`

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # run ESLint
```

## Project structure

```
.
├── Logo/                       # Original brand assets (source of truth — do not delete)
├── public/brand/               # Optimized logos used by the site
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Fonts + metadata (title, description, Open Graph)
│   │   ├── page.tsx            # Composes all sections
│   │   ├── globals.css         # Theme tokens + base styles + utilities
│   │   ├── opengraph-image.tsx # Dynamic 1200×630 social image
│   │   ├── icon.png            # Favicon (from the submark logo)
│   │   ├── robots.ts / sitemap.ts
│   ├── components/             # Header, Hero, About, Services, Industries,
│   │   │                       # Portfolio, Team, Process, Pricing, Tools,
│   │   │                       # Contact, Footer
│   │   └── ui/                 # Section, SectionHeading, Reveal (shared)
│   └── data/site.ts            # ALL editable content + config lives here
```

## Editing content

Almost everything is data-driven. Update `src/data/site.ts` to change copy,
services, industries, team members, pricing, tools, and contact details.

Useful flags / fields:

- `siteConfig.showPricing` — set to `false` to hide the entire pricing section.
- `siteConfig.email` — **placeholder**; replace with the real inbox.
- `siteConfig.url` — replace with the real domain (used for metadata/SEO).
- `siteConfig.socials` — add real URLs to reveal social links in the footer.
- `team[]` — three entries are placeholders (`status: "coming-soon"`).

## Coming Soon / maintenance mode

A single toggle controls a "Coming Soon" gate for the **deployed** site only:

- File: `src/config/site-mode.ts` → `MAINTENANCE_MODE`
- `false` (default) → full site is live everywhere.
- `true` → the deployed URL (e.g. `https://peak-status.vercel.app`) shows only
  the Coming Soon page. **Localhost always shows the full site**, so you can keep
  working while the public URL is gated.

How it works: `src/middleware.ts` rewrites all requests to `/coming-soon` when
the toggle is on and the request host is not local. Detection is host-based
(not `NODE_ENV`), so `npm run start` locally still shows the full site.

To gate the live URL: set `MAINTENANCE_MODE = true`, commit, and deploy.
To launch: set it back to `false`, commit, and deploy.

Preview the Coming Soon page locally any time: `http://localhost:3000/coming-soon`.

## What still needs to be finalized before launch

See the handoff notes provided with this build. In short:

1. Real official email + domain.
2. Real portfolio images (replace placeholder cards — see TODOs in
   `Portfolio.tsx` and `src/data/site.ts`).
3. Real team photos + the 3 remaining member profiles.
4. A real contact-form backend (currently a `mailto:` fallback — see the TODO
   in `Contact.tsx`).
5. Social media links.
6. Confirm/replace any tools and pricing before publishing.

> Content rule: keep everything professional and honest. No fake testimonials,
> client results, case studies, metrics, awards, or invented team details.
