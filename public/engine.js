// Pure rules for the sliding number puzzle. Tiles are a flat array of length
// size*size holding 1..size*size-1, with 0 for the gap. No DOM access here.

export function solved(size) {
  const tiles = Array.from({ length: size * size }, (_, i) => i + 1);
  tiles[tiles.length - 1] = 0;
  return tiles;
}

export function isSolved(tiles) {
  for (let i = 0; i < tiles.length - 1; i++) if (tiles[i] !== i + 1) return false;
  return tiles[tiles.length - 1] === 0;
}

function inversions(tiles) {
  const nums = tiles.filter((t) => t !== 0);
  let count = 0;
  for (let i = 0; i < nums.length; i++)
    for (let j = i + 1; j < nums.length; j++) if (nums[i] > nums[j]) count++;
  return count;
}

/**
 * Standard solvability test. Odd width: inversions must be even.
 * Even width: inversions + (row of gap counted from the bottom, 1-based) must be odd.
 */
export function isSolvable(tiles, size) {
  const inv = inversions(tiles);
  if (size % 2 === 1) return inv % 2 === 0;
  const gapRowFromBottom = size - Math.floor(tiles.indexOf(0) / size);
  return (inv + gapRowFromBottom) % 2 === 1;
}

/** A random solvable, unsolved arrangement. `rng` is injectable for tests. */
export function shuffled(size, rng = Math.random) {
  const tiles = solved(size);
  do {
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    if (!isSolvable(tiles, size)) {
      // Swapping two non-gap tiles flips parity, making it solvable.
      const a = tiles[0] !== 0 && tiles[1] !== 0 ? 0 : tiles.length - 2;
      [tiles[a], tiles[a + 1]] = [tiles[a + 1], tiles[a]];
    }
  } while (isSolved(tiles));
  return tiles;
}

/**
 * Slides the tile at `index` toward the gap. Any tile in the same row or
 * column as the gap can move; the tiles between it and the gap move with it,
 * all as one move. Returns the new array, or null if the tile can't move.
 */
export function slide(tiles, size, index) {
  const gap = tiles.indexOf(0);
  if (index === gap || index < 0 || index >= tiles.length) return null;
  const [gr, gc] = [Math.floor(gap / size), gap % size];
  const [r, c] = [Math.floor(index / size), index % size];
  let step;
  if (r === gr) step = c < gc ? -1 : 1;
  else if (c === gc) step = r < gr ? -size : size;
  else return null;

  const next = tiles.slice();
  // Walk from the gap toward the tapped tile, pulling each tile into the hole.
  let hole = gap;
  while (hole !== index) {
    next[hole] = next[hole + step];
    hole += step;
  }
  next[index] = 0;
  return next;
}

/**
 * Keyboard-style move: the arrow direction is the way a tile travels into the
 * gap. "up" moves the tile below the gap upward, and so on.
 */
export function slideDirection(tiles, size, direction) {
  const gap = tiles.indexOf(0);
  const [gr, gc] = [Math.floor(gap / size), gap % size];
  const source = {
    up: gr + 1 < size ? gap + size : -1,
    down: gr - 1 >= 0 ? gap - size : -1,
    left: gc + 1 < size ? gap + 1 : -1,
    right: gc - 1 >= 0 ? gap - 1 : -1,
  }[direction];
  return source === undefined || source < 0 ? null : slide(tiles, size, source);
}

export function movable(tiles, size) {
  const out = [];
  for (let i = 0; i < tiles.length; i++) if (slide(tiles, size, i)) out.push(i);
  return out;
}
