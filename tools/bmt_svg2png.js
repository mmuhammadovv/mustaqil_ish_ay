// SVG illyustratsiyalarni shaffof PNG ga aylantiradi (Playwright/Chromium). Ishlatish: node tools/bmt_svg2png.js <papka>
const { chromium } = require("playwright");
const fs = require("fs"), path = require("path");
const dir = process.argv[2];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ deviceScaleFactor: 2 });
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith(".svg"))) {
    const svg = fs.readFileSync(path.join(dir, f), "utf8");
    await p.setContent(`<html><body style="margin:0;background:transparent">${svg}</body></html>`);
    await (await p.$("svg")).screenshot({ path: path.join(dir, f.replace(".svg", ".png")), omitBackground: true });
  }
  await b.close(); console.log("ok");
})();
