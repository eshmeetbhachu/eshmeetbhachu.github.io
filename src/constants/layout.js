// All geometry is in 1366×768 stage pixels, measured from /design/*.png.

export const STAGE = { width: 1366, height: 768 };

// Bigger than the Canva measurement (was 257×668 at x287/y50) per explicit
// request. Sized as large as it can go while still clearing the notebook —
// BOOK_CLOSED.x=588 and BOOK_OPEN.x=337 are locked, so this is close to the
// max: ~23px clear of the closed cover, ~19px clear of the open book.
export const RECEIPT = {
  x: 265,
  y: 34,
  width: 300,
  height: 700,
  openOffsetX: -247, // → open-state x ≈ 18 (was -248 → 39, kept ~the same shift magnitude)
};

// Open two-page frame (02-about-stack).
export const BOOK_OPEN = { x: 337, y: 20, width: 994, height: 726 };

// Closed cover (01-home). Its left edge is the spiral hinge.
export const BOOK_CLOSED = { x: 588, y: 20, width: 542, height: 728 };

export const HALF_WIDTH = BOOK_OPEN.width / 2; // 497 — spine sits at this x inside the book

// Transform that maps the open book's right half onto the closed cover.
// Applied around the spine (top), so the hinge is the fixed point.
export const CLOSED_TRANSFORM = {
  tx: BOOK_CLOSED.x - (BOOK_OPEN.x + HALF_WIDTH),
  ty: BOOK_CLOSED.y - BOOK_OPEN.y,
  sx: BOOK_CLOSED.width / HALF_WIDTH,
  sy: BOOK_CLOSED.height / BOOK_OPEN.height,
};

// Paper sheet inset within the dark frame.
export const PAPER_INSET = { top: 21, bottom: 21, outer: 25 };

// Spiral bindings, in book coordinates (x relative to the book's left edge).
export const SPIRAL_CLOSED = { x: HALF_WIDTH - 8, y: 23, count: 22, pitch: 32, ringWidth: 27, ringHeight: 13 };
export const SPIRAL_OPEN = { x: 476, y: 33, count: 37, pitch: 18, ringWidth: 42, ringHeight: 10 };

// Safety net in case transitionend never fires (e.g. tab hidden mid-animation).
export const OPEN_FALLBACK_MS = 1600;

// --- Page turn (new; does not affect any of the constants above) ---

// Page-turn leaf pivots on the same spine (x = HALF_WIDTH) as the cover leaf.
export const TURN_FALLBACK_MS = 1200;

// Bottom-corner hit targets for forward/backward turns, in book-local coordinates.
export const PAGE_CORNER = { width: 120, height: 100 };
