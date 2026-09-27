import { useState } from 'react';
import { PHOTOS } from '../constants/content';
import { PHOTO_CARD, PHOTO_STACK, PHOTO_GRID, TIDY_UP } from '../constants/photosLayout';

// Originals were ~270KB-6.7MB camera PNGs; converted to WebP capped at 2000px
// on the long edge (well beyond the ~256-313px stage-px display size at any
// realistic zoom) — see the optimization notes in App.jsx. This page itself
// isn't rendered until the user opens the second spread (also in App.jsx),
// so these fetches only happen once that's actually needed.
const PHOTO_SRC = import.meta.glob('../assets/photos/*.webp', { eager: true, import: 'default' });
const srcFor = (key) => PHOTO_SRC[`../assets/photos/${key}.webp`];

const cellCentre = (i) => ({ x: PHOTO_GRID.cols[i % 3], y: PHOTO_GRID.rows[Math.floor(i / 3)] });

// Card i is placed in the grid once i < placed; otherwise it's in the stack at
// depth (i - placed), so the next card to place is always on top.
function cardStyle(i, placed) {
  if (i < placed) {
    const { x, y } = cellCentre(i);
    return {
      transform: `translate(${x - PHOTO_STACK.cx}px, ${y - PHOTO_STACK.cy}px) scale(${PHOTO_GRID.scale})`,
      zIndex: 1 + i, // behind every card still in the stack
    };
  }
  const depth = i - placed;
  const angle = PHOTO_STACK.fan[Math.min(depth, PHOTO_STACK.fan.length - 1)];
  return {
    transform: `translate(0px, 0px) rotate(${angle}deg)`,
    zIndex: 100 - depth,
  };
}

export default function PhotographsPage() {
  const [placed, setPlaced] = useState(0);
  const [tidying, setTidying] = useState(false); // staggers the fly-back only
  const done = placed === PHOTOS.length;

  return (
    <div className="relative h-full p-5 pt-6">
      <h2 className="notebook-heading text-right">PHOTOGRAPHS</h2>

      <div className="photo-deck">
        {PHOTOS.map(({ key, title }, i) => {
          const isTop = i === placed;
          return (
            <button
              key={key}
              type="button"
              className="photo-card"
              data-top={isTop}
              disabled={!isTop}
              tabIndex={isTop ? 0 : -1}
              aria-label={isTop ? `Place photo ${i + 1}${title ? ` (${title})` : ''} on the board` : undefined}
              onClick={() => {
                setTidying(false);
                setPlaced((n) => (n === i ? n + 1 : n));
              }}
              style={{
                left: PHOTO_STACK.cx - PHOTO_CARD.width / 2,
                top: PHOTO_STACK.cy - PHOTO_CARD.height / 2,
                width: PHOTO_CARD.width,
                height: PHOTO_CARD.height,
                transitionDelay: tidying ? `${(PHOTOS.length - 1 - i) * 35}ms` : '0ms',
                ...cardStyle(i, placed),
              }}
            >
              <img
                className="photo-card__img"
                src={srcFor(key)}
                alt={title ?? `Photograph ${i + 1}`}
                draggable="false"
                style={{
                  left: PHOTO_CARD.photo.left,
                  top: PHOTO_CARD.photo.top,
                  width: PHOTO_CARD.photo.width,
                  height: PHOTO_CARD.photo.height,
                }}
              />
              {title && (
                <span
                  className="photo-card__caption"
                  style={{ top: PHOTO_CARD.caption.top, height: PHOTO_CARD.caption.height, fontSize: PHOTO_CARD.caption.fontSize }}
                >
                  {title}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {done && (
        <button type="button" className="photo-tidy" style={{ left: TIDY_UP.cx, top: TIDY_UP.top }} onClick={() => {
            setTidying(true);
            setPlaced(0);
          }}
        >
          stack up
        </button>
      )}
    </div>
  );
}
