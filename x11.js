/* Multiply by 11 the mental way: keep the first and last digit, add each digit to its neighbour,
   carry 1 to the left when a sum reaches 10. Works for any whole number (the demo allows 1 to 100,000,000). */
(function (root) {
  function mulEleven(n) {
    var D = String(n).split("").map(Number), L = D.length, raw = [D[0]], i;
    for (i = 0; i < L - 1; i++) raw.push(D[i] + D[i + 1]);
    raw.push(D[L - 1]);
    var out = [], carry = 0, v;
    for (i = raw.length - 1; i >= 0; i--) { v = raw[i] + carry; out.unshift(v % 10); carry = Math.floor(v / 10); }
    if (carry) out.unshift(carry);
    return { digits: out, raw: raw, overflow: carry > 0, length: L };
  }
  if (typeof module !== "undefined" && module.exports) module.exports = { mulEleven: mulEleven };
  else root.mulEleven = mulEleven;
})(typeof window !== "undefined" ? window : this);
