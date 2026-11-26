// Oltin illyustratsiyalarni "qalam bilan chizilayotgan" kadrlar sifatida chiqaradi (keyin tools/bmt_gif.py GIF yasaydi).
// Har chiziq uzunligi boʻyicha ketma-ket chiziladi, uchida yorqin qalam nuqtasi yuradi, oxirida ichki boʻyoq paydo boʻladi.
// Ishlatish: node tools/bmt_gif.js <papka>   (papkada bmt_illyustratsiya.py yasagan *.svg boʻlishi kerak)
const { chromium } = require("playwright");
const fs = require("fs"), path = require("path");
const dir = process.argv[2];
const NAMES = ["globus", "monument", "kaptar", "tarozi", "minbar", "yollar", "registon"];
const DRAW = 40, FILL = 8; // kadrlar: chizish (~1,6 s) va boʻyoq (~0,3 s)
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  for (const n of NAMES) {
    const out = path.join(dir, "kadr", n); fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out, { recursive: true });
    await p.setContent(`<html><body style="margin:0;background:transparent">${fs.readFileSync(path.join(dir, n + ".svg"), "utf8")}</body></html>`);
    await p.evaluate(() => {
      const els = [...document.querySelectorAll("svg g > *")];
      window.E = els.map(el => {
        const dotted = el.getAttribute("stroke-dasharray"), L = el.getTotalLength ? el.getTotalLength() : 0;
        el.dataset.fill = el.getAttribute("fill") || "";
        if (el.getAttribute("fill") && el.getAttribute("fill") !== "none") el.style.fillOpacity = 0;
        if (!dotted) { el.style.strokeDasharray = `${L} ${L}`; el.style.strokeDashoffset = L; } else el.style.opacity = 0;
        return { el, L: Math.max(L, 1), dotted };
      });
      window.S = E.reduce((a, e) => a + e.L, 0);
      const g = document.querySelector("svg g"), pen = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      pen.setAttribute("r", 7); pen.setAttribute("fill", "#FFF6D6"); pen.setAttribute("stroke", "none"); pen.style.opacity = 0; g.appendChild(pen); window.PEN = pen;
      window.draw = (pr, fill) => {
        let left = pr * S, cur = null;
        for (const e of E) {
          const d = Math.max(0, Math.min(e.L, left)); left -= e.L;
          if (e.dotted) e.el.style.opacity = d > 0 ? Math.min(1, d / e.L * 1.5) : 0;
          else e.el.style.strokeDashoffset = e.L - d;
          if (d > 0 && d < e.L && !cur) cur = { e, d };
          if (fill !== undefined && e.el.style.fillOpacity !== "") e.el.style.fillOpacity = fill;
        }
        if (cur && !cur.e.dotted && pr < 1) {
          const pt = cur.e.el.getPointAtLength(cur.d), t = cur.e.el.getAttribute("transform");
          PEN.setAttribute("cx", pt.x); PEN.setAttribute("cy", pt.y); t ? PEN.setAttribute("transform", t) : PEN.removeAttribute("transform"); PEN.style.opacity = 1;
        } else PEN.style.opacity = 0;
      };
    });
    const svg = await p.$("svg"); let k = 0;
    const shot = async () => svg.screenshot({ path: path.join(out, String(k++).padStart(3, "0") + ".png"), omitBackground: true });
    for (let i = 0; i <= DRAW; i++) { const t = i / DRAW; await p.evaluate(v => draw(v, 0), 1 - Math.pow(1 - t, 1.6)); await shot(); }
    for (let i = 1; i <= FILL; i++) { await p.evaluate(v => draw(1, v), i / FILL); await shot(); }
    console.log(n, k, "kadr");
  }
  await b.close();
})();
