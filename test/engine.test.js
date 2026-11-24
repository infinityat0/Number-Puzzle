import { test } from "node:test";
import assert from "node:assert/strict";
import { isSolvable, isSolved, movable, shuffled, slide, slideDirection, solved } from "../public/engine.js";

test("solved board is recognised", () => {
  assert.deepEqual(solved(3), [1, 2, 3, 4, 5, 6, 7, 8, 0]);
  assert.equal(isSolved(solved(4)), true);
  assert.equal(isSolved([1, 2, 3, 4, 5, 6, 8, 7, 0]), false);
});

test("solvability parity matches known cases", () => {
  // 3x3: one swap away from solved is unsolvable.
  assert.equal(isSolvable([1, 2, 3, 4, 5, 6, 8, 7, 0], 3), false);
  assert.equal(isSolvable(solved(3), 3), true);
  // The famous unsolvable 14-15 swap.
  const s = solved(4);
  [s[13], s[14]] = [s[14], s[13]];
  assert.equal(isSolvable(s, 4), false);
  assert.equal(isSolvable(solved(4), 4), true);
  // Moving the gap up one row on 4x4 keeps it solvable.
  assert.equal(isSolvable(slide(solved(4), 4, 11), 4), true);
});

test("shuffles are always solvable, unsolved, and a permutation", () => {
  for (const size of [3, 4, 5]) {
    for (let i = 0; i < 200; i++) {
      const t = shuffled(size);
      assert.equal(isSolvable(t, size), true);
      assert.equal(isSolved(t), false);
      assert.deepEqual([...t].sort((a, b) => a - b), [...solved(size)].sort((a, b) => a - b));
    }
  }
});

test("a single tile slides into the gap", () => {
  const t = slide(solved(3), 3, 7);
  assert.deepEqual(t, [1, 2, 3, 4, 5, 6, 7, 0, 8]);
});

test("a whole row slides at once", () => {
  const t = slide(solved(3), 3, 6);
  assert.deepEqual(t, [1, 2, 3, 4, 5, 6, 0, 7, 8]);
});

test("a whole column slides at once", () => {
  const t = slide(solved(3), 3, 2);
  assert.deepEqual(t, [1, 2, 0, 4, 5, 3, 7, 8, 6]);
});

test("tiles off the gap's row and column cannot move", () => {
  assert.equal(slide(solved(3), 3, 0), null);
  assert.equal(slide(solved(3), 3, 8), null, "the gap itself");
  assert.deepEqual(movable(solved(3), 3).sort(), [2, 5, 6, 7]);
});

test("arrow directions move the neighbouring tile into the gap", () => {
  assert.deepEqual(slideDirection(solved(3), 3, "right"), [1, 2, 3, 4, 5, 6, 7, 0, 8]);
  assert.deepEqual(slideDirection(solved(3), 3, "down"), [1, 2, 3, 4, 5, 0, 7, 8, 6]);
  assert.equal(slideDirection(solved(3), 3, "up"), null);
  assert.equal(slideDirection(solved(3), 3, "left"), null);
});

test("random legal play from a shuffle never breaks solvability", () => {
  let t = shuffled(4);
  for (let i = 0; i < 500; i++) {
    const options = movable(t, 4);
    t = slide(t, 4, options[Math.floor(Math.random() * options.length)]);
    assert.equal(isSolvable(t, 4), true);
  }
});
