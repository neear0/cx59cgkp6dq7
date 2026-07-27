# DATIQA.AI — design preview

Public preview build of the DATIQA.AI one-pager. All body copy is placeholder
(lorem ipsum) — only the slogan is real. This repo exists to have the design
viewable online; it is not the production site.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind v4 · GSAP + SplitText · Lenis ·
three.js / React Three Fiber (the particle field behind the page).

## Local development

```bash
npm install
npm run dev
```

Locales live in `lib/i18n.ts` (`en`, `sk`, `cs`, `de`); routes are
`app/[locale]/`, and `proxy.ts` redirects `/` to the visitor's language.

## Deployment

`.github/workflows/deploy.yml` builds a static export
(`STATIC_EXPORT=1`, `BASE_PATH=/<repo>` → `output: export`) and publishes it to
GitHub Pages on every push. The static build drops `proxy.ts` and uses a
generated `index.html` for the language redirect instead.
