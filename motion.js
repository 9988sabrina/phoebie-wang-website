(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("motion");

  if (!reduce) {
    document.querySelectorAll(".is-cta").forEach(function (btn) {
      if (btn.querySelector(".cta-shine")) return;
      var shine = document.createElement("span");
      shine.className = "cta-shine";
      shine.setAttribute("aria-hidden", "true");
      btn.appendChild(shine);
    });
  }

  var nodes = Array.prototype.slice.call(document.querySelectorAll(
    "main > section, main > .h-star, main > .playband, .offer-card, .comics figure, .tile, .work-row > a, .shop .row, .feature-card"
  )).filter(function (el) {
    return !el.closest(".home-hero") && !el.hidden && el.id !== "signup";
  });

  if (!reduce && "IntersectionObserver" in window) {
    var groups = new Map();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });

    nodes.forEach(function (el) {
      var parent = el.parentElement;
      var index = groups.get(parent) || 0;
      groups.set(parent, index + 1);
      el.style.setProperty("--reveal-delay", Math.min(index, 4) * 70 + "ms");
      var rect = el.getBoundingClientRect();
      var seen = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
      el.classList.add("reveal");
      if (seen) el.classList.add("is-in");
      else io.observe(el);
    });
  }

  document.querySelectorAll(".flip-card").forEach(function (card) {
    card.addEventListener("click", function () {
      var on = card.classList.toggle("is-flipped");
      card.setAttribute("aria-pressed", on ? "true" : "false");
    });
  });

  var stroke = document.querySelector("[data-stroke]");
  if (!stroke || reduce) return;
  var stage = stroke.querySelector(".stroke-stage");
  var again = document.getElementById("stroke-again");
  var writer = null;
  var queued = false;

  function play() {
    if (!writer) { queued = true; return; }
    writer.animateCharacter();
  }

  function boot() {
    if (stroke.dataset.loaded) return;
    stroke.dataset.loaded = "1";
    var script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/hanzi-writer@3.6.1/dist/hanzi-writer.min.js";
    script.async = true;
    script.onload = function () {
      if (!window.HanziWriter || !stage) return;
      try {
        writer = window.HanziWriter.create(stage, stroke.getAttribute("data-stroke"), {
          width: 200,
          height: 200,
          padding: 12,
          showOutline: true,
          showCharacter: false,
          strokeAnimationSpeed: 0.9,
          delayBetweenStrokes: 280,
          strokeColor: "#14213D",
          outlineColor: "#E4C7C4",
          radicalColor: "#D62839",
          charDataLoader: function (char, onLoad, onErr) {
            fetch("https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/" + encodeURIComponent(char) + ".json")
              .then(function (res) { if (!res.ok) throw new Error("char"); return res.json(); })
              .then(function (data) { stage.classList.add("is-drawn"); onLoad(data); })
              .catch(function (err) { if (onErr) onErr(err); });
          }
        });
      } catch (err) { return; }
      if (again) again.textContent = "Watch the strokes again";
      play();
    };
    document.head.appendChild(script);
  }

  if (again) again.addEventListener("click", function () { boot(); play(); });

  if (!("IntersectionObserver" in window)) { boot(); return; }
  var watch = new IntersectionObserver(function (entries) {
    if (!entries.some(function (entry) { return entry.isIntersecting; })) return;
    watch.disconnect();
    boot();
  }, { rootMargin: "160px" });
  watch.observe(stroke);
})();
