"""Overlay lettering on the text-free ChatGPT panels (strip 3, 'Do not pop').
usage: python3 lettering.py raw_675.png out.png   (coords are for a 675x675 source)"""
from PIL import Image, ImageDraw, ImageFont
import sys
S=2
src=Image.open(sys.argv[1]).convert('RGB')
# hide the stray mouse cursor captured in the screenshot (copy clean pink background over it)
src.paste(src.crop((318,458,346,498)),(318,404))
src=src; src=src.resize((src.width*S,src.height*S),Image.LANCZOS)
d=ImageDraw.Draw(src)
FONT='/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc'  # index 2 = Simplified Chinese, also has Latin
F=lambda s:ImageFont.truetype(FONT,int(s*S),index=2)
NAVY=(20,30,70)
def bubble(box,lines,size,tail):
    x0,y0,x1,y1=[v*S for v in box]; tx,ty=[v*S for v in tail]
    d.rounded_rectangle((x0,y0,x1,y1),radius=20*S,fill='white',outline=NAVY,width=3*S)
    bx=min(max(tx,x0+28*S),x1-28*S); by=y1 if ty>y1 else y0
    d.polygon([(bx-11*S,by),(bx+11*S,by),(tx,ty)],fill='white',outline=NAVY)
    d.line([(bx-9*S,by),(bx+9*S,by)],fill='white',width=5*S)
    f=F(size); lh=size*1.3*S; y=(y0+y1)/2-lh*len(lines)/2; cx=(x0+x1)/2
    for ln in lines:
        w=d.textlength(ln,font=f); d.text((cx-w/2,y),ln,font=f,fill=NAVY); y+=lh
def mark(pt,txt,size,fill=NAVY):
    f=F(size); w=d.textlength(txt,font=f); d.text((pt[0]*S-w/2,pt[1]*S-size*S*0.72),txt,font=f,fill=fill)
def pop(pt,txt,size):
    f=F(size); w=d.textlength(txt,font=f); x=pt[0]*S-w/2; y=pt[1]*S-size*S*0.6
    d.text((x,y),txt,font=f,fill=(230,70,40),stroke_width=4*S,stroke_fill='white')
bubble((60,12,290,68),["I'm having","a 好 day!"],13,(178,84))
mark((160,222),'好',48)
bubble((355,20,525,66),["Please don't!"],15,(440,128))
pop((167,502),'POP!',46)
bubble((400,358,665,416),["Where did 好 go?"],15,(500,470))
mark((522,572),'学',40)
src.save(sys.argv[2],optimize=True)
