"""Build the app's bundled page from the website version (birdpal/index.html).

The app shows the same Bird Pal page, but fully offline: fonts are embedded,
the web-only parts (install manifest, service worker, Google Fonts) are removed,
and a small bridge keeps the screen awake during lessons.

Run from the repository root:  python3 apps/birdpal-ios/make_web.py
"""
import base64, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(ROOT, "birdpal", "index.html"), encoding="utf-8").read()

def font(name):
    with open(os.path.join(HERE, "fonts", name), "rb") as f:
        return base64.b64encode(f.read()).decode()

# Drop web-only head tags.
for pat in [r'<link rel="manifest"[^>]*>\n?', r'<link rel="icon"[^>]*>\n?', r'<link rel="apple-touch-icon"[^>]*>\n?',
            r'<link rel="preconnect"[^>]*>\n?', r'<link rel="stylesheet" href="https://fonts\.googleapis\.com[^>]*>\n?',
            r'<meta name="(apple-mobile-web-app-[^"]*|mobile-web-app-capable)"[^>]*>\n?']:
    src = re.sub(pat, "", src)

faces = (
    "<style>"
    "@font-face{font-family:'Baloo 2';src:url(data:font/ttf;base64,%s) format('truetype');font-weight:400 800}"
    "@font-face{font-family:'Nunito';src:url(data:font/ttf;base64,%s) format('truetype');font-weight:200 1000}"
    "html,body{-webkit-user-select:none;user-select:none}input{-webkit-user-select:text;user-select:text}"
    "</style>" % (font("Baloo2[wght].ttf"), font("Nunito[wght].ttf"))
)
bridge = (
    "<script>window.BIRDPAL_NATIVE=1;"
    "(function(){function post(on){try{window.webkit.messageHandlers.birdpal.postMessage({keepAwake:on});}catch(e){}}"
    "try{Object.defineProperty(navigator,'wakeLock',{value:{request:function(){post(true);"
    "return Promise.resolve({release:function(){post(false);return Promise.resolve();}});}},configurable:true});}catch(e){}})();"
    "</script>"
)
src = src.replace("<title>", faces + bridge + "\n<title>", 1)
# Web-only advice that does not apply inside the app.
src = re.sub(r"<li>On iPhone, always open Bird Pal[^<]*</li>\s*", "", src)
if "fonts.googleapis" in src or '<link rel="manifest"' in src:
    raise SystemExit("web-only tags still present")

out = os.path.join(HERE, "BirdPal", "index.html")
open(out, "w", encoding="utf-8").write(src)
print("wrote", out, len(src) // 1024, "KB")
