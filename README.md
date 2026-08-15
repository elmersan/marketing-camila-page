# Camila marketing landing page

A modern and minimalist marketing landing page to introduce Camila 2.0 for Real Estate. Optimized for static content and marketing actions like subscription forms.

## Stack

- Astro 7 static output
- Astro Actions deployed through the Vercel adapter for server-only form handling
- Vanilla CSS mapped to the BrandLift tokens and Funnel typography
- Official Lucide Animated icons rendered through small Astro React islands and Motion
- Locale-specific copy in `src/i18n/en/` and `src/i18n/es/`
- Minimal client-side JavaScript for the pilot application form, pricing controls, and deferred icon animations

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and provide the server-only credentials before testing pilot applications locally. Never expose `SUPABASE_SERVICE_ROLE_KEY` or `RESEND_API_KEY` through a public environment variable.

Routes:

- `/` — Spanish, canonical and indexable
- `/en/` — English
- `/planes-de-suscripcion/` — Spanish pricing page
- `/en/subscription-plans/` — English pricing page
- `/sitemap.xml` — Spanish indexable routes
- `/robots.txt` — crawler directives
- `/llms.txt` — concise machine-readable product summary

The English pages are direct-access investor-facing pages and are marked `noindex, follow`; the Spanish pages are the SEO/AEO source of truth for Peru. The legacy `/es/` route permanently redirects to `/`.

## Current scope

The hero includes responsive desktop, tablet, and mobile layouts; bilingual navigation and CTAs; a native language dropdown; the supplied gradient background; the Chiclayo label; the emprelatam trust mark; keyboard focus states; reduced-motion handling; and basic SEO metadata.

The capabilities section presents four product features in a responsive card grid using the supplied Camila product images. Feature media is served as optimized WebP with PNG fallbacks and lazy loading.

The pricing section and dedicated pricing pages share localized plan data for Pro, Business, and Enterprise. Pro and Business trial requests open WhatsApp; Enterprise discovery calls open the Cal.com booking flow. Billing toggles use native radio controls and CSS without adding client-side JavaScript.

Login and account-creation CTAs point to the Camila application. The sales CTA opens the BrandLift WhatsApp conversation. The pilot-program form tracked in `CMD-250` saves applications in Supabase and sends a Spanish confirmation email through Resend.

## Pilot application deployment

The homepage remains prerendered. Astro Actions are deployed as an on-demand Vercel server function through `@astrojs/vercel`.

### Vercel domain configuration

Before production deployment, configure the Vercel project so that `https://www.brandlift.pe/` is the primary domain and permanently redirect `https://brandlift.pe/` to `https://www.brandlift.pe/`. HTTP requests should also redirect to HTTPS. The canonical tags, sitemap, Open Graph URLs, and JSON-LD in this project already use the `www` hostname; the domain-level redirect must be configured in the Vercel account rather than only in the application routes.

### Form configuration checklist

1. **Supabase:** apply both migrations in `supabase/migrations/`. They create `public.landing_page_form`, enable RLS, revoke public table access, and enforce unique Peruvian WhatsApp numbers. Add these server-only variables in Vercel and local `.env`:
   - `SUPABASE_URL` — `https://dipfqaruqcyzrjpuqcmk.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY` — service-role secret; never expose it as `PUBLIC_*` or commit it
2. **Resend:** verify the sending domain/address in Resend, then add:
   - `RESEND_API_KEY` — server-only API key with permission to send
   - `RESEND_FROM_EMAIL` — recommended: `Camila AI <no-reply@marketing.brandlift.pe>`
3. **Vercel:** configure all four variables for the required deployment environments, apply the production domain/redirect above, and confirm the project uses the Vercel adapter. The form saves to Supabase first; if Resend is unavailable, the application remains saved and `emailSent` is false.
4. **External links:** WhatsApp, Cal.com, Papermark, and Mintlify are static links and do not require environment variables. Verify their destinations before launch.
5. **Smoke test:** run `npm run check && npm run build`, submit a valid pilot application locally, confirm the Supabase row, and confirm the Resend email.

Applications remain stored until they are manually deleted or a future retention policy is introduced. Never place real keys in the repository or README.

The application deadline is enforced on the server at **August 31, 2026, 11:59 p.m. America/Lima**. After the deadline, the browser replaces the form with the closed-applications message and the action rejects any direct submission attempts.

## Structure
The version 01 of this landing page cover the following sections:
1. Hero
2. Features
3. Mission Statement
4. Pricing
5. Pilot program form
6. Basic footer

## Source context

Copy and requirements were checked against Linear project **Camila - Landing Page**, especially `CMD-246 Hero Section` and `CMD-247 Features / Capacidades`. The remaining page sections are tracked separately in `CMD-248`–`CMD-250`.
