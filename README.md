# Cooking and More

A modern rebuild of [cookingandmore.de](https://cookingandmore.de/) using Next.js App Router, React, TypeScript, and Tailwind CSS. It preserves the German URL structure (including trailing slashes), company copy, contact information, legal pages, archives, and legacy WordPress custom-post-type routes.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. For production:

```bash
npm run build
npm start
```

Node.js 20 or newer is recommended. Deploy to Vercel or any Node-compatible host; no database or runtime secret is required.

## Content and routes

- Typed page, post, archive, navigation, and location records: `src/data/site.ts`
- Local first-party images: `public/media/`
- Shared visual shell: `src/components/`
- Static catch-all route and metadata: `src/app/[...slug]/page.tsx`
- Generated SEO endpoints: `/sitemap.xml` and `/robots.txt`
- [Complete page-by-page migration checklist](docs/page-checklist.md)

Every inventory URL is statically generated at the original path. `trailingSlash: true` preserves the WordPress URL convention.

## Contact form

The form validates required fields in the browser and again in `src/app/api/contact/route.ts`. The route acknowledges valid submissions and intentionally does not send email yet. To wire delivery:

1. Choose an email service (for example Resend, Postmark, SES, or Nodemailer).
2. Add its API key as a deployment environment variable.
3. Replace the documented integration point in `POST` with the provider call.
4. Add rate limiting, bot protection, and production logging before launch.

Do not log the message body or unnecessary personal data.

## Legacy/demo candidates to drop

These appear to be imported theme demos or abandoned WooCommerce content rather than active company pages:

- `/te/`, `/sample-page/`, `/about-us/`, `/our-services/`, `/our-chefs/`
- `/menu-parallax/`, `/menu-grid/`, `/menu-grid-image/`, `/menu-classic/`, `/menu-mixed/`
- `/shop/`, `/shop-2/`
- all `/menus/*`, `/pricing/*`, `/team/*`, `/testimonials/*`, and `/galleries/*` routes
- English demo posts `/secret-of-making-smoked-pork/` and `/recipe-is-important-part-of-cooking/`
- old English tag/category archives such as `cooking`, `cuisine`, `dinning`, `recipe`, and `restaurant`

They remain routable so no indexed or bookmarked URL is lost. If removed later, add permanent redirects in `next.config.ts`.

## Verification

```bash
npm run lint
npm run build
```

Comparison screenshots produced during migration are stored as run artifacts rather than committed application assets.
