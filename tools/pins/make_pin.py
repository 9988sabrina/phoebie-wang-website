#!/usr/bin/env python3
"""Make an anime-style 1000x1500 Pinterest pin from a site image + two cast characters.
Usage: python3 tools/pins/make_pin.py OUT.png "Title line 1|Title line 2" "subtitle" SRC_IMAGE URL [theme]
theme: yellow (default) | blue | pink. Needs Pillow and Poppins-Bold.ttf (falls back to DejaVu)."""
import math, os, sys, random
from PIL import Image, ImageDraw, ImageFont
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
NAVY = (20, 33, 61)
THEMES = {"yellow": ((255, 216, 77), (255, 232, 130)), "blue": ((120, 196, 255), (170, 220, 255)), "pink": ((255, 160, 200), (255, 190, 215))}
CAST = ["detective-1", "detective-2", "detective-3", "dumpling-1", "dumpling-2", "dumpling-3", "chicken-1", "chicken-2", "chicken-3", "pizza-2", "pizza-3"]
def font(s):
    for p in ("/usr/share/fonts/truetype/google-fonts/Poppins-Bold.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"):
        if os.path.exists(p): return ImageFont.truetype(p, s)
    return ImageFont.load_default()
def burst(W, H, c1, c2, n=24):
    im = Image.new("RGB", (W, H), c1); d = ImageDraw.Draw(im); cx, cy = W // 2, 520
    for i in range(n):
        a0 = 2 * math.pi * i / n; a1 = 2 * math.pi * (i + .5) / n
        d.polygon([(cx, cy), (cx + 3000 * math.cos(a0), cy + 3000 * math.sin(a0)), (cx + 3000 * math.cos(a1), cy + 3000 * math.sin(a1))], fill=c2)
    return im.convert("RGBA")
def main():
    out, title, sub, src, url = sys.argv[1:6]; theme = sys.argv[6] if len(sys.argv) > 6 else "yellow"
    W, H = 1000, 1500; c1, c2 = THEMES[theme]; im = burst(W, H, c1, c2); d = ImageDraw.Draw(im)
    y = 150
    for t in title.split("|"):
        d.text((W // 2 + 7, y + 7), t, font=font(104), fill=NAVY, anchor="mm"); d.text((W // 2, y), t, font=font(104), fill="white", anchor="mm"); y += 122
    f = font(46); pw = d.textlength(sub, font=f) + 80
    d.rounded_rectangle([W // 2 - pw / 2, y + 10, W // 2 + pw / 2, y + 100], 45, fill=(255, 94, 138), outline=NAVY, width=6)
    d.text((W // 2, y + 55), sub, font=f, fill="white", anchor="mm")
    s = Image.open(src).convert("RGB"); s.thumbnail((720, 720)); pad = 14
    fr = Image.new("RGB", (s.width + 2 * pad, s.height + 2 * pad), "white"); fr.paste(s, (pad, pad))
    sh = Image.new("RGBA", (fr.width + 30, fr.height + 30), (0, 0, 0, 0)); ImageDraw.Draw(sh).rectangle([14, 14, fr.width + 14, fr.height + 14], fill=NAVY + (255,))
    ch = Image.new("RGBA", sh.size, (0, 0, 0, 0)); ch.paste(fr, (0, 0))
    lay = Image.alpha_composite(sh, ch).rotate(-3, expand=True, resample=Image.BICUBIC)
    im.alpha_composite(lay, ((W - lay.width) // 2, y + 170))
    a, b = random.sample(CAST, 2)
    for name, x, h in ((a, 90, 400), (b, W - 330, 360)):
        c = Image.open(os.path.join(ROOT, "assets", "cast", name + ".png")).convert("RGBA"); w = int(c.width * h / c.height)
        im.alpha_composite(c.resize((w, h), Image.LANCZOS), (x, H - h - 150))
    d.rounded_rectangle([120, H - 120, W - 120, H - 30], 45, fill="white", outline=NAVY, width=6)
    d.text((W // 2, H - 75), url, font=font(40), fill=NAVY, anchor="mm")
    im.convert("RGB").save(out); print("saved", out)
main()
