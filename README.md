# achromaassist.app

Website for **AchromaAssist**, an AR visual aid research project for achromatopsia and color blindness.
Built with [Astro](https://astro.build) and hosted on GitHub Pages.

## Develop

```sh
nvm use          # Node 24 (see .nvmrc; Astro 7 needs Node >= 22.23)
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # serve dist/ locally
```

## Where things live

| What | Where |
| --- | --- |
| Home page | `src/pages/index.astro` |
| Prototypes (one Markdown file each) | `src/content/prototypes/*.md` |
| Site name, email, links | `src/site.ts` |
| Colors, fonts, shared styles | `src/styles/global.css` |
| Logo (source of truth) | `public/logo.svg` |
| Favicons + OG image | `npm run assets` regenerates them from the logo |
| Custom domain | `public/CNAME` |

To add a prototype, copy `src/content/prototypes/viture-luma-ultra.md`, edit the frontmatter, and put media in `public/media/`.

## Deploy

Every push to `main` builds and deploys via `.github/workflows/deploy.yml`.
One-time setup: repo **Settings → Pages → Source: GitHub Actions**, custom domain `achromaassist.app`, then **Enforce HTTPS**.

## License

Content, design, logo and media © AchromaAssist. All rights reserved.
Fonts: Figtree and JetBrains Mono, both under the SIL Open Font License 1.1 (bundled via Fontsource).
