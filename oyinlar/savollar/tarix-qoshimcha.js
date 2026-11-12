/*
  OʻZBEKISTON TARIXI — faqat tarix uchun qoʻshimcha oʻyinlar maʼlumoti
  - afsona: "Haqiqat yoki afsona" — har toʻplamda 4 ta gap, bittasi soxta (s: true = haqiqat)
  - konvertlar: "Sirli konvert" — 3 ta ishora va 4 variantli javob
*/
window.QOSHIMCHA = window.QOSHIMCHA || {};
QOSHIMCHA.tarix = {
  afsona: [
    { mavzu: "BMT haqida", gaplar: [
      { t: "Oʻzbekiston BMTga 1992-yilda aʼzo boʻlgan.", s: true },
      { t: "BMTning bosh qarorgohi Nyu-York shahrida joylashgan.", s: true },
      { t: "BMT 1945-yilda tashkil topgan.", s: true },
      { t: "Nemis tili BMTning rasmiy tillaridan biri.", s: false, izoh: "BMTning 6 ta rasmiy tili: arab, ingliz, ispan, xitoy, rus va fransuz." } ] },
    { mavzu: "Davlat ramzlari", gaplar: [
      { t: "Davlat bayrogʻimizda 12 ta yulduz bor.", s: true },
      { t: "Mustaqillik kuni 1-sentabrda nishonlanadi.", s: true },
      { t: "Davlat madhiyasi soʻzlari muallifi — Abdulla Oripov.", s: true },
      { t: "Bayrogʻimizdagi yashil rang — tinchlik ramzi.", s: false, izoh: "Tinchlik va poklik — oq rang. Yashil rang tabiatning yangilanishini bildiradi." } ] },
    { mavzu: "Buyuk ajdodlar", gaplar: [
      { t: "“Algoritm” soʻzi al-Xorazmiy nomidan kelib chiqqan.", s: true },
      { t: "Ulugʻbek rasadxonasi Samarqandda joylashgan.", s: true },
      { t: "Ibn Sino “Tib qonunlari” asarini yozgan.", s: true },
      { t: "Abu Rayhon Beruniy Buxoroda tugʻilgan.", s: false, izoh: "Beruniy Xorazmda (Kat shahrida) tugʻilgan." } ] },
    { mavzu: "Orol fojiasi", gaplar: [
      { t: "Orol dengiziga Amudaryo va Sirdaryo quyiladi.", s: true },
      { t: "Orolning qurigan tubida Orolqum choʻli paydo boʻlgan.", s: true },
      { t: "BMT Orolboʻyini ekologik innovatsiyalar hududi deb eʼlon qilgan.", s: true },
      { t: "Orol dengizi bir paytlar Kaspiy dengizidan katta boʻlgan.", s: false, izoh: "Kaspiy har doim Oroldan ancha katta boʻlgan — u dunyodagi eng katta yopiq suv havzasi." } ] },
    { mavzu: "Xavfsizlik Kengashi", gaplar: [
      { t: "Xavfsizlik Kengashida 5 ta doimiy aʼzo bor.", s: true },
      { t: "“Veto” soʻzi lotincha “man qilaman” degani.", s: true },
      { t: "Bosh Assambleyada har bir davlat bitta ovozga ega.", s: true },
      { t: "Oʻzbekiston Xavfsizlik Kengashining doimiy aʼzosi.", s: false, izoh: "Doimiy aʼzolar: AQSh, Rossiya, Xitoy, Buyuk Britaniya va Fransiya." } ] },
    { mavzu: "Meʼmoriy obidalar", gaplar: [
      { t: "Goʻri Amir — Amir Temur maqbarasi.", s: true },
      { t: "Registon maydoni Samarqandda.", s: true },
      { t: "Ichan qalʼa Xiva shahrida joylashgan.", s: true },
      { t: "Kalta Minor minorasi Buxoroda joylashgan.", s: false, izoh: "Kalta Minor — Xivadagi Ichan qalʼada." } ] },
    { mavzu: "BMT tashkilotlari", gaplar: [
      { t: "YuNESKO taʼlim, fan va madaniyat bilan shugʻullanadi.", s: true },
      { t: "YuNISEF — BMTning Bolalar jamgʻarmasi.", s: true },
      { t: "JSST — Jahon sogʻliqni saqlash tashkiloti.", s: true },
      { t: "FAO — xalqaro futbol tashkiloti.", s: false, izoh: "FAO — Oziq-ovqat va qishloq xoʻjaligi tashkiloti. Futbol tashkiloti — FIFA, u BMTga kirmaydi." } ] },
    { mavzu: "Xalqaro tashkilotlar", gaplar: [
      { t: "Shanxay hamkorlik tashkiloti 2001-yilda tuzilgan.", s: true },
      { t: "Oʻzbekiston 2019-yilda Turkiy kengashga qoʻshilgan.", s: true },
      { t: "2022-yilda Samarqandda ShHT sammiti oʻtkazilgan.", s: true },
      { t: "Oʻzbekiston NATO harbiy blokining aʼzosi.", s: false, izoh: "Oʻzbekiston harbiy-siyosiy bloklarga qoʻshilmaslik siyosatini olib boradi." } ] },
    { mavzu: "Navroʻz va madaniy meros", gaplar: [
      { t: "“Navroʻz” soʻzi “yangi kun” degani.", s: true },
      { t: "BMT 21-martni Xalqaro Navroʻz kuni deb eʼlon qilgan.", s: true },
      { t: "Shashmaqom YuNESKOning nomoddiy meros roʻyxatida.", s: true },
      { t: "Navroʻz kuz faslida nishonlanadi.", s: false, izoh: "Navroʻz bahorda — kun va tun tenglashgan 21-mart atrofida nishonlanadi." } ] },
    { mavzu: "Oʻzbekiston BMT minbarida", gaplar: [
      { t: "2017-yilda BMT minbaridan oʻzbek tilida nutq yangragan.", s: true },
      { t: "“Maʼrifat va diniy bagʻrikenglik” rezolyutsiyasi 2018-yilda qabul qilingan.", s: true },
      { t: "Oʻzbekiston BMT Inson huquqlari kengashiga saylangan.", s: true },
      { t: "Oʻzbekiston 1945-yilda BMTni tashkil etgan davlatlardan biri.", s: false, izoh: "1945-yilda Oʻzbekiston mustaqil davlat emas edi. U BMTga 1992-yilda aʼzo boʻlgan." } ] },
    { mavzu: "Tinchlik tashabbuslari", gaplar: [
      { t: "Yadrosiz zona shartnomasi Semipalatinskda imzolangan.", s: true },
      { t: "Oʻzbekiston harbiy-siyosiy bloklarga qoʻshilmaydi.", s: true },
      { t: "“6+2” — Afgʻoniston boʻyicha tuzilgan guruh.", s: true },
      { t: "Sovet davrida Oʻzbekiston hududida asosiy yadro sinov poligoni boʻlgan.", s: false, izoh: "Semipalatinsk yadro sinov poligoni Qozogʻiston hududida joylashgan." } ] },
    { mavzu: "Qadimiy tarix", gaplar: [
      { t: "Afrosiyobdan qadimiy shaxmat donalari topilgan.", s: true },
      { t: "“Buyuk ipak yoʻli” nomini nemis olimi Rixtgofen bergan.", s: true },
      { t: "Amir Temurning shiori — “Kuch — adolatdadir”.", s: true },
      { t: "Bobur “Boburnoma”ni fors tilida yozgan.", s: false, izoh: "“Boburnoma” turkiy (eski oʻzbek) tilida yozilgan." } ] }
  ],

  // "Sirli konvert": har konvertda 3 ta ishora (300 → 200 → 100), javob — 4 variantli test
  konvertlar: [
    { j: "BMT", x: ["YuNESKO", "NATO", "Yevropa Ittifoqi"], i: ["Uning Ustavi 1945-yilda San-Fransiskoda imzolangan.", "Bosh qarorgohi Nyu-York shahrida joylashgan.", "Oʻzbekiston unga 1992-yil 2-martda aʼzo boʻlgan."] },
    { j: "Amir Temur", x: ["Zahiriddin Bobur", "Mirzo Ulugʻbek", "Alisher Navoiy"], i: ["Davlat boshqaruvi haqidagi “Tuzuklar” u bilan bogʻliq.", "Uning shiori: “Kuch — adolatdadir”.", "Samarqanddagi Goʻri Amir — uning maqbarasi."] },
    { j: "Mirzo Ulugʻbek", x: ["Amir Temur", "Ibn Sino", "Ahmad Fargʻoniy"], i: ["“Ziji jadidi Koʻragoniy” — uning yulduzlar jadvali.", "Samarqandda madrasa va rasadxona qurdirgan.", "Amir Temurning nevarasi, olim hukmdor."] },
    { j: "Orol dengizi", x: ["Kaspiy dengizi", "Balxash koʻli", "Issiqkoʻl"], i: ["XX asrning eng yirik ekologik falokatlaridan biri u bilan bogʻliq.", "Unga Amudaryo va Sirdaryo quyiladi.", "Qurigan tubida Orolqum choʻli paydo boʻlgan."] },
    { j: "YuNESKO", x: ["YuNISEF", "JSST", "BMT Taraqqiyot dasturi"], i: ["Oʻzbekiston unga 1993-yilda aʼzo boʻlgan.", "2025-yilda uning Bosh konferensiyasi Samarqandda oʻtgan.", "BMTning taʼlim, fan va madaniyat tashkiloti."] },
    { j: "Muhammad al-Xorazmiy", x: ["Abu Rayhon Beruniy", "Ibn Sino", "Ahmad Fargʻoniy"], i: ["Bagʻdoddagi “Bayt ul-hikma”da ishlagan.", "Uning asari nomidan “algebra” soʻzi kelib chiqqan.", "“Algoritm” soʻzi uning nomidan olingan."] },
    { j: "Navroʻz", x: ["Mustaqillik kuni", "Ramazon hayiti", "Konstitutsiya kuni"], i: ["2009-yilda YuNESKOning nomoddiy meros roʻyxatiga kiritilgan.", "BMT 21-martni uning xalqaro kuni deb eʼlon qilgan.", "Soʻzma-soʻz “yangi kun” degani."] },
    { j: "Ichan qalʼa", x: ["Registon", "Ark qalʼasi", "Shohi Zinda"], i: ["1990-yilda YuNESKO Butunjahon merosi roʻyxatiga kiritilgan.", "Unda mashhur Kalta Minor joylashgan.", "Xivadagi devor bilan oʻralgan ichki shahar."] },
    { j: "Veto", x: ["Ratifikatsiya", "Rezolyutsiya", "Kvorum"], i: ["Bu huquq BMTda faqat 5 ta davlatda bor.", "Xavfsizlik Kengashida qarorni toʻxtatib qoʻyadi.", "Lotincha “man qilaman” degani."] },
    { j: "Mustaqillik kuni", x: ["Konstitutsiya kuni", "Navroʻz", "Xotira va qadrlash kuni"], i: ["U 1991-yil 31-avgustda eʼlon qilingan mustaqillik bilan bogʻliq.", "Bu bayramda butun mamlakat boʻylab tantanalar oʻtadi.", "Har yili 1-sentabrda nishonlanadi."] },
    { j: "Ibn Sino", x: ["Abu Rayhon Beruniy", "Muhammad al-Xorazmiy", "Imom Buxoriy"], i: ["Buxoro yaqinidagi Afshona qishlogʻida tugʻilgan.", "Yevropada “Avitsenna” nomi bilan tanilgan.", "“Tib qonunlari” asarining muallifi."] },
    { j: "Abdulla Oripov", x: ["Erkin Vohidov", "Gʻafur Gʻulom", "Muhammad Yusuf"], i: ["Oʻzbekiston xalq shoiri, Oʻzbekiston Qahramoni.", "“Jannatga yoʻl” dramatik dostonining muallifi.", "Davlat madhiyasi soʻzlarining muallifi."] },
    { j: "Registon", x: ["Ichan qalʼa", "Labi hovuz", "Mustaqillik maydoni"], i: ["Nomi “qumli joy” maʼnosini beradi.", "Unda uchta madrasa bor: Ulugʻbek, Sherdor va Tillakori.", "Samarqanddagi eng mashhur maydon."] },
    { j: "Shanxay hamkorlik tashkiloti", x: ["Mustaqil Davlatlar Hamdoʻstligi", "Turkiy davlatlar tashkiloti", "YeXHT"], i: ["U 2001-yilda tuzilgan.", "2022-yilda uning sammiti Samarqandda oʻtgan.", "Qisqartmasi — ShHT."] }
  ],
  // "Oldinmi, keyinmi?": v — tartiblash uchun qiymat (yil + oy/100), y — koʻrsatiladigan yil
  voqealar: [
    { t: "Al-Xorazmiy tugʻildi", v: 783, y: "taxm. 783" },
    { t: "Imom Buxoriy tugʻildi", v: 810, y: "810" },
    { t: "Abu Rayhon Beruniy tugʻildi", v: 973, y: "973" },
    { t: "Ibn Sino tugʻildi", v: 980, y: "980" },
    { t: "Amir Temur tugʻildi", v: 1336, y: "1336" },
    { t: "Mirzo Ulugʻbek tugʻildi", v: 1394, y: "1394" },
    { t: "Goʻri Amir maqbarasi qurildi", v: 1403, y: "1403–1404" },
    { t: "Samarqanddagi Ulugʻbek madrasasi qurila boshladi", v: 1417, y: "1417" },
    { t: "Alisher Navoiy tugʻildi", v: 1441, y: "1441" },
    { t: "Zahiriddin Bobur tugʻildi", v: 1483, y: "1483" },
    { t: "Registondagi Sherdor madrasasi qurila boshladi", v: 1619, y: "1619" },
    { t: "Xivada Kalta Minor qurila boshladi", v: 1851, y: "1851" },
    { t: "“Turkiston viloyatining gazeti” chiqa boshladi", v: 1870, y: "1870" },
    { t: "Behbudiyning “Oyina” jurnali chiqa boshladi", v: 1913, y: "1913" },
    { t: "“Oʻtgan kunlar” romani kitob boʻlib chiqdi", v: 1926, y: "1926" },
    { t: "BMT tashkil topdi", v: 1945.10, y: "1945" },
    { t: "Toshkentda kuchli zilzila boʻldi", v: 1966.04, y: "1966" },
    { t: "Toshkent metrosi ochildi", v: 1977.11, y: "1977" },
    { t: "Oʻzbekiston mustaqilligi eʼlon qilindi", v: 1991.08, y: "1991, avgust" },
    { t: "Mustaqillik boʻyicha umumxalq referendumi oʻtdi", v: 1991.12, y: "1991, dekabr" },
    { t: "Oʻzbekiston BMTga aʼzo boʻldi", v: 1992.03, y: "1992, mart" },
    { t: "Birinchi Konstitutsiya qabul qilindi", v: 1992.12, y: "1992, dekabr" },
    { t: "Oʻzbekiston YuNESKOga aʼzo boʻldi", v: 1993.10, y: "1993" },
    { t: "Shanxay hamkorlik tashkiloti tuzildi", v: 2001.06, y: "2001" },
    { t: "Markaziy Osiyo yadrosiz zona shartnomasi imzolandi", v: 2006.09, y: "2006" },
    { t: "BMT minbaridan birinchi marta oʻzbek tilida nutq yangradi", v: 2017.09, y: "2017" },
    { t: "“Maʼrifat va diniy bagʻrikenglik” rezolyutsiyasi qabul qilindi", v: 2018.12, y: "2018" },
    { t: "Oʻzbekiston Turkiy kengashga qoʻshildi", v: 2019.10, y: "2019" },
    { t: "Oʻzbekiston BMT Inson huquqlari kengashiga saylandi", v: 2020.10, y: "2020" },
    { t: "Orolboʻyi ekologik innovatsiyalar hududi deb eʼlon qilindi", v: 2021.05, y: "2021" },
    { t: "Samarqandda ShHT sammiti oʻtdi", v: 2022.09, y: "2022" },
    { t: "Yangi tahrirdagi Konstitutsiya qabul qilindi", v: 2023.04, y: "2023" },
    { t: "Samarqandda YuNESKO Bosh konferensiyasi oʻtdi", v: 2025.10, y: "2025" }
  ],

  // "Harflab topish": savol + yashirin soʻz (katta harflarda)
  sozlar: [
    { s: "1991-yil 31-avgustda eʼlon qilingan tarixiy voqea", j: "MUSTAQILLIK" },
    { s: "Davlatning asosiy qonuni", j: "KONSTITUTSIYA" },
    { s: "Xalqaro tashkilot organining rasmiy qarori", j: "REZOLYUTSIYA" },
    { s: "BMTning taʼlim, fan va madaniyat tashkiloti", j: "YUNESKO" },
    { s: "Samarqanddagi uchta madrasali mashhur maydon", j: "REGISTON" },
    { s: "Al-Xorazmiy nomidan kelib chiqqan dasturlash atamasi", j: "ALGORITM" },
    { s: "Orol dengizining qurigan tubida paydo boʻlgan choʻl", j: "OROLQUM" },
    { s: "Davlatning tashqi siyosatini muzokaralar orqali amalga oshirish sanʼati", j: "DIPLOMATIYA" },
    { s: "Bir davlatning boshqa davlatdagi rasmiy vakolatxonasi", j: "ELCHIXONA" },
    { s: "Xalqaro shartnomani parlament tomonidan tasdiqlash", j: "RATIFIKATSIYA" },
    { s: "“Yangi kun” maʼnosini beruvchi bahor bayrami", j: "NAVROʻZ" },
    { s: "Davlat ramzlaridan biri — tantanali qoʻshiq", j: "MADHIYA" },
    { s: "Davlatning ichki va tashqi ishlarda mustaqilligi", j: "SUVERENITET" },
    { s: "2018-yilgi rezolyutsiya nomi: “Maʼrifat va diniy ...”", j: "BAGʻRIKENGLIK" },
    { s: "Kaptar va zaytun shoxi qaysi tushunchaning ramzi?", j: "TINCHLIK" }
  ],

  // "Taxmin": javob — son
  taxminlar: [
    { s: "BMTga nechta davlat aʼzo?", j: 193 },
    { s: "BMT Xavfsizlik Kengashida jami nechta aʼzo bor?", j: 15 },
    { s: "Davlat bayrogʻimizda nechta yulduz bor?", j: 12 },
    { s: "BMTning nechta rasmiy tili bor?", j: 6 },
    { s: "BMTning Barqaror rivojlanish maqsadlari nechta?", j: 17 },
    { s: "Oʻzbekiston BMTga qaysi yili aʼzo boʻlgan?", j: 1992 },
    { s: "BMT qaysi yili tashkil topgan?", j: 1945 },
    { s: "BMTni nechta davlat taʼsis etgan?", j: 51 },
    { s: "Oʻzbekiston nechta davlat bilan chegaradosh?", j: 5 },
    { s: "Oʻzbekistonda nechta viloyat bor? (Qoraqalpogʻiston Respublikasi va Toshkent shahridan tashqari)", j: 12 },
    { s: "Toshkent metrosi qaysi yili ochilgan?", j: 1977 },
    { s: "Xivadagi Kalta Minor qaysi yili qurila boshlagan?", j: 1851 },
    { s: "Amir Temur qaysi yili tugʻilgan?", j: 1336 },
    { s: "Alisher Navoiy qaysi yili tugʻilgan?", j: 1441 },
    { s: "BMT Xavfsizlik Kengashida nechta doimiy aʼzo bor?", j: 5 }
  ],

  // "Ipak yoʻli karvoni": yoʻl kataklari. tur: s — savol, f — oldinga, b — orqaga, x — oddiy
  ipakYoli: [
    { n: "Sian", tur: "x" }, { tur: "s" }, { tur: "x" }, { tur: "f", m: "Shamol orqadan esdi", d: 2 },
    { n: "Dunxuan", tur: "s" }, { tur: "x" }, { tur: "b", m: "Taklamakon choʻlida qum boʻroni", d: -3 }, { tur: "s" },
    { n: "Qashqar", tur: "x" }, { tur: "s" }, { tur: "f", m: "Ipakni yaxshi narxda sotdingiz", d: 2 }, { tur: "s" },
    { n: "Fargʻona", tur: "x" }, { tur: "s" }, { tur: "b", m: "Tuyalar charchadi", d: -2 }, { n: "Toshkent", tur: "s" },
    { tur: "x" }, { n: "Samarqand", tur: "s" }, { tur: "f", m: "Karvonsaroyda yangi yoʻl haqida bilib oldingiz", d: 3 }, { n: "Buxoro", tur: "s" },
    { tur: "x" }, { n: "Marv", tur: "s" }, { tur: "b", m: "Daryo toshdi — aylanib oʻtasiz", d: -3 }, { tur: "s" },
    { n: "Bagʻdod", tur: "x" }, { tur: "s" }, { tur: "f", m: "Savdogarlar hamroh boʻldi", d: 2 }, { tur: "s" },
    { n: "Damashq", tur: "s" }, { tur: "x" }, { n: "Konstantinopol", tur: "end" }
  ]

};
