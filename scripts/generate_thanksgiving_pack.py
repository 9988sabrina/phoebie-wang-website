"""Build downloads/Phoebie-Thanksgiving-Mini-Pack.pdf (3 pages, US Letter) from an HTML template.

Uses the system Chromium via Playwright so the Chinese characters embed correctly.
Run from the repo root:  python3 scripts/generate_thanksgiving_pack.py
"""
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "downloads" / "Phoebie-Thanksgiving-Mini-Pack.pdf"

ELEVEN = [23, 34, 52, 71, 45, 18, 36, 63, 27, 48, 59, 87]
HALF = [12, 14, 16, 18, 22, 24, 26, 28, 32, 36, 44, 48]

CSS = """
@page{size:letter;margin:0.6in 0.65in}
*{box-sizing:border-box;margin:0}
body{font-family:"Avenir Next",Avenir,"Segoe UI","Noto Sans CJK SC","PingFang SC",sans-serif;color:#14213D;font-size:11pt;line-height:1.4}
.page{height:9.8in;page-break-after:always;position:relative}
.page:last-child{page-break-after:auto}
.top{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2px solid #14213D;padding-bottom:6pt;margin-bottom:10pt}
.top small{font-weight:800;letter-spacing:.12em;font-size:8pt;color:#D62839}
h1{font-size:22pt;line-height:1.05;font-weight:800;letter-spacing:-.02em}
.name{font-size:9pt;color:#4a5568;text-align:right}
.hint{margin:0 0 10pt;padding:8pt 11pt;border-left:4px solid #FFD23F;background:#FFF8E1;font-size:10pt}
.hint b{color:#B01E2E}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:9pt}
.card{border:2px solid #14213D;border-radius:9pt;padding:9pt 10pt 8pt;min-height:1.15in}
.card .ico{font-size:14pt}
.card .q{font-family:Georgia,serif;font-size:18pt;font-weight:800;margin:3pt 0 8pt}
.card .line{height:.3in;border-bottom:1.5px solid #9aa4ad}
.steps{margin-top:10pt;font-size:9.5pt;color:#4a5568}
.foot{position:absolute;left:0;right:0;bottom:0;display:flex;justify-content:space-between;font-size:8pt;color:#4a5568;border-top:1px solid #d8d6cb;padding-top:5pt}
.say{display:flex;gap:12pt;margin:0 0 10pt}
.say div{flex:1;border:1px solid #d8d6cb;border-radius:9pt;padding:7pt 11pt;font-size:10pt}
.say b{display:block;font-family:"Kaiti SC","STKaiti","KaiTi","Noto Serif CJK SC",serif;font-size:20pt;font-weight:400}
.row{display:grid;grid-template-columns:repeat(5,1fr);gap:8pt;margin-bottom:9pt}
.tian{position:relative;aspect-ratio:1;border:2px solid #D62839;background:
  linear-gradient(#f3b6bb 0 0) 50% 0/1px 100% no-repeat,
  linear-gradient(#f3b6bb 0 0) 0 50%/100% 1px no-repeat,#fff}
.tian span{position:absolute;inset:0;display:grid;place-items:center;font-family:"Kaiti SC","STKaiti","KaiTi","Noto Serif CJK SC",serif;font-size:58pt;line-height:1;color:#b9c2cc}
.tian span.g{color:#e1e6ea}
.lbl{font-size:9pt;color:#4a5568;margin:0 0 3pt}
.thank{margin-top:8pt;border:2px dashed #14213D;border-radius:9pt;padding:9pt 11pt}
.thank p{font-weight:800;margin-bottom:2pt}
.thank .ln{height:.36in;border-bottom:1.5px solid #9aa4ad}
.key{margin-top:12pt;font-size:9pt;color:#4a5568;border-top:1px dashed #9aa4ad;padding-top:6pt}
"""


def top(title, page):
    return (f'<div class="top"><div><small>PHOEBIE\'S LEARNING LAB · THANKSGIVING MINI-PACK</small><h1>{title}</h1></div>'
            f'<div class="name">Name ____________________<br>Date __________</div></div>')


def foot(page):
    return (f'<div class="foot"><span>Free printable · www.phoebiewang.com/thanksgiving.html · more packs on Etsy: PhoebieCreates</span>'
            f'<span>Page {page} of 3</span></div>')


def cards(nums, b, ico):
    return '<div class="grid">' + "".join(
        f'<div class="card"><span class="ico">{ico}</span><p class="q">{a} × {b} =</p><div class="line"></div></div>' for a in nums) + "</div>"


def tian(ch, ghost=False):
    return f'<div class="tian"><span class="{"g" if ghost else ""}">{ch}</span></div>'


def page1():
    return ('<section class="page">' + top("Turkey times 11 🦃", 1) +
            '<div class="hint"><b>The trick:</b> split the two digits, add them, and write the sum in the middle. '
            '23 × 11 → 2, (2+3), 3 → <b>253</b>. If the middle is 10 or more, carry 1 to the left: 59 × 11 → 5, 14, 9 → <b>649</b>.</div>' +
            cards(ELEVEN, 11, "🦃") +
            '<p class="steps">Say the trick out loud as you go: "first digit, add the middle, last digit." Check with a grown-up after six.</p>' +
            foot(1) + "</section>")


def page2():
    return ('<section class="page">' + top("Pumpkin pie halves 🥧", 2) +
            '<div class="hint"><b>The trick:</b> halve the even number and double the 5. 14 × 5 → 7 × 10 = <b>70</b>. '
            'The answer stays the same because the 2 just moves across.</div>' +
            cards(HALF, 5, "🥧") +
            '<p class="steps">Write the easy problem underneath first (7 × 10), then the answer. Fast finishers: try 15 × 24 the same way.</p>' +
            foot(2) + "</section>")


def page3():
    rows = ""
    for ch, py in (("谢", "xiè"), ("感", "gǎn"), ("恩", "ēn")):
        rows += f'<p class="lbl">{ch} · {py}</p><div class="row">' + tian(ch) + tian(ch, True) + tian(ch, True) + '<div class="tian"></div><div class="tian"></div></div>'
    return ('<section class="page">' + top("Trace 谢谢 and 感恩 🙏", 3) +
            '<div class="say"><div><b>谢谢</b>xiè xie · thank you</div><div><b>感恩</b>gǎn ēn · to be grateful</div></div>' +
            rows +
            '<div class="thank"><p>I am thankful for… 我感恩…</p><div class="ln"></div><div class="ln"></div></div>' +
            '<div class="key"><b>Answer key.</b> Page 1: ' + ", ".join(f"{a}×11={a*11}" for a in ELEVEN) +
            '. Page 2: ' + ", ".join(f"{a}×5={a*5}" for a in HALF) + '.</div>' +
            foot(3) + "</section>")


def main():
    html = f'<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Thanksgiving Mini-Pack</title><style>{CSS}</style></head><body>{page1()}{page2()}{page3()}</body></html>'
    OUT.parent.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.set_content(html, wait_until="load")
        page.emulate_media(media="print")
        page.pdf(path=str(OUT), format="Letter", print_background=True, prefer_css_page_size=True)
        browser.close()
    print("wrote", OUT, OUT.stat().st_size, "bytes")


if __name__ == "__main__":
    main()
