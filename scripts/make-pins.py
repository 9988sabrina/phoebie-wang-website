import sys,re
from playwright.sync_api import sync_playwright
root="http://127.0.0.1:4173/"
nine=open('nine-trick.html',encoding='utf-8').read()
hands=nine[nine.index('<svg viewBox="0 0 400 200"'):nine.index('</svg>',nine.index('<svg viewBox="0 0 400 200"'))+6]
# fold finger 4: 3 tens, 6 ones
def cls(m):
    i=int(m.group(1)); c="fold" if i==4 else ("tens" if i<4 else "ones")
    return 'class="finger %s" data-finger="%d"'%(c,i)
hands=re.sub(r'class="finger" data-finger="(\d+)"',cls,hands)
def bar(k): return '<span class="bar %s">%s</span>'%(k,'<i></i>'*(10 if k=="ten" else 5))
grid=''.join('<span class="%s">%s</span>'%(("hd" if r==0 or c==0 else ("hit" if (r==7 and c==8) else ("row" if r==7 or c==8 else ""))), ("×" if r==0 and c==0 else (c if r==0 else (r if c==0 else r*c)))) for r in range(0,10) for c in range(0,10))
tian=''.join('<span class="tian">%s</span>'%ch for ch in "谢感恩")
pins={
 "parking-jam":("#DFF3FC","FREE PUZZLE GAME","Can you clear the Parking Jam?",'<img class="board" src="%sassets/jam-board.jpg">'%root,"60 levels · a new jam every day · ages 6+","detective-1"),
 "five-trick":("#FFF3C4","MENTAL MATH TRICK","Multiply by 5 in a flash",'<div class="bars">%s</div><p class="eq">8 × 5 = <b>4</b><i>0</i></p><p class="how">Half of 8 is 4. Put a 0 on the end.</p>'%(bar("ten")*4),"Free interactive page + practice · ages 6–11","dumpling-1"),
 "nine-trick":("#FFE3DC","MENTAL MATH TRICK","Multiply by 9 with your fingers",'<div class="hands">%s</div><p class="eq">4 × 9 = <b>3</b><i>6</i></p><p class="how">Fold finger 4. Count 3 on the left, 6 on the right.</p>'%hands,"Free interactive page + practice · ages 5–10","chicken-1"),
 "times-table":("#E3F7EF","FREE & PRINTABLE","Times table chart you can tap",'<div class="tt">%s</div><p class="how">Light up a row, read a tip for every table, hide squares to quiz yourself.</p>'%grid,"Tap it online or print it · grades 2–5","detective-2"),
 "thanksgiving":("#FFF1D6","FREE THANKSGIVING PRINTABLE","Thanksgiving math & 中文 mini-pack",'<div class="tg"><p class="eq">43 × 11 = <b>4</b><i>7</i><b>3</b></p><div class="tians">%s</div><p class="how">×11 trick · double and half · trace 谢 感 恩 · “I am thankful for…”</p></div>'%tian,"3 free pages with answers · play online or print","dumpling-2"),
}
css='''*{box-sizing:border-box;margin:0}body{width:1000px;height:1500px;font-family:"Avenir Next","Inter","Segoe UI",system-ui,"Noto Sans CJK SC",sans-serif;color:#14213D;overflow:hidden}
.pin{width:1000px;height:1500px;padding:70px 70px 0;display:flex;flex-direction:column;background-image:linear-gradient(rgba(20,33,61,.07) 2px,transparent 2px),linear-gradient(90deg,rgba(20,33,61,.07) 2px,transparent 2px);background-size:50px 50px}
.k{display:inline-block;align-self:flex-start;padding:10px 24px;border:4px solid #14213D;border-radius:999px;background:#FFD23F;font-weight:900;font-size:30px;letter-spacing:.06em}
h1{margin-top:30px;font-size:104px;line-height:1;font-weight:900;letter-spacing:-.035em}
.v{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px;margin:34px 0;padding:36px;border:5px solid #14213D;border-radius:28px;background:#fff;box-shadow:14px 14px 0 #14213D}
.board{width:100%;max-width:700px;border:5px solid #14213D;border-radius:20px}
.pin.jam .v{padding:28px;background:#DFF3FC}
.bars{display:grid;grid-template-columns:1fr 1fr;gap:22px}
.bar{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;padding:14px;border:4px solid #14213D;border-radius:18px;background:#9fd3f0}
.bar i{width:44px;height:44px;border-radius:50%;background:#14213D}
.eq{font:800 110px Georgia,serif;letter-spacing:-.02em}.eq b{color:#1f6f9a}.eq i{font-style:normal;color:#B01E2E}
.how{font-size:38px;font-weight:700;text-align:center;color:#4a5568;line-height:1.3}
.hands{width:100%}.hands svg{width:100%;height:auto}
.palm,.finger{fill:#FFD9B8;stroke:#14213D;stroke-width:4}.finger{transform-box:fill-box;transform-origin:50% 100%}
.finger.tens{fill:#9fd3f0}.finger.ones{fill:#ffb8a8}.finger.fold{fill:#cfd6dc;transform:scaleY(.32)}.finger.fold+.fnum{opacity:0}
.fnum{font:900 15px system-ui,sans-serif;fill:#14213D}
.tt{display:grid;grid-template-columns:repeat(10,1fr);gap:6px;width:640px}
.tt span{display:grid;place-items:center;aspect-ratio:1;border:3px solid #14213D;border-radius:10px;font-weight:800;font-size:26px;background:#fff}
.tt .hd{background:#14213D;color:#fff}.tt .row{background:#FFF3C4}.tt .hit{background:#D62839;color:#fff}
.tians{display:flex;gap:24px}.tian{display:grid;place-items:center;width:210px;height:210px;border:5px solid #D62839;font:700 150px "Kaiti SC","Noto Serif CJK SC",serif;color:rgba(20,33,61,.28);background:linear-gradient(#D62839,#D62839) center/2px 100% no-repeat,linear-gradient(#D62839,#D62839) center/100% 2px no-repeat,#fff}
.tg{display:flex;flex-direction:column;align-items:center;gap:34px}
.f{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin:0 -70px;padding:26px 70px 30px;background:#14213D;color:#fff}
.f .s{font-size:34px;font-weight:700;opacity:.9;line-height:1.25}.f .u{margin-top:8px;font-size:52px;font-weight:900;color:#FFD23F}
.f img{height:230px;margin:-120px 0 -30px}'''
out=sys.argv[1]
with sync_playwright() as p:
    b=p.chromium.launch()
    pg=b.new_page(viewport={"width":1000,"height":1500})
    for name,(bg,k,title,vis,sub,cast) in pins.items():
        html='<!doctype html><meta charset="utf-8"><style>%s</style><div class="pin %s" style="background-color:%s"><span class="k">%s</span><h1>%s</h1><div class="v">%s</div><div class="f"><div><p class="s">%s</p><p class="u">phoebiewang.com</p></div><img src="%sassets/cast/%s.png"></div></div>'%(css,"jam" if name=="parking-jam" else "",bg,k,title,vis,sub,root,cast)
        pg.set_content(html); pg.wait_for_timeout(500)
        pg.screenshot(path="%s/pin-%s.jpg"%(out,name),type="jpeg",quality=88)
    b.close()
