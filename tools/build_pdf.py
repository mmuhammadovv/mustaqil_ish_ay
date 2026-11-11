"""Mustaqil ish HTML faylidan printerga tayyor PDF yasaydi va rejadagi sahifa raqamlarini avtomatik toʻgʻrilaydi.

Ishlatish (repo ildizidan):
    python3 tools/build_pdf.py mustaqil-ishlar/akademik-yozuv

Talablar: node + playwright (chromium), python3 + pypdf.
Rejadagi har bir <li data-key="..."> elementi sarlavha matnini PDFdan qidiradi.
"""
import html as H
import os
import re
import subprocess
import sys
import tempfile

from pypdf import PdfReader, PdfWriter

folder = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else "mustaqil-ishlar/akademik-yozuv")
src = os.path.join(folder, "index.html")
out = os.path.join(folder, "Mustaqil_ish_Muxamadov_Muhammadali.pdf")
pdfjs = os.path.join(os.path.dirname(os.path.abspath(__file__)), "pdf.js")
tmp = tempfile.mkdtemp()

for _ in range(4):
    subprocess.run(["node", pdfjs, src, tmp + "/nofoot.pdf"], check=True)
    subprocess.run(["node", pdfjs, src, tmp + "/foot.pdf", "1"], check=True)
    b = PdfReader(tmp + "/foot.pdf")
    texts = [p.extract_text().replace("\n", " ") for p in b.pages]
    # titul va reja qismini qidiruvdan chiqarib tashlash
    for i, t in enumerate(texts):
        if "KIRISH" in t:
            texts[i] = t[t.index("KIRISH"):]
            break
        texts[i] = ""
    s = open(src, encoding="utf-8").read()
    changed = False

    def fix(m):
        global changed
        key = H.unescape(m.group(2))
        n = next(i + 1 for i, t in enumerate(texts) if key in t)
        if m.group(4) != str(n):
            changed = True
        return m.group(1) + m.group(2) + m.group(3) + str(n)

    s = re.sub(r'(<li[^>]*data-key=")([^"]+)("[^>]*><span>.*?</span><span class="dots"></span><span>)(\d+)', fix, s)
    open(src, "w", encoding="utf-8").write(s)
    print("betlar:", len(texts), "| reja oʻzgardi:", changed)
    if not changed:
        break

a = PdfReader(tmp + "/nofoot.pdf")
w = PdfWriter()
w.add_page(a.pages[0])  # titul varagʻi sahifa raqamisiz
for p in b.pages[1:]:
    w.add_page(p)
w.write(out)
print("Tayyor:", out)
