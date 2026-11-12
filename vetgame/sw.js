/* Wild Case Files offline support: the game keeps working without a connection once it has been opened. */
const CACHE = "vetgame-v3";
const SHELL = ["./", "index.html", "app.css?v=1", "app.js?v=1", "manifest.webmanifest", "icon.svg", "icon-180.png", "icon-192.png", "icon-512.png",
  "../vet-game.css?v=9", "../vet-game.js?v=9",
  "../assets/vet/hedgehog-sick.svg", "../assets/vet/hedgehog-well.svg", "../assets/vet/rabbit-sick.svg", "../assets/vet/rabbit-well.svg",
  "../assets/vet/guineapig-sick.svg", "../assets/vet/guineapig-well.svg", "../assets/vet/kid2.svg", "../assets/vet/boy.svg", "../assets/vet/girl.svg", "../assets/vet/vet.svg"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("vetgame-") && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put("index.html", copy)); return res; })
        .catch(() => caches.match("index.html"))
    );
    return;
  }
  e.respondWith(
    caches.open(CACHE).then((c) =>
      c.match(req).then((hit) => {
        const net = fetch(req).then((res) => { if (res && res.ok) c.put(req, res.clone()); return res; }).catch(() => hit);
        return hit || net;
      })
    )
  );
});
