/* Barcha oʻyinlar uchun umumiy yordamchi funksiyalar */
(function () {
  const COLORS = ["#a78bfa", "#22d3ee", "#fbbf24", "#fb7185"];
  const VALUES = [100, 200, 300, 400, 500];
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
    del(k) { try { localStorage.removeItem(k); } catch (e) {} }
  };

  /* ---------- Mavzu ---------- */
  function topicKey() {
    const all = Object.keys(window.MAVZULAR || {});
    let k = new URLSearchParams(location.search).get("mavzu") || store.get("tanlangan-mavzu");
    if (!all.includes(k)) k = all[0];
    return k;
  }
  const key = topicKey();
  const topic = (window.MAVZULAR || {})[key];

  /* ---------- Ovoz ---------- */
  let ac = null, muted = !!store.get("ovozsiz");
  function tone(f, d = .15, type = "sine", vol = .14, delay = 0) {
    if (muted) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      const t = ac.currentTime + delay, o = ac.createOscillator(), g = ac.createGain();
      o.type = type; o.frequency.setValueAtTime(f, t);
      g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.0001, t + d);
      o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + d + .02);
    } catch (e) {}
  }
  const sound = {
    click: () => tone(520, .06, "triangle", .08),
    ok: () => { tone(660, .12); tone(990, .22, "sine", .14, .12); },
    bad: () => tone(150, .4, "sawtooth", .1),
    tick: () => tone(880, .06, "square", .05),
    end: () => tone(220, .6, "square", .08),
    buzz: () => { tone(330, .15, "square", .1); tone(440, .2, "square", .1, .1); },
    bonus: () => [523, 659, 784, 1046].forEach((f, i) => tone(f, .18, "triangle", .14, i * .1)),
    win: () => [523, 659, 784, 1046, 1318].forEach((f, i) => tone(f, .3, "triangle", .14, i * .16)),
    toggle() { muted = !muted; store.set("ovozsiz", muted); return muted; }
  };

  /* ---------- Sarlavha (header) ---------- */
  function header(title, onReset) {
    const h = document.createElement("header");
    h.className = "top";
    h.innerHTML = `
      <a class="back" href="../index.html?mavzu=${encodeURIComponent(key)}">← <span>Menyu</span></a>
      <div class="ttl"><b>${esc(title)}</b><span>${topic ? esc(topic.fan + " · " + topic.nomi) : "Mavzu topilmadi"}</span></div>
      <div class="acts">
        <button class="icon-btn" id="snd" type="button" title="Ovoz">${muted ? "🔇" : "🔊"}</button>
        <button class="icon-btn" id="fs" type="button" title="Toʻliq ekran">⛶ <span>Ekran</span></button>
        <button class="icon-btn" id="rst" type="button" title="Yangi oʻyin">↺ <span>Yangi</span></button>
      </div>`;
    document.body.prepend(h);
    $("#snd").onclick = e => { e.currentTarget.textContent = sound.toggle() ? "🔇" : "🔊"; };
    $("#fs").onclick = () => { try { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen(); } catch (e) {} };
    $("#rst").onclick = () => { if (confirm("Yangi oʻyin boshlansinmi? Joriy natijalar oʻchadi.")) onReset(); };
  }

  /* ---------- Jamoalarni sozlash ---------- */
  function setup(el, { title, desc, rules = [], keys = null, extra = "", min = 2, max = 4, def = 3, onStart }) {
    let n = def;
    const draw = () => {
      const old = $$(".names input", el).map(i => i.value);
      el.innerHTML = `
        <section class="setup glass">
          <h2>${title}</h2>
          <p class="sub">${desc}</p>
          <label class="l">Jamoalar soni</label>
          <div class="seg">${Array.from({ length: max - min + 1 }, (_, i) => min + i).map(k => `<button type="button" data-n="${k}" class="${k === n ? "on" : ""}">${k}</button>`).join("")}</div>
          <label class="l">Jamoa nomlari</label>
          <div class="names">${Array.from({ length: n }, (_, i) => `
            <div class="row"><span class="dot" style="color:${COLORS[i]};background:${COLORS[i]}"></span>
              <input maxlength="22" value="${esc(old[i] ?? (i + 1) + "-jamoa")}">
              ${keys ? `<span class="key">${keys[i]}</span>` : ""}</div>`).join("")}</div>
          ${extra}
          <button class="btn primary block lg" id="go" type="button" style="margin-top:18px">Boshlash ▶</button>
          ${rules.length ? `<ul class="rules">${rules.map(r => `<li>${r}</li>`).join("")}</ul>` : ""}
        </section>`;
      $$(".seg button[data-n]", el).forEach(b => b.onclick = () => { n = +b.dataset.n; draw(); });
      $("#go", el).onclick = () => {
        const teams = $$(".names input", el).map((inp, i) => ({ name: inp.value.trim() || (i + 1) + "-jamoa", score: 0, color: COLORS[i] }));
        sound.click(); onStart(teams);
      };
    };
    if (!topic) { el.innerHTML = `<section class="setup glass"><h2>Savollar topilmadi</h2><p class="sub">savollar.js faylini tekshiring.</p></section>`; return; }
    draw();
  }

  /* ---------- Ballar paneli ---------- */
  function scores(el, teams, { active = -1, onAdjust, tag } = {}) {
    el.innerHTML = teams.map((t, i) => `
      <div class="team ${i === active ? "active" : ""}" style="--c:${t.color}" data-i="${i}">
        <div class="n">${esc(t.name)}</div>
        <div class="s ${t.score < 0 ? "neg" : ""}">${t.score}</div>
        ${tag ? `<div class="tag">${tag(t, i)}</div>` : ""}
        ${onAdjust ? `<div class="adj"><button type="button" data-d="-100">−100</button><button type="button" data-d="100">+100</button></div>` : ""}
      </div>`).join("");
    if (onAdjust) $$(".adj button", el).forEach(b => b.onclick = () => onAdjust(+b.closest(".team").dataset.i, +b.dataset.d));
  }
  function bump(el, i) { const t = $$(".team", el)[i]; if (t) { t.classList.remove("bump"); void t.offsetWidth; t.classList.add("bump"); } }

  /* ---------- Modal ---------- */
  let modalEl = null;
  function modal(html) {
    if (!modalEl) {
      modalEl = document.createElement("div"); modalEl.className = "modal";
      modalEl.innerHTML = `<div class="mcard"></div>`; document.body.appendChild(modalEl);
    }
    modalEl.classList.add("open");
    const c = $(".mcard", modalEl); c.innerHTML = html; c.scrollTop = 0;
    return c;
  }
  modal.close = () => modalEl && modalEl.classList.remove("open");
  modal.isOpen = () => !!modalEl && modalEl.classList.contains("open");

  /* ---------- Taymer ---------- */
  function timer(el, sec, onEnd) {
    el.innerHTML = `<div class="timer"><div class="bar"><i></i></div><span class="num">${sec}</span><button class="tp" type="button" title="Pauza">⏸</button></div>`;
    const bar = $(".bar i", el), num = $(".num", el), tp = $(".tp", el);
    let total = sec, left = sec, last = Date.now(), id = null, shown = sec;
    const tick = () => {
      const now = Date.now(); left -= (now - last) / 1000; last = now;
      if (left <= 0) { left = 0; stop(); sound.end(); onEnd && onEnd(); }
      const w = Math.ceil(left);
      if (w !== shown) { shown = w; num.textContent = w; if (w <= 5 && w > 0) sound.tick(); num.classList.toggle("low", w <= 5); }
      bar.style.transform = `scaleX(${left / total})`;
    };
    const start = () => { if (id || left <= 0) return; last = Date.now(); id = setInterval(tick, 100); tp.textContent = "⏸"; };
    const stop = () => { clearInterval(id); id = null; tp.textContent = "▶"; };
    tp.onclick = () => id ? stop() : start();
    start();
    return { stop, start, add(s) { left += s; total = Math.max(total, left); tick(); }, get left() { return left; } };
  }

  /* ---------- Savol koʻrsatish (ochiq yoki test) ---------- */
  function ask(el, item, { mc = false, time = 30, onResult, judgeLabel } = {}) {
    let done = false, t = null;
    const opts = mc ? shuffle([item.j, ...item.x]) : [];
    el.innerHTML = `
      <div class="q-text">${item.s}</div>
      <div class="tm"></div>
      ${mc ? `<div class="opts">${opts.map((o, i) => `<button type="button" class="opt" data-o="${esc(o)}"><span class="k">${"ABCD"[i]}</span><span>${o}</span></button>`).join("")}</div>`
           : `<div class="ans-wrap"></div>
              <div class="row-btns judge">
                <button class="btn gold" type="button" data-a="show">Javobni koʻrsatish</button>
                <button class="btn ok" type="button" data-a="ok">✓ Toʻgʻri</button>
                <button class="btn bad" type="button" data-a="bad">✗ Xato</button>
              </div>`}
      <div class="after"></div>
      <div class="hint">${mc ? "A, B, C, D tugmalari yoki sichqoncha bilan tanlang" : "Probel — javobni koʻrsatish · Enter — toʻgʻri · Backspace — xato"}${judgeLabel ? " · " + judgeLabel : ""}</div>`;
    const reveal = () => {
      if (mc) $$(".opt", el).forEach(b => { b.disabled = true; if (b.dataset.o === item.j) b.classList.add("right"); });
      else if (!$(".answer", el)) $(".ans-wrap", el).innerHTML = `<div class="answer">${item.j}</div>${item.izoh ? `<div class="izoh">${item.izoh}</div>` : ""}`;
      if (mc && item.izoh && !$(".izoh", el)) $(".after", el).innerHTML = `<div class="izoh">${item.izoh}</div>`;
    };
    const finish = ok => {
      if (done) return; done = true; t && t.stop(); reveal();
      ok ? sound.ok() : sound.bad();
      $(".after", el).insertAdjacentHTML("afterbegin", `<div class="result-flash ${ok ? "ok" : "bad"}">${ok ? "Toʻgʻri!" : "Notoʻgʻri"}</div>`);
      if (!mc) $(".judge", el).classList.add("hidden");
      setTimeout(() => onResult && onResult(ok), 1500);
    };
    t = timer($(".tm", el), time, () => { if (mc) finish(false); else reveal(); });
    if (mc) {
      $$(".opt", el).forEach(b => b.onclick = () => { if (done) return; if (b.dataset.o !== item.j) b.classList.add("wrong"); finish(b.dataset.o === item.j); });
    } else {
      $$(".judge [data-a]", el).forEach(b => b.onclick = () => {
        const a = b.dataset.a; if (a === "show") { reveal(); t.stop(); b.remove(); } else finish(a === "ok");
      });
    }
    const onKey = e => {
      if (done || !el.isConnected) return document.removeEventListener("keydown", onKey);
      if (mc) { const i = "ABCD".indexOf(e.key.toUpperCase()); const b = $$(".opt", el)[i]; if (b && !b.disabled && !b.classList.contains("gone")) b.click(); }
      else if (e.key === " ") { e.preventDefault(); const s = $('[data-a="show"]', el); s && s.click(); }
      else if (e.key === "Enter") { e.preventDefault(); finish(true); }
      else if (e.key === "Backspace") { e.preventDefault(); finish(false); }
    };
    document.addEventListener("keydown", onKey);
    return {
      timer: t,
      fifty() { shuffle($$(".opt", el).filter(b => b.dataset.o !== item.j)).slice(0, 2).forEach(b => { b.classList.add("gone"); b.disabled = true; }); },
      stop() { done = true; t && t.stop(); document.removeEventListener("keydown", onKey); }
    };
  }

  /* ---------- Konfetti ---------- */
  function confetti() {
    const c = document.createElement("canvas"); c.className = "confetti"; document.body.appendChild(c);
    const x = c.getContext("2d"); const W = c.width = innerWidth, H = c.height = innerHeight;
    const ps = Array.from({ length: 160 }, () => ({ x: Math.random() * W, y: -20 - Math.random() * H * .5, vx: (Math.random() - .5) * 3, vy: 2 + Math.random() * 4, r: Math.random() * 6.28, vr: (Math.random() - .5) * .3, c: [...COLORS, "#fff"][Math.floor(Math.random() * 5)], s: 6 + Math.random() * 6 }));
    let f = 0; (function loop() {
      x.clearRect(0, 0, W, H);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.r += p.vr; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); x.restore(); });
      if (++f < 260) requestAnimationFrame(loop); else c.remove();
    })();
  }

  /* ---------- Gʻolib ---------- */
  function winner(teams, onAgain) {
    const sorted = teams.map((t, i) => ({ ...t, i })).sort((a, b) => b.score - a.score);
    const top = sorted.filter(t => t.score === sorted[0].score);
    const pod = [sorted[1], sorted[0], sorted[2]].filter(Boolean);
    const h = { 0: 150, 1: 110, 2: 80 };
    const c = modal(`
      <div class="meta"><span class="pill gold">Oʻyin tugadi</span></div>
      <div class="big">🏆 ${top.map(t => esc(t.name)).join(" va ")}</div>
      <div style="color:var(--muted)">${top.length > 1 ? "Durang!" : "Gʻolib jamoa — tabriklaymiz!"}</div>
      <div class="podium">${pod.map(t => { const r = sorted.indexOf(t); return `<div class="p" style="height:${h[r]}px;border-color:${t.color}"><div class="pl">${["🥇", "🥈", "🥉"][r]}</div><div class="nm">${esc(t.name)}</div><div class="sc">${t.score}</div></div>`; }).join("")}</div>
      ${sorted.length > 3 ? `<ol class="rank">${sorted.slice(3).map((t, k) => `<li><span>${k + 4}. ${esc(t.name)}</span><b>${t.score}</b></li>`).join("")}</ol>` : ""}
      <div class="row-btns"><button class="btn primary" id="again" type="button">Yana oʻynash ↺</button><a class="btn" href="../index.html?mavzu=${encodeURIComponent(key)}">Menyuga</a></div>`);
    $("#again", c).onclick = () => { modal.close(); onAgain(); };
    sound.win(); confetti();
  }

  function toast(msg, ms = 1800) {
    const t = document.createElement("div"); t.className = "toast"; t.innerHTML = msg; document.body.appendChild(t);
    setTimeout(() => t.remove(), ms);
  }

  window.G = { $, $$, esc, shuffle, store, key, topic, VALUES, COLORS, sound, header, setup, scores, bump, modal, timer, ask, confetti, winner, toast,
    saveKey: game => "oyin-" + game + "-" + key };
})();
