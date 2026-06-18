const playfield = document.querySelector("#playfield");
const startBtn = document.querySelector("#startBtn");
const jokeBtn = document.querySelector("#jokeBtn");
const resetBtn = document.querySelector("#resetBtn");
const jokeForm = document.querySelector("#jokeForm");
const jokeQuestion = document.querySelector("#jokeQuestion");
const jokeAnswer = document.querySelector("#jokeAnswer");
const timeLeftEl = document.querySelector("#timeLeft");
const totalLaughsEl = document.querySelector("#totalLaughs");
const bestTimeEl = document.querySelector("#bestTime");
const levelEl = document.querySelector("#level");
const jokeBox = document.querySelector("#jokeBox");

const baseJokes = [
  ["Why don't eggs tell jokes?", "They'd crack each other up."],
  ["Why did the math book look sad?", "It had too many problems."],
  ["Why did the cookie go to the doctor?", "Because it felt crumby."],
  ["What kind of tree fits in your hand?", "A palm tree."],
  ["Why did the bicycle fall over?", "Because it was two-tired."],
  ["How do you make a tissue dance?", "Put a little boogie in it."],
  ["What do you call cheese that isn't yours?", "Nacho cheese."],
  ["Why did the golfer bring two pairs of pants?", "In case of a hole in one."],
];

const decoys = ["😝", "🤪", "😂", "😁", "😅", "😹", "😛", "😜"];
const storageKey = "phoebieplays-state";

let state = {
  totalLaughs: 0,
  bestTime: null,
  level: 1,
  customJokes: [],
};

let round = {
  active: false,
  timerId: null,
  moveId: null,
  startAt: 0,
  timeLimit: 10,
  emojiSize: 72,
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved && typeof saved === "object") {
      state = { ...state, ...saved };
    }
  } catch {
    localStorage.removeItem(storageKey);
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function updateHud() {
  totalLaughsEl.textContent = state.totalLaughs;
  bestTimeEl.textContent = state.bestTime ? state.bestTime.toFixed(2) : "--";
  levelEl.textContent = state.level;
}

function allJokes() {
  return [...baseJokes, ...state.customJokes];
}

function showJoke() {
  const jokes = allJokes();
  const [question, answer] = jokes[Math.floor(Math.random() * jokes.length)];
  jokeBox.innerHTML = `<strong>${escapeHtml(question)}</strong><span>${escapeHtml(answer)}</span>`;
}

function escapeHtml(text) {
  const element = document.createElement("span");
  element.textContent = text;
  return element.innerHTML;
}

function setMessage(text, emoji = "😆") {
  playfield.innerHTML = `
    <div class="start-state">
      <div class="spotlight-emoji" aria-hidden="true">${emoji}</div>
      <p id="message">${escapeHtml(text)}</p>
    </div>
  `;
}

function clearRound() {
  round.active = false;
  window.clearInterval(round.timerId);
  window.clearInterval(round.moveId);
  round.timerId = null;
  round.moveId = null;
  playfield.querySelectorAll(".emoji-target").forEach((emoji) => emoji.remove());
}

function startGame() {
  clearRound();
  round.active = true;
  round.startAt = performance.now();
  round.timeLimit = Math.max(4, 10 - (state.level - 1) * 0.65);
  round.emojiSize = Math.max(46, 74 - (state.level - 1) * 4);
  timeLeftEl.textContent = Math.ceil(round.timeLimit);
  startBtn.textContent = "Restart";
  playfield.innerHTML = "";

  createEmoji("😆", true);
  const decoyCount = Math.min(7, 2 + state.level);
  shuffle(decoys).slice(0, decoyCount).forEach((emoji) => createEmoji(emoji, false));

  round.moveId = window.setInterval(moveAllEmojis, Math.max(420, 900 - state.level * 70));
  round.timerId = window.setInterval(tick, 100);
}

function createEmoji(char, isReal) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "emoji-target";
  button.textContent = char;
  button.dataset.real = String(isReal);
  button.style.setProperty("--size", `${round.emojiSize}px`);
  button.setAttribute("aria-label", isReal ? "real laughing emoji" : "tricky emoji decoy");
  button.addEventListener("click", () => handleEmojiClick(isReal));
  playfield.append(button);
  moveEmoji(button);
}

function moveEmoji(button) {
  const bounds = playfield.getBoundingClientRect();
  const maxX = Math.max(0, bounds.width - round.emojiSize - 8);
  const maxY = Math.max(0, bounds.height - round.emojiSize - 8);
  button.style.left = `${4 + Math.random() * maxX}px`;
  button.style.top = `${4 + Math.random() * maxY}px`;
}

function moveAllEmojis() {
  playfield.querySelectorAll(".emoji-target").forEach(moveEmoji);
}

function tick() {
  const elapsed = (performance.now() - round.startAt) / 1000;
  const remaining = Math.max(0, round.timeLimit - elapsed);
  timeLeftEl.textContent = Math.ceil(remaining);

  if (remaining <= 0) {
    clearRound();
    setMessage("Time's up. Try one more round.", "⏳");
    showJoke();
  }
}

function handleEmojiClick(isReal) {
  if (!round.active) return;

  const elapsed = (performance.now() - round.startAt) / 1000;
  clearRound();

  if (!isReal) {
    setMessage("So close. That one was a decoy.", "😝");
    showJoke();
    return;
  }

  state.totalLaughs += 1;
  state.level += 1;
  state.bestTime = state.bestTime ? Math.min(state.bestTime, elapsed) : elapsed;
  saveState();
  updateHud();
  setMessage(`You found it in ${elapsed.toFixed(2)} seconds.`, "🎉");
  showJoke();
}

function resetScores() {
  clearRound();
  state.totalLaughs = 0;
  state.bestTime = null;
  state.level = 1;
  saveState();
  updateHud();
  timeLeftEl.textContent = "10";
  startBtn.textContent = "Start Game";
  setMessage("Scores reset. Fresh start.", "✨");
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

jokeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = jokeQuestion.value.trim();
  const answer = jokeAnswer.value.trim();

  if (!question || !answer) return;

  state.customJokes.push([question, answer]);
  saveState();
  jokeQuestion.value = "";
  jokeAnswer.value = "";
  jokeBox.innerHTML = `<strong>${escapeHtml(question)}</strong><span>${escapeHtml(answer)}</span>`;
});

startBtn.addEventListener("click", startGame);
jokeBtn.addEventListener("click", showJoke);
resetBtn.addEventListener("click", resetScores);

loadState();
updateHud();
showJoke();
