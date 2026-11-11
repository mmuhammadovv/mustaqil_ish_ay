/*
  SAVOLLAR BAZASI
  ===============
  Barcha oʻyinlar savollarni shu fayldan oladi.

  Yangi mavzu qoʻshish uchun pastdagi SHABLON blokini nusxalab,
  MAVZULAR roʻyxatiga yangi kalit bilan qoʻshing. Talablar:
    - 6 ta kategoriya, har birida 5 ta savol (osondan qiyinga: 100 → 500);
    - s    — savol matni;
    - j    — toʻgʻri javob (qisqa);
    - x    — 3 ta notoʻgʻri variant (test rejimi va "Zinapoya" oʻyini uchun);
    - izoh — javobdan keyin koʻrsatiladigan qisqa tushuntirish (ixtiyoriy);
    - final — "Tezkor tugma" oʻyinining final savoli.
*/
window.MAVZULAR = window.MAVZULAR || {};

MAVZULAR.publitsistika = {
  nomi: "Publitsistik nutq uslubi",
  fan: "Akademik yozuv",
  kategoriyalar: [
    { nomi: "Uslub nazariyasi", savollar: [
      { s: "“Publitsistika” soʻzi qaysi tildan olingan?", j: "Lotin tilidan", x: ["Yunon tilidan", "Arab tilidan", "Fransuz tilidan"], izoh: "Lotincha <i>publicus</i> — “ijtimoiy, ommaviy”." },
      { s: "Publitsistik uslubning ikki asosiy vazifasi qaysilar?", j: "Xabar berish va taʼsir koʻrsatish", x: ["Tasvirlash va bezash", "Buyruq berish va nazorat qilish", "Taʼriflash va isbotlash"] },
      { s: "Oʻzbek tilida nechta asosiy funksional uslub ajratiladi?", j: "5 ta", x: ["3 ta", "4 ta", "7 ta"], izoh: "Soʻzlashuv, ilmiy, rasmiy-idoraviy, publitsistik va badiiy." },
      { s: "Qaysi biri publitsistik uslub qoʻllanadigan matn EMAS?", j: "Qonun matni", x: ["Gazeta maqolasi", "Teleboshlovchi sharhi", "Notiqlik nutqi"], izoh: "Qonun matni rasmiy-idoraviy uslubga tegishli." },
      { s: "Publitsistik uslubni boshqa uslublardan ajratib turuvchi asosiy belgi nima?", j: "Baho berish va harakatga chorlash", x: ["Faqat atamalar qoʻllash", "Qofiya va vazn", "Shaxssiz qolip iboralar"] }
    ]},
    { nomi: "Janrlar", savollar: [
      { s: "Salbiy hodisalarni hajv va kulgi orqali fosh etuvchi janr qaysi?", j: "Felyeton", x: ["Ocherk", "Xronika", "Intervyu"] },
      { s: "Voqea joyidan, muallif koʻzi bilan “jonli” hikoya qiluvchi janr qaysi?", j: "Reportaj", x: ["Taqriz", "Esse", "Pamflet"] },
      { s: "Real shaxs yoki voqeani badiiy tasvir vositalari bilan hikoya qiluvchi janr qaysi?", j: "Ocherk", x: ["Xabar", "Hisobot", "Sharh"] },
      { s: "Publitsistik janrlar qaysi uch guruhga boʻlinadi?", j: "Axborot, tahliliy, badiiy-publitsistik", x: ["Nazmiy, nasriy, dramatik", "Rasmiy, ilmiy, soʻzlashuv", "Qisqa, oʻrta, uzun"] },
      { s: "Kitob, film yoki spektakl haqida tanqidiy-tahliliy fikr bildiruvchi janr qaysi?", j: "Taqriz", x: ["Reportaj", "Felyeton", "Xronika"] }
    ]},
    { nomi: "Til vositalari", savollar: [
      { s: "“Bunga kim javobgar?” — javob kutmaydigan, oʻylashga undovchi savol qanday ataladi?", j: "Ritorik soʻroq", x: ["Murojaat", "Undov", "Kinoya"] },
      { s: "“Aziz yoshlar!” — bu qaysi publitsistik vosita?", j: "Murojaat", x: ["Metafora", "Antiteza", "Parcellyatsiya"] },
      { s: "“Yo hayot — yo mamot, yo saodat — yo falokat.” Qarama-qarshi tushunchalarni yonma-yon qoʻyish usuli qaysi?", j: "Antiteza", x: ["Metafora", "Sifatlash", "Oʻxshatish"], izoh: "A. Avloniyning “Turkiy guliston yoxud axloq” asaridan." },
      { s: "“OAV — jamiyatning koʻzgusi.” Bu qaysi tasviriy vosita?", j: "Metafora", x: ["Antiteza", "Ritorik soʻroq", "Kinoya"] },
      { s: "“Biz oʻzgaramiz. Albatta. Lekin qachon?” — gapni boʻlaklarga boʻlib taʼkid yaratish usuli qaysi?", j: "Parcellyatsiya", x: ["Inversiya", "Gradatsiya", "Ellipsis"] }
    ]},
    { nomi: "Matbuot tarixi", savollar: [
      { s: "Abdulla Qodiriy “Mushtum” jurnalida qaysi taxallus bilan yozgan?", j: "Julqunboy", x: ["Choʻlpon", "Fitrat", "Tavallo"] },
      { s: "Behbudiyning “Ikki emas, toʻrt til lozim” maqolasi qaysi jurnalda chiqqan?", j: "“Oyina”", x: ["“Mushtum”", "“Xurshid”", "“Sadoi Turkiston”"], izoh: "1913-yil." },
      { s: "Abdulla Avloniy 1907-yilda asos solgan gazeta qaysi?", j: "“Shuhrat”", x: ["“Taraqqiy”", "“Xalq soʻzi”", "“Oyina”"] },
      { s: "Oʻzbek tilidagi ilk gazeta qaysi?", j: "“Turkiston viloyatining gazeti”", x: ["“Taraqqiy”", "“Xalq soʻzi”", "“Samarqand”"], izoh: "1870-yildan chiqa boshlagan." },
      { s: "Behbudiy yoshlar qaysi toʻrt tilni bilishi kerak deb yozgan?", j: "Turkiy, forsiy, arab, rus", x: ["Turkiy, ingliz, fransuz, nemis", "Arab, fors, xitoy, rus", "Turkiy, rus, ingliz, arab"] }
    ]},
    { nomi: "Maqola tuzilishi", savollar: [
      { s: "Maqolaning oʻquvchini birinchi jumladanoq qiziqtiradigan kirish abzasi nima deyiladi?", j: "Lid", x: ["Sarlavha", "Xotima", "Iqtibos"] },
      { s: "Eng muhim maʼlumot boshida, kamroq muhimlari oxirida beriladigan tuzilish qanday ataladi?", j: "Teskari piramida", x: ["Toʻgʻri piramida", "Xronologik tartib", "Halqa kompozitsiya"] },
      { s: "Publitsistik maqola odatda nima bilan yakunlanadi?", j: "Xulosa va chaqiriq", x: ["Lid", "Sarlavha", "Annotatsiya"] },
      { s: "Qaysi biri maqolada dalil boʻla OLMAYDI?", j: "Tekshirilmagan mish-mish", x: ["Rasmiy statistika", "Mutaxassis fikri", "Hujjat"] },
      { s: "“Dolzarb masala”, “jamoatchilik eʼtibori” kabi koʻp takrorlanadigan tayyor birikmalar nima deyiladi?", j: "Nutqiy qoliplar", x: ["Neologizmlar", "Arxaizmlar", "Dialektizmlar"] }
    ]},
    { nomi: "Axborot savodxonligi", savollar: [
      { s: "Faqat bosishlar sonini oshirish uchun yozilgan shov-shuvli sarlavha nima deyiladi?", j: "Klikbeyt", x: ["Lid", "Xeshteg", "Repost"] },
      { s: "Xabardagi faktlarning toʻgʻriligini tekshirish jarayoni qanday ataladi?", j: "Fakt-cheking", x: ["Monitoring", "Moderatsiya", "Kopirayting"] },
      { s: "Xabarni ulashishdan oldin birinchi navbatda nimani tekshirish kerak?", j: "Manbasini", x: ["Layklar sonini", "Rasm sifatini", "Matn uzunligini"] },
      { s: "Sunʼiy intellekt yordamida yasalgan soxta video yoki ovoz nima deyiladi?", j: "Dipfeyk", x: ["Mem", "Spam", "Stiker"] },
      { s: "Oʻzbekistonda OAV faoliyatini tartibga soluvchi asosiy qonun qaysi?", j: "“Ommaviy axborot vositalari toʻgʻrisida”gi Qonun", x: ["“Taʼlim toʻgʻrisida”gi Qonun", "“Reklama toʻgʻrisida”gi Qonun", "“Isteʼmolchilar huquqlarini himoya qilish toʻgʻrisida”gi Qonun"] }
    ]}
  ],
  final: { s: "Abdulla Avloniyning “Tarbiya bizlar uchun yo hayot — yo mamot...” degan mashhur jumlasi qaysi asaridan olingan?", j: "“Turkiy guliston yoxud axloq”", x: ["“Oʻtgan kunlar”", "“Munozara”", "“Ikki emas, toʻrt til lozim”"] }
};

/* ---------------- SHABLON (yangi mavzu uchun) ----------------
MAVZULAR.yangi_mavzu = {
  nomi: "Mavzu nomi",
  fan: "Fan nomi",
  kategoriyalar: [
    { nomi: "1-kategoriya", savollar: [
      { s: "Savol (100)", j: "Toʻgʻri javob", x: ["Xato 1", "Xato 2", "Xato 3"], izoh: "" },
      { s: "Savol (200)", j: "...", x: ["...", "...", "..."] },
      { s: "Savol (300)", j: "...", x: ["...", "...", "..."] },
      { s: "Savol (400)", j: "...", x: ["...", "...", "..."] },
      { s: "Savol (500)", j: "...", x: ["...", "...", "..."] }
    ]},
    // ... jami 6 ta kategoriya
  ],
  final: { s: "Final savoli", j: "Javob", x: ["...", "...", "..."] }
};
-------------------------------------------------------------- */
