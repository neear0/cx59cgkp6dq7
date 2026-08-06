# DATIQA.AI — design preview

Public preview build of the DATIQA.AI one-pager. This repo exists to have the
design viewable online; it is not the production site.

Copy comes from the client (`Datiqa.ai.docx`) where she supplied it — the
services heading, the four index rows and the closing claim. The approach and
process sections are still our own draft text, and the three figures in the
approach section are placeholders awaiting confirmed numbers.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind v4 · GSAP + SplitText · Lenis ·
three.js / React Three Fiber (the particle field behind the page).

## Local development

```bash
npm install
npm run dev
```

Locales live in `lib/i18n.ts` (`en`, `sk`, `cs`); routes are
`app/[locale]/`, and `proxy.ts` redirects `/` to the visitor's language.

## Deployment

`.github/workflows/deploy.yml` builds a static export
(`STATIC_EXPORT=1`, `BASE_PATH=/<repo>` → `output: export`) and publishes it to
GitHub Pages on every push. The static build drops `proxy.ts` and uses a
generated `index.html` for the language redirect instead.
