/* Parking Jam: pure game logic (no DOM). Used by parking-jam.js and tested in tests/jam.test.js.
 * Vehicles sit on a grid and each has an arrow. Tap one and it drives straight out
 * if nothing is in the way, then parks in a bay. Waiting passengers board the parked
 * vehicle of their colour. A vehicle leaves when it is full. Fill all the bays with
 * vehicles nobody can board and the lot is jammed.
 *
 * Every level is generated so it can always be won: vehicles are placed one at a time,
 * and a new vehicle's exit lane may only cross vehicles that are NOT placed yet. So taking
 * them out in reverse placement order always works, and the passenger queue follows that
 * order (only lightly shuffled), so five bays are always enough for that route. */
(function (root) {
  "use strict";
  const COLORS = ["red", "blue", "green", "yellow", "pink"];
  const SLOT_COUNT = 5;

  function rng(seed) {
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function cellsOf(v) {
    const out = [];
    for (let i = 0; i < v.len; i++) out.push(v.horiz ? [v.x + i, v.y] : [v.x, v.y + i]);
    return out;
  }

  /* Cells in front of the vehicle, nearest first, up to the edge of the board. */
  function frontCells(v, w, h) {
    const out = [];
    if (v.horiz) {
      if (v.dir > 0) for (let x = v.x + v.len; x < w; x++) out.push([x, v.y]);
      else for (let x = v.x - 1; x >= 0; x--) out.push([x, v.y]);
    } else {
      if (v.dir > 0) for (let y = v.y + v.len; y < h; y++) out.push([v.x, y]);
      else for (let y = v.y - 1; y >= 0; y--) out.push([v.x, y]);
    }
    return out;
  }

  function levelSpec(level) {
    const L = Math.max(1, level | 0);
    const size = Math.min(8, 5 + Math.floor((L - 1) / 3));
    return {
      size,
      count: Math.min(Math.floor(size * size * 0.42), 5 + L * 2),
      colors: Math.min(COLORS.length, 3 + Math.floor(L / 3)),
      window: L < 3 ? 2 : L < 8 ? 3 : 4,
      busChance: Math.min(0.5, 0.18 + L * 0.03)
    };
  }

  function generate(level) {
    const spec = levelSpec(level);
    for (let attempt = 0; attempt < 60; attempt++) {
      const rand = rng(level * 7919 + attempt * 104729 + 17);
      const w = spec.size, h = spec.size;
      const occupied = new Set();
      const placed = [];
      let tries = 0;
      while (placed.length < spec.count && tries++ < 900) {
        const len = rand() < spec.busChance ? 3 : 2;
        const horiz = rand() < 0.5;
        const dir = rand() < 0.5 ? 1 : -1;
        const x = Math.floor(rand() * (horiz ? w - len + 1 : w));
        const y = Math.floor(rand() * (horiz ? h : h - len + 1));
        const v = { id: placed.length, color: COLORS[Math.floor(rand() * spec.colors)], x, y, len, horiz, dir, cap: len };
        if (cellsOf(v).some(([cx, cy]) => occupied.has(cx + "," + cy))) continue;
        // its exit lane must be free of vehicles placed earlier (later ones may block it)
        if (frontCells(v, w, h).some(([cx, cy]) => occupied.has(cx + "," + cy))) continue;
        cellsOf(v).forEach(([cx, cy]) => occupied.add(cx + "," + cy));
        placed.push(v);
      }
      if (placed.length < Math.max(4, Math.floor(spec.count * 0.75))) continue;
      const order = placed.map(v => v.id).reverse();
      // passenger queue: follow the removal order, shuffling vehicles' passengers inside small windows
      const queue = [];
      for (let i = 0; i < order.length; i += spec.window) {
        const chunk = [];
        order.slice(i, i + spec.window).forEach(id => {
          const v = placed[id];
          for (let k = 0; k < v.cap; k++) chunk.push(v.color);
        });
        for (let k = chunk.length - 1; k > 0; k--) {
          const j = Math.floor(rand() * (k + 1));
          [chunk[k], chunk[j]] = [chunk[j], chunk[k]];
        }
        queue.push(...chunk);
      }
      return { level, w, h, vehicles: placed, order, queue };
    }
    throw new Error("could not generate level " + level);
  }

  function newGame(level) {
    const g = generate(level);
    return {
      level: g.level, w: g.w, h: g.h,
      vehicles: g.vehicles,
      alive: g.vehicles.map(v => v.id),
      order: g.order.slice(),
      queue: g.queue.slice(),
      totalPassengers: g.queue.length,
      slots: new Array(SLOT_COUNT).fill(null),
      moves: 0,
      status: "play"
    };
  }

  function snapshot(s) {
    return { slots: s.slots.map(x => (x ? { id: x.id, color: x.color, cap: x.cap, boarded: x.boarded } : null)), queue: s.queue.slice() };
  }

  function blockerOf(s, v) {
    const cells = new Map();
    s.alive.forEach(id => {
      if (id !== v.id) cellsOf(s.vehicles[id]).forEach(([cx, cy]) => cells.set(cx + "," + cy, id));
    });
    for (const [cx, cy] of frontCells(v, s.w, s.h)) {
      const hit = cells.get(cx + "," + cy);
      if (hit !== undefined) return hit;
    }
    return -1;
  }

  function isFree(s, id) {
    return s.alive.includes(id) && blockerOf(s, s.vehicles[id]) === -1;
  }

  /* Tap a vehicle. Returns { type: "moved"|"blocked"|"full"|"ignored", ... }. */
  function tap(s, id) {
    if (s.status !== "play" || !s.alive.includes(id)) return { type: "ignored" };
    const v = s.vehicles[id];
    const blocker = blockerOf(s, v);
    if (blocker !== -1) return { type: "blocked", blocker };
    const free = s.slots.indexOf(null);
    if (free === -1) return { type: "full" };
    s.moves++;
    s.alive = s.alive.filter(x => x !== id);
    s.slots[free] = { id, color: v.color, cap: v.cap, boarded: 0 };
    const frames = [snapshot(s)];
    for (;;) {
      if (!s.queue.length) break;
      const slot = s.slots.findIndex(x => x && x.color === s.queue[0] && x.boarded < x.cap);
      if (slot === -1) break;
      s.queue.shift();
      s.slots[slot].boarded++;
      if (s.slots[slot].boarded === s.slots[slot].cap) {
        frames.push(snapshot(s));
        s.slots[slot] = null;
      }
      frames.push(snapshot(s));
    }
    if (!s.alive.length && s.slots.every(x => x === null) && !s.queue.length) s.status = "won";
    else if (s.slots.every(x => x !== null)) s.status = "lost";
    return { type: "moved", id, slot: free, frames, status: s.status, dist: frontCells(v, s.w, s.h).length };
  }

  /* A removable vehicle to suggest: next one on the known-good route. */
  function hint(s) {
    for (const id of s.order) if (s.alive.includes(id) && isFree(s, id)) return id;
    return -1;
  }

  const api = { COLORS, SLOT_COUNT, rng, cellsOf, frontCells, levelSpec, generate, newGame, tap, hint, isFree, blockerOf, snapshot };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.JamCore = api;
})(typeof window !== "undefined" ? window : globalThis);
