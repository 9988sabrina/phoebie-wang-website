(function () {
  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector("#site-nav");
  if (menuButton && nav) menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("open", !open);
  });
  const targets = { learn: "lesson.html", product: "product.html", play: "play.html" };
  if (targets[document.body.dataset.page]) document.querySelectorAll(".site-nav a").forEach((link) => {
    if (link.getAttribute("href") === targets[document.body.dataset.page]) link.setAttribute("aria-current", "page");
  });
  document.querySelectorAll("[data-clear-progress]").forEach((button) => button.addEventListener("click", () => {
    localStorage.removeItem("phoebieplays-state-v2");
    localStorage.removeItem("phoebie-learning-progress-v1");
    button.textContent = "Local progress cleared";
  }));
  const config = window.LEARNING_LAB_CONFIG;
  if (!config) return;
  document.querySelectorAll("[data-product-name]").forEach((el) => { el.textContent = config.product.name; });
  document.querySelectorAll("[data-product-price]").forEach((el) => { el.textContent = config.product.price; });
  document.querySelectorAll("[data-product-pages]").forEach((el) => { el.textContent = String(config.product.pageCount); });
  document.querySelectorAll("[data-product-license]").forEach((el) => { el.textContent = config.product.license; });
  document.querySelectorAll("[data-preview-link]").forEach((el) => { el.setAttribute("href", config.product.previewPath); });
  document.querySelectorAll("[data-buy-button]").forEach((button) => {
    const ready = config.product.status === "available" && /^https:\/\//.test(config.product.hostedProductUrl);
    if (ready) { button.href = config.product.hostedProductUrl; button.textContent = "Buy on Payhip"; button.removeAttribute("aria-disabled"); }
    else { button.removeAttribute("href"); button.setAttribute("aria-disabled", "true"); button.textContent = "Coming soon — parent review needed"; button.addEventListener("click", (event) => event.preventDefault()); }
  });
  const contact = document.querySelector("[data-contact]");
  if (contact && config.contact.publicEmail) { contact.textContent = config.contact.publicEmail; contact.href = `mailto:${config.contact.publicEmail}`; contact.classList.remove("contact-placeholder"); }
})();
