// Exact Projects-page geometry, in px relative to the left page's paper
// top-left corner. Measured off the Canva design (the 2x export) and mapped
// into page space, then calibrated against a 2x render of the live page.
//
// circle: position/size of the <img> (each SVG has its own padding around
//   the drawn circle, so these differ per asset even though the visible
//   circles are identical — 179px across).
// bubble: outer border box. The flat end sits at the circle's centre, so the
//   circle (on top) hides it; the far end is a full semicircular cap.

export const PROJECTS_HEADING = { left: 35, top: 26 };

export const PROJECT_LAYOUT = {
  canvassync: {
    circle: { left: 3.2, top: 95.7, width: 206.7 },
    bubble: { left: 105.3, top: 96, width: 326.6, height: 130.3, cap: 'right' },
    title: { left: 176.7, top: 107.5, anchor: 'left' },
    desc: { left: 199.1, top: 133.1, fontSize: 11.96, lineHeight: 15.95 },
    github: { left: 184.7, top: 230.8, size: 15.4 },
    live: { left: 206.6, top: 231.5, fontSize: 13.1 },
  },
  'swim-safe': {
    circle: { left: 255.4, top: 290.5, width: 183.2 },
    bubble: { left: 20.5, top: 290.5, width: 326.4, height: 144.3, cap: 'left' },
    title: { right: 255.3, top: 301.6, anchor: 'right' },
    desc: { left: 47.9, top: 324.5, fontSize: 12.6, lineHeight: 16.92 },
    github: { left: 249.4, top: 438.3, size: 17.4 },
  },
  assembly: {
    circle: { left: 16, top: 484.6, width: 180.2 },
    bubble: { left: 105.3, top: 484.6, width: 329.1, height: 131.3, cap: 'right' },
    title: { left: 203.6, top: 495.6, anchor: 'left' },
    desc: { left: 207.1, top: 517.7, fontSize: 11.63, lineHeight: 15.67 },
    github: { left: 198.1, top: 623.4, size: 16.9 },
  },
};

export const PROJECT_DECOR = {
  crown: { left: 379, top: 74.5, width: 42 },
  cat: { left: 31.3, top: 447.5, width: 68.7 },
};
