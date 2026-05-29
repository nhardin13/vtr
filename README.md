# Valley Top Repair

Valley Top Repair is a Hugo-based marketing site deployed on Cloudflare Pages. The site is built from content files, Hugo layouts, and a small amount of custom CSS/JS to support a polished local-business presentation.

## Tech Stack

- [Hugo](https://gohugo.io/) `0.162.1` extended
- [Go](https://go.dev/) `1.26.3` for the Pages build environment
- [Node.js](https://nodejs.org/) with `wrangler` `4.95.0`
- Bootstrap 5-based templates and custom styling
- Cloudflare Pages for production hosting and deployment

## Project Structure

- `content/` page content for the public site
- `layouts/` Hugo templates and partials
- `static/` static assets served as-is
- `data/` YAML data used by sections such as carousel, features, clients, and testimonials
- `i18n/` translation strings
- `go.mod` Hugo module metadata
- `package.json` and `package-lock.json` Node dependency metadata for wrangler and related tooling

## Local Development

Install the dependencies, then run Hugo locally:

```powershell
npm install
hugo server --disableFastRender
```

If you want a production-style local build, run:

```powershell
hugo --minify
```

## Build Requirements

The site currently builds successfully with the following versions:

- `HUGO_VERSION = 0.162.1`
- `GO_VERSION = 1.26.3`

Cloudflare Pages should use those exact values in the project build variables. If the Pages environment also installs or runs wrangler directly, keep the Node runtime at `22+` because wrangler `4.95.0` requires it.

## Cloudflare Pages Deployment

Use these production build settings in Cloudflare Pages:

- `HUGO_VERSION = 0.162.1`
- `GO_VERSION = 1.26.3`

Recommended build command:

```powershell
hugo --minify
```

Recommended publish directory:

```powershell
public
```

Deployment notes:

- The site should be validated locally with the same Hugo version before pushing.
- Keep the Cloudflare Pages Node runtime on `22+` when wrangler is part of the build pipeline.
- The repository is configured to generate static output only; no app server is required.

## Content and Styling Notes

- Keep page content in `content/` and avoid hardcoding text in templates when a content file will do.
- Prefer reusable partials in `layouts/partials/` for shared UI such as nav, footer, trust signals, and analytics snippets.
- Keep custom CSS in `static/css/custom.css` and avoid spreading one-off styling across templates.
- Use Bootstrap 5 utility classes rather than legacy Bootstrap 3 patterns.

## Homepage Trust Signals

The homepage includes a trust-signals partial and Bootstrap 5-compatible layout updates. The design uses reusable trust badges to highlight business credibility and should remain in the partial/template layer rather than being duplicated in content pages.

## Analytics

Analytics setup is handled through the Hugo configuration and environment variables, not separate setup files.

- `googleAnalyticsID` and `hotjarID` are configured in `hugo.toml` when needed.
- Environment variables can be used for Cloudflare or local builds when secrets should not be committed.
- Common analytics variables include `GOOGLE_ANALYTICS_ID`, `HOTJAR_ID`, `GOOGLE_MAPS_API_KEY`, and `FORMSPREE_ENDPOINT`.

## Verification Checklist

Before committing changes, verify:

1. `npm install` completes successfully.
2. `npm audit --omit=dev` reports no vulnerabilities.
3. `hugo --minify` succeeds locally.
4. Cloudflare Pages build variables still match the validated versions above.

## Maintenance Tips

- Keep dependency updates small and verify the site after each version bump.
- Re-run the local Hugo build after template or content changes.
- Prefer documentation updates in this README instead of adding one-off project notes elsewhere.