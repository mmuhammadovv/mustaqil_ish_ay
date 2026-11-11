#!/usr/bin/env bash
# Cloudflare Pages uchun sayt fayllarini dist/ papkaga yigʻadi.
# Faqat saytga kerakli fayllar chiqadi: CLAUDE.md, docs/, tools/ internetga chiqmaydi.
set -euo pipefail
cd "$(dirname "$0")"

OUT="dist"
if [ -d "$OUT" ]; then rm -r "./$OUT"; fi
mkdir "$OUT"

cp index.html fan.html _headers "$OUT"/
cp -r oyinlar mustaqil-ishlar "$OUT"/

echo "Tayyor: $OUT/ ($(find "$OUT" -type f | wc -l) ta fayl)"
