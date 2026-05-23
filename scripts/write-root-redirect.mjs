// Writes redirect documents at every locale-less entry point of the static
// export. Because the app uses next-intl with `localePrefix: 'always'`, every
// real page lives under /en/... or /es/.... Next.js does NOT emit anything at
// the bare paths (/, /about, /services, /work), so requests to those would
// 404 unless we hand-write a redirect.
//
// Each generated index.html ships an inline <script> that runs before paint:
//   1. NEXT_LOCALE cookie (set when the user picks via the LocaleSwitcher)
//   2. localStorage NEXT_LOCALE (same key, just persisted differently)
//   3. navigator.languages — first one that matches a supported locale or
//      its base subtag (e.g. "es-CO" → "es")
//   4. fallback to "en"
// The redirect uses location.replace() so the back button doesn't loop
// through this page.

import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const supported = ['en', 'es']
const defaultLocale = 'en'

// Every base path on which we want to land users at their locale. The empty
// string is the root "/". Any sub-page that exists under both /en/ and /es/
// must appear here so its bare URL resolves.
const basePaths = ['', 'about', 'services', 'work']

function buildHtml(basePath) {
  // basePath = "" → redirect to /{locale}/
  // basePath = "about" → redirect to /{locale}/about/
  const tail = basePath ? `/${basePath}/` : '/'
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex">
<title>Sebastian Ardila</title>
<style>html,body{margin:0;background:#f1ece3;color:#14110d;font-family:system-ui,sans-serif}</style>
<script>
(function() {
  try {
    var supported = ${JSON.stringify(supported)};
    var def = ${JSON.stringify(defaultLocale)};
    var tail = ${JSON.stringify(tail)};
    var pick = null;
    try {
      var m = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]+)/);
      if (m) pick = decodeURIComponent(m[1]);
    } catch (e) {}
    if (!pick) {
      try { pick = localStorage.getItem('NEXT_LOCALE'); } catch (e) {}
    }
    if (supported.indexOf(pick) === -1) pick = null;
    if (!pick) {
      var langs = (navigator.languages && navigator.languages.length)
        ? navigator.languages
        : [navigator.language || ''];
      outer: for (var i = 0; i < langs.length; i++) {
        var tag = String(langs[i] || '').toLowerCase();
        for (var j = 0; j < supported.length; j++) {
          if (tag === supported[j] || tag.indexOf(supported[j] + '-') === 0) {
            pick = supported[j];
            break outer;
          }
        }
      }
    }
    if (!pick) pick = def;
    location.replace('/' + pick + tail);
  } catch (e) {
    location.replace('/${defaultLocale}' + ${JSON.stringify(tail)});
  }
})();
</script>
</head>
<body></body>
</html>
`
}

const outDir = join(process.cwd(), 'out')
if (!existsSync(outDir)) {
  console.error('out/ does not exist — run `next build` first.')
  process.exit(1)
}

for (const basePath of basePaths) {
  const dir = basePath ? join(outDir, basePath) : outDir
  mkdirSync(dir, { recursive: true })
  const file = join(dir, 'index.html')
  writeFileSync(file, buildHtml(basePath), 'utf8')
  console.log(`✓ ${file.replace(outDir + '/', 'out/')}`)
}

console.log('✓ Locale-detecting redirects written.')
