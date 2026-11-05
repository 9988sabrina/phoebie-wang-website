window.LEARNING_LAB_CONFIG = Object.freeze({
  previewMode: true,
  product: Object.freeze({
    name: "Double & Half Multiplication Practice Pack",
    price: "USD 4.99",
    status: "preview",
    previewPath: "assets/downloads/double-half-try-it-sheet.pdf",
    hostedProductUrl: "",
    pageCount: 10,
    license: "One household. Classroom use and commercial redistribution are not included."
  }),
  media: Object.freeze({ lessonVideoUrl: "", phoebieNarrationUrl: "" }),
  contact: Object.freeze({ publicEmail: "", responseTarget: "2-3 business days after launch" })
});

// Owner configuration hooks: fill these only after analytics and email privacy review.
// emailFormAction: HTTPS endpoint of the email provider's plain HTML form (also add that host to form-action in the CSP meta of index.html). Leave empty until the provider is approved: the homepage form stays switched off.
window.SITE_CONFIG = { ga4Id: "", emailEmbedHtml: "", emailFormAction: "" };
