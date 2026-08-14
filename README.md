# Camila marketing landing page

A modern and minimalist marketing landing page to introduce Camila 2.0 for Real Estate. Optimized for static content and marketing actions like subscription forms.

## Stack

- Astro 7 static output
- Astro Actions deployed through the Vercel adapter for server-only form handling
- Vanilla CSS mapped to the BrandLift tokens and Funnel typography
- Locale-specific copy in `src/i18n/en/` and `src/i18n/es/`
- Minimal client-side JavaScript for the pilot application form and pricing controls

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and provide the server-only credentials before testing pilot applications locally. Never expose `SUPABASE_SERVICE_ROLE_KEY` or `RESEND_API_KEY` through a public environment variable.

Routes:

- `/` and `/es/` — Spanish
- `/en/` — English
- `/planes-de-suscripcion/` — Spanish pricing page
- `/en/subscription-plans/` — English pricing page

## Current scope

The hero includes responsive desktop, tablet, and mobile layouts; bilingual navigation and CTAs; a native language dropdown; the supplied gradient background; the Chiclayo label; the emprelatam trust mark; keyboard focus states; reduced-motion handling; and basic SEO metadata.

The capabilities section presents four product features in a responsive card grid using the supplied Camila product images. Feature media is served as optimized WebP with PNG fallbacks and lazy loading.

The pricing section and dedicated pricing pages share localized plan data for Pro, Business, and Enterprise. Pro and Business trial requests open WhatsApp; Enterprise discovery calls open the Cal.com booking flow. Billing toggles use native radio controls and CSS without adding client-side JavaScript.

Login and account-creation CTAs point to the Camila application. The sales CTA opens the BrandLift WhatsApp conversation. The pilot-program form tracked in `CMD-250` saves applications in Supabase and sends a Spanish confirmation email through Resend.

## Pilot application deployment

The homepage remains prerendered. Astro Actions are deployed as an on-demand Vercel server function through `@astrojs/vercel`.

Required Vercel environment variables:

- `SUPABASE_URL` — `https://dipfqaruqcyzrjpuqcmk.supabase.co`
- `SUPABASE_SERVICE_ROLE_KEY` — server-only Supabase secret
- `RESEND_API_KEY` — server-only Resend API key with permission to send email
- `RESEND_FROM_EMAIL` — optional; defaults to `Camila AI <no-reply@marketing.brandlift.pe>`

Before deployment, apply the migrations in `supabase/migrations/`. They create `public.landing_page_form`, block public Data API access with RLS and revoked grants, and enforce unique Peruvian WhatsApp numbers. Applications remain stored until they are manually deleted or a future retention policy is introduced.

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
