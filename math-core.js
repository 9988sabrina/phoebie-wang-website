(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.MathLab = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  function transformPair(a, b) {
    if (!Number.isInteger(a) || !Number.isInteger(b) || a % 2 !== 0) throw new Error("The factor being halved must be an even integer.");
    return [a / 2, b * 2];
  }
  function product(a, b) { return a * b; }
  function buildSteps(a, b, halvings) {
    if (!Number.isInteger(halvings) || halvings < 0) throw new Error("Halvings must be a non-negative integer.");
    const steps = [{ a, b, product: product(a, b) }];
    let currentA = a; let currentB = b;
    for (let i = 0; i < halvings; i += 1) { [currentA, currentB] = transformPair(currentA, currentB); steps.push({ a: currentA, b: currentB, product: product(currentA, currentB) }); }
    return steps;
  }
  const challengeTemplates = Object.freeze([
    { multiplier: 25, halvings: 2, factors: [16,20,24,28,32,36,44,52,56,64,72,84,96] },
    { multiplier: 50, halvings: 1, factors: [14,18,22,26,34,38,42,46,54,62,74,86] }
  ]);
  function generateChallenge(randomFn = Math.random) {
    const template = challengeTemplates[Math.min(challengeTemplates.length - 1, Math.floor(randomFn() * challengeTemplates.length))];
    const factor = template.factors[Math.min(template.factors.length - 1, Math.floor(randomFn() * template.factors.length))];
    return { id: `random-${factor}-${template.multiplier}`, a: factor, b: template.multiplier, answer: product(factor, template.multiplier), steps: buildSteps(factor, template.multiplier, template.halvings) };
  }
  class LessonState { constructor(maxStep) { this.maxStep = maxStep; this.step = 0; } next() { this.step = Math.min(this.maxStep, this.step + 1); return this.step; } previous() { this.step = Math.max(0, this.step - 1); return this.step; } replay() { this.step = 0; return this.step; } }
  return { transformPair, product, buildSteps, generateChallenge, LessonState, challengeTemplates };
});
