/* Homepage hero: trace the character 学 on a practice grid. Nothing is stored or sent. */
(function () {
  "use strict";
  var root = document.getElementById("trace");
  var pad = document.getElementById("trace-pad");
  var ghost = document.getElementById("trace-ghost");
  var ink = document.getElementById("trace-ink");
  var say = document.getElementById("trace-say");
  var reset = document.getElementById("trace-reset");
  if (!root || !pad || !ghost || !ink || !ghost.getContext) return;

  var CHAR = "学";
  var FONT = '"Kaiti SC","STKaiti","KaiTi","BiauKai","Noto Serif CJK SC",serif';
  var ghostCtx = ghost.getContext("2d");
  var inkCtx = ink.getContext("2d", { willReadFrequently: true });
  var size = 0, dpr = 1, brush = 14;
  var targets = [], halo = null, drawing = false, last = null, done = false, started = false;
  var prompt = say.innerHTML;

  function layout() {
    var r = pad.getBoundingClientRect();
    size = Math.round(r.width);
    if (!size) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    [ghost, ink].forEach(function (c) { c.width = size * dpr; c.height = size * dpr; });
    brush = Math.max(10, size * 0.05);
    drawGhost();
    buildMask();
    inkCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    inkCtx.lineCap = "round";
    inkCtx.lineJoin = "round";
    inkCtx.lineWidth = brush;
    inkCtx.strokeStyle = "#14213D";
    done = false; started = false;
    pad.classList.remove("done");
    say.innerHTML = prompt;
  }

  function paintChar(ctx, fill, extra) {
    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = "700 " + size * 0.8 + "px " + FONT;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = fill;
    ctx.fillText(CHAR, size / 2, size * 0.54);
    if (extra) { ctx.strokeStyle = fill; ctx.lineWidth = extra; ctx.lineJoin = "round"; ctx.strokeText(CHAR, size / 2, size * 0.54); }
    ctx.restore();
  }

  function drawGhost() {
    ghostCtx.clearRect(0, 0, ghost.width, ghost.height);
    paintChar(ghostCtx, "rgba(20,33,61,.13)");
  }

  function buildMask() {
    var m = document.createElement("canvas");
    m.width = m.height = size * dpr;
    var mc = m.getContext("2d", { willReadFrequently: true });
    paintChar(mc, "#000");
    var data = mc.getImageData(0, 0, m.width, m.height).data;
    var step = Math.max(4, Math.round(size / 56));
    targets = [];
    for (var y = 0; y < size; y += step) for (var x = 0; x < size; x += step) {
      if (data[((Math.round(y * dpr)) * m.width + Math.round(x * dpr)) * 4 + 3] > 128) targets.push([x, y]);
    }
    var h = document.createElement("canvas");
    h.width = h.height = size * dpr;
    var hc = h.getContext("2d", { willReadFrequently: true });
    paintChar(hc, "#000", brush * 1.6);
    halo = { data: hc.getImageData(0, 0, h.width, h.height).data, w: h.width, step: step };
  }

  function point(e) {
    var r = ink.getBoundingClientRect();
    return [(e.clientX - r.left) * (size / r.width), (e.clientY - r.top) * (size / r.height)];
  }

  function down(e) {
    if (done) return;
    drawing = true;
    last = point(e);
    try { ink.setPointerCapture(e.pointerId); } catch (_) {}
    inkCtx.beginPath();
    inkCtx.moveTo(last[0], last[1]);
    inkCtx.lineTo(last[0] + 0.01, last[1]);
    inkCtx.stroke();
    if (!started) { started = true; say.textContent = "Keep going. Follow the faint lines."; }
    e.preventDefault();
  }

  function move(e) {
    if (!drawing) return;
    var p = point(e);
    inkCtx.beginPath();
    inkCtx.moveTo(last[0], last[1]);
    inkCtx.lineTo(p[0], p[1]);
    inkCtx.stroke();
    last = p;
    e.preventDefault();
  }

  function up() {
    if (!drawing) return;
    drawing = false;
    check();
  }

  function check() {
    if (!targets.length) return;
    var w = ink.width;
    var d = inkCtx.getImageData(0, 0, ink.width, ink.height).data;
    var hit = 0, i, t;
    for (i = 0; i < targets.length; i++) {
      t = targets[i];
      if (d[((Math.round(t[1] * dpr)) * w + Math.round(t[0] * dpr)) * 4 + 3] > 0) hit++;
    }
    var inside = 0, outside = 0, x, y, s = halo.step;
    for (y = 0; y < size; y += s) for (x = 0; x < size; x += s) {
      var idx = ((Math.round(y * dpr)) * w + Math.round(x * dpr)) * 4 + 3;
      if (d[idx] > 0) { if (halo.data[idx] > 20) inside++; else outside++; }
    }
    var cover = hit / targets.length;
    var tidy = inside ? outside / (inside + outside) : 1;
    if (cover >= 0.78 && tidy <= 0.25) finish();
    else if (cover >= 0.78) say.textContent = "Nice and full. Tap Again to trace it neatly.";
    else if (started) say.textContent = Math.round(cover * 100) + "% traced. Keep going.";
  }

  function finish() {
    done = true;
    pad.classList.add("done");
    say.innerHTML = "<b lang=\"zh-CN\">好!</b> You wrote <b lang=\"zh-CN\">学</b>. Ready for today's practice?";
  }

  ink.addEventListener("pointerdown", down);
  ink.addEventListener("pointermove", move);
  ink.addEventListener("pointerup", up);
  ink.addEventListener("pointercancel", up);
  reset.addEventListener("click", function () {
    inkCtx.save();
    inkCtx.setTransform(1, 0, 0, 1, 0, 0);
    inkCtx.clearRect(0, 0, ink.width, ink.height);
    inkCtx.restore();
    done = false; started = false;
    pad.classList.remove("done");
    say.innerHTML = prompt;
  });

  var ready = function () { root.classList.add("live"); layout(); };
  var timer;
  window.addEventListener("resize", function () { clearTimeout(timer); timer = setTimeout(function () { if (Math.round(pad.getBoundingClientRect().width) !== size) layout(); }, 180); });
  if (document.fonts && document.fonts.load) document.fonts.load("700 40px " + FONT, CHAR).then(ready, ready);
  else ready();
})();
