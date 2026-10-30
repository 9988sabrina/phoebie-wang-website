/* Cold joke corner: one joke every 15 s, punchline after 6 s. No tracking, no storage, no network. */
(function () {
  var J = window.COLD_JOKES;
  var root = document.getElementById("joke-art");
  if (!J || !J.length || !root) return;
  var useEl = document.getElementById("joke-use"), qEl = document.getElementById("joke-q"), aEl = document.getElementById("joke-a");
  var countEl = document.getElementById("joke-count"), fillEl = document.getElementById("joke-fill");
  var nextBtn = document.getElementById("joke-next"), pauseBtn = document.getElementById("joke-pause"), statusEl = document.getElementById("joke-status");
  var box = root.parentNode;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var CYCLE = 15000, REVEAL = 6000;
  var ART = {
    det: ["#mascot", "0 0 236 240"], dum: ["#dumpling", "0 0 172 150"],
    chi: ["#chicken", "0 0 236 270"], piz: ["#pizza", "0 0 172 172"]
  };
  var order = [], pos = -1, paused = false, held = false, visible = true, cycleStart = 0, revealT = null, raf = null, elapsedPaused = 0;

  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var k = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[k]; a[k] = t; } return a; }
  function deck() { var d = shuffle(J.map(function (_, i) { return i; })); if (order.length && d[0] === order[order.length - 1]) d.push(d.shift()); return d; }

  /* write text, wrapping runs of Chinese characters so they get lang + kai font */
  function fill(el, text) {
    el.textContent = "";
    text.split(/([一-鿿]+)/).forEach(function (part) {
      if (!part) return;
      if (/[一-鿿]/.test(part)) { var s = document.createElement("span"); s.lang = "zh-CN"; s.className = "zh"; s.textContent = part; el.appendChild(s); }
      else el.appendChild(document.createTextNode(part));
    });
  }

  function reveal(announce) {
    aEl.classList.add("on");
    if (announce && statusEl) statusEl.textContent = qEl.textContent + " " + aEl.textContent;
  }

  function show(i, announce) {
    var j = J[i], art = ART[j.s] || ART.det;
    useEl.setAttribute("href", art[0]); root.setAttribute("viewBox", art[1]);
    fill(qEl, j.q); fill(aEl, j.a);
    aEl.classList.remove("on");
    countEl.textContent = "Joke " + (J.indexOf(j) + 1) + " of " + J.length;
    qEl.classList.remove("swap"); void qEl.offsetWidth; qEl.classList.add("swap");
    clearTimeout(revealT);
    if (reduce || announce) reveal(announce); else revealT = setTimeout(function () { reveal(false); }, REVEAL);
  }

  function advance(announce) {
    pos++;
    if (pos >= order.length) { order = order.concat(deck()); }
    show(order[pos], announce);
    cycleStart = performance.now(); elapsedPaused = 0;
    if (!reduce) startBar();
  }

  function startBar() {
    cancelAnimationFrame(raf);
    (function step(now) {
      var t = paused || held ? elapsedPaused : (now - cycleStart);
      if (!(paused || held)) elapsedPaused = t;
      fillEl.style.width = Math.min(100, (t / CYCLE) * 100) + "%";
      if (!paused && !held && visible && !document.hidden && t >= CYCLE) { advance(false); return; }
      raf = requestAnimationFrame(function (n) {
        /* keep the clock honest while held/hidden: shift the start so paused time is not counted */
        if (paused || held || !visible || document.hidden) cycleStart = n - elapsedPaused;
        step(n);
      });
    })(performance.now());
  }

  nextBtn.addEventListener("click", function () { advance(true); });
  pauseBtn.addEventListener("click", function () {
    paused = !paused; pauseBtn.setAttribute("aria-pressed", String(paused)); pauseBtn.textContent = paused ? "Play" : "Pause";
    if (paused) reveal(false);
  });
  box.addEventListener("mouseenter", function () { held = true; });
  box.addEventListener("mouseleave", function () { held = false; });
  box.addEventListener("focusin", function () { held = true; });
  box.addEventListener("focusout", function () { held = false; });
  if ("IntersectionObserver" in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }).observe(box);

  order = deck();
  if (reduce) { pauseBtn.hidden = true; fillEl.parentNode.hidden = true; }
  advance(false);
})();
