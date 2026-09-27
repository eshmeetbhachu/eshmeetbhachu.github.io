import { PAGE_CORNER } from '../../constants/layout';

// Bottom-right corner turns forward, bottom-left turns backward. Each shows
// the page number and, when it can turn, a small folded-over page corner
// that lifts a little on hover.
export default function PageCorner({ side, number, onClick, disabled }) {
  const style = side === 'right' ? { right: 0, bottom: 0 } : { left: 0, bottom: 0 };

  return (
    <button
      type="button"
      className={`page-corner page-corner--${side}`}
      style={{ ...style, width: PAGE_CORNER.width, height: PAGE_CORNER.height }}
      onClick={onClick}
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      aria-label={side === 'right' ? 'Turn to next page' : 'Turn to previous page'}
    >
      <span className="page-corner__number">P. {String(number).padStart(2, '0')}</span>
      {!disabled && <span className="page-corner__curl" aria-hidden="true" />}
    </button>
  );
}
