// Photographs page geometry, in px relative to the right page's paper
// top-left corner. The grid is measured from /design/03-projects-photos.png;
// the stacked card from the reference screenshots (it's the grid card scaled
// up 2.44x, so a card is drawn once at stack size and scaled into its cell).

export const PHOTO_CARD = {
  width: 303,
  height: 395,
  photo: { left: 22, top: 25, width: 256, height: 313 },
  caption: { top: 338, height: 57, fontSize: 25 },
};

export const PHOTO_STACK = {
  cx: 239.1,
  cy: 348.75,
  // Rotation by depth in the stack: top card, then the two visible behind it
  // (fitted from the reference's card edges); deeper cards sit behind the last.
  fan: [0, -6.3, -12.5],
};

// Centres of the 3x3 grid cells, row by row, and the scale into a cell.
export const PHOTO_GRID = {
  cols: [109.5, 243.5, 378.5],
  rows: [183.5, 361, 538],
  scale: 124 / 303,
};

export const TIDY_UP = { cx: 243.5, top: 640 };
