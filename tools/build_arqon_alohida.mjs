// Arqon tortish — bitta mustaqil HTML fayl (savollar ichida, rasm SVG). Internetsiz ochiladi.
// Ishlatish: node tools/build_arqon_alohida.mjs 11      → alohida/Arqon_tortish_11-mavzu.html
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const k = process.argv[2] || "11";
const key = k === "bmt" ? "tarix" : "tarix" + k;
const ctx = { window: {} }; ctx.window.FANLAR = {}; ctx.FANLAR = ctx.window.FANLAR; vm.createContext(ctx);
vm.runInContext(readFileSync(join(root, `oyinlar/savollar/${key}.js`), "utf8"), ctx);
const data = ctx.FANLAR[key];
const qisqa = k === "bmt" ? "BMT mavzusi" : `${k}-mavzu`;
const html = readFileSync(join(root, "tools/arqon_alohida_template.html"), "utf8")
  .replaceAll("__MAVZU_QISQA__", qisqa).replace("__MAVZU__", data.mavzu)
  .replace("__DATA__", JSON.stringify({ mavzu: data.mavzu, kategoriyalar: data.kategoriyalar }))
;
mkdirSync(join(root, "alohida"), { recursive: true });
const out = join(root, `alohida/Arqon_tortish_${qisqa.replace(" ", "_")}.html`);
writeFileSync(out, html);
console.log("Tayyor:", out, (html.length / 1e6).toFixed(2), "MB");
