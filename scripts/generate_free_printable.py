from pathlib import Path
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "assets" / "downloads" / "double-half-try-it-sheet.pdf"
PAGE_W, PAGE_H = letter
MARGIN = 0.72 * inch

def header(c, title, subtitle, page):
    c.setFillColorRGB(0.12, 0.20, 0.25)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(MARGIN, PAGE_H - 42, "PHOEBIE'S LEARNING LAB")
    c.setFont("Helvetica-Bold", 22)
    c.drawString(MARGIN, PAGE_H - 72, title)
    c.setFont("Helvetica", 10)
    c.setFillColorRGB(0.30, 0.34, 0.37)
    c.drawString(MARGIN, PAGE_H - 90, subtitle)
    c.setStrokeColorRGB(0.20, 0.25, 0.28)
    c.line(MARGIN, PAGE_H - 102, PAGE_W - MARGIN, PAGE_H - 102)
    c.setFont("Helvetica", 8)
    c.drawRightString(PAGE_W - MARGIN, 26, f"Free printable | Page {page} of 2")

def answer_line(c, x, y, width=188):
    c.setStrokeColorRGB(0.55, 0.55, 0.55)
    c.line(x, y, x + width, y)

def create_pdf():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=letter, pageCompression=1)
    c.setTitle("Double & Half - Try It Sheet")
    c.setAuthor("Phoebie's Learning Lab")

    header(c, "Double & Half - Try It Sheet", "Name: ____________________    Date: __________", 1)
    y = PAGE_H - 132
    c.setFont("Helvetica-Bold", 12); c.drawString(MARGIN, y, "The idea")
    y -= 22
    c.setFont("Helvetica", 10)
    c.drawString(MARGIN, y, "Halve one factor and double the other. The product stays the same because the factor of 2 moves.")
    y -= 34
    c.setFillColorRGB(0.94, 0.94, 0.92); c.roundRect(MARGIN, y - 72, PAGE_W - 2*MARGIN, 82, 8, fill=1, stroke=0)
    c.setFillColorRGB(0.10, 0.10, 0.10); c.setFont("Helvetica-Bold", 18)
    c.drawCentredString(PAGE_W/2, y - 10, "48 x 25  =  24 x 50  =  12 x 100  =  1200")
    c.setFont("Helvetica-Bold", 9)
    c.drawCentredString(PAGE_W/2, y - 34, "divide by 2          multiply by 2          repeat once")
    c.setFont("Helvetica", 9)
    c.drawCentredString(PAGE_W/2, y - 56, "(2 x 24) x 25 = 24 x (2 x 25), so the amount does not change.")
    y -= 106
    c.setFont("Helvetica-Bold", 12); c.drawString(MARGIN, y, "Try it")
    c.setFont("Helvetica", 9); c.drawRightString(PAGE_W - MARGIN, y, "Write one friendlier equation, then solve.")
    problems = [(36,25),(64,25),(28,50),(52,25),(46,50),(72,25)]
    y -= 32
    col_w = (PAGE_W - 2*MARGIN - 24) / 2
    for index, (a,b) in enumerate(problems):
        col = index % 2; row = index // 2
        x = MARGIN + col * (col_w + 24); py = y - row * 120
        c.setStrokeColorRGB(0.75,0.75,0.72); c.roundRect(x, py-92, col_w, 102, 6, fill=0, stroke=1)
        c.setFillColorRGB(0.1,0.1,0.1); c.setFont("Helvetica-Bold", 13); c.drawString(x+12, py-14, f"{index+1}.  {a} x {b} =")
        c.setFont("Helvetica", 8); c.drawString(x+12, py-40, "Friendlier equation:")
        answer_line(c, x+12, py-55, col_w-24)
        c.drawString(x+12, py-75, "Answer:"); answer_line(c, x+58, py-76, col_w-70)
    c.setFont("Helvetica-Oblique", 8); c.drawString(MARGIN, 42, "Check: Did you halve an even factor and double the other factor?")
    c.showPage()

    header(c, "Answers & Parent Tips", "Use the explanation, not speed, as the goal.", 2)
    y = PAGE_H - 132
    c.setFont("Helvetica-Bold", 12); c.drawString(MARGIN, y, "Answers")
    answers = [
        "1. 36 x 25 = 18 x 50 = 9 x 100 = 900",
        "2. 64 x 25 = 32 x 50 = 16 x 100 = 1600",
        "3. 28 x 50 = 14 x 100 = 1400",
        "4. 52 x 25 = 26 x 50 = 13 x 100 = 1300",
        "5. 46 x 50 = 23 x 100 = 2300",
        "6. 72 x 25 = 36 x 50 = 18 x 100 = 1800",
    ]
    c.setFont("Helvetica", 11)
    for answer in answers: y -= 32; c.drawString(MARGIN + 12, y, answer)
    y -= 38
    c.setStrokeColorRGB(0.25,0.25,0.25); c.line(MARGIN, y, PAGE_W-MARGIN, y); y -= 28
    c.setFont("Helvetica-Bold", 12); c.drawString(MARGIN, y, "Parent prompts")
    tips = [
        "Ask: Which factor is even? What happens if you halve it?",
        "Ask: Where did the factor of 2 go? Listen for: it moved to the other factor.",
        "If the answer is off by a zero, compare it with an estimate before correcting it.",
        "Let the learner write a different but equivalent path when the product stays equal.",
    ]
    c.setFont("Helvetica", 10)
    for tip in tips: y -= 30; c.drawString(MARGIN + 12, y, f"- {tip}")
    y -= 42
    c.setFillColorRGB(0.94,0.94,0.92); c.roundRect(MARGIN, y-72, PAGE_W-2*MARGIN, 84, 8, fill=1, stroke=0)
    c.setFillColorRGB(0.1,0.1,0.1); c.setFont("Helvetica-Bold", 11); c.drawString(MARGIN+14, y-10, "One-sentence explanation")
    c.setFont("Helvetica", 10); c.drawString(MARGIN+14, y-32, "I can halve one factor and double the other because ________________________________.")
    answer_line(c, MARGIN+14, y-56, PAGE_W-2*MARGIN-28)
    c.setFont("Helvetica", 8); c.drawString(MARGIN, 42, "Free for personal learning. Parent review recommended. No account or email required.")
    c.save()

if __name__ == "__main__":
    create_pdf()
