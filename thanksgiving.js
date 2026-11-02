/* Thanksgiving mini-pack: six "turkey × 11" problems and six "pumpkin pie × 5" problems with instant checking.
   Nothing is stored or sent. The problem generator is exported for tests. */
(function (root) {
  function pick(rng, list) { return list[Math.floor(rng() * list.length)]; }

  // Four easy ×11 (digit sum ≤ 9, no carry) and two with a carry, all two-digit, no repeats.
  function makeElevenSet(rng) {
    var easy = [], hard = [], n;
    for (n = 12; n <= 98; n++) {
      if (n % 10 === 0 || n % 11 === 0) continue;
      var s = Math.floor(n / 10) + (n % 10);
      (s <= 9 ? easy : hard).push(n);
    }
    var out = [];
    while (out.length < 4) { n = pick(rng, easy); if (out.indexOf(n) < 0) out.push(n); }
    while (out.length < 6) { n = pick(rng, hard); if (out.indexOf(n) < 0) out.push(n); }
    return out.map(function (a) { return { a: a, b: 11, answer: a * 11, kind: "eleven" }; });
  }

  // Six even numbers × 5, from 12 to 48, no repeats.
  function makeHalfSet(rng) {
    var out = [], n;
    while (out.length < 6) { n = 12 + 2 * Math.floor(rng() * 19); if (out.indexOf(n) < 0) out.push(n); }
    return out.map(function (a) { return { a: a, b: 5, answer: a * 5, kind: "half" }; });
  }

  function hint(p) {
    if (p.kind === "eleven") {
      var t = Math.floor(p.a / 10), u = p.a % 10, s = t + u;
      return s <= 9 ? "Try: " + t + ", (" + t + "+" + u + "), " + u + " → " + t + s + u + "."
        : "Try: " + t + "+" + u + " = " + s + ", so write " + (s % 10) + " in the middle and carry 1: " + (t + 1) + (s % 10) + u + ".";
    }
    return "Try: half of " + p.a + " is " + (p.a / 2) + ", double 5 is 10 → " + (p.a / 2) + " × 10.";
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { makeElevenSet: makeElevenSet, makeHalfSet: makeHalfSet, hint: hint };
    return;
  }

  var ICONS = { eleven: "🦃", half: "🥧" };
  var grids = { eleven: document.getElementById("tg-grid-11"), half: document.getElementById("tg-grid-half") };
  var scoreEl = document.getElementById("tg-score"), newBtn = document.getElementById("tg-new");
  if (!grids.eleven || !grids.half) return;
  var problems = [], solved = 0;

  function card(p, i) {
    var el = document.createElement("article");
    el.className = "tg-card" + (p.kind === "half" ? " pie" : "");
    el.innerHTML = '<span aria-hidden="true">' + ICONS[p.kind] + "</span>" +
      '<p class="problem"><span class="sr-only">Problem ' + (i + 1) + ': </span>' + p.a + " × " + p.b + " = ?</p>" +
      '<form><label class="sr-only" for="tg-in-' + i + '">Your answer for ' + p.a + " times " + p.b + "</label>" +
      '<input class="answer-input" id="tg-in-' + i + '" type="number" inputmode="numeric" min="0" max="9999" required>' +
      '<button class="button primary" type="submit">Check</button></form>' +
      '<p class="practice-feedback" role="status" aria-live="polite"></p>';
    var form = el.querySelector("form"), input = el.querySelector("input"), fb = el.querySelector(".practice-feedback");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = Number(input.value);
      if (!input.value) { fb.textContent = "Type a number first."; fb.className = "practice-feedback"; return; }
      if (v === p.answer) {
        if (!el.classList.contains("ok")) { solved++; el.classList.add("ok"); }
        fb.textContent = "Yes! " + p.a + " × " + p.b + " = " + p.answer + ". " + ICONS[p.kind];
        fb.className = "practice-feedback correct"; input.disabled = true; form.querySelector("button").disabled = true;
      } else {
        fb.textContent = "Not yet. " + hint(p);
        fb.className = "practice-feedback error";
      }
      scoreEl.textContent = solved + " of 12 right so far." + (solved === 12 ? " All done, happy Thanksgiving!" : "");
    });
    return el;
  }

  function build() {
    var rng = Math.random;
    problems = makeElevenSet(rng).concat(makeHalfSet(rng));
    solved = 0;
    grids.eleven.textContent = ""; grids.half.textContent = "";
    problems.forEach(function (p, i) { grids[p.kind].appendChild(card(p, i)); });
    scoreEl.textContent = "0 of 12 right so far.";
  }

  newBtn.addEventListener("click", function () { build(); grids.eleven.querySelector("input").focus(); });
  build();
})(typeof window !== "undefined" ? window : this);
