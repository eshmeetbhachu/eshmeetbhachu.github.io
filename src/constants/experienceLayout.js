// Exact Experience-section geometry, in px relative to the right page's paper
// top-left corner. Measured off the Canva design (2x export) and calibrated
// against a 2x render of the live page — same approach as projectsLayout.js.

export const EXPERIENCE_LAYOUT = {
  heading: { left: 49, top: 401 },
  icon: { left: 64.9, top: 460.7, height: 78 },
  company: { left: 139.9, top: 465.25, fontSize: 19.92 },
  role: { left: 139.4, top: 488, fontSize: 12.04 },
  date: { right: 435.2, top: 487.5, fontSize: 12.1 },
  location: { left: 139.9, top: 502.5, fontSize: 12.06 },
  desc: { left: 62.4, firstLineLeft: 140.4, top: 523, fontSize: 16.34, lineHeight: 21.9 },
};
