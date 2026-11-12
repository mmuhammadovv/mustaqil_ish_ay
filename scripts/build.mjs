// Cloudflare Pages uchun sayt fayllarini dist/ papkaga yigʻadi.
// Faqat saytga kerakli fayllar chiqadi: CLAUDE.md, docs/, tools/ internetga chiqmaydi.
// Ishlatish: npm run build   (yoki: node scripts/build.mjs)
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "dist");
const files = ["index.html", "fan.html", "favicon.svg", "_headers", "oyinlar", "mustaqil-ishlar", "jonli-oyinlar"];

rmSync(out, { recursive: true, force: true });
mkdirSync(out);

for (const f of files) {
  const src = join(root, f);
  if (!existsSync(src)) throw new Error(`Topilmadi: ${f}`);
  cpSync(src, join(out, f), { recursive: true });
}

const count = dir => readdirSync(dir).reduce((n, f) => {
  const p = join(dir, f);
  return n + (statSync(p).isDirectory() ? count(p) : 1);
}, 0);
console.log(`Tayyor: dist/ (${count(out)} ta fayl)`);
