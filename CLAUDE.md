# CLAUDE.md — loyiha boʻyicha yoʻriqnoma

Bu fayl Claude Code uchun. Terminalda `claude` ishga tushirilganda u avtomatik oʻqiladi va oldingi ishlarni davom ettirish uchun kerakli kontekstni beradi. Suhbatlar tarixi: `docs/suhbat-tarixi.md`.

## Foydalanuvchi va loyiha

- Talaba: **Muxamadov Muhammadali**. Oʻzbek tilida (lotin yozuvi) muloqot qiladi — javoblar ham oʻzbek tilida, sodda va qisqa boʻlsin.
- Loyiha: universitet mustaqil ishlari va ular uchun interaktiv bilim oʻyinlari.
- Fanlar:
  1. **Akademik yozuv** — oʻqituvchi: Yunusova Maftuna. Mavzu: “Publitsistik nutq uslubi. Publitsistik maqolalar bilan tanishish va tahlil qilish; ‘Men tanlagan soha va OAV’ mavzusida publitsistik maqola tayyorlash”. Mustaqil ish matni + 5 ta oʻyin.
  2. **Oʻzbekistonning eng yangi tarixi** — mavzu: “Oʻzbekiston Respublikasining BMTga aʼzo boʻlishi va jahon hamjamiyatidagi oʻziga xos oʻrni”. **Faqat oʻyinlar kerak, mustaqil ish matni kerak emas** (foydalanuvchi aniq aytgan).
- Git branch: `claude/wizardly-galileo-lkog9v`.

## Tuzilma

```
index.html                         Bosh menyu — fan tanlash (ikki yarim ekran)
fan.html?fan=akademik|tarix        Fan sahifasi (mustaqil ish + 5 oʻyin)
mustaqil-ishlar/akademik-yozuv/    Mustaqil ish: index.html (A4 chop etish) + PDF (22 bet)
oyinlar/
  tavakkal.html   01 Gʻildirak + tikish (balans 500, ±tikish; daraja 1–5 tikishdan OLDIN koʻrinadi; bitta jamoa qolsa — darhol gʻolib)
  hududlar.html   02 Olti burchakli xarita (bazadan qoʻshni kataklarni egallash, hujum +1 daraja)
  svetofor.html   03 Reaksiya: qizil 2–10 s tasodifiy → yashil (baland, aniq ikki qavatli signal); qizilda chalgʻituvchi tovushlar (sound.decoy).
                  Jamoalarda jismoniy tugma — klaviatura YOʻQ; boshlovchi ekranda kim bosganini belgilaydi (qizilda = falstart −50)
  zinapoya.html   04 10 kategoriya × 5 pogʻona, davom etish/toʻxtash, 50/50 va +15 s
  arqon.html      05 Arqon tortish: 2 jamoa NAVBAT BILAN javob beradi (poyga emas)
  konvert.html    06 FAQAT TARIX — Sirli konvert: 14 muhrlangan konvert, 3 ishora (300/200/100), 4 variantli javob
  afsona.html     07 FAQAT TARIX — Haqiqat yoki afsona: 4 arxiv hujjatidan soxtasini topish (+200)
  minora.html     08 FAQAT TARIX — Minora qurish: toʻgʻri javob = gʻisht; gʻisht suzadi, “Tashlash”/probel — chiqib qolgan qismi kesiladi
  oldin.html      09 FAQAT TARIX — Oldinmi, keyinmi?: ikki voqeani taqqoslash seriyasi (100×seriya), vaqt chizigʻi; juftliklar faqat oraligʻi ≤ 25 yil boʻlgan voqealardan (PAIRS), oson boʻlmasin
  labirint.html   10 FAQAT TARIX — Labirint: tasodifiy 7×7, tuman, burchaklardan markazdagi xazinaga; har qadam = savol
  harf.html       11 FAQAT TARIX — Harflab topish: savol + yopiq kataklar, harf aytish (100×katak), butun soʻz +500 (boshlovchi yozadi, sayt tekshiradi)
  karvon.html     12 FAQAT TARIX — Ipak yoʻli karvoni: kubik, 31 katak (savol/omad/toʻsiq), Konstantinopolga birinchi yetgan yutadi
  taxmin.html     13 FAQAT TARIX — Taxmin: javob son; son oʻqida koʻrsatiladi; eng yaqin +300, aniq +500
  savollar/tarix-qoshimcha.js  afsona, konvertlar, voqealar, sozlar, taxminlar, ipakYoli (faqat tarix)
jonli-oyinlar/                     Sinfda oʻtkaziladigan oʻyinlar uchun chop etiladigan A4 varaqlar (chop.css)
  kim-men.html        28 kartochka — ESLATMA STIKERI oʻlchamida (76×76 mm, varaqda 6 ta, qirqish chiziqlari); qirqib stiker ustiga yopishtiriladi + qoidalar + boshlovchi maslahatlari
  josus.html          3 toʻplam × 10 kartochka (9 joy + 1 josus), rolsiz; buklanadigan — tashqi tomoni hammada bir xil; 2 ta katta kartochka qatorda
  bingo.html          8 ta har xil 5×5 kartochka + boshlovchi uchun 30 savol (katta shrift — oʻqish oson boʻlsin)
  savollar/akademik.js, savollar/tarix.js   Savollar bazasi (10 kategoriya × 5 daraja, faqat test)
  assets/boot.js   <head> da: fan va tun/kun rejimini oʻrnatadi (localStorage: fan, tema)
  assets/theme.css Dizayn tokenlari: [data-fan] × [data-theme]
  assets/core.js   Umumiy dvigatel (window.G): ikonlar, ovoz, sozlash, ballar, modal, taymer, ask(), winner()
tools/build_pdf.py, tools/pdf.js   Mustaqil ish PDF yasash (reja sahifa raqamlari avtomatik)
docs/suhbat-tarixi.md              Barcha soʻrovlar va qarorlar tarixi
```

## Foydalanuvchining qatʼiy talablari (buzmang!)

1. **Barcha savollar test shaklida** (4 variant: `j` toʻgʻri + `x` 3 ta xato). Ochiq savol-javob yoʻq.
2. **Har bir oʻyinning shakli boshqacha** boʻlsin — hammasi “Своя игра” jadvaliga oʻxshab qolmasin.
3. **Emoji ishlatilmaydi.** Faqat oʻzimiz chizgan SVG ikonlar (`core.js` → `P` obyekti, `G.icon(name)`).
4. Dizayn “AI qilgandek” neon/gradient boʻlmasin — dizayner ishlagandek, toza, tipografik. **Har bir fanning dizayni alohida**:
   - akademik — gazeta/tahririyat uslubi (Playfair Display + IBM Plex, qogʻoz rangi, qizil urgʻu, chiziqlar, oʻtkir burchaklar);
   - tarix — tarixiy “Buxoro gʻishti va Samarqand koshinlari” uslubi: Alegreya + Alegreya Sans; lojuvard koʻk, gʻisht, feruza, qum ranglari; fonda gʻisht teruvi teksturasi va pastda Registon siluyeti (chiziqli illyustratsiya), koshin ramkali panellar, romb naqshli hoshiya. Tasvirlar `tools/tarix_art.py` bilan yasalib, theme.css ga `/*ART:...*/` orasiga yoziladi. Avvalgi 3 varianti (feruza/oltin; DM Serif koʻk; Swiss plakat) yoqmagan.
5. **Kunduzgi va tungi rejim** har sahifada boʻlishi shart.
6. Oʻyinlar **internetsiz, oddiy HTML** sifatida ochilishi kerak (`file://`). `fetch` ishlatmang — maʼlumot `<script src>` orqali.
7. Tarix savollari: **oson**, yillar kam; taxminan **50% zakovat uslubidagi mantiqiy savollar** (tarixga bogʻliq, lekin qiziqarli — dasturlash, fan va h.k.).
8. **Javob vaqti har bir oʻyinda kamida 30 soniya.**
9. **Oʻyin tavsiflari (opisanie) yoʻq** — fan sahifasidagi kartochkalarda faqat raqam, ikonka, nom; sozlash ekranida tavsif jumlasi yoʻq (faqat qoidalar). Foydalanuvchi: “AI qilgani bilinib turibdi”.
10. Mustaqil ish: kamida 20 bet, betlarda boʻsh joy qolmasin (boʻlimlar uzluksiz oqadi), avval nazariya, keyin tahlil, keyin maqola.

## Ishonchlilik (oldin “baʼzan ishlamay qolardi”)

- **Muhim:** har oʻyin sahifasida `S && S.teams ? render() : setup();` skriptning ENG OXIRIDA boʻlishi shart. Aks holda saqlangan oʻyin bilan kirilganda `const` funksiyalar hali eʼlon qilinmagan boʻlib xato beradi va sahifa boʻm-boʻsh qoladi (shu xato tuzatilgan).
- Sarlavha paneli (`.top`, z-index 30) modal ustida turadi — savol ochiq boʻlsa ham “Menyu” va “Yangi oʻyin” bosiladi.

- `core.js`: ekran almashgandan keyin 350 ms bosishlar bloklanadi (`G.swapped()` — har `render()` boshida chaqiring).
- `G.ask()` yangi savol yoki modal ochilganda oldingisini bekor qiladi; taymer DOMdan olib tashlansa oʻzi toʻxtaydi.

## Logo

- `favicon.svg` (ildizda) — foydalanuvchi tanlagan **D varianti: qalam uchi** (toʻq doira ichida oq qalam uchi). Har sahifada favicon va sarlavhada `.brand`. `build.mjs` roʻyxatida bor.

- Logo variantlari: `docs/logo-variantlar.html` (A–H); tanlangan — D.

## Konventsiyalar

- Oʻzbek lotin yozuvi: `oʻ`, `gʻ` uchun **U+02BB (ʻ)**, tutuq belgisi uchun **U+02BC (ʼ)**. Oddiy apostrof `'` ishlatmang.
- Fakt va sanalarga ehtiyot boʻling — faqat ishonchli maʼlumot.
- Yangi fan qoʻshish: `oyinlar/savollar/<kalit>.js` (shablon — mavjud fayllar), `theme.css` da `[data-fan="<kalit>"]` tokenlari, `boot.js` dagi ruxsat etilgan fanlar, `index.html` va `fan.html` ga havola, har bir oʻyin sahifasiga `<script src="savollar/<kalit>.js">`.
- Oʻyin holati `localStorage` da (`oyin2-<oʻyin>-<fan>`) saqlanadi.

## Tekshirish

- PDF: `python3 tools/build_pdf.py mustaqil-ishlar/akademik-yozuv`
- Oʻyinlarni Playwright bilan oxirigacha oʻynab tekshirish tavsiya etiladi (har ikki fan, ikkala rejim, 390px mobil kenglik).

## Joylash (Cloudflare Pages) — Node.js orqali

- `scripts/build.mjs` → `dist/` (index.html, fan.html, favicon.svg, _headers, oyinlar/, mustaqil-ishlar/, jonli-oyinlar/). `dist/` gitignore da. Yangi sayt fayli qoʻshilsa, `files` roʻyxatiga qoʻshing.
- Sayt nomi/URL faqat `package.json` → `"cloudflare": { "project": "iw-mm" }` da (manzil: `https://iw-mm.pages.dev`; iw = Independent Work, mm = Muxamadov Muhammadali). Eski loyiha: mustaqil-ishlar. `scripts/cloudflare.mjs` uni oʻqiydi. Buyruqlar: `npm install` → `npm run login` → `npm run create` (har yangi nom uchun bir marta) → `npm run deploy`.
- Foydalanuvchi bash/PowerShell emas, JS (Node.js) variantini soʻragan — shell skriptlar olib tashlangan.
- Cloudflare Git integratsiyasi: Build command `npm run build`, output `dist`, preset None.
- `_headers` — xavfsizlik va kesh sarlavhalari.

## Rejadagi oʻyinlar

- **Rasmdan top** — QILINMAGAN: rasmlarni foydalanuvchi oʻzi tanlab beradi (oʻzimiz chizgan rasmlar rad etildi). Gʻoya: rasm kattalashtirilgan holda chiqib asta-sekin ochiladi, qancha erta topilsa — shuncha koʻp ball; 4 variantli test.
- Qilingan (13-noyabr): Minora qurish, Oldinmi-keyinmi, Labirint, Harflab topish, Ipak yoʻli karvoni, Taxmin (sayt); Josus, Tarix bingosi (jonli).
- Foydalanuvchi talabi: har oʻyinning **mexanikasi bir-biridan tubdan farq qilishi** kerak.
- Qilingan: **saytda** (faqat tarix) — Sirli konvert (konvert.html), Haqiqat yoki afsona (afsona.html); **jonli** (chop etiladigan) — Kim men?. BMT sessiyasi foydalanuvchi soʻrovi bilan butunlay olib tashlangan (kerak emas).

## Ochiq masalalar

- Titul varagʻida universitet/fakultet nomi va guruh raqami boʻsh qoldirilgan — foydalanuvchi aytsa toʻldirish.
- Tarix fani oʻqituvchisining ismi nomaʼlum (hozircha kerak emas, chunki tarix uchun matn yoʻq).
