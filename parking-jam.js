/* Parking Jam UI. Game rules live in parking-jam-core.js. No network, no third-party code. */
(function () {
  "use strict";
  const J = window.JamCore;
  const NAVY = "#14213D";
  const KEY = "phoebie-jam-level-v1";
  const KEY_PREFS = "phoebie-jam-prefs-v1";
  const KEY_DAILY = "phoebie-jam-daily-v1";
  const KEY_STARS = "phoebie-jam-stars-v1";
  const MAX_LEVEL = 60;
  const COLOR = {
    red:    { fill: "#E5383B", name: "red",    zh: "红色", shape: "circle",   note: 0 },
    blue:   { fill: "#2F80ED", name: "blue",   zh: "蓝色", shape: "square",   note: 1 },
    green:  { fill: "#2BB673", name: "green",  zh: "绿色", shape: "triangle", note: 2 },
    yellow: { fill: "#FFC933", name: "yellow", zh: "黄色", shape: "star",     note: 3 },
    pink:   { fill: "#FF7EB6", name: "pink",   zh: "粉色", shape: "heart",    note: 4 }
  };
  const SHAPES = {
    circle: '<circle cx="10" cy="10" r="6.5"/>',
    square: '<rect x="3.800" y="3.800" width="12.400" height="12.400" rx="2"/>',
    triangle: '<path d="M10 3 L17.200 16.400 H2.800 Z" stroke-linejoin="round"/>',
    star: '<path d="M10 1.800l2.500 5.200 5.700.8-4.100 4 1 5.700L10 14.800 4.900 17.500l1-5.700-4.100-4 5.700-.8z" stroke-linejoin="round"/>',
    heart: '<path d="M10 17.200C3 12.200 1.800 6.200 5.800 5c1.900-.5 3.300.6 4.200 2 .9-1.400 2.300-2.500 4.200-2 4 1.200 2.800 7.200-4.200 12.200z" stroke-linejoin="round"/>'
  };

  /* ---------- text in two languages ---------- */
  const T = {
    en: {
      tapClear: "Tap a car with a clear road ahead.",
      levelStart: (n, c) => "Level " + n + ". " + c + " vehicles to clear.",
      blocked: "Blocked! The glowing vehicle is in the way.",
      full: "All bays are full.",
      zoom: (n) => "Zoom! " + n + (n === 1 ? " vehicle" : " vehicles") + " left.",
      hint: "Try the glowing vehicle.",
      undone: "Undone. Try a different car.",
      cleared: "Level cleared!",
      jammed: "Jammed. Undo or try a different order.",
      won: (n) => n >= MAX_LEVEL ? "You cleared every level!" : "Level " + n + " cleared!",
      wonDaily: "Today's Jam solved!",
      wonText: (v, p, helps) => "You parked " + v + " vehicles and carried " + p + " passengers. " + (helps === 0 ? "No hints, no undos. Perfect planning!" : helps <= 2 ? "Only " + helps + (helps === 1 ? " helper" : " helpers") + " used. Try it with none!" : helps + " helpers used. Plan the colours first next time."),
      lostTitle: "The lot is jammed!",
      lostText: "All five bays hold cars that nobody in the queue can board. Undo your last move, or look at who is first in line and free that colour.",
      next: "Next level", first: "Back to level 1", again: "Play again", retry: "Try again", undoBtn: "Undo last move",
      share: "Share", copied: "Copied! Paste it anywhere.",
      shareText: (n, stars, daily) => (daily ? "I solved Today's Parking Jam" : "I cleared level " + n + " of Parking Jam") + " with " + stars + "/3 stars. Can you? https://www.phoebiewang.com/parking-jam.html",
      dailyLabel: "Today", dailyDone: "Today's Jam done ✓",
      skip: "Skip this level", skipped: "Skipped. The next level is open.",
      mapTitle: "Level map", mapSum: (c, st) => c + "/" + MAX_LEVEL + " levels · " + st + " stars",
      codeTitle: "Progress code", codeHelp: "Copy this code to keep your progress, or paste one here to restore it on another device.", codeBad: "That code did not work.", codeOk: "Progress restored!",
      rules: ["<strong>Tap a car</strong> and it drives the way its arrow points. If another car is in the way it just wiggles.", "<strong>Parked cars fill up.</strong> Passengers join the car with the same colour and shape. A full car drives away.", "<strong>Keep a bay free.</strong> If all five bays hold cars that nobody can board, the lot is jammed. Undo and think ahead!"],
      starsRule: "Stars: 3 for no hints and no undos, 2 for one or two, 1 otherwise. Bumping into a car is free, so explore!",
      coach: {
        1: [
          { when: "start", text: "Hi! The red car's arrow points down and the road is clear. Tap the red car.", target: 1 },
          { when: "blocked", text: "Blocked! The red car is in the way. Move the red car first.", target: 1 },
          { when: "moved", text: "It parked in a bay, and two red passengers hopped on. Full car, off it goes! Now tap the blue car.", target: 0 },
          { when: "done", text: "Level cleared! You've got it." }
        ],
        2: [
          { when: "start", text: "Passengers board in order. Blue is first in line, so find a blue car and tap it.", target: 1 },
          { when: "wrong", text: "That car parked, but nobody in line wants it yet. It is taking up a bay! Blue is still first.", target: 1 },
          { when: "moved", text: "Blue is boarding. Keep going: always look at who is first in line." },
          { when: "done", text: "You cleared it! Five bays is all you get, so parked cars that nobody wants are the trap." }
        ],
        3: [
          { when: "start", text: "Now a real one. Hint and Undo are free to use while you learn. Go!" }
        ]
      }
    },
    zh: {
      tapClear: "点一辆前面没有车的车。",
      levelStart: (n, c) => "第 " + n + " 关，共 " + c + " 辆车。",
      blocked: "堵住了！发光的那辆车挡在前面。",
      full: "车位全满了。",
      zoom: (n) => "嗖！还剩 " + n + " 辆车。",
      hint: "试试发光的那辆车。",
      undone: "已撤销，换一辆试试。",
      cleared: "过关！",
      jammed: "堵死了。撤销一步，或者换个顺序。",
      won: (n) => n >= MAX_LEVEL ? "全部通关！" : "第 " + n + " 关过关！",
      wonDaily: "今日一题完成！",
      wonText: (v, p, helps) => "你停好了 " + v + " 辆车，送走了 " + p + " 位乘客。" + (helps === 0 ? "没用提示也没撤销，完美！" : helps <= 2 ? "只用了 " + helps + " 次帮助，下次试试不用！" : "用了 " + helps + " 次帮助，下次先看队伍里的颜色。"),
      lostTitle: "停车场堵死了！",
      lostText: "五个车位都停着没人要上的车。撤销上一步，或者看看排在最前面的是什么颜色，先放那辆车出来。",
      next: "下一关", first: "回到第 1 关", again: "再玩一次", retry: "再试一次", undoBtn: "撤销上一步",
      share: "分享", copied: "已复制，随便贴到哪里。",
      shareText: (n, stars, daily) => (daily ? "我解开了今天的 Parking Jam" : "我过了 Parking Jam 第 " + n + " 关") + "，拿到 " + stars + "/3 星。你行吗？ https://www.phoebiewang.com/parking-jam.html",
      dailyLabel: "今日一题", dailyDone: "今日一题已完成 ✓",
      skip: "跳过这一关", skipped: "已跳过，下一关打开了。",
      mapTitle: "关卡地图", mapSum: (c, st) => "已过 " + c + "/" + MAX_LEVEL + " 关 · " + st + " 颗星",
      codeTitle: "进度码", codeHelp: "复制这串码就能保存进度，在别的设备粘贴即可恢复。", codeBad: "这串码不对。", codeOk: "进度已恢复！",
      rules: ["<strong>点一辆车</strong>，它会朝箭头方向开。前面有车挡着，它只会晃一下。", "<strong>停好的车会上人。</strong>乘客只上同颜色、同形状的车，坐满就开走。", "<strong>留一个空车位。</strong>五个车位都停着没人要上的车，就堵死了。撤销一步，想好再点！"],
      starsRule: "星星：不用提示不撤销 3 星，用一两次 2 星，其余 1 星。撞车不扣分，放心试！",
      coach: {
        1: [
          { when: "start", text: "你好！红车的箭头朝下，前面没有车。点一下红车。", target: 1 },
          { when: "blocked", text: "堵住了！红车挡在前面。先让红车走。", target: 1 },
          { when: "moved", text: "红车停进车位，两位红色乘客上车，坐满就开走了！现在点蓝车。", target: 0 },
          { when: "done", text: "过关！你学会了。" }
        ],
        2: [
          { when: "start", text: "乘客按顺序上车。排第一的是蓝色，找一辆蓝车点一下。", target: 1 },
          { when: "wrong", text: "这辆车停好了，可是队伍里没人要上它，白占一个车位！排第一的还是蓝色。", target: 1 },
          { when: "moved", text: "蓝色乘客上车了。继续：永远先看排第一的是谁。" },
          { when: "done", text: "过关！车位只有五个，没人要上的车就是陷阱。" }
        ],
        3: [
          { when: "start", text: "来一关真的。学习的时候提示和撤销随便用。开始！" }
        ]
      }
    }
  };

  const $ = (id) => document.getElementById(id);
  const el = {};
  ["board", "queue", "bays", "qcount", "level", "left", "msg", "overlay", "stars", "over-title", "over-text", "over-main", "over-retry", "over-undo", "over-share", "prev", "next", "hint", "restart", "undo", "sound", "lang", "daily", "track", "coach", "coach-text", "coach-skip", "rules", "stars-rule", "levelbox", "mode", "map", "map-toggle", "map-sum", "over-skip", "confetti", "code", "code-out", "code-in", "code-apply", "code-msg"].forEach((k) => { el[k.replace(/-([a-z])/g, (m, c) => c.toUpperCase())] = $("jam-" + k); });

  let prefs = { sound: true, lang: "en", tutorialDone: false };
  let unlocked = 1, level = 1, state = null, hinted = -1, mode = "level";
  let helps = 0, history = [], coachSteps = [], coachIdx = -1;
  let stars = {}, jams = {};
  let play = { timers: [], final: null };
  const vehEls = new Map();
  let lastBayIds = [];
  const t = () => T[prefs.lang];

  /* ---------- storage ---------- */
  function load() {
    try {
      const n = parseInt(localStorage.getItem(KEY), 10); if (n >= 1) unlocked = Math.min(n, MAX_LEVEL);
      const p = JSON.parse(localStorage.getItem(KEY_PREFS) || "{}"); prefs = Object.assign(prefs, p);
      stars = JSON.parse(localStorage.getItem(KEY_STARS) || "{}") || {};
    } catch (e) { /* storage unavailable */ }
    if (!/^(en|zh)$/.test(prefs.lang)) prefs.lang = "en";
    level = unlocked;
  }
  function save() { try { localStorage.setItem(KEY, String(unlocked)); localStorage.setItem(KEY_PREFS, JSON.stringify(prefs)); localStorage.setItem(KEY_STARS, JSON.stringify(stars)); } catch (e) { /* ignore */ } }
  function dailyRecord() { try { return JSON.parse(localStorage.getItem(KEY_DAILY) || "null"); } catch (e) { return null; } }

  /* ---------- sound: tiny synthesized cues, nothing downloaded ---------- */
  let ctx = null;
  function audio() {
    if (!prefs.sound) return null;
    try { if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)(); if (ctx.state === "suspended") ctx.resume(); return ctx; } catch (e) { return null; }
  }
  function tone(freq, dur, type, gain, when) {
    const c = audio(); if (!c) return;
    const o = c.createOscillator(), g = c.createGain(), t0 = c.currentTime + (when || 0);
    o.type = type || "sine"; o.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(gain || 0.12, t0 + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(c.destination); o.start(t0); o.stop(t0 + dur + 0.02);
  }
  const SFX = {
    whoosh() { const c = audio(); if (!c) return; const o = c.createOscillator(), g = c.createGain(), t0 = c.currentTime; o.type = "sawtooth"; o.frequency.setValueAtTime(180, t0); o.frequency.exponentialRampToValueAtTime(620, t0 + 0.28); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.06, t0 + 0.03); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.32); o.connect(g).connect(c.destination); o.start(t0); o.stop(t0 + 0.35); },
    board(i) { tone([523, 587, 659, 784, 880][i % 5], 0.14, "triangle", 0.1); },
    full() { tone(659, 0.1, "triangle", 0.1); tone(988, 0.16, "triangle", 0.1, 0.09); },
    bump() { tone(140, 0.12, "square", 0.05); },
    thud() { tone(110, 0.35, "sine", 0.14); tone(82, 0.5, "sine", 0.12, 0.12); },
    win() { [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.22, "triangle", 0.1, i * 0.11)); },
    undo() { tone(440, 0.08, "sine", 0.06); tone(330, 0.1, "sine", 0.06, 0.07); }
  };
  function confetti() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.confetti.textContent = "";
    const cols = ["#E5383B", "#2F80ED", "#2BB673", "#FFC933", "#FF7EB6"];
    for (let i = 0; i < 36; i++) {
      const p = document.createElement("i");
      p.style.left = (Math.random() * 100) + "%";
      p.style.background = cols[i % 5];
      p.style.animationDelay = (Math.random() * 0.6) + "s";
      p.style.animationDuration = (1.6 + Math.random()) + "s";
      p.style.transform = "rotate(" + (Math.random() * 360) + "deg)";
      el.confetti.appendChild(p);
    }
    setTimeout(() => { el.confetti.textContent = ""; }, 3000);
  }
  function buzz(ms) { try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) { /* ignore */ } }

  /* ---------- drawing ---------- */
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
    const rear = 62;
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
      if (!state.alive.includes(v.id)) return;
      const b = document.createElement("button");
      b.type = "button"; b.className = "veh";
      b.style.left = (v.x / state.w * 100) + "%"; b.style.top = (v.y / state.h * 100) + "%";
      b.style.width = ((v.horiz ? v.len : 1) / state.w * 100) + "%"; b.style.height = ((v.horiz ? 1 : v.len) / state.h * 100) + "%";
      b.setAttribute("aria-label", label(v));
      b.innerHTML = vehicleSVG(v, true);
      b.addEventListener("click", () => onTap(v.id));
      el.board.appendChild(b);
      vehEls.set(v.id, b);
    });
  }
  function renderSide(frame, animate) {
    el.queue.textContent = "";
    const shown = frame.queue.slice(0, 10);
    shown.forEach((col, i) => {
      const p = document.createElement("span");
      p.className = "pax" + (i === 0 ? " front" : "");
      p.style.setProperty("--c", COLOR[col].fill);
      p.innerHTML = mark(COLOR[col].shape, "#fff", 18);
      el.queue.appendChild(p);
    });
    if (frame.queue.length > shown.length) { const m = document.createElement("span"); m.className = "pax-more"; m.textContent = "+" + (frame.queue.length - shown.length); el.queue.appendChild(m); }
    el.qcount.textContent = frame.queue.length ? "(" + frame.queue.length + ")" : "";
    el.bays.textContent = "";
    const ids = [];
    const head = frame.queue[0];
    frame.slots.forEach((s, i) => {
      const bay = document.createElement("div");
      bay.className = "bay" + (s ? " has" : "");
      ids.push(s ? s.id : -1);
      if (s) {
        const v = state.vehicles[s.id];
        bay.style.setProperty("--c", COLOR[v.color].fill);
        let dots = "";
        for (let k = 0; k < s.cap; k++) dots += '<i class="' + (k < s.boarded ? "on" : "") + '"></i>';
        bay.innerHTML = '<span class="sprite-wrap">' + vehicleSVG({ len: v.len, color: v.color, dir: 1, horiz: true }, false).replace("<svg ", '<svg class="sprite" ') + '</span><span class="dots">' + dots + "</span>";
        bay.setAttribute("aria-label", "Bay " + (i + 1) + ": " + COLOR[v.color].name + " " + (v.len === 3 ? "bus" : "car") + ", " + s.boarded + " of " + s.cap + " passengers");
        if (s.color === head && s.boarded < s.cap) bay.classList.add("wanted");
        if (animate && lastBayIds[i] !== s.id) bay.classList.add("pop");
      } else bay.setAttribute("aria-label", "Bay " + (i + 1) + ": empty");
      el.bays.appendChild(bay);
    });
    lastBayIds = ids;
    el.left.textContent = frame.alive !== undefined ? frame.alive : (state ? state.alive.length : 0);
  }
  function renderMap() {
    el.map.textContent = "";
    let cleared = 0, total = 0;
    for (let i = 1; i <= MAX_LEVEL; i++) {
      const b = document.createElement("button");
      b.type = "button";
      const st = stars[i] || 0;
      const open = i <= unlocked;
      if (st) { cleared++; total += st; }
      b.className = "map-chip" + (open ? "" : " locked") + (i === level && mode === "level" ? " here" : "");
      b.disabled = !open;
      b.innerHTML = "<b>" + i + "</b><i>" + (st ? "★".repeat(st) : open ? "" : "🔒") + "</i>";
      b.setAttribute("aria-label", "Level " + i + (st ? ", " + st + " stars" : open ? ", not cleared yet" : ", locked"));
      b.addEventListener("click", () => { startLevel(i); el.map.parentElement.open = false; });
      el.map.appendChild(b);
    }
    el.mapSum.textContent = t().mapSum(cleared, total);
    el.codeOut.value = btoa(JSON.stringify({ u: unlocked, s: stars }));
  }
  function renderTrack() {
    const n = starsFor(helps);
    el.track.innerHTML = "";
    for (let i = 0; i < 3; i++) { const s = document.createElement("span"); s.textContent = i < n ? "★" : "☆"; s.className = i < n ? "on" : ""; el.track.appendChild(s); }
    el.track.setAttribute("aria-label", n + " of 3 stars on track");
  }
  function starsFor(h) { return h === 0 ? 3 : h <= 2 ? 2 : 1; }
  function setMsg(s) { el.msg.textContent = s; }
  function clearHint() { if (hinted >= 0 && vehEls.get(hinted)) vehEls.get(hinted).classList.remove("hint"); hinted = -1; }
  function updateTop() {
    el.level.textContent = mode === "daily" ? t().dailyLabel : level;
    el.prev.disabled = mode === "daily" || level <= 1;
    el.next.disabled = mode === "daily" || level >= unlocked || level >= MAX_LEVEL;
    el.undo.disabled = !history.length || !state || state.status !== "play";
    el.mode.textContent = mode === "daily" ? (prefs.lang === "zh" ? "今日一题 · 每天一道新谜题" : "Today's Jam · a new puzzle every day") : "";
    const rec = dailyRecord();
    el.daily.textContent = rec && rec.seed === J.dailySeed() ? t().dailyDone : (prefs.lang === "zh" ? "今日一题" : "Today's Jam");
    renderTrack();
  }
  function applyLang() {
    document.documentElement.lang = prefs.lang === "zh" ? "zh-CN" : "en";
    el.lang.textContent = prefs.lang === "zh" ? "EN" : "中文";
    el.lang.setAttribute("aria-label", prefs.lang === "zh" ? "Switch to English" : "切换到中文");
    el.rules.innerHTML = t().rules.map((r) => "<li>" + r + "</li>").join("");
    el.starsRule.textContent = t().starsRule;
    el.hint.textContent = prefs.lang === "zh" ? "提示" : "Hint";
    el.restart.textContent = prefs.lang === "zh" ? "重来" : "Restart";
    el.undo.textContent = prefs.lang === "zh" ? "撤销" : "Undo";
    el.overUndo.textContent = t().undoBtn;
    el.overShare.textContent = t().share;
    el.coachSkip.textContent = prefs.lang === "zh" ? "跳过教程" : "Skip tutorial";
    el.overSkip.textContent = t().skip;
    el.mapToggle.textContent = t().mapTitle;
    el.codeApply.textContent = prefs.lang === "zh" ? "恢复" : "Restore";
    document.getElementById("jam-code-title").textContent = t().codeTitle;
    document.getElementById("jam-code-help").textContent = t().codeHelp;
    renderMap();
    el.sound.setAttribute("aria-label", prefs.sound ? (prefs.lang === "zh" ? "关闭声音" : "Mute sounds") : (prefs.lang === "zh" ? "打开声音" : "Unmute sounds"));
    el.sound.textContent = prefs.sound ? "🔔" : "🔕";
    el.sound.setAttribute("aria-pressed", String(prefs.sound));
  }

  /* ---------- coach (tutorial) ---------- */
  function coachShow(step) {
    if (!step) return;
    clearHint();
    el.coach.hidden = false;
    el.coachText.textContent = step.text;
    if (step.target !== undefined && vehEls.get(step.target)) { hinted = step.target; vehEls.get(step.target).classList.add("hint"); }
  }
  function coachEvent(kind) {
    if (!coachSteps.length) return false;
    const step = coachSteps.find((s) => s.when === kind);
    if (!step) return false;
    coachShow(step);
    return true;
  }
  function coachEnd() { el.coach.hidden = true; coachSteps = []; }

  /* ---------- animation of boarding frames ---------- */
  function finishPlay() { play.timers.forEach(clearTimeout); play.timers = []; if (play.final) { renderSide(play.final); play.final = null; } }
  function startPlay(frames) {
    finishPlay();
    play.final = frames[frames.length - 1];
    let prevQ = frames[0].queue.length;
    frames.forEach((f, i) => play.timers.push(setTimeout(() => {
      renderSide(f, true);
      if (i > 0) {
        if (f.queue.length < prevQ) { const col = frames[i - 1].queue[0]; if (col) SFX.board(COLOR[col].note); }
        const gone = frames[i - 1].slots.some((s, k) => s && !f.slots[k]);
        if (gone) SFX.full();
        prevQ = f.queue.length;
      }
      if (i === frames.length - 1) play.final = null;
    }, 420 + i * 260)));
    play.timers.push(setTimeout(showEnd, 420 + frames.length * 260 + 120));
  }

  function showEnd() {
    if (!state || state.status === "play") return;
    el.overlay.hidden = false;
    el.overUndo.hidden = true; el.overShare.hidden = true; el.overSkip.hidden = true;
    if (state.status === "won") {
      SFX.win();
      const n = starsFor(helps);
      if (mode === "daily") {
        try { localStorage.setItem(KEY_DAILY, JSON.stringify({ seed: state.daily, stars: n })); } catch (e) { /* ignore */ }
      } else { if (n > (stars[level] || 0)) stars[level] = n; if (level < MAX_LEVEL && unlocked < level + 1) unlocked = level + 1; if (level >= 3) prefs.tutorialDone = true; save(); }
      confetti();
      el.stars.textContent = "★".repeat(n) + "☆".repeat(3 - n);
      el.stars.className = "jam-stars shine";
      el.overTitle.textContent = mode === "daily" ? t().wonDaily : t().won(level);
      el.overText.textContent = t().wonText(state.vehicles.length, state.totalPassengers, helps);
      el.overMain.textContent = mode === "daily" ? (prefs.lang === "zh" ? "回到关卡" : "Back to levels") : level >= MAX_LEVEL ? t().first : t().next;
      el.overMain.dataset.act = mode === "daily" ? "levels" : level >= MAX_LEVEL ? "first" : "next";
      el.overRetry.hidden = false; el.overRetry.textContent = t().again;
      el.overShare.hidden = !(navigator.share || navigator.clipboard);
      coachEvent("done");
      setMsg(t().cleared);
    } else {
      SFX.thud(); buzz([60, 40, 60]);
      el.stars.textContent = ""; el.stars.className = "jam-stars";
      el.overTitle.textContent = t().lostTitle;
      el.overText.textContent = t().lostText;
      el.overMain.textContent = t().retry; el.overMain.dataset.act = "retry";
      el.overRetry.hidden = true;
      el.overUndo.hidden = !history.length;
      if (mode === "level") { jams[level] = (jams[level] || 0) + 1; el.overSkip.hidden = !(jams[level] >= 3 && level < MAX_LEVEL); }
      document.querySelectorAll(".bay").forEach((b) => b.classList.add("jam"));
      setMsg(t().jammed);
    }
    updateTop(); renderMap();
    (el.overUndo.hidden ? el.overMain : el.overUndo).focus();
  }

  /* ---------- actions ---------- */
  function onTap(id) {
    if (!state || state.status !== "play") return;
    clearHint();
    const b = vehEls.get(id), v = state.vehicles[id];
    const snap = J.save(state);
    const r = J.tap(state, id);
    if (r.type === "blocked") {
      SFX.bump(); buzz(30);
      b.classList.remove("bump"); void b.offsetWidth;
      b.style.setProperty("--d", v.dir); b.classList.add("bump", v.horiz ? "dir-x" : "dir-y");
      const bl = vehEls.get(r.blocker);
      if (bl) { bl.classList.remove("blocker"); void bl.offsetWidth; bl.classList.add("blocker"); setTimeout(() => bl.classList.remove("blocker"), 1500); }
      if (!coachEvent("blocked")) setMsg(t().blocked);
      return;
    }
    if (r.type === "full") { setMsg(t().full); return; }
    if (r.type !== "moved") return;
    history.push(snap);
    SFX.whoosh();
    b.classList.add("driving");
    const sh = (r.dist + v.len) / v.len * 100 * v.dir;
    b.style.transform = v.horiz ? "translate(" + sh + "%,0)" : "translate(0," + sh + "%)";
    setTimeout(() => { b.remove(); vehEls.delete(id); }, 700);
    startPlay(r.frames);
    updateTop();
    if (state.status === "play") {
      const boarded = r.frames.length > 1;
      if (!(boarded ? coachEvent("moved") : coachEvent("wrong"))) setMsg(t().zoom(state.alive.length));
    } else setMsg("");
  }
  function undo() {
    if (!history.length || !state) return;
    finishPlay();
    J.restore(state, history.pop());
    helps++;
    SFX.undo();
    el.overlay.hidden = true;
    document.querySelectorAll(".bay").forEach((b) => b.classList.remove("jam"));
    buildBoard();
    renderSide(J.snapshot(state));
    updateTop();
    setMsg(t().undone);
    if (coachSteps.length) coachEvent("start");
  }
  function startLevel(n) {
    finishPlay(); clearHint();
    mode = "level";
    level = Math.max(1, Math.min(MAX_LEVEL, n));
    state = J.newGame(level);
    begin();
  }
  function startDaily() {
    finishPlay(); clearHint();
    mode = "daily";
    state = J.newDaily();
    level = state.level;
    begin();
  }
  function begin() {
    helps = 0; history = []; hinted = -1; lastBayIds = [];
    el.overlay.hidden = true;
    buildBoard();
    renderSide(J.snapshot(state));
    renderMap();
    coachSteps = (mode === "level" && !prefs.tutorialDone && t().coach[level]) ? t().coach[level] : [];
    el.coach.hidden = true;
    updateTop();
    setMsg(mode === "daily" ? t().levelStart(level, state.vehicles.length) : level === 1 ? t().tapClear : t().levelStart(level, state.vehicles.length));
    if (!coachEvent("start") && coachSteps.length === 0) el.coach.hidden = true;
  }

  el.hint.addEventListener("click", () => {
    if (!state || state.status !== "play") return;
    clearHint();
    const id = J.hint(state);
    if (id < 0) return;
    hinted = id; helps++;
    vehEls.get(id).classList.add("hint");
    updateTop();
    setMsg(t().hint);
  });
  el.undo.addEventListener("click", undo);
  el.overUndo.addEventListener("click", undo);
  el.restart.addEventListener("click", () => (mode === "daily" ? startDaily() : startLevel(level)));
  el.prev.addEventListener("click", () => startLevel(level - 1));
  el.next.addEventListener("click", () => startLevel(level + 1));
  el.daily.addEventListener("click", startDaily);
  el.overRetry.addEventListener("click", () => (mode === "daily" ? startDaily() : startLevel(level)));
  el.overMain.addEventListener("click", () => {
    const act = el.overMain.dataset.act;
    if (act === "levels") startLevel(unlocked);
    else startLevel(act === "next" ? level + 1 : act === "first" ? 1 : level);
  });
  el.overShare.addEventListener("click", async () => {
    const text = t().shareText(level, starsFor(helps), mode === "daily");
    try {
      if (navigator.share) await navigator.share({ text });
      else { await navigator.clipboard.writeText(text); el.overShare.textContent = t().copied; setTimeout(() => { el.overShare.textContent = t().share; }, 2500); }
    } catch (e) { /* user cancelled */ }
  });
  el.overSkip.addEventListener("click", () => { if (level < MAX_LEVEL) { unlocked = Math.max(unlocked, level + 1); save(); startLevel(level + 1); setMsg(t().skipped); } });
  el.codeApply.addEventListener("click", () => {
    try {
      const o = JSON.parse(atob(el.codeIn.value.trim()));
      if (!o || !(o.u >= 1 && o.u <= MAX_LEVEL)) throw new Error("bad");
      unlocked = o.u; stars = (o.s && typeof o.s === "object") ? o.s : {}; save();
      el.codeMsg.textContent = t().codeOk; el.codeIn.value = ""; startLevel(unlocked);
    } catch (e) { el.codeMsg.textContent = t().codeBad; }
  });
  el.codeOut.addEventListener("focus", () => el.codeOut.select());
  el.sound.addEventListener("click", () => { prefs.sound = !prefs.sound; save(); applyLang(); if (prefs.sound) SFX.full(); });
  el.lang.addEventListener("click", () => { prefs.lang = prefs.lang === "zh" ? "en" : "zh"; save(); applyLang(); updateTop(); if (state && state.status === "play") setMsg(t().tapClear); if (coachSteps.length) { coachSteps = t().coach[level] || []; coachEvent("start"); } });
  el.coachSkip.addEventListener("click", () => { prefs.tutorialDone = true; save(); coachEnd(); clearHint(); setMsg(t().tapClear); });
  document.addEventListener("keydown", (e) => { if ((e.ctrlKey || e.metaKey) && e.key === "z") { e.preventDefault(); undo(); } });

  load();
  applyLang();
  startLevel(level);
})();
