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

Sayt statik, server kerak emas. `build.sh` faqat sayt fayllarini `dist/` ga yigʻadi (CLAUDE.md, docs/, tools/ chiqmaydi).

**1-usul — GitHub orqali (tavsiya):** Cloudflare → Workers & Pages → Create → Pages → Connect to Git → `mustaqil_ish_ay` repozitoriyasi.
- Production branch: `claude/wizardly-galileo-lkog9v` (yoki `main` ga birlashtirilgandan keyin `main`)
- Framework preset: **None**
- Build command: `bash build.sh`
- Build output directory: `dist`

Har safar GitHub'ga push qilinganda sayt avtomatik yangilanadi.

**2-usul — qoʻlda yuklash:** `bash build.sh`, soʻng Cloudflare → Pages → Upload assets → `dist` papkasini sudrab tashlang.

**3-usul — terminaldan:** `bash build.sh && npx wrangler pages deploy dist --project-name mustaqil-ishlar`
