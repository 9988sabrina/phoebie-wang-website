window.LEARNING_LAB_CONFIG = Object.freeze({
  previewMode: true,
  product: Object.freeze({
    name: "Double & Half Multiplication Practice Pack",
    price: "USD 4.99",
    status: "preview",
    previewPath: "assets/downloads/double-half-try-it-sheet.pdf",
    hostedProductUrl: "",
    etsyUrl: "https://www.etsy.com/shop/PhoebieCreates",
    pageCount: 10,
    license: "One household. Classroom use and commercial redistribution are not included."
  }),
  media: Object.freeze({ lessonVideoUrl: "", phoebieNarrationUrl: "" }),
  contact: Object.freeze({ publicEmail: "", responseTarget: "Message the Etsy shop" })
});

// OWNER PLACEHOLDERS — leave the empty strings until the real values exist.
// Do not invent a form URL or an analytics ID.
//
// emailFormAction: PLACEHOLDER for the MailerLite or Kit (ConvertKit) hosted-form action URL (https://...).
//   While this stays "", the homepage email section stays hidden. There is no disabled form on the page.
//   When you paste a URL, also add that host to form-action in the Content-Security-Policy meta on index.html.
// emailEmbedHtml: PLACEHOLDER for a MailerLite or Kit embed snippet, if you use an embed instead of emailFormAction.
// ga4Id: PLACEHOLDER for the GA4 measurement ID (G-XXXXXXXX). While this stays "", do not inject a script.
//   The matching HTML comment in index.html is where the GA4 snippet goes.
window.SITE_CONFIG = {
  ga4Id: "",
  emailEmbedHtml: "",
  emailFormAction: ""
};
