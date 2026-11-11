/*
  AKADEMIK YOZUV — savollar bazasi
  10 kategoriya × 5 daraja (1 — oson ... 5 — qiyin). Hammasi test shaklida.
  s — savol, j — toʻgʻri javob, x — 3 ta notoʻgʻri variant, izoh — javobdan keyingi izoh (ixtiyoriy).
  qisqa — gʻildirak uchun qisqa nom.
*/
window.FANLAR = window.FANLAR || {};
FANLAR.akademik = {
  fan: "Akademik yozuv",
  mavzu: "Publitsistik nutq uslubi",
  kategoriyalar: [
    { nomi: "Uslub nazariyasi", qisqa: "Nazariya", savollar: [
      { s: "“Publitsistika” soʻzi qaysi tildan olingan?", j: "Lotin tilidan", x: ["Yunon tilidan", "Arab tilidan", "Fransuz tilidan"], izoh: "Lotincha publicus — “ijtimoiy, ommaviy”." },
      { s: "Publitsistik uslubning ikki asosiy vazifasi qaysilar?", j: "Xabar berish va taʼsir koʻrsatish", x: ["Tasvirlash va bezash", "Buyruq berish va nazorat qilish", "Taʼriflash va isbotlash"] },
      { s: "Oʻzbek tilida nechta asosiy funksional uslub ajratiladi?", j: "5 ta", x: ["3 ta", "4 ta", "7 ta"], izoh: "Soʻzlashuv, ilmiy, rasmiy-idoraviy, publitsistik va badiiy." },
      { s: "Qaysi biri publitsistik uslubdagi matn EMAS?", j: "Qonun matni", x: ["Gazeta maqolasi", "Teleboshlovchi sharhi", "Notiqlik nutqi"], izoh: "Qonun matni rasmiy-idoraviy uslubga tegishli." },
      { s: "Publitsistik uslubni boshqa uslublardan ajratib turuvchi asosiy belgi nima?", j: "Baho berish va harakatga chorlash", x: ["Faqat atamalar qoʻllash", "Qofiya va vazn", "Shaxssiz qolip iboralar"] }
    ]},
    { nomi: "Janrlar", qisqa: "Janrlar", savollar: [
      { s: "Salbiy hodisalarni hajv va kulgi orqali fosh etuvchi janr qaysi?", j: "Felyeton", x: ["Ocherk", "Xronika", "Intervyu"] },
      { s: "Voqea joyidan, muallif koʻzi bilan “jonli” hikoya qiluvchi janr qaysi?", j: "Reportaj", x: ["Taqriz", "Esse", "Pamflet"] },
      { s: "Real shaxs yoki voqeani badiiy tasvir vositalari bilan hikoya qiluvchi janr qaysi?", j: "Ocherk", x: ["Xabar", "Hisobot", "Sharh"] },
      { s: "Publitsistik janrlar qaysi uch guruhga boʻlinadi?", j: "Axborot, tahliliy, badiiy-publitsistik", x: ["Nazmiy, nasriy, dramatik", "Rasmiy, ilmiy, soʻzlashuv", "Qisqa, oʻrta, uzun"] },
      { s: "Kitob, film yoki spektakl haqida tanqidiy-tahliliy fikr bildiruvchi janr qaysi?", j: "Taqriz", x: ["Reportaj", "Felyeton", "Xronika"] }
    ]},
    { nomi: "Til vositalari", qisqa: "Vositalar", savollar: [
      { s: "“Bunga kim javobgar?” — javob kutmaydigan, oʻylashga undovchi savol qanday ataladi?", j: "Ritorik soʻroq", x: ["Murojaat", "Undov", "Kinoya"] },
      { s: "“Aziz yoshlar!” — bu qaysi publitsistik vosita?", j: "Murojaat", x: ["Metafora", "Antiteza", "Parcellyatsiya"] },
      { s: "“Yo hayot — yo mamot, yo saodat — yo falokat.” Qarama-qarshi tushunchalarni yonma-yon qoʻyish usuli qaysi?", j: "Antiteza", x: ["Metafora", "Sifatlash", "Oʻxshatish"], izoh: "A. Avloniyning “Turkiy guliston yoxud axloq” asaridan." },
      { s: "“OAV — jamiyatning koʻzgusi.” Bu qaysi tasviriy vosita?", j: "Metafora", x: ["Antiteza", "Ritorik soʻroq", "Kinoya"] },
      { s: "“Biz oʻzgaramiz. Albatta. Lekin qachon?” — gapni boʻlaklarga boʻlib taʼkid yaratish usuli qaysi?", j: "Parcellyatsiya", x: ["Inversiya", "Gradatsiya", "Ellipsis"] }
    ]},
    { nomi: "Matbuot tarixi", qisqa: "Matbuot", savollar: [
      { s: "Abdulla Qodiriy “Mushtum” jurnalida qaysi taxallus bilan yozgan?", j: "Julqunboy", x: ["Choʻlpon", "Fitrat", "Tavallo"] },
      { s: "Behbudiyning “Ikki emas, toʻrt til lozim” maqolasi qaysi jurnalda chiqqan?", j: "“Oyina”", x: ["“Mushtum”", "“Xurshid”", "“Sadoi Turkiston”"] },
      { s: "Abdulla Avloniy asos solgan gazeta qaysi?", j: "“Shuhrat”", x: ["“Taraqqiy”", "“Xalq soʻzi”", "“Oyina”"] },
      { s: "Oʻzbek tilidagi ilk gazeta qaysi?", j: "“Turkiston viloyatining gazeti”", x: ["“Taraqqiy”", "“Xalq soʻzi”", "“Samarqand”"], izoh: "1870-yildan chiqa boshlagan." },
      { s: "Behbudiy yoshlar qaysi toʻrt tilni bilishi kerak deb yozgan?", j: "Turkiy, forsiy, arab, rus", x: ["Turkiy, ingliz, fransuz, nemis", "Arab, fors, xitoy, rus", "Turkiy, rus, ingliz, arab"] }
    ]},
    { nomi: "Maqola tuzilishi", qisqa: "Maqola", savollar: [
      { s: "Maqolaning oʻquvchini birinchi jumladanoq qiziqtiradigan kirish abzasi nima deyiladi?", j: "Lid", x: ["Sarlavha", "Xotima", "Iqtibos"] },
      { s: "Eng muhim maʼlumot boshida, kamroq muhimlari oxirida beriladigan tuzilish qanday ataladi?", j: "Teskari piramida", x: ["Toʻgʻri piramida", "Xronologik tartib", "Halqa kompozitsiya"] },
      { s: "Publitsistik maqola odatda nima bilan yakunlanadi?", j: "Xulosa va chaqiriq", x: ["Lid", "Sarlavha", "Annotatsiya"] },
      { s: "Qaysi biri maqolada dalil boʻla OLMAYDI?", j: "Tekshirilmagan mish-mish", x: ["Rasmiy statistika", "Mutaxassis fikri", "Hujjat"] },
      { s: "“Dolzarb masala”, “jamoatchilik eʼtibori” kabi koʻp takrorlanadigan tayyor birikmalar nima deyiladi?", j: "Nutqiy qoliplar", x: ["Neologizmlar", "Arxaizmlar", "Dialektizmlar"] }
    ]},
    { nomi: "Axborot savodxonligi", qisqa: "Media", savollar: [
      { s: "Faqat bosishlar sonini oshirish uchun yozilgan shov-shuvli sarlavha nima deyiladi?", j: "Klikbeyt", x: ["Lid", "Xeshteg", "Repost"] },
      { s: "Xabardagi faktlarning toʻgʻriligini tekshirish jarayoni qanday ataladi?", j: "Fakt-cheking", x: ["Monitoring", "Moderatsiya", "Kopirayting"] },
      { s: "Xabarni ulashishdan oldin birinchi navbatda nimani tekshirish kerak?", j: "Manbasini", x: ["Layklar sonini", "Rasm sifatini", "Matn uzunligini"] },
      { s: "Sunʼiy intellekt yordamida yasalgan soxta video yoki ovoz nima deyiladi?", j: "Dipfeyk", x: ["Mem", "Spam", "Stiker"] },
      { s: "Oʻzbekistonda OAV faoliyatini tartibga soluvchi asosiy qonun qaysi?", j: "“Ommaviy axborot vositalari toʻgʻrisida”gi Qonun", x: ["“Taʼlim toʻgʻrisida”gi Qonun", "“Reklama toʻgʻrisida”gi Qonun", "“Arxiv ishi toʻgʻrisida”gi Qonun"] }
    ]},
    { nomi: "Nutq madaniyati", qisqa: "Nutq", savollar: [
      { s: "Nutqning adabiy til meʼyorlariga mos boʻlishi qaysi sifat?", j: "Toʻgʻrilik", x: ["Boylik", "Ifodalilik", "Oʻrinlilik"] },
      { s: "Nutqda keraksiz chet soʻzlar, jargon va sheva soʻzlarining boʻlmasligi qaysi sifat?", j: "Sofllik", x: ["Aniqlik", "Mantiqiylik", "Boylik"] },
      { s: "Fikrlar orasidagi izchillik va asoslanganlik qaysi sifat?", j: "Mantiqiylik", x: ["Sofllik", "Toʻgʻrilik", "Ifodalilik"] },
      { s: "Nutqni vaziyat va tinglovchiga moslash qaysi sifat?", j: "Oʻrinlilik", x: ["Aniqlik", "Boylik", "Sofllik"] },
      { s: "Jurnalist odobining qaysi tamoyili voqeaning barcha tomonlari fikrini berishni talab qiladi?", j: "Xolislik", x: ["Tezkorlik", "Ifodalilik", "Qisqalik"] }
    ]},
    { nomi: "Uslublar qiyosi", qisqa: "Qiyos", savollar: [
      { s: "“Eshitdingmi, yana yolgʻon xabar tarqabdi-ya!” — bu qaysi uslub?", j: "Soʻzlashuv", x: ["Ilmiy", "Rasmiy-idoraviy", "Publitsistik"] },
      { s: "“Dezinformatsiya — ataylab tarqatiladigan, haqiqatga zid axborot.” — bu qaysi uslub?", j: "Ilmiy", x: ["Badiiy", "Soʻzlashuv", "Publitsistik"] },
      { s: "“Ariza beruvchi belgilangan muddatda hujjatlarni taqdim etishi shart.” — bu qaysi uslub?", j: "Rasmiy-idoraviy", x: ["Ilmiy", "Publitsistik", "Badiiy"] },
      { s: "“Yolgʻon qanotli edi — u tong otguncha butun shaharni aylanib chiqdi.” — bu qaysi uslub?", j: "Badiiy", x: ["Ilmiy", "Rasmiy-idoraviy", "Soʻzlashuv"] },
      { s: "“Xoʻsh, biz bu masʼuliyatni his qilyapmizmi? Keling, har bir xabarni tekshiraylik!” — bu qaysi uslub?", j: "Publitsistik", x: ["Ilmiy", "Rasmiy-idoraviy", "Badiiy"] }
    ]},
    { nomi: "Internet publitsistikasi", qisqa: "Internet", savollar: [
      { s: "Matn ichidagi, boshqa sahifaga olib boruvchi bosiladigan soʻz qanday ataladi?", j: "Giperhavola", x: ["Xeshteg", "Lid", "Sarlavha"] },
      { s: "Matn, video, audio va infografikaning birgalikda qoʻllanishi qanday ataladi?", j: "Multimedialilik", x: ["Gipermatnlilik", "Tezkorlik", "Qisqalik"] },
      { s: "Inson faqat oʻz qarashiga mos xabarlarni koʻradigan holat nima deyiladi?", j: "Axborot pufagi", x: ["Axborot portlashi", "Axborot oqimi", "Axborot bloki"] },
      { s: "Uzun, chuqur, multimedia bilan boyitilgan internet material qanday ataladi?", j: "Longrid", x: ["Post", "Stori", "Tvit"] },
      { s: "Oʻquvchining izoh yozishi, ovoz berishi va ulashishi internet publitsistikasining qaysi xususiyati?", j: "Interaktivlik", x: ["Multimedialilik", "Gipermatnlilik", "Tezkorlik"] }
    ]},
    { nomi: "Mantiqiy savollar", qisqa: "Mantiq", savollar: [
      { s: "Klassik xabar oʻquvchining qaysi savollariga javob berishi kerak?", j: "Kim? Nima? Qayerda? Qachon? Nega?", x: ["Qancha? Nechta? Qaysi?", "Faqat “Nima?” va “Qachon?”", "Kim bilan? Qayerga? Nechanchi?"] },
      { s: "XVI asrda Venetsiyada yangiliklar varagʻini oʻqish uchun mayda tanga toʻlangan. Shu tanga nomi bugun qaysi soʻzga aylangan?", j: "Gazeta", x: ["Jurnal", "Byulleten", "Almanax"] },
      { s: "Bu soʻz lotincha “kundalik” maʼnosidagi soʻzdan kelib chiqqan, bugun esa butun bir kasbning nomi. Qaysi soʻz?", j: "Jurnalist", x: ["Publitsist", "Muharrir", "Sharhlovchi"] },
      { s: "Telegraf davrida aloqa istalgan payt uzilib qolishi mumkin edi. Shu sababli jurnalistlar eng muhim maʼlumotni qayerga yozishni odat qilishgan?", j: "Matnning boshiga", x: ["Matnning oxiriga", "Matnning oʻrtasiga", "Alohida varaqqa"], izoh: "“Teskari piramida” shu tarzda paydo boʻlgan deb hisoblanadi." },
      { s: "Fransuzcha “varaqcha” soʻzidan kelib chiqqan, dastlab gazeta sahifasining pastki qismida bosilgan hajviy janr qaysi?", j: "Felyeton", x: ["Pamflet", "Ocherk", "Esse"] }
    ]}
  ],
  final: { s: "Abdulla Avloniyning “Tarbiya bizlar uchun yo hayot — yo mamot...” degan mashhur jumlasi qaysi asaridan olingan?", j: "“Turkiy guliston yoxud axloq”", x: ["“Oʻtgan kunlar”", "“Munozara”", "“Ikki emas, toʻrt til lozim”"] }
};
