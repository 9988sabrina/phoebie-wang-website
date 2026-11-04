/* Times Table Explorer: a 12 × 12 multiplication chart you can tap.
   Tap a square to light up its row and column and read a pattern tip; "Hide some squares" turns the
   chart into a find-the-answer game. Nothing is stored or sent. Pure helpers are exported for tests. */
(function (root) {
  var SIZE = 12;

  // One tip per times table, written for a 6 to 10 year old. {trick} is a link to a trick page when we have one.
  var TIPS = {
    1: { text: "Times 1 is a copy. Any number × 1 stays the same.", cn: "乘 1 不变。" },
    2: { text: "Times 2 is a double. Add the number to itself: 7 + 7 = 14.", cn: "乘 2 就是翻倍。", link: "lesson.html", label: "Double and half lesson" },
    3: { text: "Times 3 is a double plus one more: 6 × 3 = 12 + 6 = 18.", cn: "乘 3 = 翻倍再加一次。" },
    4: { text: "Times 4 is double, then double again: 7 → 14 → 28.", cn: "乘 4 = 翻倍两次。" },
    5: { text: "Times 5 always ends in 0 or 5. It is half of times 10: 8 × 10 = 80, half is 40.", cn: "乘 5 = 乘 10 再取一半。" },
    6: { text: "Times 6 is times 5 plus one more: 7 × 5 = 35, plus 7 is 42.", cn: "乘 6 = 乘 5 再加一次。" },
    7: { text: "Sevens are the tricky ones. Remember 5-6-7-8: 56 = 7 × 8. Flip it: 7 × 6 is 6 × 7 = 42.", cn: "7 的口诀最难，多看几遍。" },
    8: { text: "Times 8 is double three times: 6 → 12 → 24 → 48.", cn: "乘 8 = 翻倍三次。" },
    9: { text: "Times 9: the digits of the answer add up to 9 (36 → 3 + 6). Or fold a finger.", cn: "乘 9：答案两位数字相加等于 9。", link: "nine-trick.html", label: "Finger trick for ×9" },
    10: { text: "Times 10: just add a zero. 7 × 10 = 70.", cn: "乘 10：末尾加 0。" },
    11: { text: "Times 11 up to 9 repeats the digit: 7 × 11 = 77. For bigger numbers, add the neighbours.", cn: "乘 11：数字写两遍。", link: "printables.html#try", label: "The ×11 trick" },
    12: { text: "Times 12 is times 10 plus times 2: 7 × 12 = 70 + 14 = 84.", cn: "乘 12 = 乘 10 加乘 2。" }
  };

  function tipFor(n) {
    n = Math.floor(Number(n));
    if (!(n >= 1 && n <= SIZE)) throw new Error("tipFor needs 1 to " + SIZE);
    return TIPS[n];
  }

  // Which table should the tip talk about? Prefer the "harder" factor, since that is the pattern worth noticing.
  function tipTable(a, b) {
    var order = [7, 8, 6, 9, 12, 11, 4, 3, 5, 2, 10, 1];
    return order.indexOf(a) < order.indexOf(b) ? a : b;
  }

  // Pick `count` distinct squares to hide, never from the header row/column, never 1× or ×1 (too easy).
  function hideSet(rng, count) {
    var pool = [], a, b, out = [];
    for (a = 2; a <= SIZE; a++) for (b = 2; b <= SIZE; b++) pool.push(a + "x" + b);
    count = Math.min(count, pool.length);
    while (out.length < count) { var k = pool[Math.floor(rng() * pool.length)]; if (out.indexOf(k) < 0) out.push(k); }
    return out;
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { SIZE: SIZE, tipFor: tipFor, tipTable: tipTable, hideSet: hideSet };
    return;
  }

  var grid = document.getElementById("tt-grid"), eq = document.getElementById("tt-eq"), say = document.getElementById("tt-say"), tipEl = document.getElementById("tt-tip");
  var hideBtn = document.getElementById("tt-hide"), showBtn = document.getElementById("tt-show"), score = document.getElementById("tt-score"), printBtn = document.getElementById("tt-print");
  if (!grid) return;
  var hidden = {}, found = 0, total = 0, current = null;

  /* ---------- build the chart ---------- */
  var table = document.createElement("table");
  table.className = "tt-table";
  var cap = document.createElement("caption"); cap.className = "sr-only"; cap.textContent = "Multiplication chart from 1 × 1 to 12 × 12. Tap any square."; table.appendChild(cap);
  var thead = document.createElement("thead"), hr = document.createElement("tr");
  hr.appendChild(Object.assign(document.createElement("th"), { scope: "col", textContent: "×" }));
  for (var c = 1; c <= SIZE; c++) { var th = document.createElement("th"); th.scope = "col"; th.textContent = c; th.dataset.col = c; hr.appendChild(th); }
  thead.appendChild(hr); table.appendChild(thead);
  var tbody = document.createElement("tbody");
  for (var r = 1; r <= SIZE; r++) {
    var tr = document.createElement("tr");
    var rh = document.createElement("th"); rh.scope = "row"; rh.textContent = r; rh.dataset.row = r; tr.appendChild(rh);
    for (c = 1; c <= SIZE; c++) {
      var td = document.createElement("td");
      var b = document.createElement("button"); b.type = "button"; b.dataset.a = r; b.dataset.b = c; b.className = "tt-cell";
      b.textContent = r * c; b.setAttribute("aria-label", r + " times " + c + " is " + (r * c));
      td.appendChild(b); tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody); grid.appendChild(table);

  function cellAt(a, b) { return grid.querySelector('.tt-cell[data-a="' + a + '"][data-b="' + b + '"]'); }

  function highlight(a, b) {
    current = { a: a, b: b };
    grid.querySelectorAll(".tt-cell").forEach(function (el) {
      var x = Number(el.dataset.a), y = Number(el.dataset.b);
      el.classList.toggle("row", x === a && y <= b);
      el.classList.toggle("col", y === b && x <= a);
      el.classList.toggle("pick", x === a && y === b);
      el.classList.toggle("twin", x === b && y === a && a !== b);
      el.setAttribute("aria-pressed", String(x === a && y === b));
    });
    grid.querySelectorAll("th[data-row]").forEach(function (th) { th.classList.toggle("on", Number(th.dataset.row) === a); });
    grid.querySelectorAll("th[data-col]").forEach(function (th) { th.classList.toggle("on", Number(th.dataset.col) === b); });
    var n = tipTable(a, b), t = tipFor(n);
    eq.innerHTML = a + " × " + b + " = <b>" + (a * b) + "</b>";
    say.textContent = a + " rows of " + b + " make " + (a * b) + "." + (a !== b ? " Flip it: " + b + " × " + a + " is the same " + (a * b) + "." : " A square number!");
    tipEl.innerHTML = '<b>Times ' + n + " tip:</b> " + t.text + ' <span lang="zh-CN">' + t.cn + "</span>" +
      (t.link ? ' <a href="' + t.link + '">' + t.label + " →</a>" : "");
  }

  /* ---------- hide and seek ---------- */
  function reveal(el) {
    var key = el.dataset.a + "x" + el.dataset.b;
    if (!hidden[key]) return false;
    delete hidden[key]; found++;
    el.classList.remove("hidden"); el.classList.add("found");
    el.textContent = el.dataset.a * el.dataset.b;
    score.textContent = found === total ? "You found all " + total + "! Hide some more?" : found + " of " + total + " found. " + (total - found) + " to go.";
    return true;
  }
  function hideSome() {
    showAll();
    hideSet(Math.random, 12).forEach(function (key) {
      var p = key.split("x"), el = cellAt(p[0], p[1]);
      hidden[key] = true; el.classList.add("hidden"); el.textContent = "?";
    });
    total = 12; found = 0;
    score.textContent = "12 squares are hiding. Say the answer out loud, then tap to check.";
    showBtn.hidden = false;
  }
  function showAll() {
    grid.querySelectorAll(".tt-cell.hidden,.tt-cell.found").forEach(function (el) { el.classList.remove("hidden", "found"); el.textContent = el.dataset.a * el.dataset.b; });
    hidden = {}; found = 0; total = 0; score.textContent = ""; showBtn.hidden = true;
  }

  grid.addEventListener("click", function (e) {
    var el = e.target.closest(".tt-cell"); if (!el) return;
    reveal(el);
    highlight(Number(el.dataset.a), Number(el.dataset.b));
  });
  grid.addEventListener("click", function (e) {
    var th = e.target.closest("th[data-row],th[data-col]"); if (!th) return;
    if (th.dataset.row) highlight(Number(th.dataset.row), SIZE); else highlight(SIZE, Number(th.dataset.col));
  });
  // Arrow keys move around the chart.
  grid.addEventListener("keydown", function (e) {
    if (!current || ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.key) < 0) return;
    var a = current.a, b = current.b;
    if (e.key === "ArrowUp") a--; if (e.key === "ArrowDown") a++; if (e.key === "ArrowLeft") b--; if (e.key === "ArrowRight") b++;
    if (a < 1 || b < 1 || a > SIZE || b > SIZE) return;
    e.preventDefault(); var el = cellAt(a, b); el.focus(); highlight(a, b);
  });
  hideBtn.addEventListener("click", hideSome);
  showBtn.addEventListener("click", showAll);
  if (printBtn) printBtn.addEventListener("click", function () { root.print(); });

  highlight(7, 8);
})(typeof window !== "undefined" ? window : this);
