/* Sahifa chizilishidan oldin fan va tun/kun rejimini oʻrnatadi */
(function () {
  var f = new URLSearchParams(location.search).get("fan"), t, h = document.documentElement;
  try { f = f || localStorage.getItem("fan"); } catch (e) {}
  if (f !== "tarix") f = "akademik";
  try { t = localStorage.getItem("tema"); } catch (e) {}
  if (t !== "dark" && t !== "light") t = window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  h.setAttribute("data-fan", f); h.setAttribute("data-theme", t);
  try { localStorage.setItem("fan", f); } catch (e) {}
})();
