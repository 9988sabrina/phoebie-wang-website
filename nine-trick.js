/* Multiply by 9: the finger trick for 1 to 10, and "times 10, take one away" for bigger numbers.
   Nothing is stored or sent. The pure helpers are exported for tests. */
(function (root) {
  // Hold up ten fingers, fold finger number n (counting from the left).
  // Fingers left of the fold are the tens, fingers right of it are the ones.
  function fingerSplit(n) {
    n = Math.floor(Number(n));
    if (!(n >= 1 && n <= 10)) throw new Error("fingerSplit needs 1 to 10");
    return { n: n, tens: n - 1, ones: 10 - n, answer: n * 9 };
  }

  function pick(rng, list) { return list[Math.floor(rng() * list.length)]; }

  // Six two-digit problems × 9, from 12 to 49, no repeats, none ending in 0.
  function makeNineSet(rng) {
    var pool = [], n, out = [];
    for (n = 12; n <= 49; n++) if (n % 10 !== 0) pool.push(n);
    while (out.length < 6) { n = pick(rng, pool); if (out.indexOf(n) < 0) out.push(n); }
    return out.map(function (a) { return { a: a, b: 9, answer: a * 9, kind: "nine" }; });
  }

  function hint(p) {
    return "Try: " + p.a + " × 10 = " + (p.a * 10) + ", then take away one " + p.a + ": " + (p.a * 10) + " − " + p.a + " = " + p.answer + ".";
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { fingerSplit: fingerSplit, makeNineSet: makeNineSet, hint: hint };
    return;
  }

  /* ---------- Part 1: fingers ---------- */
  var hands = document.getElementById("nt-hands"), picker = document.getElementById("nt-pick");
  var eq = document.getElementById("nt-eq"), say = document.getElementById("nt-say");
  var reduce = root.matchMedia && root.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function showFingers(n) {
    var s = fingerSplit(n), i;
    for (i = 1; i <= 10; i++) {
      var f = hands.querySelector('[data-finger="' + i + '"]');
      f.classList.toggle("fold", i === n);
      f.classList.toggle("tens", i < n);
      f.classList.toggle("ones", i > n);
    }
    hands.querySelector(".nt-lab-t").textContent = s.tens ? s.tens + " ten" + (s.tens === 1 ? "" : "s") : "no tens";
    hands.querySelector(".nt-lab-o").textContent = s.ones ? s.ones + " one" + (s.ones === 1 ? "" : "s") : "no ones";
    eq.innerHTML = n + " × 9 = <b>" + s.tens + "</b><b>" + s.ones + "</b>";
    say.textContent = "Fold finger " + n + ". " + s.tens + " finger" + (s.tens === 1 ? "" : "s") + " on the left, " +
      s.ones + " on the right, so " + n + " × 9 = " + s.answer + ".";
    picker.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", String(Number(b.dataset.n) === n)); });
    if (!reduce) { hands.classList.remove("bump"); void hands.offsetWidth; hands.classList.add("bump"); }
  }
  if (hands && picker) {
    picker.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-n]"); if (b) showFingers(Number(b.dataset.n));
    });
    showFingers(3);
  }

  /* ---------- Part 2: bigger numbers ---------- */
  var grid = document.getElementById("nt-grid"), scoreEl = document.getElementById("nt-score"), newBtn = document.getElementById("nt-new");
  if (!grid) return;
  var solved = 0;

  function card(p, i) {
    var el = document.createElement("article");
    el.className = "nt-card";
    el.innerHTML = '<p class="problem"><span class="sr-only">Problem ' + (i + 1) + ': </span>' + p.a + " × 9 = ?</p>" +
      '<form><label class="sr-only" for="nt-in-' + i + '">Your answer for ' + p.a + ' times 9</label>' +
      '<input class="answer-input" id="nt-in-' + i + '" type="number" inputmode="numeric" min="0" max="999" required>' +
      '<button class="button primary" type="submit">Check</button></form>' +
      '<p class="practice-feedback" role="status" aria-live="polite"></p>';
    var form = el.querySelector("form"), input = el.querySelector("input"), fb = el.querySelector(".practice-feedback");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!input.value) { fb.textContent = "Type a number first."; fb.className = "practice-feedback"; return; }
      if (Number(input.value) === p.answer) {
        if (!el.classList.contains("ok")) { solved++; el.classList.add("ok"); }
        fb.textContent = "Yes! " + p.a + " × 9 = " + p.answer + ". ✋";
        fb.className = "practice-feedback correct"; input.disabled = true; form.querySelector("button").disabled = true;
      } else {
        fb.textContent = "Not yet. " + hint(p);
        fb.className = "practice-feedback error";
      }
      scoreEl.textContent = solved + " of 6 right so far." + (solved === 6 ? " High five!" : "");
    });
    return el;
  }

  function build() {
    solved = 0; grid.textContent = "";
    makeNineSet(Math.random).forEach(function (p, i) { grid.appendChild(card(p, i)); });
    scoreEl.textContent = "0 of 6 right so far.";
  }
  newBtn.addEventListener("click", function () { build(); grid.querySelector("input").focus(); });
  build();
})(typeof window !== "undefined" ? window : this);
