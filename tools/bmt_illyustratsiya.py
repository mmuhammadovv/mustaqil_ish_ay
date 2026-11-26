# Taqdimot uchun oltin chiziqli illyustratsiyalar (SVG). Keyin tools/bmt_svg2png.js PNG ga aylantiradi.
# Ishlatish: python3 tools/bmt_illyustratsiya.py <papka>
import math, os, sys

out = sys.argv[1]; os.makedirs(out, exist_ok=True)
G = "#E3C27A"; G2 = "#F3DC9C"; FILL = "rgba(227,194,122,.10)"
def svg(name, w, h, body, sw=3):
    s = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}"><defs><filter id="gl"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g fill="none" stroke="{G}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" filter="url(#gl)">{body}</g></svg>'
    open(os.path.join(out, name + ".svg"), "w").write(s)

def globe(cx, cy, r, routes=False):
    b = f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{FILL}"/>'
    for k in (.35, .7):
        b += f'<ellipse cx="{cx}" cy="{cy}" rx="{r*k:.1f}" ry="{r}" stroke-width="2"/>'
    b += f'<line x1="{cx}" y1="{cy-r}" x2="{cx}" y2="{cy+r}" stroke-width="2"/>'
    for k in (-.6, -.3, 0, .3, .6):
        y = cy + r * k; hw = math.sqrt(r * r - (r * k) ** 2)
        b += f'<line x1="{cx-hw:.1f}" y1="{y:.1f}" x2="{cx+hw:.1f}" y2="{y:.1f}" stroke-width="{2.5 if k == 0 else 1.6}"/>'
    if routes:
        hub = (cx + r * .18, cy - r * .22)
        for px, py in [(-.62, -.35), (-.55, .3), (.62, -.45), (.55, .35), (-.1, .65), (.3, -.75)]:
            x, y = cx + r * px, cy + r * py; mx, my = (hub[0] + x) / 2, (hub[1] + y) / 2 - r * .25
            b += f'<path d="M{hub[0]:.1f} {hub[1]:.1f} Q {mx:.1f} {my:.1f} {x:.1f} {y:.1f}" stroke="{G2}" stroke-width="2.4" stroke-dasharray="2 9"/><circle cx="{x:.1f}" cy="{y:.1f}" r="6" fill="{G}"/>'
        b += f'<circle cx="{hub[0]:.1f}" cy="{hub[1]:.1f}" r="12" fill="{G2}"/><circle cx="{hub[0]:.1f}" cy="{hub[1]:.1f}" r="24" stroke-width="2"/>'
    return b

def laurel(cx, cy, r, side):
    b = ""; a0, a1 = (100, 215) if side < 0 else (80, -35)
    steps = 9
    pts = []
    for i in range(steps + 1):
        a = math.radians(a0 + (a1 - a0) * i / steps)
        pts.append((cx + math.cos(a) * r, cy + math.sin(a) * r, a))
    b += 'M' + ' L'.join(f'{x:.1f} {y:.1f}' for x, y, _ in pts)
    path = f'<path d="{b}" stroke-width="2.5"/>'
    for i, (x, y, a) in enumerate(pts[1:], 1):
        t = math.degrees(a) + (90 if side < 0 else -90)
        for d in (-35, 35):
            path += f'<ellipse cx="{x + math.cos(math.radians(t + d)) * 16:.1f}" cy="{y + math.sin(math.radians(t + d)) * 16:.1f}" rx="16" ry="6" transform="rotate({t + d:.1f} {x + math.cos(math.radians(t + d)) * 16:.1f} {y + math.sin(math.radians(t + d)) * 16:.1f})" fill="{FILL}" stroke-width="2"/>'
    return path

# 1) Globus va dafna (sarlavha, xulosa)
svg("globus", 700, 700, globe(350, 340, 210) + laurel(350, 350, 290, -1) + laurel(350, 350, 290, 1)
    + f'<ellipse cx="350" cy="340" rx="300" ry="70" transform="rotate(-18 350 340)" stroke="{G2}" stroke-width="2" stroke-dasharray="3 10"/><circle cx="625" cy="250" r="8" fill="{G2}"/>')

# 2) Mustaqillik monumenti: poydevor + ustun + globus
m = '<path d="M60 760 H340 M80 760 V730 H320 V760 M105 730 V700 H295 V730" fill="rgba(227,194,122,.08)"/>'
m += '<path d="M150 700 L165 330 H235 L250 700 Z" fill="rgba(227,194,122,.08)"/><path d="M200 340 V690" stroke-width="1.5"/><path d="M140 330 H260" stroke-width="4"/>'
m += globe(200, 215, 110)
for k in range(9):
    a = math.radians(-90 + (k - 4) * 22)
    m += f'<line x1="{200 + math.cos(a)*135:.1f}" y1="{215 + math.sin(a)*135:.1f}" x2="{200 + math.cos(a)*175:.1f}" y2="{215 + math.sin(a)*175:.1f}" stroke="{G2}" stroke-width="2"/>'
svg("monument", 400, 780, m)

# 3) Kaptar va zaytun shoxi
d = f'<path d="M250 215 C 232 150, 252 92, 305 42 C 302 102, 322 150, 332 207" fill="{FILL}" stroke-width="2.2"/>'
d += f'<path d="M120 235 C 170 205, 260 200, 330 215 C 350 190, 385 180, 405 195 C 420 205, 415 220, 400 225 C 380 260, 300 290, 210 280 C 170 276, 140 262, 120 235 Z" fill="{FILL}"/>'
d += '<path d="M410 199 L434 206 L408 212"/><circle cx="394" cy="201" r="3.5" fill="#E3C27A"/>'
d += f'<path d="M126 238 L58 212 L74 244 L52 272 L132 256" fill="{FILL}"/><path d="M70 228 L120 243 M66 260 L122 250" stroke-width="1.6"/>'
d += f'<path d="M232 222 C 182 152, 172 82, 202 22 C 232 72, 272 112, 302 137 C 292 172, 300 200, 312 216" fill="{FILL}"/>'
d += '<path d="M245 205 C 218 155, 208 105, 212 60 M268 208 C 248 165, 242 128, 252 98 M288 210 C 275 180, 272 158, 280 132" stroke-width="1.6"/>'
d += '<path d="M430 210 Q 468 238 520 246"/>'
for x, y, r in [(450, 222, 30), (468, 232, -20), (488, 239, 35), (504, 243, -25), (520, 246, 10)]:
    d += f'<ellipse cx="{x}" cy="{y + (12 if r > 0 else -12)}" rx="14" ry="5.5" transform="rotate({r} {x} {y + (12 if r > 0 else -12)})" fill="{FILL}" stroke-width="2"/>'
svg("kaptar", 560, 320, d)

# 4) Adolat tarozisi
t = f'<path d="M140 470 H360 M170 470 V450 H330 V470" fill="{FILL}"/><path d="M250 450 V90"/><circle cx="250" cy="80" r="12" fill="{FILL}"/>'
t += '<path d="M90 120 H410" stroke-width="4"/>'
for cx in (110, 390):
    t += f'<path d="M{cx} 120 L{cx-60} 270 M{cx} 120 L{cx+60} 270"/><path d="M{cx-75} 270 Q {cx} 330 {cx+75} 270 Z" fill="{FILL}"/>'
svg("tarozi", 500, 500, t)

# 5) BMT minbari: tribuna va mikrofonlar
p = f'<path d="M120 420 L150 170 H350 L380 420 Z" fill="{FILL}"/><path d="M135 300 H365 M158 190 H342" stroke-width="2"/>'
p += '<circle cx="250" cy="245" r="36" stroke-width="2.4"/><circle cx="250" cy="245" r="22" stroke-width="1.6"/><path d="M214 245 H286 M250 209 V281" stroke-width="1.4"/>'
p += '<path d="M100 420 H400"/><path d="M230 170 Q 220 110 200 80 M270 170 Q 280 110 300 80"/><ellipse cx="198" cy="72" rx="8" ry="12" fill="#E3C27A"/><ellipse cx="302" cy="72" rx="8" ry="12" fill="#E3C27A"/>'
svg("minbar", 500, 450, p)

# 6) Yoʻnalishlar bilan globus (jahon hamjamiyati)
svg("yollar", 600, 600, globe(300, 300, 240, routes=True))

# 7) Registon silueti (uchta madrasa)
def portal(cx, base, w, h):
    a = w * .3
    s = f'<rect x="{cx-w/2}" y="{base-h}" width="{w}" height="{h}" fill="rgba(11,22,56,.55)"/>'
    s += f'<path d="M{cx-a} {base} V{base-h*.55} Q {cx-a} {base-h*.8} {cx} {base-h*.88} Q {cx+a} {base-h*.8} {cx+a} {base-h*.55} V{base}" stroke-width="2.2"/>'
    s += f'<rect x="{cx-w/2+8}" y="{base-h+8}" width="{w-16}" height="{h-8}" stroke-width="1.2"/>'
    return s
def wing(x0, x1, base, h, n):
    s = f'<rect x="{x0}" y="{base-h}" width="{x1-x0}" height="{h}" fill="rgba(11,22,56,.55)"/>'
    step = (x1 - x0) / n
    for i in range(n):
        cx = x0 + step * (i + .5); a = step * .28
        for row in (0, 1):
            b = base - row * h * .48
            s += f'<path d="M{cx-a:.1f} {b-6:.1f} V{b-h*.28:.1f} Q {cx:.1f} {b-h*.42:.1f} {cx+a:.1f} {b-h*.28:.1f} V{b-6:.1f}" stroke-width="1.4"/>'
    return s
def minaret(x, base, h):
    return f'<path d="M{x-12} {base} L{x-9} {base-h} H{x+9} L{x+12} {base} Z" fill="rgba(11,22,56,.55)"/><path d="M{x-16} {base-h} H{x+16} M{x-14} {base-h-14} H{x+14}"/><path d="M{x-12} {base-h-14} Q {x} {base-h-40} {x+12} {base-h-14}"/>'
def dome(cx, base, r):
    s = f'<rect x="{cx-r*.75}" y="{base-r*.5}" width="{r*1.5}" height="{r*.5}" fill="rgba(11,22,56,.55)"/><path d="M{cx-r*.8} {base-r*.5} Q {cx-r} {base-r*1.6} {cx} {base-r*1.75} Q {cx+r} {base-r*1.6} {cx+r*.8} {base-r*.5} Z" fill="rgba(11,22,56,.55)"/>'
    for k in (-.4, 0, .4):
        s += f'<path d="M{cx + r*k*1.6:.1f} {base-r*.5:.1f} Q {cx + r*k:.1f} {base-r*1.5:.1f} {cx:.1f} {base-r*1.75:.1f}" stroke-width="1.2"/>'
    return s + f'<path d="M{cx} {base-r*1.75} V{base-r*1.75-18}"/>'
B = 330
r = ""
for cx, dm in ((300, 1), (1300, 1)):
    r += dome(cx - 150, B - 120, 55) + dome(cx + 150, B - 120, 55) if dm else ""
r += dome(670, B - 130, 75)
for cx in (300, 1300):
    r += wing(cx - 230, cx + 230, B, 120, 6) + portal(cx, B, 170, 230) + minaret(cx - 255, B, 270) + minaret(cx + 255, B, 270)
r += wing(560, 1040, B, 120, 7) + portal(800, B, 170, 220)
r += f'<path d="M0 {B} H1600" stroke-width="2.5"/>'
svg("registon", 1600, 345, r, sw=2.4)
print("ok")
