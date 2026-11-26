# BMT taqdimoti uchun rasmlar: fon (lojuvard tun), bayroq, Registon va bezaklar (PNG/JPG).
# Ishlatish: python3 tools/bmt_slayd_rasm.py <chiqish_papka>
import math, random, sys, os
from PIL import Image, ImageDraw, ImageFilter

out = sys.argv[1]; os.makedirs(out, exist_ok=True)
R = os.path.join(os.path.dirname(__file__), "..", "oyinlar", "assets", "rasm")
random.seed(7)

# 1) Fon: markazdan tarqaluvchi yorugʻlik + yulduzlar + nozik girih to'r
W, H = 1920, 1080
bg = Image.new("RGB", (W, H))
px = bg.load()
c0, c1 = (24, 44, 98), (6, 12, 34)
for y in range(H):
    for x in range(W):
        d = min(1, math.hypot((x - W * .72) / W, (y - H * .3) / H) * 1.35)
        px[x, y] = tuple(int(c0[i] + (c1[i] - c0[i]) * d) for i in range(3))
dr = ImageDraw.Draw(bg, "RGBA")
for _ in range(260):
    x, y, r = random.random() * W, random.random() * H * .8, random.choice([1, 1, 1, 2])
    dr.ellipse([x - r, y - r, x + r, y + r], fill=(255, 240, 200, random.randint(60, 200)))
# girih: sakkiz qirrali yulduzlar to'ri, juda xira
s = 120
for gy in range(-1, H // s + 2):
    for gx in range(-1, W // s + 2):
        cx, cy = gx * s + (s / 2 if gy % 2 else 0), gy * s
        pts = [(cx + math.cos(a) * (40 if k % 2 == 0 else 22), cy + math.sin(a) * (40 if k % 2 == 0 else 22)) for k, a in enumerate([i * math.pi / 8 for i in range(16)])]
        dr.polygon(pts, outline=(227, 194, 122, 14))
bg.save(os.path.join(out, "fon.png"))

# 2) Registon (sarlavha va yakun uchun) — qorongʻiroq
reg = Image.open(os.path.join(R, "registon.webp")).convert("RGB").resize((1920, 1080))
reg.save(os.path.join(out, "registon.jpg"), quality=88)

# 3) Bezaklar
for n in ["minora", "karvon", "fonus"]:
    Image.open(os.path.join(R, n + ".webp")).save(os.path.join(out, n + ".png"))

# 4) Oʻzbekiston bayrogʻi (2:1)
fw, fh = 1000, 500
f = Image.new("RGBA", (fw, fh)); d = ImageDraw.Draw(f)
d.rectangle([0, 0, fw, fh / 3], fill=(0, 153, 181)); d.rectangle([0, fh / 3, fw, 2 * fh / 3], fill=(255, 255, 255)); d.rectangle([0, 2 * fh / 3, fw, fh], fill=(30, 181, 58))
d.rectangle([0, fh / 3 - 6, fw, fh / 3 + 6], fill=(206, 17, 38)); d.rectangle([0, 2 * fh / 3 - 6, fw, 2 * fh / 3 + 6], fill=(206, 17, 38))
d.ellipse([40, 22, 160, 142], fill=(255, 255, 255)); d.ellipse([70, 22, 190, 142], fill=(0, 153, 181))
def star(cx, cy, r):
    d.polygon([(cx + math.cos(-math.pi / 2 + i * math.pi / 5) * (r if i % 2 == 0 else r * .4), cy + math.sin(-math.pi / 2 + i * math.pi / 5) * (r if i % 2 == 0 else r * .4)) for i in range(10)], fill=(255, 255, 255))
for row, cols in enumerate([[2, 3, 4], [1, 2, 3, 4], [0, 1, 2, 3, 4]]):
    for c in cols: star(190 + c * 40, 40 + row * 40, 13)
f.save(os.path.join(out, "bayroq.png"))
print("ok")
