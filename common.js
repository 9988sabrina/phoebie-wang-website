(function () {
  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector("#site-nav");
  if (menuButton && nav) menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("open", !open);
  });
  const targets = {
    learn: "/lesson.html",
    product: "/product.html",
    play: "/play.html",
    tools: "/tools.html",
    reviews: "/reviews/index.html",
    best: "/best-ai-tools.html",
    projects: "/projects.html",
    about: "/about.html",
    newsletter: "/newsletter.html",
    disclosure: "/disclosure.html",
    go: ""
  };
  if (targets[document.body.dataset.page]) document.querySelectorAll(".site-nav a").forEach((link) => {
    const linkPath = new URL(link.href, window.location.href).pathname;
    if (linkPath === targets[document.body.dataset.page]) link.setAttribute("aria-current", "page");
  });
  document.querySelectorAll("[data-clear-progress]").forEach((button) => button.addEventListener("click", () => {
    localStorage.removeItem("phoebieplays-state-v2");
    localStorage.removeItem("phoebie-learning-progress-v1");
    localStorage.removeItem("phoebie-jam-level-v1");
    ["phoebie-jam-prefs-v1","phoebie-jam-daily-v1","phoebie-jam-stars-v1"].forEach((k) => localStorage.removeItem(k));
    button.textContent = "Local progress cleared";
  }));
  const form = document.getElementById("signup-form");
  const siteConfig = window.SITE_CONFIG || {};
  if (form && /^https:\/\//.test(siteConfig.emailFormAction || "")) {
    form.action = siteConfig.emailFormAction;
    form.noValidate = false;
    form.querySelectorAll("input,button").forEach((el) => { el.disabled = false; });
    const button = document.getElementById("signup-button");
    if (button) button.textContent = "Send me the page";
    const note = document.getElementById("signup-note");
    if (note) note.innerHTML = 'One email a week. See our <a href="privacy.html">privacy notice</a>.';
  } else if (form) {
    form.addEventListener("submit", (event) => event.preventDefault());
  }
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
