# Melvin & Co. — Make Curiosity Real

A responsive, static-exported Next.js landing page for Melvin and his co-founder. It uses GSAP and Lenis for scroll-based motion, respects reduced-motion preferences, and includes the co-founders illustration.

## Run locally

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. To verify the production site, run `npm run build`; the static site is generated in `out/`.

## Share an idea

The idea button opens the visitor's email app addressed to `collegebaddest@gmail.com`. This address is public in the deployed site. The visitor must review and send the message themselves; the site does not collect, store, or display submissions.

## Publish with GitHub Pages

The `master` branch is deployed automatically by `.github/workflows/deploy.yml` to [https://ifennaike.github.io/mel.github.io/](https://ifennaike.github.io/mel.github.io/). The workflow sets the project-site base path so Next.js assets and the illustration load from the repository URL. In the repository's **Settings → Pages**, set the source to **GitHub Actions**. Each push builds the app as static files and deploys the contents of `out/`.

GitHub Pages is public by default. Only publish content and contact details that are intended to be public.
