import { BOOK_CLOSED } from '../../constants/layout';

// Closed cover. Artwork is authored at the true closed size (542×728) and
// counter-scaled, so it renders 1:1 while the book sits in its closed transform.
export default function CoverFront({ onOpen, disabled, children }) {
  return (
    <button
      type="button"
      className="cover-front"
      onClick={onOpen}
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      aria-label="Open notebook"
    >
      <div className="cover-front__art" style={{ width: BOOK_CLOSED.width, height: BOOK_CLOSED.height }}>
        {children}
      </div>
    </button>
  );
}
