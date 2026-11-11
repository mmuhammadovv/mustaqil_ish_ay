# Mustaqil ishlar va interaktiv oʻyinlar

`index.html` ni brauzerda oching — bosh menyuda fanni tanlang. Hammasi internetsiz ishlaydi.

**Fanlar**
- **Akademik yozuv** — mustaqil ish (22 bet, `mustaqil-ishlar/akademik-yozuv/`) + 5 ta oʻyin
- **Oʻzbekistonning eng yangi tarixi** (BMT va Oʻzbekiston) — 5 ta oʻyin

**Oʻyinlar** (`oyinlar/`, har bir fan uchun 50 ta test savoli)

| Oʻyin | Shakli |
|---|---|
| Tavakkal | Gʻildirak kategoriya va daraja (1–5) tanlaydi; 500 ballik balansdan tikish |
| Hududlar | Olti burchakli kataklar xaritasi; bazadan kengayish va hujum |
| Svetofor | Qizil → tasodifiy vaqtda yashil, chalgʻituvchi tovushlar; boshlovchi belgilaydi |
| Zinapoya | 10 kategoriya, 5 pogʻona, davom etish yoki saqlash |
| Arqon tortish | 2 jamoa navbat bilan javob beradi, arqon tortiladi |

Kunduzgi/tungi rejim, har fan uchun alohida dizayn.

Claude Code bilan davom ettirish uchun: `CLAUDE.md` va `docs/suhbat-tarixi.md`.

Topshiruvchi: Muxamadov Muhammadali

## Cloudflare Pages ga joylash

Sayt statik, server kerak emas. `scripts/build.mjs` (Node.js) faqat sayt fayllarini `dist/` ga yigʻadi — CLAUDE.md, docs/, tools/ chiqmaydi. Kerak: Node.js 18+.

**Terminaldan (Windows, Mac, Linux — bir xil):**

```bash
npm install          # bir marta: wrangler oʻrnatiladi
npm run login        # bir marta: Cloudflare akkauntiga kirish
npm run create       # bir marta: Pages loyihasini ochish
npm run deploy       # har safar: yigʻish va joylash
```

`npm run preview` — saytni kompyuterda Cloudflare muhitida ochib koʻrish.

**GitHub orqali (avtomatik):** Cloudflare → Workers & Pages → Create → Pages → Connect to Git.
Framework preset: None · Build command: `npm run build` · Build output directory: `dist`.
