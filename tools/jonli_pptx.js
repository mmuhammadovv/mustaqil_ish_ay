// Tarix fani jonli oʻyinlari uchun taqdimotlar (Kim men?, Josus, Tarix bingosi)
const fs = require("fs");
const pptxgen = require("pptxgenjs");
const { applyTheme } = require("/root/.claude/skills/synced/ceb68c0b-7252-474f-88a5-f637b1798636_a5c8ff4a-5419-48dc-9120-c6bc4e17c0d6/pptx/scripts/apply_theme.js");

const SRC = "/home/user/mustaqil_ish_ay/jonli-oyinlar/";
const OUT = process.argv[2];
const grab = (file, name) => {
  const s = fs.readFileSync(SRC + file, "utf8");
  const m = s.match(new RegExp("const " + name + " = (\\[[\\s\\S]*?\\n\\]|\\[[^\\n]*\\]);"));
  return eval(m[1]);
};
const KIM = grab("kim-men.html", "C");      // [toifa, nom, izoh]
const JOY = grab("josus.html", "L");        // joylar
const BQ = grab("bingo.html", "Q");         // [savol, javob]

const THEME = {
  name: "Gʻisht va koshin",
  headFontFace: "Cambria", bodyFontFace: "Calibri",
  colors: {
    dk1: "2B1D13", lt1: "FFFFFF", dk2: "17305C", lt2: "F7F0E2",
    accent1: "1F4A8A", accent2: "15807A", accent3: "A8452A", accent4: "B07D2A", accent5: "6E5A46", accent6: "D9C9A6",
    hlink: "1F4A8A", folHlink: "6E5A46"
  }
};
const T = THEME.colors;

function deck(game) {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE"; // 13.333 × 7.5
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  pres.author = "Muxamadov Muhammadali";
  pres.title = game + " — jonli oʻyin";
  const C = pres.SchemeColor;
  const foot = [
    { text: { text: game + " · Oʻzbekistonning eng yangi tarixi", options: { x: 0.6, y: 6.95, w: 8, h: 0.35, fontSize: 11, color: C.accent5, fontFace: "Calibri", margin: 0 } } },
  ];
  const num = { x: 12.0, y: 6.95, w: 0.75, h: 0.35, fontSize: 11, color: C.accent5, align: "right" };

  pres.defineSlideMaster({
    title: "Qopqoq", background: { color: T.dk2 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.8, y: 2.0, w: 7.8, h: 1.8, fontSize: 60, bold: true, color: C.background1, fontFace: "Cambria", valign: "bottom", margin: 0, align: "left" }, text: "" } },
      { placeholder: { options: { name: "body", type: "body", x: 0.8, y: 4.0, w: 7.8, h: 1.2, fontSize: 20, color: C.accent6, valign: "top", margin: 0, align: "left" }, text: "" } }
    ]
  });
  pres.defineSlideMaster({
    title: "Sarlavha", background: { color: T.lt2 },
    objects: [
      ...foot,
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.45, w: 12.1, h: 0.9, fontSize: 36, bold: true, color: C.text1, fontFace: "Cambria", valign: "middle", margin: 0, align: "left" }, text: "" } }
    ],
    slideNumber: num
  });
  pres.defineSlideMaster({
    title: "Sahna", background: { color: T.lt2 },
    objects: [...foot],
    slideNumber: num
  });
  return { pres, C };
}

// Koshin naqshi: rombchalardan iborat panjara (qopqoq va boʻlim slaydlarida)
function lattice(s, pres, C, x0, y0, n, size) {
  const cols = [C.accent2, C.accent4, C.accent3, C.background1];
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    const filled = (r + c) % 2 === 0;
    s.addShape(pres.shapes.DIAMOND, {
      x: x0 + c * size, y: y0 + r * size, w: size, h: size,
      fill: filled ? { color: cols[(r * n + c) % 3] } : { type: "none" },
      line: { color: C.accent6, width: 1 }, objectName: `naqsh-${r}-${c}`
    });
  }
}
function cover(pres, C, title, sub, sec) {
  const s = pres.addSlide({ masterName: "Qopqoq", sectionTitle: sec });
  s.addText(title, { placeholder: "title" });
  s.addText(sub, { placeholder: "body" });
  lattice(s, pres, C, 9.0, 1.55, 4, 1.05);
  return s;
}
function badge(s, pres, C, x, y, sz, txt, fill, fs) {
  s.addShape(pres.shapes.DIAMOND, { x, y, w: sz, h: sz, fill: { color: fill }, line: { type: "none" }, objectName: "romb-" + txt });
  s.addText(String(txt), { x, y, w: sz, h: sz, align: "center", valign: "middle", fontSize: fs, bold: true, color: C.background1, fontFace: "Cambria", margin: 0, isTextBox: true });
}
// Raqamlangan qoidalar roʻyxati: romb ichida raqam + matn
function rules(s, pres, C, items, x, y, w, rowH, fs) {
  items.forEach((t, i) => {
    badge(s, pres, C, x, y + i * rowH + 0.02, 0.5, i + 1, [C.accent1, C.accent2, C.accent3, C.accent4][i % 4], 15);
    s.addText(t, { x: x + 0.75, y: y + i * rowH, w: w - 0.75, h: rowH - 0.1, fontSize: fs, color: C.text1, valign: "top", margin: 0, isTextBox: true });
  });
}
function stat(s, pres, C, x, y, w, big, small, color) {
  s.addShape(pres.shapes.RECTANGLE, { x, y, w, h: 2.4, fill: { color: C.background1 }, line: { color: C.accent6, width: 1 }, shadow: { type: "outer", color: "000000", opacity: 0.12, blur: 6, offset: 2, angle: 90 }, objectName: "karta-" + big });
  s.addText(big, { x, y: y + 0.3, w, h: 1.2, align: "center", fontSize: 60, bold: true, color, fontFace: "Cambria", margin: 0, isTextBox: true });
  s.addText(small, { x: x + 0.2, y: y + 1.5, w: w - 0.4, h: 0.75, align: "center", valign: "top", fontSize: 16, color: C.text1, margin: 0, isTextBox: true });
}
function closing(pres, C, title, sub, sec) { return cover(pres, C, title, sub, sec); }

/* ============ KIM MEN? ============ */
async function kimMen() {
  const { pres, C } = deck("Kim men?");
  pres.addSection({ title: "Kirish" });
  cover(pres, C, "Kim men?", "Jonli oʻyin · Oʻzbekistonning eng yangi tarixi", "Kirish");

  let s = pres.addSlide({ masterName: "Sarlavha", sectionTitle: "Kirish" });
  s.addText("Qoidalar", { placeholder: "title" });
  rules(s, pres, C, [
    "Har jamoadan bitta oʻyinchi chiqadi va ekranga orqa qilib turadi — kartochkani u koʻrmaydi, jamoa va zal koʻradi.",
    "Oʻyinchi “ha” yoki “yoʻq” javobli savollar beradi: “Men shaxsmanmi?”, “Men XX asrda yashaganmanmi?”",
    "Jamoa faqat “ha” yoki “yoʻq” deydi. Boshqa soʻz aytilsa — ishora berildi, −50 ball.",
    "Vaqt — 90 soniya. Topilgach yoki vaqt tugagach, boshlovchi keyingi slaydga oʻtadi."
  ], 0.6, 1.75, 7.2, 1.2, 18);
  s.addShape(pres.shapes.RECTANGLE, { x: 8.4, y: 1.75, w: 4.3, h: 4.6, fill: { color: C.background1 }, line: { color: C.accent6, width: 1 }, objectName: "namuna-fon" });
  s.addText("Yaxshi savollar", { x: 8.7, y: 1.95, w: 3.8, h: 0.5, fontSize: 20, bold: true, color: C.accent1, fontFace: "Cambria", margin: 0, isTextBox: true });
  s.addText([
    { text: "Men odammanmi?", options: { bullet: true, breakLine: true } },
    { text: "Men tashkilotmanmi?", options: { bullet: true, breakLine: true } },
    { text: "Men 1900-yildan oldin yashaganmanmi?", options: { bullet: true, breakLine: true } },
    { text: "Men olimmanmi? Shoirmanmi?", options: { bullet: true, breakLine: true } },
    { text: "Men Samarqand bilan bogʻliqmanmi?", options: { bullet: true } }
  ], { x: 8.7, y: 2.6, w: 3.8, h: 3.5, fontSize: 16, color: C.text1, paraSpaceAfter: 8, valign: "top", margin: 0, isTextBox: true });

  s = pres.addSlide({ masterName: "Sarlavha", sectionTitle: "Kirish" });
  s.addText("Ball", { placeholder: "title" });
  stat(s, pres, C, 0.6, 2.6, 2.85, "300", "10 tagacha savolda topsa", C.accent1);
  stat(s, pres, C, 3.7, 2.6, 2.85, "200", "11–20 ta savolda", C.accent2);
  stat(s, pres, C, 6.8, 2.6, 2.85, "100", "20 tadan koʻp savolda", C.accent4);
  stat(s, pres, C, 9.9, 2.6, 2.85, "−50", "jamoa ishora bersa", C.accent3);

  pres.addSection({ title: "Kartochkalar" });
  KIM.forEach(([cat, name, hint], i) => {
    const s = pres.addSlide({ masterName: "Sahna", sectionTitle: "Kartochkalar" });
    s.addShape(pres.shapes.RECTANGLE, { x: 2.15, y: 0.9, w: 9.0, h: 5.4, fill: { color: C.background1 }, line: { color: C.accent6, width: 1 }, shadow: { type: "outer", color: "000000", opacity: 0.14, blur: 10, offset: 3, angle: 90 }, objectName: "kartochka" });
    s.addShape(pres.shapes.DIAMOND, { x: 6.4, y: 1.35, w: 0.5, h: 0.5, fill: { color: C.accent4 }, line: { type: "none" }, objectName: "romb" });
    s.addText(cat.toUpperCase(), { x: 2.15, y: 2.05, w: 9.0, h: 0.5, align: "center", fontSize: 18, bold: true, charSpacing: 6, color: C.accent2, margin: 0, isTextBox: true });
    s.addText(name, { x: 2.5, y: 2.7, w: 8.3, h: 2.2, align: "center", valign: "middle", fontSize: name.length > 16 ? 54 : 66, bold: true, color: C.text1, fontFace: "Cambria", margin: 0, isTextBox: true });
    s.addText(`${i + 1} / ${KIM.length}`, { x: 2.15, y: 5.35, w: 9.0, h: 0.5, align: "center", fontSize: 14, color: C.accent5, margin: 0, isTextBox: true });
    s.addNotes(hint);
  });

  pres.addSection({ title: "Yakun" });
  closing(pres, C, "Oʻyin tugadi", "Ballarni hisoblang — eng koʻp ball toʻplagan jamoa gʻolib", "Yakun");
  const f = OUT + "/Kim_men.pptx";
  await pres.writeFile({ fileName: f }); await applyTheme(f, THEME);
}

/* ============ JOSUS ============ */
async function josus() {
  const { pres, C } = deck("Josus");
  pres.addSection({ title: "Kirish" });
  cover(pres, C, "Josus", "Jonli oʻyin · Oʻzbekistonning eng yangi tarixi", "Kirish");

  let s = pres.addSlide({ masterName: "Sarlavha", sectionTitle: "Kirish" });
  s.addText("Tayyorgarlik", { placeholder: "title" });
  rules(s, pres, C, [
    "3 ta toʻplam bor: A, B, C. Har toʻplamda 10 ta kartochka: 9 tasida joy nomi, bittasida “Josus”.",
    "Bitta raund — bitta toʻplam. Oʻyinchilar kam boʻlsa, ortiqcha joy kartochkasini olib qoʻying (josus doim qoladi).",
    "Buklangan kartochkalarni aralashtirib tarqating. Har kim oʻzinikini yashirincha koʻrib, yana buklaydi."
  ], 0.6, 1.8, 12.1, 1.4, 20);

  s = pres.addSlide({ masterName: "Sarlavha", sectionTitle: "Kirish" });
  s.addText("Qoidalar", { placeholder: "title" });
  rules(s, pres, C, [
    "Oʻyinchilar navbat bilan bir-biriga savol beradi: “Bu yerda nimani koʻrish mumkin?” Javob joyni oshkor qilmasin.",
    "Josus joyni bilmaydi — boshqalarning javoblaridan taxmin qilib, oʻzini sezdirmasligi kerak.",
    "Vaqt — 5 daqiqa. Istalgan payt “Josus — ...!” deb ovozga qoʻyish mumkin. Koʻpchilik rozi boʻlsa, oʻsha oʻyinchi kartochkasini ochadi.",
    "Josus istalgan payt “Joy — ...!” deb taxmin aytishi mumkin. Toʻgʻri boʻlsa — josus yutadi."
  ], 0.6, 1.75, 12.1, 1.2, 19);

  s = pres.addSlide({ masterName: "Sarlavha", sectionTitle: "Kirish" });
  s.addText("Ball", { placeholder: "title" });
  stat(s, pres, C, 0.6, 2.6, 3.8, "+1", "har bir oʻyinchiga — josus topilsa", C.accent2);
  stat(s, pres, C, 4.75, 2.6, 3.8, "+3", "josusga — joyni topsa yoki vaqt tugasa", C.accent3);
  stat(s, pres, C, 8.9, 2.6, 3.8, "+2", "josusga — boshqa oʻyinchi ayblansa", C.accent4);

  s = pres.addSlide({ masterName: "Sarlavha", sectionTitle: "Kirish" });
  s.addText("Mumkin boʻlgan joylar", { placeholder: "title" });
  JOY.forEach((j, i) => {
    const x = 0.6 + i * 4.15;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 2.0, w: 3.85, h: 3.6, fill: { color: C.background1 }, line: { color: C.accent6, width: 1 }, objectName: "joy-" + i });
    badge(s, pres, C, x + 1.5, 2.4, 0.85, "ABC"[i], [C.accent1, C.accent2, C.accent3][i], 24);
    s.addText(j, { x: x + 0.25, y: 3.55, w: 3.35, h: 1.6, align: "center", valign: "middle", fontSize: 24, bold: true, color: C.text1, fontFace: "Cambria", margin: 0, isTextBox: true });
  });

  JOY.forEach((j, i) => {
    const sec = `Raund ${i + 1}`;
    pres.addSection({ title: sec });
    const a = pres.addSlide({ masterName: "Qopqoq", sectionTitle: sec });
    a.addText(`${i + 1}-raund`, { placeholder: "title" });
    a.addText(`Toʻplam ${"ABC"[i]} · vaqt — 5 daqiqa`, { placeholder: "body" });
    badge(a, pres, C, 9.6, 1.9, 2.6, "ABC"[i], [C.accent1, C.accent2, C.accent3][i], 96);
    a.addNotes("Kartochkalarni tarqating. Hamma koʻrib boʻlgach, 5 daqiqalik vaqtni boshlang. Joy nomi keyingi slaydda — uni raund tugagach koʻrsating.");
    const b = pres.addSlide({ masterName: "Sahna", sectionTitle: sec });
    b.addText("JOY EDI", { x: 0.6, y: 1.7, w: 12.1, h: 0.6, align: "center", fontSize: 20, bold: true, charSpacing: 8, color: C.accent2, margin: 0, isTextBox: true });
    b.addText(j, { x: 0.6, y: 2.4, w: 12.1, h: 1.8, align: "center", valign: "middle", fontSize: 60, bold: true, color: C.text1, fontFace: "Cambria", margin: 0, isTextBox: true });
    [5.6, 6.35, 7.1].forEach((x, k) => b.addShape(pres.shapes.DIAMOND, { x, y: 4.6, w: 0.5, h: 0.5, fill: { color: [C.accent1, C.accent4, C.accent3][k] }, line: { type: "none" }, objectName: "romb-" + k }));
    b.addText("Josus kartochkasini oching va ballarni yozing", { x: 0.6, y: 5.4, w: 12.1, h: 0.5, align: "center", fontSize: 18, color: C.accent5, margin: 0, isTextBox: true });
  });

  pres.addSection({ title: "Yakun" });
  closing(pres, C, "Oʻyin tugadi", "Uch raund ballarini qoʻshing — eng koʻp ball toʻplagan gʻolib", "Yakun");
  const f = OUT + "/Josus.pptx";
  await pres.writeFile({ fileName: f }); await applyTheme(f, THEME);
}

/* ============ BINGO ============ */
async function bingo() {
  const { pres, C } = deck("Tarix bingosi");
  pres.addSection({ title: "Kirish" });
  cover(pres, C, "Tarix bingosi", "Jonli oʻyin · Oʻzbekistonning eng yangi tarixi", "Kirish");

  let s = pres.addSlide({ masterName: "Sarlavha", sectionTitle: "Kirish" });
  s.addText("Qoidalar", { placeholder: "title" });
  rules(s, pres, C, [
    "Har jamoaga bitta bingo kartochkasi beriladi. Markazdagi “BMT” katagi boshidan belgilangan.",
    "Ekranda savol chiqadi — 30 soniya oʻylang. Javob kartochkangizda boʻlsa, katakni belgilang.",
    "Gorizontal, vertikal yoki diagonal boʻyicha 5 ta katak belgilansa — “Bingo!” deng.",
    "Boshlovchi tekshiradi. Xato belgi topilsa, katak oʻchiriladi va oʻyin davom etadi."
  ], 0.6, 1.75, 7.2, 1.2, 18);
  // 5×5 kartochka namunasi: bitta qator yutuq
  const gx = 8.6, gy = 1.75, cs = 0.82;
  for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) {
    const win = r === c, mid = r === 2 && c === 2;
    s.addShape(pres.shapes.RECTANGLE, { x: gx + c * cs, y: gy + r * cs, w: cs, h: cs, fill: { color: mid ? C.accent1 : win ? C.accent4 : C.background1 }, line: { color: C.accent5, width: 1 }, objectName: `katak-${r}-${c}` });
    if (mid) s.addText("BMT", { x: gx + c * cs, y: gy + r * cs, w: cs, h: cs, align: "center", valign: "middle", fontSize: 13, bold: true, color: C.background1, margin: 0, isTextBox: true });
  }
  s.addText("Diagonal — Bingo!", { x: gx, y: gy + 5 * cs + 0.15, w: 5 * cs, h: 0.4, align: "center", fontSize: 14, color: C.accent5, margin: 0, isTextBox: true });

  pres.addSection({ title: "Savollar" });
  BQ.forEach(([q, a], i) => {
    const s = pres.addSlide({ masterName: "Sahna", sectionTitle: "Savollar" });
    badge(s, pres, C, 0.6, 0.55, 1.1, i + 1, C.accent1, 26);
    s.addText(`Savol ${i + 1} / ${BQ.length}`, { x: 1.95, y: 0.8, w: 6, h: 0.6, fontSize: 18, bold: true, charSpacing: 4, color: C.accent2, valign: "middle", margin: 0, isTextBox: true });
    s.addText("30 soniya", { x: 9.7, y: 0.8, w: 3.0, h: 0.6, align: "right", fontSize: 18, color: C.accent5, valign: "middle", margin: 0, isTextBox: true });
    s.addText(q, { x: 0.6, y: 2.0, w: 12.1, h: 3.8, fontSize: q.length > 70 ? 40 : 46, bold: true, color: C.text1, fontFace: "Cambria", valign: "middle", margin: 0, isTextBox: true });
    s.addNotes("Javob: " + a);

    const t = pres.addSlide({ masterName: "Sahna", sectionTitle: "Savollar" });
    badge(t, pres, C, 0.6, 0.55, 1.1, i + 1, C.accent2, 26);
    t.addText(q, { x: 1.95, y: 0.55, w: 10.75, h: 1.1, fontSize: 18, color: C.accent5, valign: "middle", margin: 0, isTextBox: true });
    t.addText("JAVOB", { x: 0.6, y: 2.3, w: 12.1, h: 0.6, align: "center", fontSize: 20, bold: true, charSpacing: 8, color: C.accent2, margin: 0, isTextBox: true });
    t.addText(a, { x: 0.6, y: 3.0, w: 12.1, h: 2.2, align: "center", valign: "middle", fontSize: a.length > 18 ? 60 : 80, bold: true, color: C.text1, fontFace: "Cambria", margin: 0, isTextBox: true });
  });

  pres.addSection({ title: "Yakun" });
  closing(pres, C, "Bingo!", "Gʻolib jamoa kartochkasini tekshiring", "Yakun");
  const f = OUT + "/Tarix_bingosi.pptx";
  await pres.writeFile({ fileName: f }); await applyTheme(f, THEME);
}

(async () => { await kimMen(); await josus(); await bingo(); console.log("tayyor", KIM.length, JOY.length, BQ.length); })();
