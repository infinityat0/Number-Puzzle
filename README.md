# Number Puzzle

A sliding number puzzle in the browser. Slide one tile, or a whole run of
tiles in the gap's row or column at once, until the numbers are back in
order. 3×3, 4×4 and 5×5 boards; every shuffle is guaranteed solvable.

## Play locally

No build step. Serve `public/` over HTTP (ES modules don't load from `file://`):

```sh
npm start          # or: python3 -m http.server -d public
```

## Test

```sh
npm test           # Node 18+, built-in test runner
```

## Layout

- `public/engine.js` – pure rules (solvable shuffle, multi-tile slides, solved check)
- `public/main.js` – UI: animated tiles, tap / arrow keys / swipe, timer, best move counts
- `public/index.html`, `public/base.css`, `public/style.css` – page and styling (light and dark)
- `test/` – engine tests

## Deploy

Static site; `vercel.json` serves `public/` with no build. Import the
repository in Vercel, or run `vercel --prod`.
