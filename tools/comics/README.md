# Comic strips

Original 4-panel SVG gags (detective, dumpling, chicken, bubbles). Edit `strips.py`, then run `python3 strips.py` from this folder; SVGs are written to `assets/comics/`. Each strip needs one learning hook, short dialogue (<= 6 words per bubble) and an `alt` transcript in `index.html`.

## Deploy note
GitHub Pages caches CSS/JS for ~10 minutes. When `home.css` or `bubbles.js` changes, bump the `?v=` value in the `<link>`/`<script>` tags in `index.html` so visitors get the new file immediately.
