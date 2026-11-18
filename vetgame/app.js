(function(){
"use strict";
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function(){ navigator.serviceWorker.register("sw.js").catch(function(){}); });
}
var standalone = (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) || window.navigator.standalone === true;
var tip = document.getElementById("vinstallTip");
var seen = false;
try { seen = window.localStorage.getItem("vetInstallTipSeen") === "1"; } catch (e) {}
if (tip && !standalone && !seen) tip.hidden = false;
var btn = document.getElementById("vinstallClose");
if (btn) btn.addEventListener("click", function(){
  tip.hidden = true;
  try { window.localStorage.setItem("vetInstallTipSeen", "1"); } catch (e) {}
});
})();
