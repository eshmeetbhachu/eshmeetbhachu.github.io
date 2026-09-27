// Open-spread ring: two solid "knuckle" end caps joined by a thin dipping
// wire — matches the coil shape in /design/02-about-stack.png, which isn't a
// plain stadium/pill shape.
function CoilRing({ width, height }) {
  return (
    <svg className="spiral__coil" width={width} height={height} viewBox="0 0 42 11" aria-hidden="true">
      <rect x="1" y="1" width="7" height="9" rx="3" fill="currentColor" />
      <rect x="34" y="1" width="7" height="9" rx="3" fill="currentColor" />
      <path d="M8 3.5 Q21 10 34 3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Spiral({ variant, x, y, count, pitch, ringWidth, ringHeight }) {
  return (
    <div
      className={`spiral spiral--${variant}`}
      aria-hidden="true"
      style={{ left: x, top: y, width: ringWidth, gap: pitch - ringHeight }}
    >
      {Array.from({ length: count }, (_, i) =>
        variant === 'open' ? (
          <CoilRing key={i} width={ringWidth} height={ringHeight} />
        ) : (
          <span key={i} className="spiral__ring" style={{ height: ringHeight }} />
        ),
      )}
    </div>
  );
}
