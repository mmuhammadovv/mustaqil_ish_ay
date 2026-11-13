/* Sahifa chizilishidan oldin fan, mavzu va tun/kun rejimini oʻrnatadi */
(function () {
  var q = new URLSearchParams(location.search), f = q.get("fan"), m = q.get("mavzu"), t, h = document.documentElement;
  try { f = f || localStorage.getItem("fan"); } catch (e) {}
  if (f !== "tarix") f = "akademik";
  // Tarix fanining mavzulari: "bmt" (BMTga aʼzolik) va "10" (10-mavzu. Oʻzbekiston va jahon hamjamiyati)
  var MV = { tarix: ["bmt", "10"] }[f];
  if (MV) {
    try { m = m || localStorage.getItem("mavzu-" + f); } catch (e) {}
    if (MV.indexOf(m) < 0) m = MV[0];
    h.setAttribute("data-mavzu", m);
    try { localStorage.setItem("mavzu-" + f, m); } catch (e) {}
  }
  try { t = localStorage.getItem("tema"); } catch (e) {}
  if (t !== "dark" && t !== "light") t = window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  h.setAttribute("data-fan", f); h.setAttribute("data-theme", t);
  try { localStorage.setItem("fan", f); } catch (e) {}
})();
