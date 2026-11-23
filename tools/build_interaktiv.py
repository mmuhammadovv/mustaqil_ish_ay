"""Interaktiv rasm prototipini yasaydi: rasmlar va belgilar HTML ichiga joylanadi (bitta mustaqil fayl).
Ishlatish: python3 tools/build_interaktiv.py ICONS.json
"""
import base64, json, os, sys
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
tpl = open(os.path.join(R, 'tools/interaktiv_template.html'), encoding='utf-8').read()
img = lambda n: 'data:image/webp;base64,' + base64.b64encode(open(os.path.join(R, 'docs/rasm', n + '.webp'), 'rb').read()).decode()
images = {n: img(n) for n in ['karvon', 'konvert', 'fonus', 'minora', 'qumsoat']}
icons = json.load(open(sys.argv[1], encoding='utf-8'))
out = tpl.replace('__registon__', img('registon')).replace('__IMAGES__', json.dumps(images)).replace('__ICONS__', json.dumps(icons, ensure_ascii=False))
open(os.path.join(R, 'docs/interaktiv.html'), 'w', encoding='utf-8').write(out)
print('Tayyor: docs/interaktiv.html', round(len(out) / 1e6, 2), 'MB')
