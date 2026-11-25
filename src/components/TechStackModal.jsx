import { useEffect, useRef } from 'react';
import tape from '../../assets/tape.png';
import { TECH_STACK } from '../constants/content';

const ICON_SRC = import.meta.glob('../../assets/tech/*.svg', { eager: true, import: 'default' });
const iconFor = (name) => ICON_SRC[`../../assets/tech/${name}.svg`];

// Per-slip hand-placed feel: tilt (deg), vertical drop (px), tape angle.
const HANG = [
  { tilt: -1.6, drop: 6, tape: -7 },
  { tilt: 1.1, drop: 0, tape: 5 },
  { tilt: -0.8, drop: 12, tape: -3 },
  { tilt: 1.8, drop: 4, tape: 8 },
];

// Small pen doodles, drawn in the notebook's ink colour.
const DOODLES = [
  // arrow squiggle
  <svg key="arrow" className="slip-doodle" style={{ left: 18, bottom: 16, width: 64 }} viewBox="0 0 80 30" aria-hidden="true">
    <path d="M4 22c10-14 20 6 30-6s18 2 30-4M58 6l8 6-9 5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // star
  <svg key="star" className="slip-doodle" style={{ right: 14, top: 70, width: 22 }} viewBox="0 0 40 40" aria-hidden="true">
    <path d="M20 4l4.5 10.5L36 16l-8.6 7.4L30 35l-10-6-10 6 2.6-11.6L4 16l11.5-1.5Z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
  </svg>,
  // coffee ring
  <svg key="ring" className="slip-doodle slip-doodle--ring" style={{ right: -14, bottom: 20, width: 84 }} viewBox="0 0 100 100" aria-hidden="true">
    <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="5" strokeDasharray="190 18 40 12" />
  </svg>,
  // "served" stamp
  <span key="stamp" className="slip-stamp" aria-hidden="true">
    ✓ SERVED
  </span>,
];

// The tech stack as four restaurant order slips taped up in a row over the
// notebook. Closes on the close tag, a click outside the slips, or Escape.
export default function TechStackModal({ open, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const returnFocus = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      returnFocus?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="techstack-modal" onClick={onClose}>
      <div className="techstack-modal__row" role="dialog" aria-modal="true" aria-label="My tech stack">
        {TECH_STACK.map((group, i) => (
          <div
            key={group.heading}
            className="slip"
            onClick={(e) => e.stopPropagation()}
            style={{ '--tilt': `${HANG[i].tilt}deg`, '--drop': `${HANG[i].drop}px`, '--delay': `${i * 70}ms` }}
          >
            <img className="slip__tape" src={tape} alt="" aria-hidden="true" style={{ transform: `translateX(-50%) rotate(${HANG[i].tape}deg)` }} />
            <div className="slip__paper">
              <h3 className="slip__heading">{group.heading}</h3>
              <p className="slip__meta">
                <span>No. {String(i + 1).padStart(2, '0')}</span>
                <span>x{group.items.length}</span>
              </p>
              <ul className="slip__items">
                {group.items.map((item) => (
                  <li key={item.name} className="slip__item">
                    <img src={iconFor(item.icon)} alt="" />
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
              {DOODLES[i]}
            </div>
          </div>
        ))}
      </div>
      <button ref={closeRef} type="button" className="techstack-modal__close" onClick={onClose}>
        close ✕
      </button>
    </div>
  );
}
