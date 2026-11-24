import { isSolved, shuffled, slide, slideDirection } from "./engine.js";

const $ = (id) => document.getElementById(id);
const boardEl = $("board");
const sizeEl = $("size");
const movesEl = $("moves");
const timeEl = $("time");
const bestEl = $("best");
const messageEl = $("message");

let size = 4;
let tiles = [];
let moves = 0;
let won = false;
let startedAt = 0;
let timer = null;
const tileEls = new Map(); // value -> element

const storage = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* storage unavailable */
    }
  },
};
const bestKey = () => `number-puzzle.best.${size}`;

const elapsed = () => (startedAt ? Math.floor((Date.now() - startedAt) / 1000) : 0);
function stopTimer() {
  clearInterval(timer);
  timer = null;
}

function setMessage(text, kind = "") {
  messageEl.textContent = text;
  messageEl.className = `message ${kind}`;
}

function newGame() {
  stopTimer();
  size = Number(sizeEl.value);
  storage.set("number-puzzle.size", String(size));
  tiles = shuffled(size);
  moves = 0;
  won = false;
  startedAt = 0;
  boardEl.style.setProperty("--size", size);
  boardEl.classList.remove("won");
  boardEl.replaceChildren();
  tileEls.clear();
  for (let v = 1; v < size * size; v++) {
    const el = document.createElement("button");
    el.type = "button";
    el.className = "tile";
    el.textContent = v;
    el.tabIndex = -1;
    el.dataset.value = v;
    tileEls.set(v, el);
    boardEl.append(el);
  }
  setMessage("Tap a tile next to the gap to begin.");
  render();
}

function render() {
  tiles.forEach((v, i) => {
    if (v === 0) return;
    const el = tileEls.get(v);
    el.style.setProperty("--x", i % size);
    el.style.setProperty("--y", Math.floor(i / size));
    el.classList.toggle("home", v === i + 1);
    el.classList.toggle("fixed", won);
    el.setAttribute("aria-label", `Tile ${v}, row ${Math.floor(i / size) + 1}, column ${(i % size) + 1}`);
  });
  movesEl.textContent = moves;
  timeEl.textContent = elapsed();
  const best = storage.get(bestKey());
  bestEl.textContent = best ?? "–";
}

function apply(next) {
  if (!next || won) return;
  tiles = next;
  moves++;
  if (!timer) {
    startedAt = Date.now();
    timer = setInterval(() => (timeEl.textContent = elapsed()), 250);
  }
  if (isSolved(tiles)) {
    won = true;
    stopTimer();
    boardEl.classList.add("won");
    const best = Number(storage.get(bestKey())) || Infinity;
    if (moves < best) storage.set(bestKey(), String(moves));
    setMessage(
      `Solved in ${moves} moves and ${elapsed()}s.${moves < best ? " New best!" : ""}`,
      "win",
    );
  } else {
    setMessage("");
  }
  render();
}

boardEl.addEventListener("click", (e) => {
  const el = e.target.closest(".tile");
  if (!el) return;
  const next = slide(tiles, size, tiles.indexOf(Number(el.dataset.value)));
  if (next) apply(next);
});

boardEl.addEventListener("keydown", (e) => {
  const dir = { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right" }[e.key];
  if (!dir) return;
  e.preventDefault();
  apply(slideDirection(tiles, size, dir));
});

// Swipe on touch screens: swipe direction = direction a tile moves.
let touchStart = null;
boardEl.addEventListener("touchstart", (e) => {
  const t = e.touches[0];
  touchStart = [t.clientX, t.clientY];
}, { passive: true });
boardEl.addEventListener("touchend", (e) => {
  if (!touchStart) return;
  const t = e.changedTouches[0];
  const dx = t.clientX - touchStart[0];
  const dy = t.clientY - touchStart[1];
  touchStart = null;
  if (Math.max(Math.abs(dx), Math.abs(dy)) < 30) return; // a tap, handled by click
  const dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : dy > 0 ? "down" : "up";
  apply(slideDirection(tiles, size, dir));
});

$("shuffle").addEventListener("click", newGame);
sizeEl.addEventListener("change", newGame);

const saved = storage.get("number-puzzle.size");
if (["3", "4", "5"].includes(saved)) sizeEl.value = saved;
newGame();
