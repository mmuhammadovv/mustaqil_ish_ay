/*
  OʻZBEKISTON TARIXI — faqat tarix uchun qoʻshimcha oʻyinlar maʼlumoti
  - afsona: "Haqiqat yoki afsona" — har toʻplamda 4 ta gap, bittasi soxta (s: true = haqiqat)
  - sessiyalar: "BMT sessiyasi" — har sessiya mavzusi va unga mos savol kategoriyalari (tarix.js indekslari)
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

  sessiyalar: [
    { nomi: "Orol fojiasi", matn: "Orol dengizi qurimoqda. Mintaqa aholisi salomatligi xavf ostida.", kat: [4, 7] },
    { nomi: "Mintaqaviy xavfsizlik", matn: "Markaziy Osiyoda tinchlik va barqarorlikni qanday mustahkamlash mumkin?", kat: [3, 8] },
    { nomi: "BMT va aʼzo davlatlar", matn: "Yosh davlatlarning xalqaro maydondagi oʻrni muhokama qilinmoqda.", kat: [1, 2, 6] },
    { nomi: "Madaniy meros", matn: "Qadimiy obidalar va anʼanalarni kelajak avlodga qanday yetkazamiz?", kat: [4, 9, 5] },
    { nomi: "Fan va taʼlim", matn: "Ilm-fan taraqqiyot kaliti. Ajdodlar merosidan nima oʻrganamiz?", kat: [7, 5] },
    { nomi: "Mustaqillik yoʻli", matn: "Mustaqil davlatning ramzlari va tamoyillari haqida sessiya.", kat: [0, 3] }
  ]
  // rasmlar: "Rasmdan top" uchun rasmlarni foydalanuvchi oʻzi tanlab beradi
};
