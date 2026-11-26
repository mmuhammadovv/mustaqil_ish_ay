// Tarix mustaqil ishi himoyasi uchun taqdimot: "Oʻzbekiston va BMT".
// Morph oʻtishlari (halqa, yorugʻlik, yil, bayroq slayddan slaydga oqib oʻtadi) + har elementga kirish animatsiyasi.
// Ishlatish: python3 tools/bmt_slayd_rasm.py P && python3 tools/bmt_illyustratsiya.py P && node tools/bmt_svg2png.js P && node tools/bmt_slayd.js P alohida/BMT_himoya.pptx
const fs = require("fs");
const pptxgen = require("pptxgenjs");
const JSZip = require("jszip");

const [IMG, OUT] = process.argv.slice(2);
const img = n => "image/png;base64," + fs.readFileSync(`${IMG}/${n}`).toString("base64");

const K = { night: "0B1638", gold: "E3C27A", gold2: "B8893A", cream: "F5EBD3", muted: "A9B4D0", un: "5B92E5", year: "1A2A5E", card: "132350", line: "3A4C86" };
const HEAD = "Bookman Old Style", BODY = "Calibri";
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 × 7.5
pres.title = "Oʻzbekiston va BMT"; pres.author = "Muxamadov Muhammadali";
pres.theme = { headFontFace: HEAD, bodyFontFace: BODY };

let n = 0; // har slaydda animatsiya tartibi
const A = (kind) => `a${String(++n).padStart(2, "0")}${kind}_`;
function base(s, { ring, glow, year, reg }) {
  n = 0;
  s.background = { data: img("fon.png") };
  if (reg) s.addImage({ data: img("registon.png"), ...reg, h: reg.w * 345 / 1600, transparency: 25, objectName: "!!regsil" });
  s.addShape(pres.shapes.OVAL, { ...glow, fill: { color: K.un, transparency: 86 }, line: { type: "none" }, objectName: "!!glow" });
  s.addShape(pres.shapes.OVAL, { ...ring, fill: { type: "none" }, line: { color: K.gold, width: 1.5, transparency: 35 }, objectName: "!!ring" });
  s.addShape(pres.shapes.OVAL, { x: ring.x + ring.w * .08, y: ring.y + ring.h * .08, w: ring.w * .84, h: ring.h * .84, fill: { type: "none" }, line: { color: K.gold, width: .75, dashType: "dash", transparency: 55 }, objectName: "!!ring2" });
  if (year) s.addText(year.t, { x: year.x, y: year.y, w: 7, h: 2.6, fontFace: HEAD, fontSize: 190, bold: true, color: K.year, align: year.align || "left", margin: 0, isTextBox: true, objectName: "!!year" });
}
const over = (s, text, y = .55) => s.addText(text, { x: .7, y, w: 9, h: .4, fontFace: BODY, fontSize: 14, bold: true, charSpacing: 4, color: K.gold, margin: 0, isTextBox: true, objectName: A("f") + "over" });
const title = (s, text, o = {}) => s.addText(text, { x: .7, y: .95, w: 11.5, h: 1, fontFace: HEAD, fontSize: 40, bold: true, color: K.cream, margin: 0, valign: "top", isTextBox: true, objectName: A("u") + "title", ...o });
const pole = (s, flagY) => {
  s.addShape(pres.shapes.RECTANGLE, { x: 10.05, y: .9, w: .07, h: 5.9, fill: { color: K.gold }, line: { type: "none" }, objectName: "!!pole" });
  s.addShape(pres.shapes.OVAL, { x: 9.98, y: .78, w: .21, h: .21, fill: { color: K.gold }, line: { type: "none" }, objectName: "!!poletop" });
  s.addImage({ data: img("bayroq.png"), x: 10.12, y: flagY, w: 2.4, h: 1.2, objectName: "!!flag" });
};

// ===== 1. Sarlavha =====
let s = pres.addSlide();
base(s, { reg: { x: 4.3, y: 5.56, w: 9 }, ring: { x: 7.3, y: -1.6, w: 8.2, h: 8.2 }, glow: { x: 8.5, y: -.6, w: 6, h: 6 } });
s.addImage({ data: img("globus.png"), x: 9.2, y: .3, w: 4.4, h: 4.4, objectName: A("z") + "globus" });
s.addText("OʻZBEKISTONNING ENG YANGI TARIXI  ·  MUSTAQIL ISH", { x: .8, y: 1.3, w: 9, h: .4, fontFace: BODY, fontSize: 14, bold: true, charSpacing: 4, color: K.gold, margin: 0, isTextBox: true, objectName: A("f") + "over" });
s.addText([{ text: "Oʻzbekiston", options: { breakLine: true } }, { text: "va BMT", options: { color: K.gold } }], { x: .8, y: 1.75, w: 8, h: 2.2, fontFace: HEAD, fontSize: 66, bold: true, color: K.cream, margin: 0, valign: "top", isTextBox: true, objectName: A("u") + "title" });
s.addText("BMTga aʼzo boʻlish va jahon hamjamiyatidagi oʻziga xos oʻrin", { x: .8, y: 4.05, w: 7.5, h: .5, fontFace: BODY, fontSize: 20, italic: true, color: K.cream, margin: 0, isTextBox: true, objectName: A("u") + "sub" });
s.addText("Muxamadov Muhammadali", { x: .8, y: 4.75, w: 6, h: .4, fontFace: BODY, fontSize: 16, bold: true, color: K.muted, margin: 0, isTextBox: true, objectName: A("f") + "name" });
s.addNotes("Assalomu alaykum. Mening mustaqil ishim mavzusi — Oʻzbekiston Respublikasining BMTga aʼzo boʻlishi va jahon hamjamiyatidagi oʻziga xos oʻrni.");

// ===== 2. Mustaqillik =====
s = pres.addSlide();
base(s, { ring: { x: 8.3, y: .7, w: 5.4, h: 5.4 }, glow: { x: 8.9, y: 1.4, w: 4.2, h: 4.2 }, year: { t: "1991", x: -.3, y: 4.6 } });
s.addImage({ data: img("monument.png"), x: 9.93, y: .85, w: 2.15, h: 4.19, objectName: A("z") + "monument" });
over(s, "BIRINCHI QADAM"); title(s, "Mustaqillikdan xalqaro maydonga");
s.addText("31.08.1991", { x: .7, y: 2.3, w: 7.5, h: 1.3, fontFace: HEAD, fontSize: 72, bold: true, color: K.gold, margin: 0, isTextBox: true, objectName: A("w") + "date" });
s.addText("Oʻzbekiston Respublikasining davlat mustaqilligi eʼlon qilindi", { x: .7, y: 3.65, w: 7, h: .9, fontFace: BODY, fontSize: 22, color: K.cream, margin: 0, valign: "top", isTextBox: true, objectName: A("u") + "t1" });
s.addText([{ text: "Navbatdagi vazifa: ", options: { bold: true, color: K.gold } }, { text: "xalqaro maydonda tan olinish va jahon hamjamiyatining teng huquqli aʼzosiga aylanish" }], { x: .7, y: 4.7, w: 7, h: 1, fontFace: BODY, fontSize: 18, color: K.muted, margin: 0, valign: "top", isTextBox: true, objectName: A("u") + "t2" });
s.addNotes("1991-yil 31-avgustda mustaqillik eʼlon qilindi. Mustaqil davlat uchun eng muhim vazifalardan biri — xalqaro maydonda tan olinish edi. Bu yoʻldagi eng katta qadam BMTga aʼzo boʻlish boʻldi.");

// ===== 3. BMT nima =====
s = pres.addSlide();
base(s, { ring: { x: -2.6, y: 3.2, w: 6.2, h: 6.2 }, glow: { x: -1.6, y: 4.2, w: 4.2, h: 4.2 }, year: { t: "1945", x: 2.6, y: 5.0 } });
pole(s, 5.5);
over(s, "BIRLASHGAN MILLATLAR TASHKILOTI"); title(s, "BMT nima?");
[["1945", "24-oktabrda tashkil topgan"], ["193", "aʼzo davlat"], ["Nyu-York", "bosh qarorgoh"]].forEach(([b, t], i) => {
  s.addText([{ text: b, options: { fontFace: HEAD, fontSize: 40, bold: true, color: K.gold, breakLine: true } }, { text: t, options: { fontSize: 16, color: K.cream } }],
    { x: .7 + i * 3.05, y: 2.2, w: 2.85, h: 1.5, fontFace: BODY, margin: 0, valign: "top", isTextBox: true, objectName: A("u") + "stat" + i });
});
s.addText("Asosiy organlari", { x: .7, y: 4.05, w: 6, h: .4, fontFace: BODY, fontSize: 14, bold: true, charSpacing: 3, color: K.gold, margin: 0, isTextBox: true, objectName: A("f") + "orgt" });
["Bosh Assambleya", "Xavfsizlik Kengashi", "Iqtisodiy va Ijtimoiy Kengash", "Xalqaro Sud", "Kotibiyat"].forEach((t, i) => {
  const x = .7 + (i % 3) * 3.05, y = 4.6 + Math.floor(i / 3) * .85;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 2.85, h: .65, rectRadius: .32, fill: { color: K.card, transparency: 15 }, line: { color: K.line, width: 1 }, objectName: A("z") + "org" + i });
  s.addText(t, { x, y, w: 2.85, h: .65, fontFace: BODY, fontSize: 15, bold: true, color: K.cream, align: "center", valign: "middle", margin: 0, isTextBox: true, objectName: A("f") + "orgx" + i });
});
s.addNotes("BMT 1945-yil 24-oktabrda tashkil topgan, bosh qarorgohi Nyu-Yorkda. Maqsadlari — tinchlik va xavfsizlikni saqlash, inson huquqlarini himoya qilish, xalqlar hamkorligi. Asosiy organlari: Bosh Assambleya, Xavfsizlik Kengashi, Iqtisodiy va Ijtimoiy Kengash, Xalqaro Sud, Kotibiyat. BMTga aʼzolik — mustaqillikning butun dunyo tomonidan tan olinishi.");

// ===== 4. 2-mart 1992 — bayroq koʻtariladi (Morph) =====
s = pres.addSlide();
base(s, { ring: { x: 7.9, y: -.9, w: 6.6, h: 6.6 }, glow: { x: 8.6, y: -.2, w: 5, h: 5 }, year: { t: "1992", x: -.3, y: 4.9 } });
pole(s, .95);
over(s, "TARIXIY SANA"); title(s, "BMTga aʼzo boʻldik");
s.addText("2-mart", { x: .7, y: 2.15, w: 8, h: 1.3, fontFace: HEAD, fontSize: 80, bold: true, color: K.gold, margin: 0, isTextBox: true, objectName: A("w") + "d1" });
s.addText("1992-yil", { x: .7, y: 3.4, w: 8, h: .8, fontFace: HEAD, fontSize: 40, color: K.cream, margin: 0, isTextBox: true, objectName: A("w") + "d2" });
s.addText([{ text: "BMT Bosh Assambleyasining 46-sessiyasida Oʻzbekiston BMTga qabul qilindi", options: { breakLine: true, bullet: { code: "25C6" }, paraSpaceAfter: 10 } },
  { text: "Nyu-Yorkdagi BMT qarorgohi oldida Oʻzbekiston bayrogʻi koʻtarildi", options: { bullet: { code: "25C6" } } }],
  { x: .7, y: 4.45, w: 8, h: 1.5, fontFace: BODY, fontSize: 19, color: K.cream, margin: 0, valign: "top", isTextBox: true, objectName: A("u") + "list" });
s.addNotes("1992-yil 2-martda BMT Bosh Assambleyasining 46-sessiyasida Oʻzbekiston BMTga aʼzo qilib qabul qilindi. Shu kuni Nyu-Yorkda BMT qarorgohi oldida bayrogʻimiz koʻtarildi. (Slayd almashganda bayroq tepaga koʻtariladi.)");

// ===== 5. BMT minbarida: vaqt chizigʻi =====
s = pres.addSlide();
base(s, { ring: { x: 10.2, y: -1.8, w: 4.6, h: 4.6 }, glow: { x: 10.6, y: -1.2, w: 3.6, h: 3.6 }, year: { t: "1993", x: 5.6, y: 5.0, align: "right" } });
over(s, "BIRINCHI QADAMLAR"); title(s, "BMT minbarida");
s.addImage({ data: img("kaptar.png"), x: 9.7, y: .3, w: 3.1, h: 1.77, objectName: A("z") + "kaptar" });
s.addShape(pres.shapes.LINE, { x: .9, y: 3.35, w: 11.5, h: 0, line: { color: K.gold, width: 2 }, objectName: A("w") + "axis" });
[["1993", "Toshkentda BMT vakolatxonasi ochildi. YuNESKOga aʼzolik"], ["28.09.1993", "Islom Karimov — 48-sessiya: Markaziy Osiyoni yadro qurolidan xoli hudud qilish taklifi"], ["08.09.2006", "Semipalatinskda shartnoma imzolandi"], ["2009", "Shartnoma kuchga kirdi"]].forEach(([d, t], i) => {
  const x = .9 + i * 2.95;
  s.addShape(pres.shapes.OVAL, { x: x - .15, y: 3.2, w: .3, h: .3, fill: { color: K.gold }, line: { color: K.night, width: 3 }, objectName: A("z") + "dot" + i });
  s.addText(d, { x: x - .15, y: 2.45, w: 2.8, h: .6, fontFace: HEAD, fontSize: 26, bold: true, color: K.gold, margin: 0, isTextBox: true, objectName: A("u") + "d" + i });
  s.addText(t, { x: x - .15, y: 3.75, w: 2.7, h: 1.8, fontFace: BODY, fontSize: 16, color: K.cream, margin: 0, valign: "top", isTextBox: true, objectName: A("u") + "t" + i });
});
s.addNotes("1993-yilda Toshkentda BMT vakolatxonasi ochildi, Oʻzbekiston YuNESKOga aʼzo boʻldi. 1993-yil 28-sentyabrda Islom Karimov BMT Bosh Assambleyasining 48-sessiyasida nutq soʻzlab, Markaziy Osiyoni yadro qurolidan xoli hudud deb eʼlon qilishni taklif qildi. Bu gʻoya amalga oshdi: 2006-yil 8-sentyabrda Semipalatinskda shartnoma imzolandi, 2009-yilda kuchga kirdi.");

// ===== 6. Tamoyillar =====
s = pres.addSlide();
base(s, { ring: { x: 9.4, y: 3.6, w: 5.4, h: 5.4 }, glow: { x: 10, y: 4.2, w: 4.2, h: 4.2 }, year: { t: "2012", x: 5.6, y: -.6, align: "right" } });
over(s, "KONSTITUTSIYA VA BMT NIZOMI"); title(s, "Tashqi siyosat tamoyillari");
s.addImage({ data: img("tarozi.png"), x: 10.55, y: 5.35, w: 1.95, h: 1.95, objectName: A("z") + "tarozi" });
["Davlatlarning suveren tengligi", "Kuch ishlatmaslik va kuch bilan tahdid qilmaslik", "Chegaralarning daxlsizligi", "Nizolarni tinch yoʻl bilan hal etish", "Ichki ishlarga aralashmaslik", "Xalqaro huquq qoidalariga rioya"].forEach((t, i) => {
  const x = .7 + (i % 3) * 3.95, y = 2.2 + Math.floor(i / 3) * 1.65;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 3.7, h: 1.4, rectRadius: .12, fill: { color: K.card, transparency: 10 }, line: { color: K.line, width: 1 }, objectName: A("z") + "c" + i });
  s.addText([{ text: String(i + 1).padStart(2, "0"), options: { fontFace: HEAD, fontSize: 22, bold: true, color: K.gold, breakLine: true } }, { text: t, options: { fontSize: 16, bold: true, color: K.cream } }],
    { x: x + .25, y: y + .15, w: 3.25, h: 1.15, fontFace: BODY, margin: 0, valign: "top", isTextBox: true, objectName: A("f") + "ct" + i });
});
s.addText([{ text: "2012-yil konsepsiyasi: ", options: { bold: true, color: K.gold } }, { text: "harbiy-siyosiy bloklarga qoʻshilmaslik, hududda xorijiy harbiy bazalarga yoʻl qoʻymaslik" }],
  { x: .7, y: 5.75, w: 8.4, h: .9, fontFace: BODY, fontSize: 17, color: K.cream, margin: 0, valign: "top", isTextBox: true, objectName: A("u") + "kons" });
s.addNotes("Tashqi siyosat tamoyillari Konstitutsiyada belgilangan va BMT Nizomiga mos: suveren tenglik, kuch ishlatmaslik, chegaralar daxlsizligi, nizolarni tinch hal etish, ichki ishlarga aralashmaslik, xalqaro huquqqa rioya. 2012-yilgi Tashqi siyosiy faoliyat konsepsiyasiga koʻra Oʻzbekiston harbiy-siyosiy bloklarga qoʻshilmaydi, hududida xorijiy harbiy bazalar joylashtirilmaydi.");

// ===== 7. Yangi Oʻzbekiston =====
s = pres.addSlide();
base(s, { ring: { x: -1.9, y: 1.1, w: 6.2, h: 6.2 }, glow: { x: -1, y: 2, w: 4.4, h: 4.4 }, year: { t: "2017", x: -.4, y: 5.0 } });
over(s, "YANGI OʻZBEKISTON VA BMT"); title(s, "Tashabbuslardan rezolyutsiyalarga");
s.addImage({ data: img("minbar.png"), x: 1.2, y: 4.95, w: 2.6, h: 2.34, objectName: A("z") + "minbar" });
s.addText([{ text: "19.09.2017", options: { fontFace: HEAD, fontSize: 40, bold: true, color: K.gold, breakLine: true } }, { text: "Shavkat Mirziyoyev BMT Bosh Assambleyasining 72-sessiyasida ilk bor nutq soʻzladi", options: { fontSize: 18, color: K.cream } }],
  { x: .7, y: 2.3, w: 4.2, h: 2.6, fontFace: BODY, margin: 0, valign: "top", isTextBox: true, objectName: A("w") + "big" });
[["2018, iyun", "Markaziy Osiyoda tinchlik va barqaror rivojlanish boʻyicha hamkorlik rezolyutsiyasi"], ["12.12.2018", "“Maʼrifat va diniy bagʻrikenglik” rezolyutsiyasi"], ["2018", "Orolboʻyi uchun BMT trast fondi tashkil etildi"], ["2020", "BMT Inson huquqlari kengashiga ilk bor saylandi"], ["18.05.2021", "Orolboʻyi — ekologik innovatsiyalar va texnologiyalar hududi"]].forEach(([d, t], i) => {
  const y = 2.2 + i * .95;
  s.addShape(pres.shapes.OVAL, { x: 5.6, y: y + .12, w: .22, h: .22, fill: { color: K.gold }, line: { type: "none" }, objectName: A("z") + "dt" + i });
  s.addText([{ text: d + "   ", options: { bold: true, color: K.gold } }, { text: t, options: { color: K.cream } }], { x: 6.05, y, w: 6.6, h: .8, fontFace: BODY, fontSize: 17, margin: 0, valign: "top", isTextBox: true, objectName: A("u") + "r" + i });
});
s.addNotes("2017-yil 19-sentyabrda Prezident Shavkat Mirziyoyev BMT Bosh Assambleyasining 72-sessiyasida nutq soʻzladi. Shu tashabbuslar asosida: 2018-yil iyunda Markaziy Osiyo boʻyicha rezolyutsiya, 2018-yil 12-dekabrda “Maʼrifat va diniy bagʻrikenglik” rezolyutsiyasi qabul qilindi, Orolboʻyi uchun BMT trast fondi tuzildi. 2020-yilda Oʻzbekiston ilk bor BMT Inson huquqlari kengashiga saylandi. 2021-yil 18-mayda Orolboʻyi ekologik innovatsiyalar va texnologiyalar hududi deb eʼlon qilindi.");

// ===== 8. Jahon hamjamiyatida =====
s = pres.addSlide();
base(s, { ring: { x: 9.2, y: -2.2, w: 5.2, h: 5.2 }, glow: { x: 9.7, y: -1.6, w: 4, h: 4 }, year: { t: "2001", x: 5.6, y: 4.95, align: "right" } });
s.addImage({ data: img("yollar.png"), x: 9.2, y: 3.7, w: 3.5, h: 3.5, objectName: A("z") + "yollar" });
over(s, "JAHON HAMJAMIYATIDA"); title(s, "Oʻzbekistonning oʻrni");
[["2001", "Shanxay hamkorlik tashkiloti aʼzosi"], ["2019", "Turkiy davlatlar tashkilotiga qoʻshildi"], ["4", "shahar markazi YuNESKO merosida: Xiva, Buxoro, Shahrisabz, Samarqand"], ["1-oʻrin", "Markaziy Osiyoda aholi soni boʻyicha"]].forEach(([b, t], i) => {
  const x = .7 + (i % 2) * 4.05, y = 2.2 + Math.floor(i / 2) * 2.05;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 3.8, h: 1.8, rectRadius: .12, fill: { color: K.card, transparency: 10 }, line: { color: K.line, width: 1 }, objectName: A("z") + "k" + i });
  s.addText([{ text: b, options: { fontFace: HEAD, fontSize: 34, bold: true, color: K.gold, breakLine: true } }, { text: t, options: { fontSize: 16, color: K.cream } }],
    { x: x + .25, y: y + .2, w: 3.35, h: 1.45, fontFace: BODY, margin: 0, valign: "top", isTextBox: true, objectName: A("f") + "kt" + i });
});
s.addNotes("Oʻzbekiston Markaziy Osiyoning markazida, mintaqada aholisi eng koʻp davlat. 2001-yildan Shanxay hamkorlik tashkiloti, 2019-yildan Turkiy davlatlar tashkiloti aʼzosi. Xiva (Ichan qalʼa), Buxoro, Shahrisabz, Samarqand tarixiy markazlari YuNESKO Butunjahon merosi roʻyxatida. Mintaqaviy hamkorlik tashabbuskori: qoʻshnilar bilan masalalar muzokara yoʻli bilan hal etilmoqda.");

// ===== 9. Xulosa =====
s = pres.addSlide();
base(s, { reg: { x: 2.17, y: 5.56, w: 9 }, ring: { x: 3.17, y: -.35, w: 7, h: 7 }, glow: { x: 4.17, y: .65, w: 5, h: 5 } });
s.addText("XULOSA", { x: 1.67, y: 1.4, w: 10, h: .4, fontFace: BODY, fontSize: 14, bold: true, charSpacing: 6, color: K.gold, align: "center", margin: 0, isTextBox: true, objectName: A("f") + "over" });
s.addText("BMTga aʼzolik — mustaqilligimizning xalqaro eʼtirofi", { x: 1.67, y: 1.95, w: 10, h: 1.8, fontFace: HEAD, fontSize: 40, bold: true, color: K.cream, align: "center", valign: "top", margin: 0, isTextBox: true, objectName: A("u") + "q" });
s.addText("Tinchlik  ·  Mintaqaviy xavfsizlik  ·  Orol muammosi  ·  Bagʻrikenglik", { x: 1.67, y: 3.85, w: 10, h: .5, fontFace: BODY, fontSize: 18, italic: true, color: K.gold, align: "center", margin: 0, isTextBox: true, objectName: A("f") + "tags" });
s.addText("Eʼtiboringiz uchun rahmat", { x: 1.67, y: 4.6, w: 10, h: .6, fontFace: HEAD, fontSize: 24, color: K.cream, align: "center", margin: 0, isTextBox: true, objectName: A("u") + "thx" });
s.addNotes("Xulosa: BMTga aʼzo boʻlish mustaqilligimiz xalqaro miqyosda tan olinishida hal qiluvchi qadam boʻldi. Oʻzbekiston BMT minbaridan tinchlik, mintaqaviy xavfsizlik, Orol muammosi va diniy bagʻrikenglik gʻoyalarini ilgari surmoqda. Eʼtiboringiz uchun rahmat.");

// ===== Morph oʻtishlari va animatsiyalar (XML) =====
function timing(xml) {
  const items = [...xml.matchAll(/<p:cNvPr id="(\d+)" name="a(\d+)([fuwz])_[^"]*"/g)].map(m => ({ id: m[1], ord: +m[2], k: m[3] })).sort((a, b) => a.ord - b.ord);
  if (!items.length) return "";
  let id = 3; const D = 650, STEP = 260;
  const fx = items.map((it, i) => {
    const tg = `<p:tgtEl><p:spTgt spid="${it.id}"/></p:tgtEl>`, set = `<p:set><p:cBhvr><p:cTn id="${++id}" dur="1" fill="hold"><p:stCondLst><p:cond delay="0"/></p:stCondLst></p:cTn>${tg}<p:attrNameLst><p:attrName>style.visibility</p:attrName></p:attrNameLst></p:cBhvr><p:to><p:strVal val="visible"/></p:to></p:set>`;
    const fade = (f = "fade") => `<p:animEffect transition="in" filter="${f}"><p:cBhvr><p:cTn id="${++id}" dur="${D}"/>${tg}</p:cBhvr></p:animEffect>`;
    const move = `<p:anim calcmode="lin" valueType="num"><p:cBhvr additive="base"><p:cTn id="${++id}" dur="${D}" fill="hold"><p:stCondLst><p:cond delay="0"/></p:stCondLst></p:cTn>${tg}<p:attrNameLst><p:attrName>ppt_y</p:attrName></p:attrNameLst></p:cBhvr><p:tavLst><p:tav tm="0"><p:val><p:strVal val="#ppt_y+0.04"/></p:val></p:tav><p:tav tm="100000"><p:val><p:strVal val="#ppt_y"/></p:val></p:tav></p:tavLst></p:anim>`;
    const zoom = `<p:animScale><p:cBhvr><p:cTn id="${++id}" dur="${D}" fill="hold"/>${tg}</p:cBhvr><p:from><p:pt x="70000" y="70000"/></p:from><p:to><p:pt x="100000" y="100000"/></p:to></p:animScale>`;
    const body = it.k === "w" ? set + fade("wipe(left)") : it.k === "u" ? set + fade() + move : it.k === "z" ? set + fade() + zoom : set + fade();
    const preset = { f: [10, 0], u: [42, 0], w: [22, 8], z: [53, 16] }[it.k];
    const outer = ++id;
    return `<p:par><p:cTn id="${outer}" presetID="${preset[0]}" presetClass="entr" presetSubtype="${preset[1]}" fill="hold" nodeType="${i ? "withEffect" : "afterEffect"}"><p:stCondLst><p:cond delay="${i * STEP}"/></p:stCondLst><p:childTnLst>${body}</p:childTnLst></p:cTn></p:par>`;
  }).join("");
  return `<p:timing><p:tnLst><p:par><p:cTn id="1" dur="indefinite" restart="never" nodeType="tmRoot"><p:childTnLst><p:seq concurrent="1" nextAc="seek"><p:cTn id="2" dur="indefinite" nodeType="mainSeq"><p:childTnLst><p:par><p:cTn id="${++id}" fill="hold"><p:stCondLst><p:cond delay="indefinite"/><p:cond evt="onBegin" delay="0"><p:tn val="2"/></p:cond></p:stCondLst><p:childTnLst><p:par><p:cTn id="${++id}" fill="hold"><p:stCondLst><p:cond delay="0"/></p:stCondLst><p:childTnLst>${fx}</p:childTnLst></p:cTn></p:par></p:childTnLst></p:cTn></p:par></p:childTnLst></p:cTn><p:prevCondLst><p:cond evt="onPrev" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:prevCondLst><p:nextCondLst><p:cond evt="onNext" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:nextCondLst></p:seq></p:childTnLst></p:cTn></p:par></p:tnLst></p:timing>`;
}
const MORPH = `<mc:AlternateContent><mc:Choice Requires="p159"><p:transition spd="slow" p14:dur="1800"><p159:morph option="byObject"/></p:transition></mc:Choice><mc:Fallback><p:transition spd="slow"><p:fade/></p:transition></mc:Fallback></mc:AlternateContent>`;

(async () => {
  const buf = await pres.write({ outputType: "nodebuffer" });
  const zip = await JSZip.loadAsync(buf);
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
