import re,html,math
NAVY="#14213D";RED="#D62839";YEL="#FFD23F";MINT="#2A9D8F";SKY="#BFE3F5";PINK="#FFB3BA"
FONT='"Avenir Next","Trebuchet MS",system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif'
KAI='"Kaiti SC","STKaiti","KaiTi","BiauKai","Noto Serif CJK SC",serif'
pr=open(__import__('os').path.join(__import__('os').path.dirname(__file__),'..','..','printables.html'),encoding='utf-8').read()
MASC=re.search(r'<symbol id="mascot"[^>]*>(.*?)</symbol>',pr,re.S).group(1)

def esc(t): return html.escape(t,quote=False)
def det(x,y,s=1.0,mood="happy",flip=False):
    g=f'<g transform="translate({x},{y}) scale({-s if flip else s},{s}) translate({-118 if flip else 0},0)">{MASC}'
    if mood=="shock":
        g+='<ellipse cx="110" cy="146" rx="13" ry="14" fill="#B5384A" stroke="#14213D" stroke-width="3"/>'
        g+='<ellipse cx="86" cy="118" rx="14" ry="17" fill="#fff" stroke="#14213D" stroke-width="3"/><ellipse cx="134" cy="118" rx="14" ry="17" fill="#fff" stroke="#14213D" stroke-width="3"/><circle cx="86" cy="119" r="4" fill="#14213D"/><circle cx="134" cy="119" r="4" fill="#14213D"/>'
    if mood=="sweat":
        g+='<path d="M170 78q10 18 0 26q-10-8 0-26z" fill="#7FD1F5" stroke="#14213D" stroke-width="3"/>'
    if mood=="sleepy":
        g+='<path d="M72 120q14 10 28 0M120 120q14 10 28 0" stroke="#14213D" stroke-width="5" fill="none" stroke-linecap="round"/>'
    return g+'</g>'
def dumpling(x,y,s=1.0,mood="smug"):
    m={"smug":'<path d="M-18 8q18 12 36 0" stroke="#14213D" stroke-width="5" fill="none" stroke-linecap="round"/>',
       "sweat":'<ellipse cx="0" cy="12" rx="9" ry="6" fill="#14213D"/><path d="M52 -20q9 16 0 24q-9-8 0-24z" fill="#7FD1F5" stroke="#14213D" stroke-width="3"/>',
       "meh":'<path d="M-14 12h28" stroke="#14213D" stroke-width="5" stroke-linecap="round"/>'}[mood]
    return f'''<g transform="translate({x},{y}) scale({s})">
<ellipse cx="0" cy="62" rx="76" ry="14" fill="#14213D" opacity=".15"/>
<path d="M-78 52c-12-62 28-112 78-112s90 50 78 112c-30 16-126 16-156 0z" fill="#fff" stroke="#14213D" stroke-width="6" stroke-linejoin="round"/>
<path d="M-40 -42q10-18 20-2M-10 -52q10-16 20 0M20 -44q10-16 22 2" stroke="#14213D" stroke-width="5" fill="none" stroke-linecap="round"/>
<circle cx="-30" cy="-6" r="7" fill="#14213D"/><circle cx="30" cy="-6" r="7" fill="#14213D"/>
<ellipse cx="-50" cy="12" rx="12" ry="7" fill="{PINK}"/><ellipse cx="50" cy="12" rx="12" ry="7" fill="{PINK}"/>
{m}</g>'''
def chicken(x,y,s=1.0,mood="calm"):
    eyes='<circle cx="-22" cy="-20" r="7" fill="#14213D"/><circle cx="22" cy="-20" r="7" fill="#14213D"/>' if mood!="sleep" else '<path d="M-32 -20q10 8 20 0M12 -20q10 8 20 0" stroke="#14213D" stroke-width="5" fill="none" stroke-linecap="round"/>'
    return f'''<g transform="translate({x},{y}) scale({s})">
<ellipse cx="0" cy="118" rx="96" ry="14" fill="#14213D" opacity=".15"/>
<path d="M-26 -78q-12-38 12-36q4-26 26-12q22-14 28 12q24 0 12 36z" fill="{RED}" stroke="#14213D" stroke-width="5" stroke-linejoin="round"/>
<ellipse cx="0" cy="10" rx="82" ry="84" fill="#fff" stroke="#14213D" stroke-width="6"/>
<path d="M-82 14q-34 8-26 40q30-6 40-26z" fill="#fff" stroke="#14213D" stroke-width="5" stroke-linejoin="round"/><path d="M82 14q34 8 26 40q-30-6-40-26z" fill="#fff" stroke="#14213D" stroke-width="5" stroke-linejoin="round"/>
{eyes}
<path d="M-14 -4l14 18l14-18z" fill="#FF9F1C" stroke="#14213D" stroke-width="4" stroke-linejoin="round"/>
<path d="M-26 90v22M26 90v22" stroke="#FF9F1C" stroke-width="9" stroke-linecap="round"/>
<g><ellipse cx="-34" cy="118" rx="38" ry="17" fill="{PINK}" stroke="#14213D" stroke-width="5"/><path d="M-56 104q-14-44 4-46q10 10 8 40M-26 104q-8-46 12-44q8 12 0 42" fill="{PINK}" stroke="#14213D" stroke-width="4" stroke-linejoin="round"/>
<ellipse cx="34" cy="118" rx="38" ry="17" fill="{PINK}" stroke="#14213D" stroke-width="5"/><path d="M12 104q-14-44 4-46q10 10 8 40M42 104q-8-46 12-44q8 12 0 42" fill="{PINK}" stroke="#14213D" stroke-width="4" stroke-linejoin="round"/></g>
</g>'''
def bubblechar(x,y,r,glyph,mood="happy"):
    face={"happy":'<path d="M-18 %d q18 16 36 0"'%(r*.62)+' stroke="#14213D" stroke-width="5" fill="none" stroke-linecap="round"/>',
          "scared":'<ellipse cx="0" cy="%d" rx="10" ry="13" fill="#14213D"/>'%(r*.66),
          "huh":'<path d="M-16 %d h32" stroke="#14213D" stroke-width="5" stroke-linecap="round"/>'%(r*.6)}[mood]
    eyes=f'<circle cx="-24" cy="{-r*.5}" r="7" fill="#14213D"/><circle cx="24" cy="{-r*.5}" r="7" fill="#14213D"/>'
    if mood=="scared": eyes=f'<ellipse cx="-24" cy="{-r*.5}" rx="9" ry="12" fill="#fff" stroke="#14213D" stroke-width="3"/><ellipse cx="24" cy="{-r*.5}" rx="9" ry="12" fill="#fff" stroke="#14213D" stroke-width="3"/><circle cx="-24" cy="{-r*.5}" r="4" fill="#14213D"/><circle cx="24" cy="{-r*.5}" r="4" fill="#14213D"/>'
    return f'''<g transform="translate({x},{y})"><circle r="{r}" fill="{SKY}" fill-opacity=".85" stroke="#14213D" stroke-width="6"/>
<path d="M{-r*.62} {-r*.2} A{r*.7} {r*.7} 0 0 1 {-r*.1} {-r*.7}" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round"/>
{eyes}<text x="0" y="{r*.3}" text-anchor="middle" font-family='{KAI}' font-weight="700" font-size="{r*.62}" fill="{NAVY}">{glyph}</text>{face}</g>'''
def bubble(x,y,w,lines,tx,ty,size=30,fill="#fff"):
    h=len(lines)*(size+8)+26
    t=''.join(f'<text x="{x+w/2}" y="{y+22+size*0.8+i*(size+8)}" text-anchor="middle" font-family=\'{FONT}\' font-weight="800" font-size="{size}" fill="{NAVY}">{esc(l)}</text>' for i,l in enumerate(lines))
    # tail: triangle from bottom edge toward (tx,ty)
    bx=min(max(tx,x+40),x+w-40)
    ty=min(ty,y+h+52)
    tx=bx+(tx-bx)*0.35
    tail=f'<path d="M{bx-22} {y+h-3} L{tx} {ty} L{bx+20} {y+h-3}z" fill="{fill}" stroke="{NAVY}" stroke-width="4" stroke-linejoin="round"/>'
    return f'{tail}<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="18" fill="{fill}" stroke="{NAVY}" stroke-width="4"/><path d="M{bx-18} {y+h-2} L{bx+16} {y+h-2}" stroke="{fill}" stroke-width="6"/>{t}'
def cap(x,y,w,text,size=26,fill=YEL):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{size+22}" fill="{fill}" stroke="{NAVY}" stroke-width="4"/><text x="{x+w/2}" y="{y+size+4}" text-anchor="middle" font-family=\'{FONT}\' font-weight="800" font-size="{size}" fill="{NAVY}">{esc(text)}</text>'
def big(x,y,t,size,fill=NAVY,font=None,anchor="middle",extra=""):
    ff=font or FONT
    return f'<text x="{x}" y="{y}" text-anchor="{anchor}" font-family=\'{ff}\' font-weight="900" font-size="{size}" fill="{fill}" {extra}>{esc(t)}</text>'

PX=[10,405];PY=[70,465];PW=385
def comic(title,panels,out):
    defs='';body=''
    for i,(bg,content) in enumerate(panels):
        x=PX[i%2];y=PY[i//2]
        defs+=f'<clipPath id="c{i}"><rect x="{x}" y="{y}" width="{PW}" height="{PW}"/></clipPath>'
        body+=f'<g clip-path="url(#c{i})"><rect x="{x}" y="{y}" width="{PW}" height="{PW}" fill="{bg}"/>'
        body+=f'<g transform="translate({x},{y})">{content}</g></g><rect x="{x}" y="{y}" width="{PW}" height="{PW}" fill="none" stroke="{NAVY}" stroke-width="6"/>'
    svg=f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 860" width="800" height="860"><defs>{defs}</defs>
<rect width="800" height="860" fill="#fff"/><rect x="0" y="0" width="800" height="62" fill="{NAVY}"/>
<text x="400" y="42" text-anchor="middle" font-family='{FONT}' font-weight="800" font-size="30" fill="#fff">{esc(title)}</text>{body}</svg>'''
    open(out,'w',encoding='utf-8').write(svg)


def pizza(x,y,r,slices,mood="smug"):
    cuts=''
    for i in range(slices):
        a=math.pi*2*i/slices - math.pi/2
        cuts+=f'<line x1="0" y1="0" x2="{r*math.cos(a):.1f}" y2="{r*math.sin(a):.1f}" stroke="#14213D" stroke-width="5"/>'
    if slices==2: cuts='<line x1="0" y1="%d" x2="0" y2="%d" stroke="#14213D" stroke-width="5"/>'%(-r,r)
    pep=''.join(f'<circle cx="{px}" cy="{py}" r="{r*.1:.0f}" fill="{RED}" stroke="#14213D" stroke-width="3"/>' for px,py in [(-.55*r,-.35*r),(.5*r,-.5*r),(-.4*r,.55*r),(.55*r,.4*r)])
    mouth={"smug":'<path d="M-16 %d q16 12 32 0" stroke="#14213D" stroke-width="5" fill="none" stroke-linecap="round"/>'%(r*.28),
           "huff":'<path d="M-16 %d q16 -12 32 0" stroke="#14213D" stroke-width="5" fill="none" stroke-linecap="round"/>'%(r*.34),
           "hungry":'<ellipse cx="0" cy="%d" rx="12" ry="9" fill="#B5384A" stroke="#14213D" stroke-width="3"/>'%(r*.3)}[mood]
    return f'''<g transform="translate({x},{y})"><circle r="{r+10}" fill="#E8B04A" stroke="#14213D" stroke-width="6"/><circle r="{r-4}" fill="#FFD27A"/>{pep}{cuts}
<circle cx="-24" cy="{-r*.08}" r="7" fill="#14213D"/><circle cx="24" cy="{-r*.08}" r="7" fill="#14213D"/>{mouth}</g>'''

