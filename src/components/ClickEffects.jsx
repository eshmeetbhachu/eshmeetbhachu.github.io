import { useEffect, useRef, useState } from 'react';

const RAY_COUNT = 4;
const BURST_MS = 420; // must match the CSS animation duration below

// Small ink-stroke rays that shoot out from wherever the user clicks, then
// vanish — purely decorative, never blocks or alters the click itself.
// Mounted at the App root (outside Stage's scaled/transformed tree) so
// `position: fixed` bursts land at the real cursor position regardless of
// the notebook's current zoom level.
export default function ClickEffects() {
  const [bursts, setBursts] = useState([]);
  const nextId = useRef(0);

  useEffect(() => {
    const onClick = (e) => {
      const id = nextId.current++;
      const baseAngle = Math.random() * 360;
      const spread = 90 + Math.random() * 30;
      const rays = Array.from({ length: RAY_COUNT }, (_, i) => {
        const t = RAY_COUNT === 1 ? 0.5 : i / (RAY_COUNT - 1);
        return {
          angle: baseAngle - spread / 2 + t * spread + (Math.random() * 12 - 6),
          length: 12 + Math.random() * 8,
        };
      });
      setBursts((b) => [...b, { id, x: e.clientX, y: e.clientY, rays }]);
      setTimeout(() => {
        setBursts((b) => b.filter((burst) => burst.id !== id));
      }, BURST_MS);
    };
    // Capture phase, and never calls preventDefault/stopPropagation — purely
    // observes clicks, so nothing downstream (links, buttons, the notebook)
    // is affected.
    window.addEventListener('click', onClick, true);
    return () => window.removeEventListener('click', onClick, true);
  }, []);

  return (
    <div className="click-effects" aria-hidden="true">
      {bursts.map((burst) => (
        <div key={burst.id} className="click-burst" style={{ left: burst.x, top: burst.y }}>
          {burst.rays.map((ray, i) => (
            <span
              key={i}
              className="click-burst__ray"
              style={{ '--ray-angle': `${ray.angle}deg`, '--ray-length': `${ray.length}px` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
