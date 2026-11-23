// Loyihalar orasidagi havolalar (sahifa pastida)
(function () {
  var L = [["detektor.html", "Soxta xabar detektori"], ["janrlar.html", "Janrlar konstruktori"], ["tozalagich.html", "Matn tozalagich"], ["oqish.html", "Oʻqish vaqti"]];
  var here = location.pathname.split("/").pop();
  var el = document.getElementById("nav");
  if (el) el.innerHTML = '<a href="../index.html">Mustaqil ish</a>' + L.filter(function (x) { return x[0] !== here; }).map(function (x) { return ' · <a href="' + x[0] + '">' + x[1] + "</a>"; }).join("");
})();
