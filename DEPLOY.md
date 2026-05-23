# Deploy — portafolio-2027 → S3 + CloudFront

The site is a fully static Next.js export (`output: 'export'`). The build
emits to `out/`, which the GitHub Actions workflow at
`.github/workflows/deploy.yml` syncs to S3 and invalidates on CloudFront.

## Shared infrastructure with portafolio-2026

We deploy onto the existing 2026 infra — bucket, distribution, IAM role:

| | |
|---|---|
| S3 bucket | `portafolio-2026-sebastian` |
| CloudFront distribution | `EC2G5UTO1CEQ9` |
| OIDC role | `arn:aws:iam::339712768913:role/GitHubActionsPortfolioDeployRole` |
| Region | `us-east-1` |

No infra is created or modified from this repo. The workflow just `aws s3
sync`s and invalidates.

## Build locally

```bash
pnpm install
pnpm build       # next build → out/  +  writes out/index.html (root redirect)
pnpm preview     # static server over out/ on http://localhost:3030
```

After `pnpm build` you should see in `out/`:

```
out/
├── index.html                 ← root redirect (locale detection)
├── 404.html
├── en/
│   ├── index.html
│   ├── about/index.html
│   ├── work/index.html
│   └── services/index.html
├── es/
│   ├── index.html
│   ├── about/index.html
│   ├── work/index.html
│   └── services/index.html
├── _next/static/...           ← compiled JS, CSS, self-hosted fonts
├── images/                    ← copied from public/images
└── videos/                    ← copied from public/videos
```

## Locale routing without middleware

The original repo used a next-intl middleware (`src/proxy.ts`) with
`localePrefix: 'as-needed'` + `localeDetection: true`. That requires a
Node runtime per request, which doesn't exist in a static export.

What changed:

- `src/proxy.ts` deleted.
- `src/i18n/routing.ts` switched to `localePrefix: 'always'`. Every URL now
  carries its locale: `/en/about/`, `/es/work/`, etc.
- `out/index.html` is hand-written by `scripts/write-root-redirect.mjs`
  (run as part of `pnpm build`). It contains an inline `<script>` that:
  1. Reads the `NEXT_LOCALE` cookie (set when the user picks via
     LocaleSwitcher).
  2. Falls back to `localStorage.NEXT_LOCALE`.
  3. Falls back to `navigator.languages`, matching either an exact locale
     (`es`) or its base subtag (`es-CO`, `es-MX`, …).
  4. Falls back to `en`.
- The redirect uses `location.replace()` so the back button doesn't loop
  through the root.

## What you still need to confirm in CloudFront / S3

The deploy workflow only handles file uploads and cache invalidation. The
following pieces of distribution config must exist on the EC2G5UTO1CEQ9
distribution — they were already in place for 2026 but worth checking:

1. **Default Root Object**: `index.html`.
2. **Custom Error Responses**:
   - 403 (S3 returns this for missing keys) → response page `/404.html`,
     response code `404`.
   - 404 → same.
3. **Trailing slash for nested routes** *(optional but recommended)*:
   The build emits `out/about/index.html`. CloudFront + S3 will serve
   `/about/` correctly. A request for bare `/about` (no trailing slash)
   from a stray external link will 403 unless either:
   - The site only links internally (links use `/about/`) — which is the
     case here, Next.js `Link` adds the slash because of
     `trailingSlash: true`.
   - OR you add a CloudFront Function that rewrites paths without a
     trailing slash and without a file extension to append `index.html`.

If you want the safety net, the CloudFront Function looks like:

```js
function handler(event) {
  var req = event.request;
  var uri = req.uri;
  if (uri.endsWith('/')) {
    req.uri = uri + 'index.html';
  } else if (!uri.includes('.')) {
    req.uri = uri + '/index.html';
  }
  return req;
}
```

This is the same function the 2026 distribution likely uses (Vite SPA also
needs URI rewriting). If it's there, this site inherits it automatically.

## First deployment

```bash
git push origin main
```

The workflow fires on push to `main` and on `workflow_dispatch` from the
GitHub Actions UI. Watch the run; if S3 sync and the invalidation both
succeed, the new site is live at the existing CloudFront URL.

## Rollback

`aws s3 sync` with `--delete` removes files that aren't in the latest
build. To roll back, re-deploy a previous commit:

```bash
git checkout <previous-sha>
pnpm install --frozen-lockfile
pnpm build
aws s3 sync out s3://portafolio-2026-sebastian --delete
aws cloudfront create-invalidation \
  --distribution-id EC2G5UTO1CEQ9 --paths "/*"
```

Or just push a revert commit and let the workflow do it.
