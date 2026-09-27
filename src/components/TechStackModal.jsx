import { useEffect, useRef } from 'react';
import techstackPanel from '../assets/techstack-panel.svg';
import tape from '../../assets/tape.png';

// The full tech-stack chart (/assets/Techstack.svg, viewBox-cropped to its
// artwork in src/assets/techstack-panel.svg), shown over the notebook.
// Closes on the close tag, a click outside the panel, or Escape.
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
      <div
        className="techstack-modal__window"
        role="dialog"
        aria-modal="true"
        aria-label="My tech stack"
        onClick={(e) => e.stopPropagation()}
      >
        <img className="techstack-modal__tape" src={tape} alt="" aria-hidden="true" />
        <img className="techstack-modal__panel" src={techstackPanel} alt="Tech stack: languages, frameworks & libraries, databases & deployment, tools" />
        <button ref={closeRef} type="button" className="techstack-modal__close" onClick={onClose}>
          close ✕
        </button>
      </div>
    </div>
  );
}
