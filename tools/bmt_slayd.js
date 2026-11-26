// Tarix mustaqil ishi himoyasi uchun taqdimot: "Oʻzbekiston va BMT" (paper-cut rasmlar, Montserrat).
// Har slayd foni — foydalanuvchi bergan rasm (docs/rasm/bmt). Fon Morph bilan suzib almashadi (sekin kamera harakati),
// 4-slaydda bayroq ustun boʻylab koʻtariladi, qolgan elementlar navbat bilan chiqadi.
// Ishlatish: python3 tools/bmt_slayd_rasm.py <papka>  (bayroq.png)  &&  node tools/bmt_slayd.js <papka> alohida/BMT_himoya.pptx
const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");
const JSZip = require("jszip");

const [IMG, OUT] = process.argv.slice(2);
const RASM = path.join(__dirname, "..", "docs", "rasm", "bmt");
const bgData = n => "image/jpeg;base64," + fs.readFileSync(path.join(RASM, n + ".jpg")).toString("base64");
const FLAG = "image/png;base64," + fs.readFileSync(path.join(IMG, "bayroq.png")).toString("base64");

const F = "Montserrat";
const K = { white: "FFFFFF", gold: "F3C969", soft: "D7ECEF", panel: "06303F" };
const W = 13.333, H = 7.5;
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.title = "Oʻzbekiston va BMT"; pres.author = "Muxamadov Muhammadali";
pres.theme = { headFontFace: F, bodyFontFace: F };

const sh = () => ({ type: "outer", color: "000000", opacity: .35, blur: 6, offset: 1.5, angle: 90 });
let n = 0;
const A = k => `a${String(++n).padStart(2, "0")}${k}_`;
// fon: sal kattaroq, har slaydda boshqa nuqtaga surilgan — Morph sekin "kamera" harakatini beradi
function bg(s, name, sc = 1.06, ox = .5, oy = .5) {
  n = 0;
  const w = W * sc, h = H * sc, x = -(w - W) * ox, y = -(h - H) * oy;
  s.addImage({ data: bgData(name), x, y, w, h, objectName: "!!bg" });
  return { x, y, w, h };
}
const over = (s, t, o = {}) => s.addText(t, { x: .7, y: .55, w: 6, h: .35, fontFace: F, fontSize: 13, bold: true, charSpacing: 5, color: K.gold, margin: 0, isTextBox: true, shadow: sh(), objectName: A("f") + "over", ...o });
const title = (s, t, o = {}) => s.addText(t, { x: .7, y: .95, w: 6, h: 1.2, fontFace: F, fontSize: 36, bold: true, color: K.white, margin: 0, valign: "top", isTextBox: true, shadow: sh(), objectName: A("u") + "title", ...o });
const panel = (s, x, y, w, h, k = "z") => s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: .18, fill: { color: K.panel, transparency: 22 }, line: { color: "FFFFFF", width: .75, transparency: 70 }, objectName: A(k) + "panel" });
const txt = (s, runs, o) => s.addText(runs, { fontFace: F, color: K.white, margin: 0, valign: "top", isTextBox: true, ...o, objectName: A(o.k || "u") + (o.nm || "t") });
const item = (d, t, ds = 20, ts = 15) => [{ text: d, options: { bold: true, color: K.gold, fontSize: ds, breakLine: true } }, { text: t, options: { fontSize: ts, color: K.white } }];

// 1. Sarlavha
let s = pres.addSlide(); bg(s, "01-sarlavha", 1.06, .2, .3);
over(s, "OʻZBEKISTONNING ENG YANGI TARIXI", { y: 1.35 });
txt(s, [{ text: "Oʻzbekiston", options: { breakLine: true } }, { text: "va BMT", options: { color: K.gold } }], { x: .7, y: 1.75, w: 6, h: 2.3, fontSize: 60, bold: true, shadow: sh(), nm: "title" });
txt(s, "BMTga aʼzo boʻlish va jahon hamjamiyatidagi oʻziga xos oʻrin", { x: .7, y: 4.05, w: 5.2, h: .8, fontSize: 18, italic: true, color: K.soft, shadow: sh(), nm: "sub" });
txt(s, "Muxamadov Muhammadali", { x: .7, y: 4.95, w: 5.5, h: .4, fontSize: 15, bold: true, k: "f", shadow: sh(), nm: "name" });
s.addNotes("Assalomu alaykum. Mustaqil ishim mavzusi — Oʻzbekiston Respublikasining BMTga aʼzo boʻlishi va jahon hamjamiyatidagi oʻziga xos oʻrni.");

// 2. Mustaqillik
s = pres.addSlide(); bg(s, "02-mustaqillik", 1.06, .8, .2);
over(s, "BIRINCHI QADAM"); title(s, "Mustaqillikdan xalqaro maydonga", { w: 5.6 });
panel(s, .55, 2.3, 5.4, 2.05);
txt(s, item("31.08.1991", "Davlat mustaqilligi eʼlon qilindi. Endi vazifa — xalqaro maydonda tan olinish", 44, 16), { x: .85, y: 2.5, w: 4.9, h: 1.75, k: "w", nm: "date" });
s.addNotes("1991-yil 31-avgustda mustaqillik eʼlon qilindi. Mustaqil davlat uchun eng muhim vazifalardan biri — xalqaro maydonda tan olinish edi. Bu yoʻldagi eng katta qadam BMTga aʼzo boʻlish boʻldi.");

// 3. BMT nima
s = pres.addSlide(); bg(s, "03-bmt", 1.06, .2, .7);
over(s, "BIRLASHGAN MILLATLAR TASHKILOTI"); title(s, "BMT nima?");
[["1945", "24-oktabrda tuzilgan"], ["193", "aʼzo davlat"], ["Nyu-York", "bosh qarorgoh"]].forEach(([b, t], i) =>
  txt(s, item(b, t, 30, 14), { x: [.7, 2.35, 3.85][i], y: 1.85, w: [1.6, 1.45, 2.5][i], h: 1.1, shadow: sh(), nm: "stat" + i }));
panel(s, .55, 3.35, 5.7, 3.55);
txt(s, "ASOSIY ORGANLARI", { x: .85, y: 3.6, w: 5, h: .35, fontSize: 13, bold: true, charSpacing: 4, color: K.gold, k: "f", nm: "ot" });
txt(s, ["Bosh Assambleya", "Xavfsizlik Kengashi", "Iqtisodiy va Ijtimoiy Kengash", "Xalqaro Sud", "Kotibiyat"].map((t, i, a) => ({ text: t, options: { bullet: { code: "25C6" }, paraSpaceAfter: 6, breakLine: i < a.length - 1 } })),
  { x: .85, y: 4.05, w: 5.2, h: 2.7, fontSize: 17, k: "u", nm: "org" });
s.addNotes("BMT 1945-yil 24-oktabrda tuzilgan, bosh qarorgohi Nyu-Yorkda. Maqsadlari — tinchlik va xavfsizlikni saqlash, inson huquqlarini himoya qilish, xalqlar hamkorligi. Asosiy organlari: Bosh Assambleya, Xavfsizlik Kengashi, Iqtisodiy va Ijtimoiy Kengash, Xalqaro Sud, Kotibiyat. BMTga aʼzolik — mustaqillikning butun dunyo tomonidan tan olinishi.");

// 4. 2-mart 1992 — bayroq koʻtariladi
s = pres.addSlide(); const b4 = bg(s, "04-bayroq", 1, 0, 0);
over(s, "TARIXIY SANA"); title(s, "BMTga aʼzo boʻldik");
txt(s, [{ text: "2-mart ", options: { color: K.gold } }, { text: "1992" }], { x: .7, y: 1.75, w: 7, h: 1.2, fontSize: 64, bold: true, shadow: sh(), k: "w", nm: "date" });
panel(s, .55, 3.25, 6.9, 2.05);
txt(s, [{ text: "BMT Bosh Assambleyasining 46-sessiyasida Oʻzbekiston BMTga qabul qilindi", options: { bullet: { code: "25C6" }, paraSpaceAfter: 10, breakLine: true } },
  { text: "Nyu-Yorkdagi BMT qarorgohi oldida bayrogʻimiz koʻtarildi", options: { bullet: { code: "25C6" } } }], { x: .85, y: 3.5, w: 6.4, h: 1.7, fontSize: 18, nm: "list" });
// ustun: rasmda x ≈ 84.8% (oʻng cheti), halqa ≈ 14% balandlikda
const fw = 1.9, fh = .95, fx = b4.x + b4.w * .846, fy = b4.y + b4.h * .145;
s.addImage({ data: FLAG, x: fx, y: fy, w: fw, h: fh, objectName: A("r") + "flag" });
s.addNotes("1992-yil 2-martda BMT Bosh Assambleyasining 46-sessiyasida Oʻzbekiston BMTga aʼzo qilib qabul qilindi. Shu kuni Nyu-Yorkda BMT qarorgohi oldida bayrogʻimiz koʻtarildi. (Slaydda bayroq ustun boʻylab koʻtariladi.)");

// 5. BMT minbarida — yadro qurolidan xoli hudud
s = pres.addSlide(); bg(s, "05-yadro", 1.06, .3, .2);
over(s, "BIRINCHI QADAMLAR", { w: 4 }); title(s, "BMT minbarida", { w: 4.2 });
panel(s, 9.15, .45, 3.8, 6.6);
[["1993", "Toshkentda BMT vakolatxonasi ochildi. YuNESKOga aʼzolik"], ["28.09.1993", "Islom Karimov, 48-sessiya: Markaziy Osiyo — yadro qurolidan xoli hudud boʻlsin"], ["08.09.2006", "Semipalatinskda shartnoma imzolandi"], ["2009", "Shartnoma kuchga kirdi"]].forEach(([d, t], i) =>
  txt(s, item(d, t, 20, 14), { x: 9.45, y: .75 + i * 1.6, w: 3.3, h: 1.45, nm: "tl" + i }));
s.addNotes("1993-yilda Toshkentda BMT vakolatxonasi ochildi, Oʻzbekiston YuNESKOga aʼzo boʻldi. 1993-yil 28-sentyabrda Islom Karimov BMT Bosh Assambleyasining 48-sessiyasida Markaziy Osiyoni yadro qurolidan xoli hudud deb eʼlon qilishni taklif qildi. 2006-yil 8-sentyabrda Semipalatinskda shartnoma imzolandi, 2009-yilda kuchga kirdi.");

// 6. Tamoyillar — emblemaning ikki yonida
s = pres.addSlide(); bg(s, "06-tamoyil", 1.06, .5, .5);
over(s, "BMT NIZOMIGA MOS", { w: 4.2 }); title(s, "Tashqi siyosat tamoyillari", { w: 4, fontSize: 30 });
["Suveren tenglik", "Kuch ishlatmaslik", "Chegaralar daxlsizligi", "Nizolarni tinch hal etish", "Ichki ishlarga aralashmaslik", "Xalqaro huquqqa rioya"].forEach((t, i) => {
  const x = i < 3 ? .5 : 9.2, y = 2.55 + (i % 3) * 1.15;
  panel(s, x, y, 3.65, .95);
  txt(s, [{ text: String(i + 1).padStart(2, "0") + "  ", options: { color: K.gold, bold: true } }, { text: t, options: { bold: true } }], { x: x + .25, y: y + .29, w: 3.25, h: .45, fontSize: 15, k: "f", nm: "p" + i });
});
panel(s, 2.4, 6.35, 8.55, .85);
txt(s, [{ text: "2012-yil konsepsiyasi: ", options: { bold: true, color: K.gold } }, { text: "harbiy-siyosiy bloklarga qoʻshilmaslik, xorijiy harbiy bazalarga yoʻl qoʻymaslik" }], { x: 2.65, y: 6.5, w: 8.1, h: .6, fontSize: 14, valign: "middle", nm: "kons" });
s.addNotes("Tashqi siyosat tamoyillari Konstitutsiyada belgilangan va BMT Nizomiga mos: suveren tenglik, kuch ishlatmaslik, chegaralar daxlsizligi, nizolarni tinch hal etish, ichki ishlarga aralashmaslik, xalqaro huquqqa rioya. 2012-yilgi konsepsiyaga koʻra Oʻzbekiston harbiy-siyosiy bloklarga qoʻshilmaydi, hududida xorijiy harbiy bazalar joylashtirilmaydi.");

// 7. Yangi Oʻzbekiston — Bosh Assambleya zali
s = pres.addSlide(); bg(s, "07-assambleya", 1.06, .1, .5);
over(s, "YANGI OʻZBEKISTON VA BMT", { x: 6.9 }); title(s, "BMT minbaridan tashabbuslar", { x: 6.9, w: 6 });
txt(s, item("19.09.2017", "Shavkat Mirziyoyev 72-sessiyada ilk bor nutq soʻzladi", 40, 16), { x: 6.9, y: 2.35, w: 6, h: 1.3, shadow: sh(), k: "w", nm: "big" });
panel(s, 6.75, 3.85, 6.15, 3.15);
[["2018, iyun", "Markaziy Osiyoda tinchlik va barqaror rivojlanish rezolyutsiyasi"], ["12.12.2018", "“Maʼrifat va diniy bagʻrikenglik” rezolyutsiyasi"], ["2020", "BMT Inson huquqlari kengashiga ilk bor saylandi"]].forEach(([d, t], i) =>
  txt(s, item(d, t, 17, 14), { x: 7.05, y: 4.05 + i * .98, w: 5.6, h: .9, nm: "r" + i }));
s.addNotes("2017-yil 19-sentyabrda Prezident Shavkat Mirziyoyev BMT Bosh Assambleyasining 72-sessiyasida nutq soʻzladi. Shu tashabbuslar asosida 2018-yil iyunda Markaziy Osiyo boʻyicha, 2018-yil 12-dekabrda “Maʼrifat va diniy bagʻrikenglik” rezolyutsiyalari qabul qilindi. 2020-yilda Oʻzbekiston ilk bor BMT Inson huquqlari kengashiga saylandi.");

// 8. Orol
s = pres.addSlide(); bg(s, "08-orol", 1.06, .9, .4);
over(s, "EKOLOGIYA"); title(s, "Orol — butun dunyo eʼtiborida", { w: 6 });
panel(s, .55, 2.4, 6, 2.75);
txt(s, item("2018", "BMT shafeligida Orolboʻyi uchun Inson xavfsizligi boʻyicha trast fondi tuzildi", 24, 16), { x: .85, y: 2.6, w: 5.45, h: 1.15, nm: "o1" });
txt(s, item("18.05.2021", "BMT Orolboʻyini ekologik innovatsiyalar va texnologiyalar hududi deb eʼlon qildi", 24, 16), { x: .85, y: 3.85, w: 5.45, h: 1.15, nm: "o2" });
s.addNotes("Orol fojiasi — Oʻzbekiston BMT minbaridan doimo koʻtarib kelayotgan masala. 2018-yilda BMT shafeligida Orolboʻyi mintaqasi uchun Inson xavfsizligi boʻyicha koʻp tomonlama sheriklik trast fondi tuzildi. 2021-yil 18-mayda BMT Bosh Assambleyasi Orolboʻyini ekologik innovatsiyalar va texnologiyalar hududi deb eʼlon qildi.");

// 9. Jahon hamjamiyatida
s = pres.addSlide(); bg(s, "09-jahon", 1.06, .6, .3);
over(s, "JAHON HAMJAMIYATIDA", { w: 4.6 }); title(s, "Oʻzbekistonning oʻrni", { w: 4.6, fontSize: 32 });
panel(s, .5, 2.45, 4.75, 4.75);
[["2001", "Shanxay hamkorlik tashkiloti aʼzosi"], ["2019", "Turkiy davlatlar tashkilotiga qoʻshildi"], ["4 shahar", "Xiva, Buxoro, Shahrisabz, Samarqand — YuNESKO merosida"], ["1-oʻrin", "Markaziy Osiyoda aholi soni boʻyicha"]].forEach(([d, t], i) =>
  txt(s, item(d, t, 22, 14), { x: .8, y: 2.65 + i * 1.12, w: 4.2, h: 1.15, nm: "w" + i }));
s.addNotes("Oʻzbekiston Markaziy Osiyoning markazida, mintaqada aholisi eng koʻp davlat. 2001-yildan Shanxay hamkorlik tashkiloti, 2019-yildan Turkiy davlatlar tashkiloti aʼzosi. Xiva (Ichan qalʼa), Buxoro, Shahrisabz, Samarqand tarixiy markazlari YuNESKO Butunjahon merosi roʻyxatida. Mintaqaviy hamkorlik tashabbuskori.");

// 10. Xulosa
s = pres.addSlide(); bg(s, "10-xulosa", 1.06, .3, .6);
over(s, "XULOSA", { y: .9 });
txt(s, "BMTga aʼzolik — mustaqilligimizning xalqaro eʼtirofi", { x: .7, y: 1.3, w: 5.6, h: 2.1, fontSize: 34, bold: true, shadow: sh(), nm: "q" });
txt(s, "Tinchlik · Xavfsizlik · Orol · Bagʻrikenglik", { x: .7, y: 3.45, w: 5.6, h: .45, fontSize: 16, italic: true, color: K.gold, shadow: sh(), k: "f", nm: "tags" });
txt(s, "Eʼtiboringiz uchun rahmat", { x: .7, y: 4.1, w: 5.6, h: .5, fontSize: 22, bold: true, color: K.soft, shadow: sh(), nm: "thx" });
s.addNotes("Xulosa: BMTga aʼzo boʻlish mustaqilligimiz xalqaro miqyosda tan olinishida hal qiluvchi qadam boʻldi. Oʻzbekiston BMT minbaridan tinchlik, mintaqaviy xavfsizlik, Orol muammosi va diniy bagʻrikenglik gʻoyalarini ilgari surmoqda. Eʼtiboringiz uchun rahmat.");

// ===== Morph va kirish animatsiyalari (XML) =====
function timing(xml) {
  const items = [...xml.matchAll(/<p:cNvPr id="(\d+)" name="a(\d+)([fuwzr])_[^"]*"/g)].map(m => ({ id: m[1], ord: +m[2], k: m[3] })).sort((a, b) => a.ord - b.ord);
  if (!items.length) return "";
  let id = 2; const D = 700, STEP = 280;
  const fx = items.map((it, i) => {
    const tg = `<p:tgtEl><p:spTgt spid="${it.id}"/></p:tgtEl>`;
    const set = () => `<p:set><p:cBhvr><p:cTn id="${++id}" dur="1" fill="hold"><p:stCondLst><p:cond delay="0"/></p:stCondLst></p:cTn>${tg}<p:attrNameLst><p:attrName>style.visibility</p:attrName></p:attrNameLst></p:cBhvr><p:to><p:strVal val="visible"/></p:to></p:set>`;
    const fade = (f = "fade", d = D) => `<p:animEffect transition="in" filter="${f}"><p:cBhvr><p:cTn id="${++id}" dur="${d}"/>${tg}</p:cBhvr></p:animEffect>`;
    const rise = `<p:anim calcmode="lin" valueType="num"><p:cBhvr additive="base"><p:cTn id="${++id}" dur="${D}" decel="100000" fill="hold"/>${tg}<p:attrNameLst><p:attrName>ppt_y</p:attrName></p:attrNameLst></p:cBhvr><p:tavLst><p:tav tm="0"><p:val><p:strVal val="#ppt_y+0.04"/></p:val></p:tav><p:tav tm="100000"><p:val><p:strVal val="#ppt_y"/></p:val></p:tav></p:tavLst></p:anim>`;
    const zoom = `<p:animScale><p:cBhvr><p:cTn id="${++id}" dur="${D}" decel="100000" fill="hold"/>${tg}</p:cBhvr><p:from><p:pt x="85000" y="85000"/></p:from><p:to><p:pt x="100000" y="100000"/></p:to></p:animScale>`;
    const flag = `<p:animMotion origin="layout" path="M 0 0.55 L 0 0 E" pathEditMode="relative" ptsTypes="AA"><p:cBhvr><p:cTn id="${++id}" dur="3200" accel="20000" decel="60000" fill="hold"/>${tg}<p:attrNameLst><p:attrName>ppt_x</p:attrName><p:attrName>ppt_y</p:attrName></p:attrNameLst></p:cBhvr></p:animMotion>`;
    const body = { w: () => set() + fade("wipe(left)"), u: () => set() + fade() + rise, z: () => set() + fade() + zoom, f: () => set() + fade(), r: () => set() + fade("fade", 400) + flag }[it.k]();
    const pr = { f: [10, 0], u: [42, 0], w: [22, 8], z: [53, 16], r: [0, 0] }[it.k];
    const cls = it.k === "r" ? `presetClass="path"` : `presetClass="entr"`;
    return `<p:par><p:cTn id="${++id}" presetID="${pr[0]}" ${cls} presetSubtype="${pr[1]}" fill="hold" nodeType="withEffect"><p:stCondLst><p:cond delay="${i * STEP}"/></p:stCondLst><p:childTnLst>${body}</p:childTnLst></p:cTn></p:par>`;
  }).join("");
  const a = ++id, b = ++id;
  return `<p:timing><p:tnLst><p:par><p:cTn id="1" dur="indefinite" restart="never" nodeType="tmRoot"><p:childTnLst><p:seq concurrent="1" nextAc="seek"><p:cTn id="2" dur="indefinite" nodeType="mainSeq"><p:childTnLst><p:par><p:cTn id="${a}" fill="hold"><p:stCondLst><p:cond delay="indefinite"/><p:cond evt="onBegin" delay="0"><p:tn val="2"/></p:cond></p:stCondLst><p:childTnLst><p:par><p:cTn id="${b}" fill="hold"><p:stCondLst><p:cond delay="0"/></p:stCondLst><p:childTnLst>${fx}</p:childTnLst></p:cTn></p:par></p:childTnLst></p:cTn></p:par></p:childTnLst></p:cTn><p:prevCondLst><p:cond evt="onPrev" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:prevCondLst><p:nextCondLst><p:cond evt="onNext" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:nextCondLst></p:seq></p:childTnLst></p:cTn></p:par></p:tnLst></p:timing>`;
}
const MORPH = `<mc:AlternateContent><mc:Choice Requires="p159"><p:transition spd="slow" p14:dur="2000"><p159:morph option="byObject"/></p:transition></mc:Choice><mc:Fallback><p:transition spd="slow"><p:fade/></p:transition></mc:Fallback></mc:AlternateContent>`;

(async () => {
  const zip = await JSZip.loadAsync(await pres.write({ outputType: "nodebuffer" }));
  for (const f of Object.keys(zip.files).filter(f => /^ppt\/slides\/slide\d+\.xml$/.test(f))) {
    let x = await zip.file(f).async("string");
    x = x.replace("<p:sld ", '<p:sld xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:p14="http://schemas.microsoft.com/office/powerpoint/2010/main" xmlns:p159="http://schemas.microsoft.com/office/powerpoint/2015/09/main" mc:Ignorable="p14 p159" ');
    x = x.replace("</p:sld>", MORPH + timing(x) + "</p:sld>");
    zip.file(f, x);
  }
  Object.keys(zip.files).filter(k => zip.files[k].dir).forEach(k => delete zip.files[k]);
  fs.writeFileSync(OUT, await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
  console.log("Tayyor:", OUT);
})();
