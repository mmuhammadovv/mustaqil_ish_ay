# Kadrlardan GIF yasaydi: bir marta oʻynaydi, oxirgi kadrda toʻxtaydi.
# GIF da yarim shaffoflik yoʻq, shuning uchun piksellar slayd fonining shu joydagi rangiga (matte) aralashtiriladi.
# Ishlatish: python3 tools/bmt_gif.py <papka> <oddiy_variant_render.pdf>
import glob, os, statistics, subprocess, sys
from PIL import Image

d, pdf = sys.argv[1], sys.argv[2]
W_IN = 13.333
# nom: (slayd, x, y, w, h) — dyuymda, bmt_slayd.js dagi joylashuv bilan bir xil
POS = {"globus": (1, 9.2, .3, 4.4, 4.4), "monument": (2, 9.93, .85, 2.15, 4.19), "kaptar": (5, 9.7, .3, 3.1, 1.77),
       "tarozi": (6, 10.55, 5.35, 1.95, 1.95), "minbar": (7, 1.2, 4.95, 2.6, 2.34), "yollar": (8, 9.2, 3.7, 3.5, 3.5), "registon": (1, 4.3, 5.56, 9, 1.94)}
tmp = os.path.join(d, "fonr"); os.makedirs(tmp, exist_ok=True)
subprocess.run(["pdftoppm", "-png", "-r", "60", pdf, os.path.join(tmp, "s")], check=True)
pages = sorted(glob.glob(os.path.join(tmp, "s-*.png")))

def matte(name):
    sl, x, y, w, h = POS[name]
    im = Image.open(pages[sl - 1]).convert("RGB"); k = im.size[0] / W_IN
    px = [p for p in im.crop((int(x * k), int(y * k), int((x + w) * k), int((y + h) * k))).get_flattened_data() if p[2] >= p[0]]
    return tuple(int(statistics.median(c)) for c in zip(*px))

for name in POS:
    m = matte(name); frames = []
    for f in sorted(glob.glob(os.path.join(d, "kadr", name, "*.png"))):
        im = Image.open(f).convert("RGBA")
        if im.size[0] > 1100: im = im.resize((1100, round(im.size[1] * 1100 / im.size[0])), Image.LANCZOS)
        bg = Image.new("RGBA", im.size, m + (255,)); comp = Image.alpha_composite(bg, im)
        a = im.getchannel("A").point(lambda v: 255 if v >= 8 else 0)
        comp.putalpha(a)
        p = comp.convert("RGB").quantize(colors=255, method=Image.Quantize.MEDIANCUT)
        p.paste(255, mask=a.point(lambda v: 255 if v == 0 else 0))
        p.info["transparency"] = 255; frames.append(p)
    dur = [300] + [40] * (len(frames) - 2) + [600000]  # boshida qisqa pauza, oxirgi kadr ~10 daqiqa turadi
    frames[0].save(os.path.join(d, name + ".gif"), save_all=True, append_images=frames[1:], duration=dur, disposal=2, transparency=255, optimize=False)
    print(name, m, os.path.getsize(os.path.join(d, name + ".gif")) // 1024, "KB")
