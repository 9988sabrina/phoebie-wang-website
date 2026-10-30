"""Overlay lettering on the text-free ChatGPT panels (strip 1, 'The missing middle').
usage: python3 lettering.py raw_675.png out.png   (coords are for a 675x675 source)"""
from PIL import Image, ImageDraw, ImageFont
import sys
S=2
src=Image.open(sys.argv[1]).convert('RGB'); src=src.resize((src.width*S,src.height*S),Image.LANCZOS)
d=ImageDraw.Draw(src)
FONT='/usr/share/fonts/truetype/google-fonts/Poppins-Bold.ttf'
F=lambda s:ImageFont.truetype(FONT,int(s*S))
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
mark((178,176),'4',26); mark((239,188),'?',30,(200,40,40)); mark((297,180),'3',26)
bubble((150,14,330,92),['Who stole the','middle digit?!'],14,(152,108))
bubble((430,14,655,84),['You! Dumpling!','Where is the 7?'],14,(430,106))
mark((179,578),'7',34,(150,95,0))
bubble((22,344,332,420),['I was just keeping','it warm!'],15,(235,448))
bubble((500,346,665,420),['Case closed!','43 × 11 = 473'],13,(480,436))
src.save(sys.argv[2],optimize=True)
