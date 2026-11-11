/*
  OʻZBEKISTONNING ENG YANGI TARIXI — savollar bazasi
  Mavzu: Oʻzbekistonning BMTga aʼzo boʻlishi va jahon hamjamiyatidagi oʻrni.
  10 kategoriya × 5 daraja. 5 tasi mavzu boʻyicha, 5 tasi zakovat uslubidagi mantiqiy savollar.
*/
window.FANLAR = window.FANLAR || {};
FANLAR.tarix = {
  fan: "Oʻzbekistonning eng yangi tarixi",
  mavzu: "Oʻzbekiston va BMT",
  kategoriyalar: [
    { nomi: "Mustaqillik yoʻli", qisqa: "Mustaqillik", savollar: [
      { s: "Oʻzbekistonda Mustaqillik kuni qaysi sanada nishonlanadi?", j: "1-sentabr", x: ["8-dekabr", "9-may", "21-mart"] },
      { s: "Davlat bayrogʻimizdagi koʻk rang nimaning ramzi?", j: "Mangu osmon va obihayot", x: ["Tinchlik va poklik", "Tabiat va hosildorlik", "Jasorat va kuch"], izoh: "Oq — tinchlik va poklik, yashil — tabiatning yangilanishi." },
      { s: "Davlat bayrogʻimizda nechta yulduz bor?", j: "12 ta", x: ["7 ta", "10 ta", "14 ta"] },
      { s: "Oʻzbekiston davlat madhiyasi soʻzlari muallifi kim?", j: "Abdulla Oripov", x: ["Erkin Vohidov", "Gʻafur Gʻulom", "Muhammad Yusuf"] },
      { s: "Oʻzbekiston mustaqilligini birinchilardan boʻlib tan olgan davlat qaysi?", j: "Turkiya", x: ["Yaponiya", "Braziliya", "Kanada"] }
    ]},
    { nomi: "BMT haqida", qisqa: "BMT", savollar: [
      { s: "BMT qachon tashkil topgan?", j: "1945-yilda", x: ["1919-yilda", "1991-yilda", "1955-yilda"] },
      { s: "BMTning bosh qarorgohi qaysi shaharda joylashgan?", j: "Nyu-York", x: ["Jeneva", "Parij", "Vena"] },
      { s: "BMTning taʼsis hujjati qanday ataladi?", j: "BMT Ustavi", x: ["Versal shartnomasi", "Jeneva konvensiyasi", "Xelsinki yakuniy akti"] },
      { s: "BMT Xavfsizlik Kengashida nechta doimiy aʼzo bor?", j: "5 ta", x: ["10 ta", "15 ta", "7 ta"] },
      { s: "BMTning taʼlim, fan va madaniyat boʻyicha tashkiloti qaysi?", j: "YuNESKO", x: ["YuNISEF", "JSST", "FAO"] }
    ]},
    { nomi: "Oʻzbekiston va BMT", qisqa: "Aʼzolik", savollar: [
      { s: "Oʻzbekiston BMTga qachon aʼzo boʻlgan?", j: "1992-yil 2-mart", x: ["1991-yil 1-sentabr", "1992-yil 8-dekabr", "1995-yil 1-mart"] },
      { s: "2017-yilda BMT Bosh Assambleyasi minbaridan birinchi marta qaysi tilda nutq yangradi?", j: "Oʻzbek tilida", x: ["Turk tilida", "Fors tilida", "Qozoq tilida"] },
      { s: "Qaysi rezolyutsiya 2018-yilda Oʻzbekiston tashabbusi bilan qabul qilingan?", j: "“Maʼrifat va diniy bagʻrikenglik”", x: ["Iqlim boʻyicha Parij bitimi", "Kosmosni tinch oʻrganish", "Antarktika toʻgʻrisida"] },
      { s: "2021-yilda BMT Bosh Assambleyasi Orolboʻyini qanday hudud deb eʼlon qildi?", j: "Ekologik innovatsiyalar va texnologiyalar hududi", x: ["Erkin iqtisodiy zona", "Milliy bogʻ", "Xalqaro turizm markazi"] },
      { s: "Oʻzbekiston 2021–2023-yillar uchun BMTning qaysi kengashiga aʼzo etib saylangan?", j: "Inson huquqlari kengashi", x: ["Xavfsizlik Kengashi (doimiy)", "Vasiylik Kengashi", "Xalqaro Sud"] }
    ]},
    { nomi: "Tashabbuslar va tashkilotlar", qisqa: "Tashabbus", savollar: [
      { s: "Oʻzbekiston tashabbusi bilan Markaziy Osiyoda qanday zona tashkil etilgan?", j: "Yadro qurolidan xoli zona", x: ["Erkin savdo zonasi", "Vizasiz kosmik zona", "Dengiz qoʻriqxonasi"] },
      { s: "Shanxay hamkorlik tashkiloti qachon tashkil topgan?", j: "2001-yilda", x: ["1991-yilda", "2011-yilda", "1996-yilda"] },
      { s: "Oʻzbekiston 2019-yilda qaysi tashkilotga qoʻshildi?", j: "Turkiy kengash", x: ["NATO", "Yevropa Ittifoqi", "OPEK"], izoh: "Keyinchalik u Turkiy davlatlar tashkiloti deb nomlandi." },
      { s: "Tashqi siyosat konsepsiyasiga koʻra Oʻzbekiston...", j: "Harbiy-siyosiy bloklarga qoʻshilmaydi", x: ["Barcha harbiy bloklarga aʼzo boʻladi", "Xorijiy harbiy bazalarni joylashtiradi", "Faqat bitta davlat bilan hamkorlik qiladi"] },
      { s: "Afgʻonistonga qoʻshni olti davlat hamda AQSh va Rossiyadan iborat guruh qanday ataladi?", j: "“6+2”", x: ["“G7”", "“5+5”", "“BRIKS”"] }
    ]},
    { nomi: "Orol va madaniy meros", qisqa: "Orol", savollar: [
      { s: "Orol dengiziga quyiladigan ikki daryo qaysilar?", j: "Amudaryo va Sirdaryo", x: ["Zarafshon va Chirchiq", "Volga va Ural", "Dajla va Furot"] },
      { s: "Orol dengizi qurigan tubida paydo boʻlgan yangi choʻl qanday ataladi?", j: "Orolqum", x: ["Qizilqum", "Qoraqum", "Mirzachoʻl"] },
      { s: "Qaysi biri YuNESKO Butunjahon merosi roʻyxatidagi Oʻzbekiston obyekti?", j: "Xivadagi Ichan qalʼa", x: ["Toshkent teleminorasi", "Chorvoq suv ombori", "Navoiy teatri"] },
      { s: "2025-yilda YuNESKO Bosh konferensiyasi sessiyasi qaysi shaharda oʻtkazildi?", j: "Samarqand", x: ["Toshkent", "Buxoro", "Xiva"] },
      { s: "Orolboʻyi uchun 2018-yilda BMT homiyligida qanday jamgʻarma tashkil etildi?", j: "Inson xavfsizligi boʻyicha trast jamgʻarmasi", x: ["Xalqaro valyuta jamgʻarmasi", "Olimpiya jamgʻarmasi", "Kosmik tadqiqotlar fondi"] }
    ]},
    { nomi: "Zakovat: tarix sirlari", qisqa: "Tarix sirlari", savollar: [
      { s: "Bu shahar nomi “tosh” va “shahar” maʼnosidagi “kent” soʻzlaridan tuzilgan. Qaysi shahar?", j: "Toshkent", x: ["Samarqand", "Termiz", "Qarshi"] },
      { s: "Amir Temurning mashhur shiori: “Kuch — ...”. Qanday davom etadi?", j: "adolatdadir", x: ["qilichdadir", "boylikdadir", "qoʻshindadir"] },
      { s: "XIX asrda nemis olimi Rixtgofen Xitoydan Oʻrta yer dengizigacha boʻlgan qadimiy savdo yoʻliga bitta qimmatbaho mato nomini berdi. Qaysi yoʻl?", j: "Buyuk ipak yoʻli", x: ["Kumush yoʻl", "Choy yoʻli", "Ziravorlar yoʻli"] },
      { s: "Ulugʻbek rasadxonasi qaysi fan bilan bogʻliq va u qaysi shaharda?", j: "Astronomiya — Samarqand", x: ["Kimyo — Buxoro", "Tibbiyot — Xiva", "Geografiya — Termiz"] },
      { s: "Dasturlashdagi “algoritm” soʻzi qaysi buyuk ajdodimiz nomidan kelib chiqqan?", j: "Muhammad al-Xorazmiy", x: ["Ibn Sino", "Abu Rayhon Beruniy", "Ahmad Fargʻoniy"] }
    ]},
    { nomi: "Zakovat: BMT mantigʻi", qisqa: "BMT mantigʻi", savollar: [
      { s: "BMT bayrogʻida dunyo xaritasini ikki shox oʻrab turadi. Bu qaysi daraxt shoxlari va nimaning ramzi?", j: "Zaytun — tinchlik", x: ["Dafna — gʻalaba", "Palma — boylik", "Eman — kuch"] },
      { s: "BMT Bosh Assambleyasida har bir davlat nechta ovozga ega — katta-kichikligidan qatʼi nazar?", j: "Bitta", x: ["Aholisiga qarab", "Hududiga qarab", "Beshta"] },
      { s: "Xavfsizlik Kengashi doimiy aʼzosining qarorni toʻxtatish huquqi lotincha “man qilaman” soʻzi bilan ataladi. Bu qaysi soʻz?", j: "Veto", x: ["Kvorum", "Ratifikatsiya", "Moratoriy"] },
      { s: "BMTning rasmiy tillari nechta?", j: "6 ta", x: ["4 ta", "10 ta", "2 ta"], izoh: "Arab, ingliz, ispan, xitoy, rus va fransuz." },
      { s: "BMTdan oldin mavjud boʻlgan, lekin ikkinchi jahon urushining oldini ola olmagan xalqaro tashkilot qaysi?", j: "Millatlar Ligasi", x: ["Varshava shartnomasi", "NATO", "Yevropa Kengashi"] }
    ]},
    { nomi: "Zakovat: fan va texnika", qisqa: "Fan", savollar: [
      { s: "Kompyuter barcha maʼlumotni faqat ikki raqam yordamida saqlaydi. Qaysi raqamlar?", j: "0 va 1", x: ["1 va 2", "0 va 9", "1 va 10"] },
      { s: "Qaysi fan nomi al-Xorazmiy asaridagi “al-jabr” soʻzidan kelib chiqqan?", j: "Algebra", x: ["Algoritm", "Arifmetika", "Geometriya"], izoh: "“Algoritm” esa allomaning nomidan kelib chiqqan." },
      { s: "Ibn Sinoning qaysi asari Yevropada asrlar davomida tibbiyot darsligi boʻlgan?", j: "“Tib qonunlari”", x: ["“Qonuni Masʼudiy”", "“Boburnoma”", "“Xamsa”"] },
      { s: "Dasturdagi xato “bug” (hasharot) deb ataladi. Rivoyatga koʻra 1947-yilda kompyuter ichidan nima topilgan?", j: "Haqiqiy kuya", x: ["Sichqon", "Tanga", "Suv tomchisi"] },
      { s: "Beruniy Yevropa va Osiyo orasida, okean ortida yana bir quruqlik borligini taxmin qilgan. Bu qaysi qitʼa deb hisoblanadi?", j: "Amerika", x: ["Avstraliya", "Antarktida", "Afrika"] }
    ]},
    { nomi: "Zakovat: diplomatiya", qisqa: "Diplomatiya", savollar: [
      { s: "Qaysi qush tinchlik ramzi hisoblanadi?", j: "Kaptar", x: ["Burgut", "Laylak", "Qaldirgʻoch"] },
      { s: "Bir davlatning boshqa davlatdagi rasmiy diplomatik vakolatxonasi qanday ataladi?", j: "Elchixona", x: ["Vazirlik", "Hokimiyat", "Parlament"] },
      { s: "Xalqaro shartnomani parlament tomonidan tasdiqlash qanday ataladi?", j: "Ratifikatsiya", x: ["Veto", "Deklaratsiya", "Referendum"] },
      { s: "Yadrosiz zona toʻgʻrisidagi shartnoma Semipalatinskda imzolangan. Nima uchun aynan shu joy tanlangan?", j: "U yerda yadro sinov poligoni boʻlgan", x: ["U mintaqa poytaxti boʻlgan", "U yerda BMT qarorgohi bor", "U eng katta port shahri"] },
      { s: "Oʻzbekiston dengizga chiqish uchun kamida ikki davlat hududini kesib oʻtishi kerak. Dunyoda bunday davlat atigi ikkita. Ikkinchisi qaysi?", j: "Lixtenshteyn", x: ["Shveytsariya", "Moʻgʻuliston", "Avstriya"] }
    ]},
    { nomi: "Zakovat: ajdodlar merosi", qisqa: "Meros", savollar: [
      { s: "“Navroʻz” soʻzi soʻzma-soʻz nimani bildiradi?", j: "Yangi kun", x: ["Bahor bayrami", "Yangi yil", "Quyosh chiqishi"] },
      { s: "Amir Temur maqbarasi nima deb ataladi?", j: "Goʻri Amir", x: ["Registon", "Bibixonim", "Shohi Zinda"] },
      { s: "Afrosiyobdan topilgan dunyodagi eng qadimiy shaxmat donalaridan biri qaysi shahar yonida?", j: "Samarqand", x: ["Xiva", "Buxoro", "Termiz"] },
      { s: "“Muhokamat ul-lugʻatayn” asarida turkiy tilning boyligini isbotlagan alloma kim?", j: "Alisher Navoiy", x: ["Zahiriddin Bobur", "Ogahiy", "Lutfiy"] },
      { s: "Bu shoh oʻz xotiralarini oʻzbek tilida yozgan, keyin Hindistonda yangi saltanat asos solgan. Asar nomi?", j: "“Boburnoma”", x: ["“Temur tuzuklari”", "“Shajarai turk”", "“Zafarnoma”"] }
    ]}
  ],
  final: { s: "Nima uchun 2-mart Oʻzbekiston diplomatiyasi tarixida muhim sana hisoblanadi?", j: "Shu kuni Oʻzbekiston BMTga aʼzo boʻlgan", x: ["Shu kuni Konstitutsiya qabul qilingan", "Shu kuni mustaqillik eʼlon qilingan", "Shu kuni poytaxt tanlangan"] }
};
