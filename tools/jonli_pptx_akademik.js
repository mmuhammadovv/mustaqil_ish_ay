// Akademik yozuv fani — “Kim men?” jonli oʻyini uchun taqdimot (gazeta uslubi)
// Ishga tushirish: NODE_PATH=<pptxgenjs oʻrnatilgan node_modules> node tools/jonli_pptx_akademik.js <chiqish papkasi>
const pptxgen = require("pptxgenjs");
let applyTheme = null;
try { applyTheme = require(process.env.APPLY_THEME || "./apply_theme.js").applyTheme; } catch (e) {}
const OUT = process.argv[2] || "jonli-oyinlar/taqdimot";

// [rubrika, nom, boshlovchi uchun izoh]
const KIM = [
  ["Janr", "Felyeton", "Salbiy hodisalarni hajv va kulgi orqali fosh etuvchi publitsistik janr. A. Qodiriy felyetonlari mashhur."],
  ["Janr", "Intervyu", "Savol-javob shaklidagi suhbat janri."],
  ["Janr", "Reportaj", "Voqea joyidan muallif kuzatuvi asosida jonli hikoya qiluvchi janr."],
  ["Atama", "Klikbeyt", "Faqat bosishlar sonini oshirish uchun yozilgan shov-shuvli, chalgʻituvchi sarlavha."],
  ["Kasb", "Jurnalist", "Axborot toʻplab, OAV uchun material tayyorlovchi kishi."],
  ["Narsa", "Gazeta", "Davriy bosma nashr; publitsistikaning eng anʼanaviy maydoni."],
  ["Narsa", "Mikrofon", "Ovozni yozib olish va kuchaytirish uchun qurilma; radio, intervyu, podkast quroli."],
  ["Adib", "Abdulla Qodiriy", "“Oʻtgan kunlar” romani muallifi; “Julqunboy” taxallusi bilan felyetonlar yozgan."],
  ["Adib", "Mahmudxoʻja Behbudiy", "Jadid maʼrifatparvari; “Oyina” jurnali asoschisi, “Ikki emas, toʻrt til lozim” maqolasi muallifi."],
  ["Aktyor", "Charli Chaplin", "Ovozsiz kino davrining mashhur komik aktyori; kotelok, tayoqcha va moʻylov — uning obrazi."],
  ["Aktyor", "Jeki Chan", "Gonkonglik aktyor; jang sanʼati filmlari, tryuklarni koʻpincha oʻzi bajaradi."],
  ["Aktyor", "Leonardo DiKaprio", "“Titanik” filmidagi Jek roli bilan mashhur; “Tirik qolgan” filmi uchun “Oskar” olgan."],
  ["Aktyor", "Jonni Depp", "“Karib dengizi qaroqchilari” filmlaridagi kapitan Jek Sparrou roli."],
  ["Aktyor", "Rouen Atkinson", "Britaniyalik aktyor; deyarli soʻzsiz kulgili qahramon — Mister Bin roli."],
  ["Bloger", "MrBeast", "Dunyodagi eng koʻp obunachiga ega YouTube kanallaridan biri; katta sovrinli sinovlar (challenj) videolari."],
  ["Kasb", "Bloger", "Internetda oʻz kanali yoki sahifasi orqali muntazam kontent tayyorlovchi muallif."],
  ["Sportchi", "Krishtianu Ronaldu", "Portugaliyalik futbolchi; 7-raqam, “Real Madrid” va “Manchester Yunayted”da oʻynagan."],
  ["Sportchi", "Lionel Messi", "Argentinalik futbolchi; 2022-yilgi jahon chempionati gʻolibi, “Barselona” afsonasi."],
  ["Sportchi", "Hasanboy Doʻsmatov", "Oʻzbek bokschisi; 2016-yilgi Rio Olimpiadasi chempioni."],
  ["Sportchi", "Bahodir Jalolov", "Oʻzbek bokschisi; ogʻir vaznda ikki karra Olimpiada chempioni (Tokio, Parij)."],
  ["Qoʻshiqchi", "Sevara Nazarxon", "Oʻzbek qoʻshiqchisi; xalq qoʻshiqlarini zamonaviy uslubda ijro etadi."],
  ["Qoʻshiqchi", "Yulduz Usmonova", "Oʻzbekiston xalq artisti; koʻplab xorijiy sahnalarda chiqish qilgan."],
  ["Olim", "Albert Eynshteyn", "Nisbiylik nazariyasi muallifi; E = mc² formulasi."],
  ["Tadbirkor", "Stiv Jobs", "Apple kompaniyasi asoschilaridan biri; iPhone taqdimoti bilan mashhur."],
  ["Tadbirkor", "Ilon Mask", "Tesla elektromobillari va SpaceX raketa kompaniyasi rahbari."],
  ["Tadbirkor", "Mark Sukerberg", "Facebook ijtimoiy tarmogʻi asoschisi."],
  ["Personaj", "Xoʻja Nasriddin", "Xalq latifalarining zukko va hazilkash qahramoni; eshagi bilan tasvirlanadi."],
  ["Personaj", "Sherlok Xolms", "Konan Doyl yaratgan detektiv; London, Beyker-strit 221B, doʻsti doktor Vatson."],
  ["Personaj", "Garri Potter", "J. K. Rouling romanlaridagi yosh sehrgar; peshonasida chaqmoq shaklidagi chandiq."],
  ["Personaj", "Oʻrgimchak odam", "Komikslar qahramoni Piter Parker; devorga tirmashadi, toʻr otadi."],
  ["Joy", "Eyfel minorasi", "Parijdagi temir minora; Fransiyaning ramzi."],
  ["Joy", "Misr ehromlari", "Giza yaqinidagi qadimiy fir’avnlar maqbaralari; dunyo moʻjizalaridan biri."],
  ["Joy", "Chorvoq", "Toshkent viloyatidagi suv ombori va mashhur dam olish maskani."],
  ["Joy", "Registon", "Samarqanddagi maydon; uchta madrasa: Ulugʻbek, Sherdor, Tillakori."],
  ["Joy", "Ozodlik haykali", "Nyu-Yorkdagi ulkan haykal; Fransiya AQShga sovgʻa qilgan."],
  ["Narsa", "Smartfon", "Bugun eng koʻp yangilik oʻqiladigan qurilma; qoʻl telefoni va kompyuter birlashgan."],
  ["Platforma", "YouTube", "Video joylash va koʻrish platformasi; blogerlarning asosiy maydoni."],
  ["Platforma", "Telegram", "Messenjer; kanallar orqali yangiliklar tarqatiladi."],
  ["Platforma", "Instagram", "Rasm va qisqa video ulashish ijtimoiy tarmogʻi."],
  ["Atama", "Sunʼiy intellekt", "Oʻrganish va qaror qabul qilishga qodir kompyuter tizimlari; matn va rasm yarata oladi."]
].map(r => r.map(t => t.replace(/’/g, "ʼ")));

const THEME = {
  name: "Gazeta",
  headFontFace: "Cambria", bodyFontFace: "Calibri",
  colors: {
    dk1: "1B1916", lt1: "FFFFFF", dk2: "1B1916", lt2: "F3EEE4",
    accent1: "B02A1C", accent2: "1F3A5F", accent3: "6A6257", accent4: "D6CBB7", accent5: "8A6A2A", accent6: "ECE5D7",
    hlink: "B02A1C", folHlink: "6A6257"
  }
};
const T = THEME.colors;

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  pres.author = "Muxamadov Muhammadali";
  pres.title = "Kim men? — Akademik yozuv";
  const C = pres.SchemeColor;
  const foot = { text: { text: "Kim men? · Akademik yozuv", options: { x: 0.6, y: 6.95, w: 8, h: 0.35, fontSize: 11, color: C.accent3, margin: 0 } } };
  const num = { x: 12.0, y: 6.95, w: 0.75, h: 0.35, fontSize: 11, color: C.accent3, align: "right" };

  pres.defineSlideMaster({
    title: "Qopqoq", background: { color: T.dk1 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.8, y: 2.3, w: 11.7, h: 1.7, fontSize: 72, bold: true, color: C.background1, fontFace: "Cambria", valign: "bottom", align: "left", margin: 0 }, text: "" } },
      { placeholder: { options: { name: "body", type: "body", x: 0.8, y: 4.45, w: 11.7, h: 0.9, fontSize: 20, color: C.accent4, valign: "top", align: "left", margin: 0 }, text: "" } }
    ]
  });
  pres.defineSlideMaster({
    title: "Sarlavha", background: { color: T.lt2 },
    objects: [foot, { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.45, w: 12.1, h: 0.9, fontSize: 36, bold: true, color: C.text1, fontFace: "Cambria", valign: "middle", align: "left", margin: 0 }, text: "" } }],
    slideNumber: num
  });
  pres.defineSlideMaster({ title: "Sahna", background: { color: T.lt2 }, objects: [foot], slideNumber: num });

  // Gazeta "shapkasi": qalin va ingichka chiziq jufti (qopqoqda)
  const mast = (s, y) => {
    s.addShape(pres.shapes.LINE, { x: 0.8, y, w: 11.7, h: 0, line: { color: C.background1, width: 3 }, objectName: "chiziq-qalin" });
    s.addShape(pres.shapes.LINE, { x: 0.8, y: y + 0.12, w: 11.7, h: 0, line: { color: C.background1, width: 0.75 }, objectName: "chiziq-ingichka" });
  };
  const cover = (title, sub, sec, top) => {
    const s = pres.addSlide({ masterName: "Qopqoq", sectionTitle: sec });
    s.addText(top, { x: 0.8, y: 1.1, w: 11.7, h: 0.4, fontSize: 14, bold: true, charSpacing: 6, color: C.accent1, margin: 0, isTextBox: true });
    mast(s, 1.6);
    s.addText(title, { placeholder: "title" });
    s.addText(sub, { placeholder: "body" });
    return s;
  };
  // Raqamlangan qoidalar: qizil kvadrat ichida raqam
  const rules = (s, items, x, y, w, rowH, fs) => items.forEach((t, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x, y: y + i * rowH + 0.02, w: 0.46, h: 0.46, fill: { color: C.accent1 }, line: { type: "none" }, objectName: "raqam-" + (i + 1) });
    s.addText(String(i + 1), { x, y: y + i * rowH + 0.02, w: 0.46, h: 0.46, align: "center", valign: "middle", fontSize: 16, bold: true, color: C.background1, fontFace: "Cambria", margin: 0, isTextBox: true });
    s.addText(t, { x: x + 0.75, y: y + i * rowH, w: w - 0.75, h: rowH - 0.1, fontSize: fs, color: C.text1, valign: "top", margin: 0, isTextBox: true });
  });
  const stat = (s, x, y, w, big, small, color) => {
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h: 2.4, fill: { color: C.background1 }, line: { color: C.text1, width: 1 }, objectName: "karta-" + big });
    s.addText(big, { x, y: y + 0.3, w, h: 1.2, align: "center", fontSize: 60, bold: true, color, fontFace: "Cambria", margin: 0, isTextBox: true });
    s.addText(small, { x: x + 0.2, y: y + 1.5, w: w - 0.4, h: 0.75, align: "center", valign: "top", fontSize: 16, color: C.text1, margin: 0, isTextBox: true });
  };

  pres.addSection({ title: "Kirish" });
  cover("Kim men?", "Jonli oʻyin · Akademik yozuv", "Kirish", "JONLI OʻYIN · SINF UCHUN");

  let s = pres.addSlide({ masterName: "Sarlavha", sectionTitle: "Kirish" });
  s.addText("Qoidalar", { placeholder: "title" });
  rules(s, [
    "Har jamoadan bitta oʻyinchi chiqadi va ekranga orqa qilib turadi — kartochkani u koʻrmaydi, jamoa va zal koʻradi.",
    "Oʻyinchi “ha” yoki “yoʻq” javobli savollar beradi: “Men odammanmi?”, “Men aktyormanmi?”",
    "Jamoa faqat “ha” yoki “yoʻq” deydi. Boshqa soʻz aytilsa — ishora berildi, −50 ball.",
    "Vaqt — 90 soniya. Topilgach yoki vaqt tugagach, boshlovchi keyingi slaydga oʻtadi."
  ], 0.6, 1.75, 7.2, 1.2, 18);
  s.addShape(pres.shapes.RECTANGLE, { x: 8.4, y: 1.75, w: 4.3, h: 4.6, fill: { color: C.background1 }, line: { color: C.text1, width: 1 }, objectName: "namuna-fon" });
  s.addText("Yaxshi savollar", { x: 8.7, y: 1.95, w: 3.8, h: 0.5, fontSize: 20, bold: true, color: C.accent1, fontFace: "Cambria", margin: 0, isTextBox: true });
  s.addText([
    { text: "Men real odammanmi?", options: { bullet: true, breakLine: true } },
    { text: "Men kino yoki kitob qahramonimanmi?", options: { bullet: true, breakLine: true } },
    { text: "Men joymanmi? Narsamanmi?", options: { bullet: true, breakLine: true } },
    { text: "Men internetda mashhurmanmi?", options: { bullet: true, breakLine: true } },
    { text: "Men Oʻzbekiston bilan bogʻliqmanmi?", options: { bullet: true } }
  ], { x: 8.7, y: 2.6, w: 3.8, h: 3.5, fontSize: 16, color: C.text1, paraSpaceAfter: 8, valign: "top", margin: 0, isTextBox: true });

  s = pres.addSlide({ masterName: "Sarlavha", sectionTitle: "Kirish" });
  s.addText("Ball", { placeholder: "title" });
  stat(s, 0.6, 2.6, 2.85, "300", "10 tagacha savolda topsa", C.accent1);
  stat(s, 3.7, 2.6, 2.85, "200", "11–20 ta savolda", C.accent2);
  stat(s, 6.8, 2.6, 2.85, "100", "20 tadan koʻp savolda", C.text1);
  stat(s, 9.9, 2.6, 2.85, "−50", "jamoa ishora bersa", C.accent1);

  s = pres.addSlide({ masterName: "Sarlavha", sectionTitle: "Kirish" });
  s.addText("Kartochkalarda kimlar bor", { placeholder: "title" });
  const groups = [
    ["Publitsistika", "janrlar, atamalar, adiblar"], ["Aktyorlar", "kino yulduzlari"], ["Blogerlar", "internet mashhurlari"], ["Sportchilar", "futbol va boks"],
    ["Qoʻshiqchilar", "oʻzbek sahnasi"], ["Olim va tadbirkorlar", "fan va texnologiya"], ["Personajlar", "kitob, kino, latifa"], ["Joylar va narsalar", "shaharlar, platformalar"]
  ];
  groups.forEach(([h, d], i) => {
    const x = 0.6 + (i % 4) * 3.1, y = 1.9 + Math.floor(i / 4) * 2.35;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.85, h: 2.05, fill: { color: C.background1 }, line: { color: C.text1, width: 1 }, objectName: "guruh-" + i });
    s.addText(String(i + 1).padStart(2, "0"), { x: x + 0.25, y: y + 0.2, w: 1, h: 0.45, fontSize: 18, bold: true, color: C.accent1, fontFace: "Cambria", margin: 0, isTextBox: true });
    s.addText(h, { x: x + 0.25, y: y + 0.75, w: 2.4, h: 0.6, fontSize: 19, bold: true, color: C.text1, fontFace: "Cambria", margin: 0, valign: "top", isTextBox: true });
    s.addText(d, { x: x + 0.25, y: y + 1.4, w: 2.4, h: 0.45, fontSize: 14, color: C.accent3, margin: 0, valign: "top", isTextBox: true });
  });

  pres.addSection({ title: "Kartochkalar" });
  KIM.forEach(([cat, name, hint], i) => {
    const s = pres.addSlide({ masterName: "Sahna", sectionTitle: "Kartochkalar" });
    // Gazeta qirqimi koʻrinishidagi kartochka
    s.addShape(pres.shapes.RECTANGLE, { x: 2.15, y: 0.9, w: 9.0, h: 5.4, fill: { color: C.background1 }, line: { color: C.text1, width: 1.5 }, objectName: "kartochka" });
    s.addText("RUBRIKA", { x: 2.65, y: 1.3, w: 3, h: 0.35, fontSize: 12, bold: true, charSpacing: 6, color: C.accent3, margin: 0, isTextBox: true });
    s.addText(`№ ${i + 1} / ${KIM.length}`, { x: 7.65, y: 1.3, w: 3, h: 0.35, align: "right", fontSize: 12, bold: true, color: C.accent3, margin: 0, isTextBox: true });
    s.addShape(pres.shapes.LINE, { x: 2.65, y: 1.78, w: 8.0, h: 0, line: { color: C.text1, width: 0.75 }, objectName: "qirqim-chiziq" });
    s.addText(cat.toUpperCase(), { x: 2.15, y: 2.05, w: 9.0, h: 0.5, align: "center", fontSize: 20, bold: true, charSpacing: 6, color: C.accent1, margin: 0, isTextBox: true });
    s.addText(name, { x: 2.5, y: 2.7, w: 8.3, h: 2.4, align: "center", valign: "middle", fontSize: name.length > 16 ? 54 : 66, bold: true, color: C.text1, fontFace: "Cambria", margin: 0, isTextBox: true });
    s.addNotes(hint);
  });

  pres.addSection({ title: "Yakun" });
  cover("Oʻyin tugadi", "Ballarni hisoblang — eng koʻp ball toʻplagan jamoa gʻolib", "Yakun", "NATIJALAR");

  const f = OUT + "/Kim_men_akademik.pptx";
  await pres.writeFile({ fileName: f });
  if (applyTheme) await applyTheme(f, THEME);
  console.log("tayyor", f, KIM.length);
}
build();
