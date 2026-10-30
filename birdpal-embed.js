/* Bird Pal facade: the app (and its microphone and fonts) loads only after the child taps. */
(function () {
  var btn = document.getElementById("bp-start"), screen = document.getElementById("bp-screen");
  if (!btn || !screen) return;
  btn.addEventListener("click", function () {
    var f = document.createElement("iframe");
    f.src = "birdpal/";
    f.title = "Bird Pal Buddies app";
    f.setAttribute("allow", "microphone");
    f.setAttribute("referrerpolicy", "same-origin");
    screen.textContent = "";
    screen.appendChild(f);
    f.focus();
  });
})();
