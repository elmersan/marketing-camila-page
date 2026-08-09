# Camila marketing landing page

A modern and minimalist marketing landing page to introduce Camila 2.0 for Real Estate. Optimized for static content and marketing actions like subscription forms.

## Stack

- Astro 7 static output
- Vanilla CSS mapped to the BrandLift tokens and Funnel typography
- Locale-specific copy in `src/i18n/en/` and `src/i18n/es/`
- No client-side JavaScript for the current landing-page sections

## Local development

```bash
npm install
npm run dev
```

Routes:

- `/` and `/es/` — Spanish
- `/en/` — English

## Current scope

The hero includes responsive desktop, tablet, and mobile layouts; bilingual navigation and CTAs; a native language dropdown; the supplied gradient background; the Chiclayo label; the emprelatam trust mark; keyboard focus states; reduced-motion handling; and basic SEO metadata.

The capabilities section presents four product features in a responsive card grid using the supplied Camila product images. Feature media is served as optimized WebP with PNG fallbacks and lazy loading.

Login and account-creation CTAs point to the Camila application. The sales CTA opens the BrandLift WhatsApp conversation. The primary early-access CTA remains scoped to the upcoming pilot-program section tracked in `CMD-250`.

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
