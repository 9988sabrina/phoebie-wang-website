/* Bubble Pop: a calm, no-score game for the homepage. No tracking, no storage, no network. */
(function () {
  var stage = document.getElementById("bubble-stage");
  if (!stage) return;
  var canvas = stage.querySelector("canvas");
  var ctx = canvas.getContext("2d");
  var wordEl = document.getElementById("bubble-word");
  var soundBtn = document.getElementById("bubble-sound");
  var popBtn = document.getElementById("bubble-pop");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var WORDS = [
    ["人", "rén", "person"], ["大", "dà", "big"], ["小", "xiǎo", "small"], ["山", "shān", "mountain"],
    ["水", "shuǐ", "water"], ["火", "huǒ", "fire"], ["月", "yuè", "moon"], ["日", "rì", "sun"],
    ["木", "mù", "tree"], ["口", "kǒu", "mouth"], ["好", "hǎo", "good"], ["学", "xué", "to learn"]
  ];
  var COLORS = ["#FFD23F", "#9AD9CF", "#BFE3F5", "#FFB3BA", "#C9D3E8"];
  var SCALE = [523.25, 587.33, 659.25, 783.99, 880.0];
  var FONT = '"Kaiti SC","STKaiti","KaiTi","BiauKai","Noto Serif CJK SC",serif';

  var w = 0, h = 0, bubbles = [], parts = [], running = false, last = 0, audio = null, soundOn = false, visible = true;

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function resize() {
    var r = stage.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (r.width === w && r.height === h && canvas.width) return; /* mobile bars fire resize constantly; skip no-ops */
    w = r.width; h = r.height;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    for (var i = 0; i < bubbles.length; i++) {
      bubbles[i].x = Math.min(Math.max(bubbles[i].x, bubbles[i].r), w - bubbles[i].r);
    }
  }

  function make(fromBottom) {
    var r = rnd(40, 58);
    return {
      x: rnd(r + 8, Math.max(r + 9, w - r - 8)),
      y: fromBottom ? h + r + rnd(0, h * 0.5) : rnd(r, Math.max(r + 1, h - r)),
      r: r, vy: reduce ? 0 : rnd(18, 34), ph: rnd(0, 6.28), sway: reduce ? 0 : rnd(8, 18),
      c: pick(COLORS), wd: pick(WORDS), t: rnd(0, 10)
    };
  }

  function init() {
    bubbles = [];
    var n = w < 520 ? 8 : 12;
    for (var i = 0; i < n; i++) bubbles.push(make(false));
  }

  function bx(b) { return b.x + Math.sin(b.t * 0.9 + b.ph) * b.sway; }

  function note() {
    if (!soundOn) return;
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      if (audio.state === "suspended") audio.resume();
      var o = audio.createOscillator(), g = audio.createGain(), t = audio.currentTime;
      o.type = "sine"; o.frequency.value = pick(SCALE);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.09, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
      o.connect(g); g.connect(audio.destination); o.start(t); o.stop(t + 0.75);
    } catch (e) { /* sound is optional */ }
  }

  function pop(b) {
    var i = bubbles.indexOf(b);
    if (i < 0) return;
    if (!reduce) {
      var x = bx(b);
      for (var k = 0; k < 12; k++) {
        var a = (k / 12) * 6.283 + rnd(-.2, .2), s = rnd(50, 120);
        parts.push({ x: x, y: b.y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0, c: b.c });
      }
    }
    wordEl.textContent = "";
    var zh = document.createElement("span");
    zh.lang = "zh-CN"; zh.textContent = b.wd[0];
    wordEl.appendChild(zh);
    wordEl.appendChild(document.createTextNode(" " + b.wd[1] + " · " + b.wd[2]));
    note();
    bubbles[i] = make(!reduce);
    if (!running) frame(performance.now());
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < bubbles.length; i++) {
      var b = bubbles[i], x = bx(b), y = b.y, r = b.r;
      var g = ctx.createRadialGradient(x - r * .35, y - r * .4, r * .1, x, y, r);
      g.addColorStop(0, "rgba(255,255,255,.95)");
      g.addColorStop(.55, b.c + "AA");
      g.addColorStop(1, b.c + "EE");
      ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = g; ctx.fill();
      ctx.lineWidth = 2.5; ctx.strokeStyle = "rgba(20,33,61,.55)"; ctx.stroke();
      ctx.beginPath(); ctx.arc(x, y, r * .78, 3.5, 4.5); ctx.lineWidth = 4; ctx.strokeStyle = "rgba(255,255,255,.9)"; ctx.lineCap = "round"; ctx.stroke();
      ctx.fillStyle = "#14213D"; ctx.font = "900 " + Math.round(r * .95) + "px " + FONT;
      ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(b.wd[0], x, y + r * .06);
    }
    for (var j = 0; j < parts.length; j++) {
      var p = parts[j], f = 1 - p.life / .55;
      ctx.beginPath(); ctx.arc(p.x, p.y, 5 * f + 1, 0, 6.283);
      ctx.fillStyle = p.c; ctx.globalAlpha = Math.max(f, 0); ctx.fill(); ctx.globalAlpha = 1;
    }
  }

  function frame(now) {
    var dt = Math.min((now - last) / 1000 || 0, .05); last = now;
    for (var i = 0; i < bubbles.length; i++) {
      var b = bubbles[i]; b.t += dt; b.y -= b.vy * dt;
      if (b.y < -b.r - 10) bubbles[i] = make(true);
    }
    for (var j = parts.length - 1; j >= 0; j--) {
      var p = parts[j]; p.life += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= .96; p.vy *= .96;
      if (p.life > .55) parts.splice(j, 1);
    }
    draw();
    running = visible && !document.hidden && (!reduce || parts.length > 0);
    if (running) requestAnimationFrame(frame);
  }

  function start() { if (!running && visible && !document.hidden) { running = true; last = performance.now(); requestAnimationFrame(frame); } }

  /* click (not pointerdown) so a scrolling finger never pops a bubble by accident */
  canvas.addEventListener("click", function (e) {
    var r = canvas.getBoundingClientRect(), px = e.clientX - r.left, py = e.clientY - r.top;
    for (var i = bubbles.length - 1; i >= 0; i--) {
      var b = bubbles[i], dx = px - bx(b), dy = py - b.y;
      if (dx * dx + dy * dy <= b.r * b.r) { pop(b); break; }
    }
  });

  popBtn.addEventListener("click", function () {
    var onScreen = bubbles.filter(function (b) { return b.y > b.r * .5 && b.y < h - b.r * .5; });
    pop(onScreen.length ? pick(onScreen) : pick(bubbles));
  });

  soundBtn.addEventListener("click", function () {
    soundOn = !soundOn;
    soundBtn.setAttribute("aria-pressed", String(soundOn));
    soundBtn.textContent = "Sound: " + (soundOn ? "on" : "off");
    if (soundOn) note();
  });

  window.addEventListener("resize", function () { resize(); draw(); }); /* resizing clears the canvas, so always repaint */
  document.addEventListener("visibilitychange", start);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) start(); }).observe(stage);
  }

  resize(); init(); draw();
  if (reduce) { draw(); } else { start(); }
})();
