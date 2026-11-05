/* Multiply by 5 and 25: "half it, add a zero" and "quarter it, add two zeros".
   Nothing is stored or sent. The pure helpers are exported for tests. */
(function (root) {
  // n fives snap together in pairs: every two fives make one ten.
  function fiveSplit(n) {
    n = Math.floor(Number(n));
    if (!(n >= 1 && n <= 12)) throw new Error("fiveSplit needs 1 to 12");
    return { n: n, tens: Math.floor(n / 2), left: n % 2, answer: n * 5 };
  }

  function take(rng, pool, count) {
    var out = [], n;
    while (out.length < count) { n = pool[Math.floor(rng() * pool.length)]; if (out.indexOf(n) < 0) out.push(n); }
    return out;
  }

  // Six problems: two even × 5, two odd × 5 (12 to 98, none ending in 0), then two multiples of 4 × 25.
  function makeFiveSet(rng) {
    var even = [], odd = [], fours = [], n;
    for (n = 12; n <= 98; n++) { if (n % 10 === 0) continue; (n % 2 ? odd : even).push(n); }
    for (n = 8; n <= 48; n += 4) fours.push(n);
    var fives = take(rng, even, 2).concat(take(rng, odd, 2));
    // Mix even and odd so the pattern is not "first two are easy".
    fives = [fives[0], fives[2], fives[1], fives[3]];
    return fives.map(function (a) { return { a: a, b: 5, answer: a * 5 }; })
      .concat(take(rng, fours, 2).map(function (a) { return { a: a, b: 25, answer: a * 25 }; }));
  }

  function hint(p) {
    if (p.b === 25) return "Try: a quarter of " + p.a + " is " + (p.a / 4) + ". Put two zeros on the end: " + p.answer + ".";
    if (p.a % 2 === 0) return "Try: half of " + p.a + " is " + (p.a / 2) + ". Put a 0 on the end: " + p.answer + ".";
    return "Try: " + p.a + " is odd, so use the number below. Half of " + (p.a - 1) + " is " + ((p.a - 1) / 2) + ". Put a 5 on the end: " + p.answer + ".";
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { fiveSplit: fiveSplit, makeFiveSet: makeFiveSet, hint: hint };
    return;
  }

  /* ---------- Part 1: fives snap into tens ---------- */
  var stage = document.getElementById("ft-bars"), picker = document.getElementById("ft-pick");
  var eq = document.getElementById("ft-eq"), say = document.getElementById("ft-say");
  var reduce = root.matchMedia && root.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function bar(kind) {
    var el = document.createElement("span"), i, count = kind === "ten" ? 10 : 5;
    el.className = "ft-bar " + kind;
    for (i = 0; i < count; i++) el.appendChild(document.createElement("i"));
    return el;
  }

  function showFives(n) {
    var s = fiveSplit(n), i;
    stage.textContent = "";
    for (i = 0; i < s.tens; i++) stage.appendChild(bar("ten"));
    if (s.left) stage.appendChild(bar("five"));
    if (!reduce) { stage.classList.remove("snap"); void stage.offsetWidth; stage.classList.add("snap"); }
    eq.innerHTML = n + " × 5 = <b>" + (s.tens || "") + "</b><b>" + (s.left ? 5 : 0) + "</b>";
    var tens = s.tens + " ten" + (s.tens === 1 ? "" : "s");
    say.textContent = s.left
      ? (s.tens ? n + " fives make " + tens + " with one five left over. Write " + s.tens + ", then 5: " : "One five on its own: ") + s.answer + "."
      : n + " fives snap into " + tens + ". Half of " + n + " is " + s.tens + ", then a 0: " + s.answer + ".";
    picker.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", String(Number(b.dataset.n) === n)); });
  }
  if (stage && picker) {
    picker.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-n]"); if (b) showFives(Number(b.dataset.n));
    });
    showFives(8);
  }

  /* ---------- Part 2: bigger numbers ---------- */
  var grid = document.getElementById("ft-grid"), scoreEl = document.getElementById("ft-score"), newBtn = document.getElementById("ft-new");
  if (!grid) return;
  var solved = 0;

  function card(p, i) {
    var el = document.createElement("article");
    el.className = "ft-card" + (p.b === 25 ? " q" : "");
    el.innerHTML = '<p class="problem"><span class="sr-only">Problem ' + (i + 1) + ': </span>' + p.a + " × " + p.b + " = ?</p>" +
      '<form><label class="sr-only" for="ft-in-' + i + '">Your answer for ' + p.a + " times " + p.b + "</label>" +
      '<input class="answer-input" id="ft-in-' + i + '" type="number" inputmode="numeric" min="0" max="9999" required>' +
      '<button class="button primary" type="submit">Check</button></form>' +
      '<p class="practice-feedback" role="status" aria-live="polite"></p>';
    var form = el.querySelector("form"), input = el.querySelector("input"), fb = el.querySelector(".practice-feedback");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!input.value) { fb.textContent = "Type a number first."; fb.className = "practice-feedback"; return; }
      if (Number(input.value) === p.answer) {
        if (!el.classList.contains("ok")) { solved++; el.classList.add("ok"); }
        fb.textContent = "Yes! " + p.a + " × " + p.b + " = " + p.answer + ". ⚡";
        fb.className = "practice-feedback correct"; input.disabled = true; form.querySelector("button").disabled = true;
      } else {
        fb.textContent = "Not yet. " + hint(p);
        fb.className = "practice-feedback error";
      }
      scoreEl.textContent = solved + " of 6 right so far." + (solved === 6 ? " Lightning fast!" : "");
    });
    return el;
  }

  function build() {
    solved = 0; grid.textContent = "";
    makeFiveSet(Math.random).forEach(function (p, i) { grid.appendChild(card(p, i)); });
    scoreEl.textContent = "0 of 6 right so far.";
  }
  newBtn.addEventListener("click", function () { build(); grid.querySelector("input").focus(); });
  build();
})(typeof window !== "undefined" ? window : this);
