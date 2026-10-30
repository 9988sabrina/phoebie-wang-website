from gen import *
import math
def star(cx,cy,r1,r2,n=12,fill=RED):
    pts=[]
    for i in range(n*2):
        r=r1 if i%2==0 else r2; a=math.pi*i/n-math.pi/2
        pts.append(f"{cx+r*math.cos(a):.1f},{cy+r*math.sin(a):.1f}")
    return f'<polygon points="{" ".join(pts)}" fill="{fill}" stroke="{NAVY}" stroke-width="6" stroke-linejoin="round"/>'
LP="#FFE3E6";LM="#D9F1EE"

# ---- A: the missing middle
A=[
(YEL, cap(14,12,357,"43 × 11 = 4 _ 3")+det(20,140,1.0)+bubble(120,74,255,["Who stole the","middle digit?!"],150,176)),
(SKY, det(-22,160,.9,"shock")+big(338,232,"7",120,RED,extra='transform="rotate(12 338 232)"')+dumpling(272,262,1.0,"smug")
      +bubble(14,16,230,["You! Dumpling!"],110,170,size=30)+bubble(262,84,112,["...No."],290,196,size=30)),
(LP, dumpling(192,236,1.25,"sweat")+bubble(24,14,337,["I was just keeping","it warm!"],192,130,size=32)+star(192,330,74,52,fill=YEL)+big(192,368,"7",116,RED,extra=f'stroke="{NAVY}" stroke-width="6" paint-order="stroke"')),
(LM, cap(14,12,357,"4 + 3 = 7")+big(192,160,"4 7 3",100)+det(6,182,.72)+bubble(152,178,222,["Case closed!"],136,262,size=32)
      +dumpling(334,360,.4,"meh")+bubble(232,268,140,["Can I go?"],322,338,size=24)),
]
comic("Case file: The missing middle",A,'../../assets/comics/strip-missing-middle.svg')

# ---- B: chicken slippers
B=[
(YEL, cap(14,12,357,"10 heads. 28 legs.")+chicken(300,232,.7)+det(-8,160,.88)+bubble(12,72,226,["That chicken","has bunny feet?"],110,176,size=27)),
(SKY, chicken(192,222,1.08)+bubble(70,14,296,["They're slippers."],190,110,size=34)+det(-24,238,.52,"sweat")),
(LP,  det(14,170,.95,"sweat")+bubble(14,16,357,["10 heads... 28 legs...","my brain hurts"],120,176,size=29)+chicken(300,262,.6,"calm")+bubble(212,116,160,["Math is hard."],300,168,size=24)),
(LM,  chicken(250,262,.9,"sleep")+det(-6,176,.88,"sleepy")+bubble(14,18,357,["Case postponed.","(Solve it after nap.)"],110,150,size=31)
      +big(344,222,"Z",54,NAVY)+big(366,184,"z",36,NAVY)),
]
comic("Case file: Chicken slippers",B,'../../assets/comics/strip-chicken-slippers.svg')

# ---- C: please don't pop
C=[
(SKY, bubblechar(192,238,100,"好","happy")+bubble(18,16,350,["I'm having a 好 day!"],170,150,size=31)),
(YEL, '<rect x="150" y="-30" width="88" height="170" rx="40" fill="#FFD7B5" stroke="#14213D" stroke-width="6"/><path d="M168 126q26 -10 52 0" stroke="#14213D" stroke-width="5" fill="none"/><rect x="170" y="118" width="48" height="26" rx="12" fill="#fff" stroke="#14213D" stroke-width="4"/>'
      +bubblechar(176,288,72,"好","scared")+bubble(258,168,116,["Nope!","Nope!"],236,306,size=30)),
(LP,  star(192,192,160,102)+big(192,226,"POP!",100,YEL,extra=f'stroke="{NAVY}" stroke-width="7" paint-order="stroke" transform="rotate(-6 192 200)"')
      +f'<circle cx="64" cy="76" r="9" fill="{SKY}" stroke="{NAVY}" stroke-width="4"/><circle cx="326" cy="300" r="12" fill="{SKY}" stroke="{NAVY}" stroke-width="4"/><circle cx="330" cy="70" r="7" fill="{SKY}" stroke="{NAVY}" stroke-width="4"/>'),
(LM,  bubblechar(192,262,86,"学","huh")+bubble(24,18,337,["Wait... where","did 好 go?"],178,170,size=33)),
]
comic("Case file: Please don't pop",C,'../../assets/comics/strip-dont-pop.svg')
