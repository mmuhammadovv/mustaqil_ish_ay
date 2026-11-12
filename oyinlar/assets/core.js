/* Umumiy dvigatel: fan, mavzu, ikonlar, ovoz, sozlash, ballar, modal, taymer, test savoli, gʻolib */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
    del(k) { try { localStorage.removeItem(k); } catch (e) {} }
  };

  const html = document.documentElement;
  const fan = html.dataset.fan || "akademik";
  const data = (window.FANLAR || {})[fan];

  /* ---------- Ikonlar (oʻzimiz chizgan SVG) ---------- */
  const P = {
    back: '<path d="M15 5l-7 7 7 7"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
    sound: '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>',
    mute: '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9l5 6M22 9l-5 6"/>',
    full: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
    reset: '<path d="M4 12a8 8 0 1 0 2.5-5.8"/><path d="M4 4v5h5"/>',
    pause: '<path d="M8 5v14M16 5v14"/>',
    play: '<path d="M7 5l12 7-12 7z"/>',
    check: '<path d="M4 12.5l5 5L20 6.5"/>',
    cross: '<path d="M6 6l12 12M18 6L6 18"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    half: '<circle cx="12" cy="12" r="8"/><path d="M12 4v16"/><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" stroke="none"/>',
    clock: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/>',
    wheel: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/><path d="M12 3v7M12 14v7M3 12h7M14 12h7M5.6 5.6l5 5M13.4 13.4l5 5M18.4 5.6l-5 5M10.6 13.4l-5 5"/>',
    hex: '<path d="M12 2.5l8 4.6v9.8l-8 4.6-8-4.6V7.1z"/><path d="M12 7.5l4 2.3v4.4l-4 2.3-4-2.3V9.8z"/>',
    light: '<rect x="7" y="2.5" width="10" height="19" rx="3"/><circle cx="12" cy="7" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="12" cy="17" r="1.8"/>',
    ladder: '<path d="M7 3v18M17 3v18M7 7h10M7 12h10M7 17h10"/>',
    rope: '<path d="M2 12c2.5-3 4.5 3 7 0s4.5 3 7 0 4.5 3 6 0"/><path d="M12 7v10"/>',
    doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
    flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    star: '<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.5 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18"/>',
    pen: '<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/>',
    crown: '<path d="M3 8l4 4 5-7 5 7 4-4-2 11H5z"/>',
    hall: '<path d="M3 19a9 9 0 0 1 18 0"/><path d="M7 19a5 5 0 0 1 10 0"/><path d="M2 19h20"/><circle cx="12" cy="8" r="1.4" fill="currentColor"/>',
    scroll: '<path d="M7 4h11a2 2 0 0 1 0 4H7"/><path d="M7 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10V8"/><path d="M9 12h6M9 15.5h4"/>',
    envelope: '<rect x="3" y="6" width="18" height="13" rx="1.5"/><path d="M3 7l9 6 9-6"/>',
    cards: '<rect x="4" y="6" width="11" height="15" rx="1.5" transform="rotate(-8 9.5 13.5)"/><rect x="9" y="3" width="11" height="15" rx="1.5"/>',
    print: '<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="1.5"/><path d="M6 14h12v7H6z"/>',
    tower: '<path d="M6 21h12M7 21V16h10v5M8 16v-5h8v5M9 11V6h6v5M11 6V3h2v3"/>',
    updown: '<path d="M8 4v16M4 8l4-4 4 4M16 20V4M12 16l4 4 4-4"/>',
    maze: '<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M7 3v8h4M15 21v-8h-4M3 15h4M21 9h-6v4"/>',
    letters: '<rect x="2.5" y="6" width="6" height="12" rx="1"/><rect x="9" y="6" width="6" height="12" rx="1"/><rect x="15.5" y="6" width="6" height="12" rx="1"/><path d="M4.5 14l1-5 1 5M4.8 12.5h1.4"/>',
    camel: '<path d="M3 20v-6c0-2 1-3 3-3 1 0 1.5-2 3-2s2 2 3 2 1.5-3 3-3 2 2 2 4v1l3-3v3c0 2-1 3-3 3v4M7 20v-4M16 20v-4"/>',
    gauge: '<path d="M3 17a9 9 0 0 1 18 0"/><path d="M12 17l4-6"/><circle cx="12" cy="17" r="1.4" fill="currentColor"/>',
    bingo: '<rect x="3" y="3" width="18" height="18" rx="1.5"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/>',
    spy: '<path d="M4 10h16M7 10l1.5-5h7L17 10"/><circle cx="8" cy="15" r="2.5"/><circle cx="16" cy="15" r="2.5"/><path d="M10.5 15h3"/>'
  };
  const icon = (n, cls = "i") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ""}</svg>`;

  /* ---------- Ovoz ---------- */
  let ac = null, out = null, muted = !!store.get("ovozsiz");
  function tone(f, d = .15, type = "sine", vol = .12, delay = 0) {
    if (muted) return;
    try {
      if (!ac) {
        ac = new (window.AudioContext || window.webkitAudioContext)();
        // kompressor: baland ovozlar birga chalinganda xirillamasin
        out = ac.createDynamicsCompressor();
        out.threshold.value = -10; out.knee.value = 6; out.ratio.value = 8; out.attack.value = .003; out.release.value = .15;
        out.connect(ac.destination);
      }
      if (ac.state === "suspended") ac.resume();
      const t = ac.currentTime + delay, o = ac.createOscillator(), g = ac.createGain();
      o.type = type; o.frequency.setValueAtTime(f, t);
      g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + .008); g.gain.exponentialRampToValueAtTime(.0001, t + d);
      o.connect(g); g.connect(out); o.start(t); o.stop(t + d + .02);
    } catch (e) {}
  }
  const sound = {
    click: () => tone(600, .05, "triangle", .06),
    ok: () => { tone(660, .12); tone(880, .22, "sine", .12, .1); },
    bad: () => tone(160, .35, "triangle", .14),
    tick: () => tone(1000, .04, "square", .03),
    end: () => tone(240, .5, "triangle", .1),
    buzz: () => tone(520, .18, "square", .07),
    red: () => tone(330, .25, "triangle", .2),
    // Yashil signal: baland, aniq, ikki qavatli "start" ovozi — hech narsa bilan adashtirib boʻlmaydi
    green: () => {
      tone(1046, .7, "square", .34); tone(1568, .7, "triangle", .34);
      tone(2093, .25, "sine", .22, .02); tone(1046, .35, "square", .3, .75); tone(1568, .35, "triangle", .3, .75);
    },
    // Chalgʻituvchi tovush: xuddi shunday baland, lekin qisqa va bir qavatli
    decoy: () => { const f = [988, 1108, 932, 1175][Math.floor(Math.random() * 4)]; tone(f, .22, Math.random() < .5 ? "square" : "triangle", .32); },
    foul: () => { tone(200, .15, "sawtooth", .08); tone(150, .25, "sawtooth", .08, .14); },
    spin: () => tone(1200, .02, "square", .02),
    bonus: () => [523, 659, 784].forEach((f, i) => tone(f, .16, "triangle", .1, i * .09)),
    win: () => [523, 659, 784, 1046].forEach((f, i) => tone(f, .3, "triangle", .12, i * .15)),
    toggle() { muted = !muted; store.set("ovozsiz", muted); return muted; }
  };

  /* ---------- Mavzu (tun/kun) ---------- */
  function setTheme(t) { html.dataset.theme = t; try { localStorage.setItem("tema", t); } catch (e) {} }
  function themeButton(btn) {
    const draw = () => btn.innerHTML = icon(html.dataset.theme === "dark" ? "sun" : "moon") + `<span class="lbl">${html.dataset.theme === "dark" ? "Kunduzgi" : "Tungi"}</span>`;
    btn.onclick = () => { setTheme(html.dataset.theme === "dark" ? "light" : "dark"); draw(); };
    draw();
  }

  /* ---------- Sarlavha ---------- */
  function header(title, onReset) {
    const h = document.createElement("header"); h.className = "top";
    h.innerHTML = `
      <a class="brand" href="../index.html" title="Bosh sahifa"><img src="../favicon.svg" alt="Bosh sahifa" width="34" height="34"></a>
      <a class="ib" href="../fan.html?fan=${fan}" title="Menyu">${icon("back")}<span class="lbl">Menyu</span></a>
      <div class="ttl"><b>${esc(title)}</b><span>${data ? esc(data.fan) : ""}</span></div>
      <div class="acts">
        <button class="ib" id="thm" type="button" title="Tun / kun"></button>
        <button class="ib" id="snd" type="button" title="Ovoz">${icon(muted ? "mute" : "sound")}</button>
        <button class="ib" id="fs" type="button" title="Toʻliq ekran">${icon("full")}</button>
        <button class="ib" id="rst" type="button" title="Yangi oʻyin">${icon("reset")}<span class="lbl">Yangi oʻyin</span></button>
      </div>`;
    document.body.prepend(h);
    themeButton($("#thm"));
    $("#snd").onclick = e => { e.currentTarget.innerHTML = icon(sound.toggle() ? "mute" : "sound"); };
    $("#fs").onclick = () => { try { document.fullscreenElement ? document.exitFullscreen() : html.requestFullscreen(); } catch (e) {} };
    $("#rst").onclick = () => { if (confirm("Yangi oʻyin boshlansinmi? Joriy natijalar oʻchadi.")) onReset(); };
  }

  /* ---------- Jamoalarni sozlash ---------- */
  // bind(el, n) — har chizilgandan keyin chaqiriladi (qoʻshimcha tugmalarni ulash uchun; jamoalar soni oʻzgarsa ham ishlaydi)
  function setup(el, { kicker, title, desc, rules = [], keys = null, extra = "", min = 2, max = 4, def = 3, onStart, bind }) {
    let n = Math.min(max, Math.max(min, def));
    const draw = () => {
      const old = $$(".names input", el).map(i => i.value);
      el.innerHTML = `
        <section class="setup panel">
          <div class="kicker">${kicker}</div>
          <h2>${title}</h2>
          ${max > min ? `<span class="l">Jamoalar soni</span>
          <div class="seg">${Array.from({ length: max - min + 1 }, (_, i) => min + i).map(k => `<button type="button" data-n="${k}" class="${k === n ? "on" : ""}">${k}</button>`).join("")}</div>` : ""}
          <span class="l">Jamoa nomlari</span>
          <div class="names">${Array.from({ length: n }, (_, i) => `
            <div class="row"><span class="sw" style="--c:var(--t${i})"></span>
              <input class="inp" maxlength="22" value="${esc(old[i] ?? (i + 1) + "-jamoa")}">
              ${keys ? `<span class="key">${keys[i]}</span>` : ""}</div>`).join("")}</div>
          ${extra}
          <button class="btn primary block lg" id="go" type="button" style="margin-top:22px">Boshlash ${icon("arrow")}</button>
          ${rules.length ? `<ol class="rules">${rules.map(r => `<li>${r}</li>`).join("")}</ol>` : ""}
        </section>`;
      $$(".seg button[data-n]", el).forEach(b => b.onclick = () => { n = +b.dataset.n; draw(); });
      $("#go", el).onclick = () => {
        const teams = $$(".names input", el).map((inp, i) => ({ name: inp.value.trim() || (i + 1) + "-jamoa", score: 0, c: i }));
        sound.click(); onStart(teams);
      };
      if (bind) bind(el, n);
    };
    if (!data) { el.innerHTML = `<section class="setup panel"><h2>Savollar topilmadi</h2></section>`; return; }
    draw();
  }
  const tc = t => `var(--t${t.c})`;

  /* ---------- Ballar paneli ---------- */
  function scores(el, teams, { active = -1, onAdjust, tag, out = [] } = {}) {
    el.innerHTML = teams.map((t, i) => `
      <div class="team ${i === active ? "active" : ""} ${out.includes(i) ? "out" : ""}" style="--c:${tc(t)}" data-i="${i}">
        <div class="n">${esc(t.name)}</div>
        <div class="s">${t.score}</div>
        ${tag ? `<div class="tag">${tag(t, i)}</div>` : ""}
        ${onAdjust ? `<div class="adj"><button type="button" data-d="-50">−50</button><button type="button" data-d="50">+50</button></div>` : ""}
      </div>`).join("");
    if (onAdjust) $$(".adj button", el).forEach(b => b.onclick = () => onAdjust(+b.closest(".team").dataset.i, +b.dataset.d));
  }
  function bump(el, i) { if (!el) return; const t = $$(".team", el)[i]; if (t) { t.classList.remove("bump"); void t.offsetWidth; t.classList.add("bump"); } }

  /* ---------- Ikki marta bosishdan himoya ----------
     Ekran almashgandan keyin 350 ms davomida bosishlar qabul qilinmaydi:
     aks holda ikkinchi bosish yangi chiqqan tugmaga (masalan, javob variantiga) tushib qoladi. */
  let lastSwap = 0, current = null;
  const swapped = () => { lastSwap = Date.now(); };
  document.addEventListener("click", e => {
    if (Date.now() - lastSwap < 350 && e.target.closest && e.target.closest(".modal, #app")) { e.preventDefault(); e.stopPropagation(); }
  }, true);
  function dropAsk() { if (current) { current.stop(); current = null; } }

  /* ---------- Modal ---------- */
  let modalEl = null;
  function modal(inner) {
    swapped(); dropAsk();
    if (!modalEl) { modalEl = document.createElement("div"); modalEl.className = "modal"; modalEl.innerHTML = `<div class="mcard"></div>`; document.body.appendChild(modalEl); }
    modalEl.classList.add("open");
    const c = $(".mcard", modalEl); c.innerHTML = inner; c.scrollTop = 0; return c;
  }
  modal.close = () => { swapped(); dropAsk(); modalEl && modalEl.classList.remove("open"); };

  /* ---------- Taymer ---------- */
  function timer(el, sec, onEnd) {
    el.innerHTML = `<div class="timer"><div class="bar"><i></i></div><span class="tn">${sec}</span><button class="tp" type="button" title="Pauza">${icon("pause")}</button></div>`;
    const bar = $(".bar i", el), num = $(".tn", el), tp = $(".tp", el);
    let total = sec, left = sec, last = 0, id = null, shown = sec;
    const tick = () => {
      if (!el.isConnected) return stop();
      const now = Date.now(); left -= (now - last) / 1000; last = now;
      if (left <= 0) { left = 0; stop(); sound.end(); onEnd && onEnd(); }
      const w = Math.ceil(left);
      if (w !== shown) { shown = w; num.textContent = w; num.classList.toggle("low", w <= 5); if (w <= 5 && w > 0) sound.tick(); }
      bar.style.transform = `scaleX(${left / total})`;
    };
    const start = () => { if (id || left <= 0) return; last = Date.now(); id = setInterval(tick, 100); tp.innerHTML = icon("pause"); };
    const stop = () => { clearInterval(id); id = null; tp.innerHTML = icon("play"); };
    tp.onclick = () => id ? stop() : start();
    start();
    return { stop, start, add(s) { left += s; total = Math.max(total, left); tick(); } };
  }

  /* ---------- Test savoli ---------- */
  function ask(el, item, { time = 30, onResult } = {}) {
    dropAsk();
    let done = false, aborted = false;
    const opts = shuffle([item.j, ...item.x]);
    el.innerHTML = `<div class="q-text">${item.s}</div><div class="tm"></div>
      <div class="opts">${opts.map((o, i) => `<button type="button" class="opt" data-k="${i}"><span class="k">${"ABCD"[i]}</span><span>${o}</span></button>`).join("")}</div>
      <div class="after"></div>
      <div class="hint">Javobni tanlang: sichqoncha yoki A, B, C, D tugmalari</div>`;
    const btns = $$(".opt", el), right = opts.indexOf(item.j);
    const finish = (k) => {
      if (done) return; done = true; t.stop(); document.removeEventListener("keydown", onKey);
      const ok = k === right;
      btns.forEach(b => b.disabled = true);
      if (k >= 0 && !ok) btns[k].classList.add("wrong");
      btns[right].classList.add("right");
      ok ? sound.ok() : sound.bad();
      $(".after", el).innerHTML = `<div class="verdict ${ok ? "ok" : "bad"}">${icon(ok ? "check" : "cross")} ${ok ? "Toʻgʻri" : k < 0 ? "Vaqt tugadi" : "Notoʻgʻri"}</div>${item.izoh ? `<div class="izoh">${item.izoh}</div>` : ""}`;
      setTimeout(() => { if (!aborted && el.isConnected && onResult) { if (current === api) current = null; onResult(ok); } }, item.izoh ? 2300 : 1500);
    };
    const t = timer($(".tm", el), time, () => finish(-1));
    btns.forEach((b, k) => b.onclick = () => finish(k));
    const onKey = e => { if (!el.isConnected) return document.removeEventListener("keydown", onKey); const k = "ABCD".indexOf(e.key.toUpperCase()); if (k >= 0 && !btns[k].disabled) finish(k); };
    document.addEventListener("keydown", onKey);
    const api = {
      timer: t,
      fifty() { shuffle(btns.filter((_, k) => k !== right)).slice(0, 2).forEach(b => { b.classList.add("gone"); b.disabled = true; }); },
      stop() { done = true; aborted = true; t.stop(); document.removeEventListener("keydown", onKey); }
    };
    current = api;
    return api;
  }

  /* ---------- Savollar hovuzi ---------- */
  // Barcha savollarni {ci, li, item} koʻrinishida qaytaradi
  const all = () => data.kategoriyalar.flatMap((c, ci) => c.savollar.map((item, li) => ({ ci, li, item, id: ci + "-" + li })));

  /* ---------- Konfetti (rang-barang emas — mavzu ranglarida) ---------- */
  function confetti() {
    const c = document.createElement("canvas"); c.className = "confetti"; document.body.appendChild(c);
    const x = c.getContext("2d"), W = c.width = innerWidth, H = c.height = innerHeight;
    const cs = getComputedStyle(html), cols = ["--t0", "--t1", "--t2", "--t3", "--ink"].map(v => cs.getPropertyValue(v).trim());
    const ps = Array.from({ length: 120 }, () => ({ x: Math.random() * W, y: -20 - Math.random() * H * .5, vx: (Math.random() - .5) * 2, vy: 2 + Math.random() * 3, r: Math.random() * 6, vr: (Math.random() - .5) * .2, c: cols[Math.floor(Math.random() * cols.length)], w: 4 + Math.random() * 6 }));
    let f = 0; (function loop() { x.clearRect(0, 0, W, H); ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.r += p.vr; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.fillRect(-p.w / 2, -2, p.w, 4); x.restore(); }); if (++f < 240) requestAnimationFrame(loop); else c.remove(); })();
  }

  /* ---------- Gʻolib ---------- */
  function winner(teams, onAgain, unit = "ball") {
    const s = teams.map((t, i) => ({ ...t, i })).sort((a, b) => b.score - a.score);
    const top = s.filter(t => t.score === s[0].score);
    const c = modal(`<div class="win">
      <div class="kicker">${icon("crown")} Oʻyin yakuni</div>
      <h2>${top.map(t => esc(t.name)).join(" va ")}</h2>
      <div class="sub">${top.length > 1 ? "Durang natija" : "Gʻolib jamoa"}</div>
      <table class="standings">${s.map((t, k) => `<tr><td>${String(k + 1).padStart(2, "0")}</td><td><span class="sw" style="--c:${tc(t)}"></span>${esc(t.name)}</td><td>${t.score} <small style="font-size:12px;color:var(--muted)">${unit}</small></td></tr>`).join("")}</table>
      <div class="row-btns"><button class="btn primary" id="again" type="button">${icon("reset")} Yana oʻynash</button><a class="btn" href="../fan.html?fan=${fan}">Menyuga</a></div></div>`);
    $("#again", c).onclick = () => { modal.close(); onAgain(); };
    sound.win(); confetti();
  }
  function toast(msg, ms = 1900) { const t = document.createElement("div"); t.className = "toast"; t.innerHTML = msg; document.body.appendChild(t); setTimeout(() => t.remove(), ms); }

  window.G = { swapped, $, $$, esc, shuffle, store, fan, data, icon, sound, header, setup, tc, scores, bump, modal, timer, ask, all, confetti, winner, toast, themeButton,
    saveKey: g => "oyin2-" + g + "-" + fan };
})();
