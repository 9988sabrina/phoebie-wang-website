/* Parking Jam UI. Game rules live in parking-jam-core.js. No network, no third-party code. */
(function () {
  "use strict";
  const J = window.JamCore;
  const NAVY = "#14213D";
  const KEY = "phoebie-jam-level-v1";
  const MAX_LEVEL = 60;
  const COLOR = {
    red:    { fill: "#E5383B", name: "red",    shape: "circle" },
    blue:   { fill: "#2F80ED", name: "blue",   shape: "square" },
    green:  { fill: "#2BB673", name: "green",  shape: "triangle" },
    yellow: { fill: "#FFC933", name: "yellow", shape: "star" },
    pink:   { fill: "#FF7EB6", name: "pink",   shape: "heart" }
  };
  const SHAPES = {
    circle: '<circle cx="10" cy="10" r="6.5"/>',
    square: '<rect x="3.800" y="3.800" width="12.400" height="12.400" rx="2"/>',
    triangle: '<path d="M10 3 L17.200 16.400 H2.800 Z" stroke-linejoin="round"/>',
    star: '<path d="M10 1.800l2.500 5.200 5.700.8-4.100 4 1 5.700L10 14.800 4.900 17.500l1-5.700-4.100-4 5.700-.8z" stroke-linejoin="round"/>',
    heart: '<path d="M10 17.200C3 12.200 1.800 6.200 5.800 5c1.900-.5 3.300.6 4.200 2 .9-1.400 2.300-2.500 4.200-2 4 1.200 2.800 7.200-4.200 12.200z" stroke-linejoin="round"/>'
  };
  const $ = (id) => document.getElementById(id);
  const el = { board: $("jam-board"), queue: $("jam-queue"), bays: $("jam-bays"), qcount: $("jam-qcount"), level: $("jam-level"), left: $("jam-left"), msg: $("jam-msg"), overlay: $("jam-overlay"), stars: $("jam-stars"), overTitle: $("jam-over-title"), overText: $("jam-over-text"), overMain: $("jam-over-main"), overRetry: $("jam-over-retry"), prev: $("jam-prev"), next: $("jam-next"), hint: $("jam-hint"), restart: $("jam-restart") };

  let unlocked = 1, level = 1, state = null, bumps = 0, hinted = -1;
  let play = { timers: [], final: null };
  const vehEls = new Map();
  let lastBayIds = [];

  function load() { try { const n = parseInt(localStorage.getItem(KEY), 10); if (n >= 1) unlocked = Math.min(n, MAX_LEVEL); } catch (e) { /* storage unavailable */ } level = unlocked; }
  function save() { try { localStorage.setItem(KEY, String(unlocked)); } catch (e) { /* ignore */ } }

  function mark(shape, fill, size) {
    return '<svg class="mk" viewBox="0 0 20 20" width="' + size + '" height="' + size + '" aria-hidden="true" fill="' + fill + '" stroke="' + NAVY + '" stroke-width="1.6">' + SHAPES[shape] + "</svg>";
  }

  function vehicleSVG(v, withArrow) {
    const L = v.len * 100, c = COLOR[v.color], neg = v.dir < 0, vert = !v.horiz;
    let g = '<rect x="10" y="16" width="' + (L - 20) + '" height="68" rx="22" fill="' + c.fill + '" stroke="' + NAVY + '" stroke-width="5"/>' +
      '<rect x="' + (L * 0.18) + '" y="8" width="30" height="12" rx="5" fill="' + NAVY + '"/><rect x="' + (L * 0.18) + '" y="80" width="30" height="12" rx="5" fill="' + NAVY + '"/>' +
      '<rect x="' + (L - 74) + '" y="8" width="30" height="12" rx="5" fill="' + NAVY + '"/><rect x="' + (L - 74) + '" y="80" width="30" height="12" rx="5" fill="' + NAVY + '"/>' +
      '<rect x="' + (L - 54) + '" y="27" width="26" height="46" rx="9" fill="#d8efff" stroke="' + NAVY + '" stroke-width="3"/>' +
      '<rect x="24" y="31" width="14" height="38" rx="6" fill="#d8efff" stroke="' + NAVY + '" stroke-width="3"/>' +
      '<circle cx="' + (L - 12) + '" cy="30" r="5" fill="#fff6a8"/><circle cx="' + (L - 12) + '" cy="70" r="5" fill="#fff6a8"/>';
    if (withArrow) g += '<g transform="translate(' + (L / 2 + 14) + ' 50)"><path d="M-24-8H4V-20L28 0 4 20V8H-24Z" fill="#fff" stroke="' + NAVY + '" stroke-width="4" stroke-linejoin="round"/></g>';
    if (neg) g = '<g transform="translate(' + L + ' 0) scale(-1 1)">' + g + "</g>";
    if (vert) g = '<g transform="translate(100 0) rotate(90)">' + g + "</g>";
    const rear = 62; // rear of the vehicle, in board coordinates
    const mx = vert ? 50 : (neg ? L - rear : rear), my = vert ? (neg ? L - rear : rear) : 50;
    const m = '<g transform="translate(' + (mx - 15) + " " + (my - 15) + ') scale(1.5)" fill="#fff" stroke="' + NAVY + '" stroke-width="1.6">' + SHAPES[c.shape] + "</g>";
    const vb = vert ? "0 0 100 " + L : "0 0 " + L + " 100";
    return '<svg viewBox="' + vb + '" preserveAspectRatio="none" aria-hidden="true">' + g + m + "</svg>";
  }

  function label(v) {
    const dirName = v.horiz ? (v.dir > 0 ? "right" : "left") : (v.dir > 0 ? "down" : "up");
    return COLOR[v.color].name + " " + COLOR[v.color].shape + " " + (v.len === 3 ? "bus" : "car") + ", driving " + dirName + ". Tap to drive out.";
  }

  function buildBoard() {
    el.board.textContent = "";
    el.board.style.setProperty("--n", state.w);
    vehEls.clear();
    state.vehicles.forEach((v) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "veh";
      b.style.left = (v.x / state.w * 100) + "%";
      b.style.top = (v.y / state.h * 100) + "%";
      b.style.width = ((v.horiz ? v.len : 1) / state.w * 100) + "%";
      b.style.height = ((v.horiz ? 1 : v.len) / state.h * 100) + "%";
      b.setAttribute("aria-label", label(v));
      b.innerHTML = vehicleSVG(v, true);
      b.addEventListener("click", () => onTap(v.id));
      el.board.appendChild(b);
      vehEls.set(v.id, b);
    });
  }

  function renderSide(frame) {
    el.queue.textContent = "";
    const shown = frame.queue.slice(0, 15);
    shown.forEach((col, i) => {
      const p = document.createElement("span");
      p.className = "pax" + (i === 0 ? " front" : "");
      p.style.setProperty("--c", COLOR[col].fill);
      p.innerHTML = mark(COLOR[col].shape, "#fff", 18);
      el.queue.appendChild(p);
    });
    if (frame.queue.length > shown.length) {
      const m = document.createElement("span");
      m.className = "pax-more";
      m.textContent = "+" + (frame.queue.length - shown.length);
      el.queue.appendChild(m);
    }
    el.qcount.textContent = frame.queue.length ? "(" + frame.queue.length + ")" : "";
    el.bays.textContent = "";
    const ids = [];
    frame.slots.forEach((s, i) => {
      const bay = document.createElement("div");
      bay.className = "bay" + (s ? " has" : "");
      ids.push(s ? s.id : -1);
      if (s) {
        const v = state.vehicles[s.id];
        const sprite = { len: v.len, color: v.color, dir: 1, horiz: true };
        bay.style.setProperty("--c", COLOR[v.color].fill);
        let dots = "";
        for (let k = 0; k < s.cap; k++) dots += '<i class="' + (k < s.boarded ? "on" : "") + '"></i>';
        bay.innerHTML = '<span class="sprite-wrap" style="width:92%;max-height:40px;display:block">' + vehicleSVG(sprite, false).replace("<svg ", '<svg class="sprite" ') + '</span><span class="dots">' + dots + "</span>";
        bay.setAttribute("aria-label", "Bay " + (i + 1) + ": " + COLOR[v.color].name + " " + (v.len === 3 ? "bus" : "car") + ", " + s.boarded + " of " + s.cap + " passengers");
        if (lastBayIds[i] !== s.id) bay.classList.add("pop");
      } else bay.setAttribute("aria-label", "Bay " + (i + 1) + ": empty");
      el.bays.appendChild(bay);
    });
    lastBayIds = ids;
  }

  function setMsg(t) { el.msg.textContent = t; }
  function clearHint() { if (hinted >= 0 && vehEls.get(hinted)) vehEls.get(hinted).classList.remove("hint"); hinted = -1; }
  function updateTop() {
    el.level.textContent = level;
    el.left.textContent = state ? state.alive.length : 0;
    el.prev.disabled = level <= 1;
    el.next.disabled = level >= unlocked || level >= MAX_LEVEL;
  }

  function finishPlay() {
    play.timers.forEach(clearTimeout);
    play.timers = [];
    if (play.final) { renderSide(play.final); play.final = null; }
  }
  function startPlay(frames) {
    finishPlay();
    play.final = frames[frames.length - 1];
    frames.forEach((f, i) => play.timers.push(setTimeout(() => { renderSide(f); if (i === frames.length - 1) play.final = null; }, 420 + i * 260)));
    play.timers.push(setTimeout(showEnd, 420 + frames.length * 260 + 120));
  }

  function showEnd() {
    if (!state || state.status === "play") return;
    el.overlay.hidden = false;
    if (state.status === "won") {
      if (level < MAX_LEVEL && unlocked < level + 1) { unlocked = level + 1; save(); }
      const n = bumps === 0 ? 3 : bumps <= 3 ? 2 : 1;
      el.stars.textContent = "★".repeat(n) + "☆".repeat(3 - n);
      el.overTitle.textContent = level >= MAX_LEVEL ? "You cleared every level!" : "Level " + level + " cleared!";
      el.overText.textContent = "You parked " + state.vehicles.length + " vehicles and carried " + state.totalPassengers + " passengers. " + (bumps === 0 ? "No bumps at all!" : bumps + (bumps === 1 ? " bump" : " bumps") + ". Try for none!");
      el.overMain.textContent = level >= MAX_LEVEL ? "Back to level 1" : "Next level";
      el.overMain.dataset.act = level >= MAX_LEVEL ? "first" : "next";
      el.overRetry.hidden = false;
      setMsg("Level cleared!");
    } else {
      el.stars.textContent = "";
      el.overTitle.textContent = "The lot is jammed!";
      el.overText.textContent = "All five bays hold cars that nobody can board. Plan the order, and watch the colours in the queue.";
      el.overMain.textContent = "Try again";
      el.overMain.dataset.act = "retry";
      el.overRetry.hidden = true;
      setMsg("Jammed. Try a different order.");
    }
    updateTop();
    el.overMain.focus();
  }

  function onTap(id) {
    if (!state || state.status !== "play") return;
    clearHint();
    const b = vehEls.get(id), v = state.vehicles[id];
    const r = J.tap(state, id);
    if (r.type === "blocked") {
      bumps++;
      b.classList.remove("bump");
      void b.offsetWidth;
      b.style.setProperty("--d", v.dir);
      b.classList.add("bump", v.horiz ? "dir-x" : "dir-y");
      const bl = vehEls.get(r.blocker);
      if (bl) { bl.classList.remove("blocker"); void bl.offsetWidth; bl.classList.add("blocker"); setTimeout(() => bl.classList.remove("blocker"), 1500); }
      setMsg("Blocked! The glowing vehicle is in the way.");
      return;
    }
    if (r.type === "full") { setMsg("All bays are full."); return; }
    if (r.type !== "moved") return;
    b.classList.add("driving");
    const sh = (r.dist + v.len) / v.len * 100 * v.dir;
    b.style.transform = v.horiz ? "translate(" + sh + "%,0)" : "translate(0," + sh + "%)";
    setTimeout(() => { b.remove(); vehEls.delete(id); }, 700);
    startPlay(r.frames);
    updateTop();
    setMsg(state.status === "play" ? "Zoom! " + state.alive.length + (state.alive.length === 1 ? " vehicle" : " vehicles") + " left." : "");
  }

  function startLevel(n) {
    finishPlay();
    play.timers.forEach(clearTimeout);
    level = Math.max(1, Math.min(MAX_LEVEL, n));
    state = J.newGame(level);
    bumps = 0; hinted = -1; lastBayIds = [];
    el.overlay.hidden = true;
    buildBoard();
    renderSide(J.snapshot(state));
    updateTop();
    setMsg(level === 1 ? "Tap a car with a clear road ahead." : "Level " + level + ". " + state.vehicles.length + " vehicles to clear.");
  }

  el.hint.addEventListener("click", () => {
    if (!state || state.status !== "play") return;
    clearHint();
    const id = J.hint(state);
    if (id < 0) return;
    hinted = id;
    vehEls.get(id).classList.add("hint");
    setMsg("Try the glowing vehicle.");
  });
  el.restart.addEventListener("click", () => startLevel(level));
  el.prev.addEventListener("click", () => startLevel(level - 1));
  el.next.addEventListener("click", () => startLevel(level + 1));
  el.overRetry.addEventListener("click", () => startLevel(level));
  el.overMain.addEventListener("click", () => {
    const act = el.overMain.dataset.act;
    startLevel(act === "next" ? level + 1 : act === "first" ? 1 : level);
  });

  load();
  startLevel(level);
})();
