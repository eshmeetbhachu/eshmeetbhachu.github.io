import { BOOK_OPEN, CLOSED_TRANSFORM, HALF_WIDTH, PAPER_INSET, SPIRAL_CLOSED, SPIRAL_OPEN } from '../../constants/layout';
import BookHalf from './BookHalf';
import CoverFront from './CoverFront';
import PageCorner from './PageCorner';
import PaperClip from './PaperClip';
import Spiral from './Spiral';

const geometry = {
  left: BOOK_OPEN.x,
  top: BOOK_OPEN.y,
  width: BOOK_OPEN.width,
  height: BOOK_OPEN.height,
  '--half-w': `${HALF_WIDTH}px`,
  '--closed-tx': `${CLOSED_TRANSFORM.tx}px`,
  '--closed-ty': `${CLOSED_TRANSFORM.ty}px`,
  '--closed-sx': CLOSED_TRANSFORM.sx,
  '--closed-sy': CLOSED_TRANSFORM.sy,
  '--paper-top': `${PAPER_INSET.top}px`,
  '--paper-bottom': `${PAPER_INSET.bottom}px`,
  '--paper-outer': `${PAPER_INSET.outer}px`,
};

/*
 * Layers, bottom → top at rest (see notebook.css for the closed/open z-index
 * override that keeps the cover on top while closed and swaps it once open):
 *   base   – last spread's right page (bottom-most; only ever revealed)
 *   leaf k – page-turn leaves, k = 1..N-1: front = spread k-1's right page,
 *            back = spread k's left page; turned once spread >= k
 *   leaf   – cover leaf (LOCKED): front = closed cover, back = About (permanent once open)
 *   spiral – closed rings / open coil, always on top
 *
 * `spreads` is [{ left, right, ready }, ...]; `ready` gates the forward corner
 * until that spread's content has mounted.
 */
export default function Notebook({
  state,
  onOpen,
  onOpened,
  onClose,
  onClosed,
  closeRequested,
  cover,
  spreads,
  spread,
  turningLeaf,
  onTurnForward,
  onTurnBackward,
  onTurnEnd,
}) {
  const handleLeafTransitionEnd = (e) => {
    if (e.target === e.currentTarget && e.propertyName === 'transform' && state === 'opening') onOpened();
  };

  // The book's own expand/collapse is the last transition to finish when closing.
  const handleBookTransitionEnd = (e) => {
    if (e.target === e.currentTarget && e.propertyName === 'transform' && state === 'closing') onClosed();
  };

  const handleLeaf2TransitionEnd = (e) => {
    if (e.target === e.currentTarget && e.propertyName === 'transform') onTurnEnd();
  };

  const open = state === 'open';
  const isTurning = turningLeaf !== null;
  const last = spreads.length - 1;
  const leaves = Array.from({ length: last }, (_, i) => last - i);

  // Once open (above the cover leaf, 3; below the corners, 8): the sheet in
  // motion is on top; at rest, turned sheets stack newest-on-top on the left
  // and unturned ones lowest-index-on-top on the right.
  const leafZ = (k) => (k === turningLeaf ? 7 : spread >= k ? 4 + k : 4 + spreads.length - k);

  return (
    <div
      className="book"
      data-state={state}
      data-spread={spread}
      style={geometry}
      onTransitionEnd={handleBookTransitionEnd}
    >
      <div className="book__base">
        <BookHalf side="right">
          <div className="book__content">{spreads[last].right}</div>
          <div className="book__cast-shadow" />
        </BookHalf>
      </div>

      {/* Reverse DOM order so, while closed (shared CSS z-index), leaf 1 sits on top. */}
      {leaves.map((k) => (
        <div
          key={k}
          className="book__leaf2"
          data-turned={spread >= k}
          style={open ? { zIndex: leafZ(k) } : undefined}
          onTransitionEnd={handleLeaf2TransitionEnd}
        >
          <div className="book__face2 book__face2--front">
            <BookHalf side="right">
              <div className="book__content">{spreads[k - 1].right}</div>
            </BookHalf>
            <div className="book__shade2" />
          </div>
          <div className="book__face2 book__face2--back">
            <BookHalf side="left">
              <div className="book__content">{spreads[k].left}</div>
            </BookHalf>
            <div className="book__shade2" />
          </div>
        </div>
      ))}

      <div className="book__leaf" onTransitionEnd={handleLeafTransitionEnd}>
        <div className="book__face book__face--front">
          <CoverFront onOpen={onOpen} disabled={state !== 'closed'}>
            {cover}
          </CoverFront>
          <div className="book__shade" />
        </div>
        <div className="book__face book__face--back">
          <BookHalf side="left">
            <div className="book__content">{spreads[0].left}</div>
          </BookHalf>
          <div className="book__shade" />
        </div>
      </div>

      <Spiral variant="closed" {...SPIRAL_CLOSED} />
      <Spiral variant="open" {...SPIRAL_OPEN} />

      {open && (
        <>
          <PageCorner
            side="right"
            number={spread * 2 + 2}
            onClick={onTurnForward}
            disabled={isTurning || closeRequested || spread === last || !spreads[spread + 1].ready}
          />
          <PageCorner
            side="left"
            number={spread * 2 + 1}
            onClick={onTurnBackward}
            disabled={isTurning || closeRequested || spread === 0}
          />
        </>
      )}

      <PaperClip onClick={onClose} disabled={!open || isTurning || closeRequested} />
    </div>
  );
}
