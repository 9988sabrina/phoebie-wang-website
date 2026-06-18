# PhoebiePlays

A small static website for `www.phoebiewang.com`.

## What changed

- Rebuilt the original laughing-emoji game into separate HTML, CSS, and JavaScript files.
- Added a real `surprise.html` page instead of linking to a missing route.
- Added persistent scores and custom jokes in browser storage.
- Added `CNAME` for GitHub Pages custom-domain publishing.

## Publish note

The current live site has an HTTPS certificate mismatch for `www.phoebiewang.com`.
After publishing these files through GitHub Pages, confirm the Pages custom domain is set to `www.phoebiewang.com`, wait for GitHub to issue the certificate, then enable "Enforce HTTPS".
