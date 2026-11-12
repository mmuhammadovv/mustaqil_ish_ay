"""Tarix dizayni uchun SVG tasvirlarni yasaydi va theme.css ga data-URI sifatida yozadi.

- Registon/Samarqand uslubidagi chiziqli siluyet (minoralar, peshtoqli madrasalar, qovurgʻali gumbaz, Shohi Zinda gumbazchalari)
- Buxoro gʻisht teruvi teksturasi
- Sarlavha ostidagi romb naqshli hoshiya
Ishlatish: python3 tools/tarix_art.py   (theme.css dagi /*ART:...*/ belgilari orasini yangilaydi)
"""
import re
import urllib.parse
from pathlib import Path

CSS = Path(__file__).resolve().parent.parent / "oyinlar/assets/theme.css"


def niches(x0, n, step, y0=225, h=38, w=18):
    out = []
    for i in range(n):
        x = x0 + i * step
        out.append(f"M{x} {y0}V{y0-h+w/2}Q{x+w/2} {y0-h-w/3} {x+w} {y0-h+w/2}V{y0}")
    return "".join(out)


def minaret(cx, top, w_bot=12, w_top=8, ground=232):
    p = [f"M{cx-w_bot} {ground}L{cx-w_top} {top}H{cx+w_top}L{cx+w_bot} {ground}",
         f"M{cx-w_top-6} {top}H{cx+w_top+6}L{cx+w_top+2} {top-12}H{cx-w_top-2}Z",
         f"M{cx-w_top+1} {top-12}V{top-24}H{cx+w_top-1}V{top-12}",
         f"M{cx-w_top+1} {top-24}Q{cx} {top-40} {cx+w_top-1} {top-24}",
         f"M{cx} {top-36}V{top-46}"]
    span = ground - top
    for k in (0.25, 0.5, 0.75):
        y = top + span * k
        dx = w_top + (w_bot - w_top) * k
        p.append(f"M{cx-dx:.1f} {y:.1f}H{cx+dx:.1f}")
    return "".join(p)


def madrasa(x0, w=250):
    x1 = x0 + w
    cx = x0 + w / 2
    p = [f"M{x0} 232V122H{x1}V232",                                   # asosiy bino
         f"M{cx-55} 232V72H{cx+55}V232",                                # peshtoq
         f"M{cx-43} 232V84H{cx+43}V232",                                # peshtoq ramkasi
         f"M{cx-30} 232V142Q{cx} 92 {cx+30} 142V232",                   # ravoq
         f"M{cx-25} 72V60H{cx+25}V72",                                  # gumbaz tagi
         f"M{cx-27} 60C{cx-27} 22 {cx+27} 22 {cx+27} 60",               # gumbaz
         f"M{cx-13} 60Q{cx-11} 34 {cx} 28M{cx+13} 60Q{cx+11} 34 {cx} 28M{cx} 60V28",  # qovurgʻalar
         f"M{cx} 28V16",
         f"M{x0} 122V98H{x0+14}V122M{x0} 98Q{x0+7} 88 {x0+14} 98",       # guldasta chap
         f"M{x1-14} 122V98H{x1}V122M{x1-14} 98Q{x1-7} 88 {x1} 98",       # guldasta oʻng
         niches(x0 + 12, 2, 28), niches(x1 - 58, 2, 28),
         niches(x0 + 12, 2, 28, y0=172, h=34), niches(x1 - 58, 2, 28, y0=172, h=34)]
    return "".join(p)


def gur_emir(cx=540):
    p = [f"M{cx-110} 232V164H{cx+110}V232",
         f"M{cx-60} 164V112H{cx+60}V164",
         f"M{cx-70} 112C{cx-80} 26 {cx+80} 26 {cx+70} 112Z"]
    for k in range(-3, 4):
        p.append(f"M{cx+k*19} 112Q{cx+k*15} 54 {cx} 34")
    p += [f"M{cx} 34V18", f"M{cx-24} 232V196Q{cx} 170 {cx+24} 196V232",
          niches(cx - 100, 2, 26, y0=226, h=30, w=16), niches(cx + 52, 2, 26, y0=226, h=30, w=16),
          f"M{cx-60} 128H{cx+60}M{cx-60} 146H{cx+60}"]
    return "".join(p)


def domes(x0):
    p = []
    for i, h in enumerate((52, 40, 60)):
        x = x0 + i * 46
        p.append(f"M{x} 232V{232-h}H{x+40}V232M{x+2} {232-h}Q{x+20} {232-h-30} {x+38} {232-h}M{x+20} {232-h-22}V{232-h-30}")
        p.append(f"M{x+12} 232V{232-h+20}Q{x+20} {232-h+10} {x+28} {232-h+20}V232")
    return "".join(p)


def skyline(color, alpha):
    d = ("M0 232H1200" + minaret(40, 70) + madrasa(80) + minaret(410, 120, 9, 6) + gur_emir(540)
         + minaret(670, 120, 9, 6) + madrasa(700) + minaret(995, 44, 16, 11) + domes(1040))
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 240" preserveAspectRatio="xMidYMax meet">'
           f'<path d="{d}" fill="none" stroke="{color}" stroke-opacity="{alpha}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/></svg>')
    return svg


def bricks(color, alpha):
    # Buxoro gʻisht teruvi: qatorlar + har 4-gʻishtda kichik romb (Somoniylar maqbarasidagi kabi)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="96" height="48" viewBox="0 0 96 48">'
            f'<g fill="none" stroke="{color}" stroke-opacity="{alpha}" stroke-width="1">'
            f'<path d="M0 .5H96M0 12.5H96M0 24.5H96M0 36.5H96M24 0V12M72 0V12M0 12V24M48 12V24M24 24V36M72 24V36M0 36V48M48 36V48"/>'
            f'<path d="M48 2l4 4.5-4 4.5-4-4.5zM0 26l4 4.5-4 4.5-4-4.5zM96 26l4 4.5-4 4.5-4-4.5z"/></g></svg>')


def band(color):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="10" viewBox="0 0 20 10">'
            f'<path d="M0 5L5 1 10 5 5 9Z M10 5L15 1 20 5 15 9Z" fill="none" stroke="{color}" stroke-width="1"/>'
            f'<circle cx="10" cy="5" r="1.2" fill="{color}"/></svg>')


def uri(svg):
    return 'url("data:image/svg+xml,' + urllib.parse.quote(svg, safe=" =:/,;-.()\"'") .replace('"', "'") + '")'


blocks = {
    "light": (f"  --skyline: {uri(skyline('#5a3a22', .30))};\n"
              f"  --bricks: {uri(bricks('#7a4a2a', .11))};\n"
              f"  --band: {uri(band('#1f4a8a'))};\n"),
    "dark": (f"  --skyline: {uri(skyline('#efe3c8', .16))};\n"
             f"  --bricks: {uri(bricks('#efe3c8', .05))};\n"
             f"  --band: {uri(band('#e0b65a'))};\n"),
}

css = CSS.read_text(encoding="utf-8")
for k, v in blocks.items():
    css, n = re.subn(rf"/\*ART:{k}\*/.*?/\*/ART\*/", f"/*ART:{k}*/\n{v}  /*/ART*/", css, flags=re.S)
    assert n == 1, k
CSS.write_text(css, encoding="utf-8")
print("ok")
