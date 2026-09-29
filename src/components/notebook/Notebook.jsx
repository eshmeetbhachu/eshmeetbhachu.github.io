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
 *   base   – Photographs (bottom-most; only ever revealed, never covers anything)
 *   leaf2  – page-turn leaf: front = TechStack (rest, spread 0), back = Projects (spread 1)
 *   leaf   – cover leaf (LOCKED): front = closed cover, back = About (permanent once open)
 *   spiral – closed rings / open coil, always on top
 *
 * leaf/base/spiral and the closed→open transition are unchanged from the
 * approved prototype. leaf2 + the corner hit targets are additive.
 */
export default function Notebook({
  state,
  onOpen,
  onOpened,
  onClose,
  onClosed,
  closeRequested,
  cover,
  leftPage,
  rightPage,
  nextLeftPage,
  nextRightPage,
  nextSpreadReady,
  spread,
  isTurning,
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
          <div className="book__content">{nextRightPage}</div>
          <div className="book__cast-shadow" />
        </BookHalf>
      </div>

      <div className="book__leaf2" data-turning={isTurning} onTransitionEnd={handleLeaf2TransitionEnd}>
        <div className="book__face2 book__face2--front">
          <BookHalf side="right">
            <div className="book__content">{rightPage}</div>
          </BookHalf>
          <div className="book__shade2" />
        </div>
        <div className="book__face2 book__face2--back">
          <BookHalf side="left">
            <div className="book__content">{nextLeftPage}</div>
          </BookHalf>
          <div className="book__shade2" />
        </div>
      </div>

      <div className="book__leaf" onTransitionEnd={handleLeafTransitionEnd}>
        <div className="book__face book__face--front">
          <CoverFront onOpen={onOpen} disabled={state !== 'closed'}>
            {cover}
          </CoverFront>
          <div className="book__shade" />
        </div>
        <div className="book__face book__face--back">
          <BookHalf side="left">
            <div className="book__content">{leftPage}</div>
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
            number={spread === 0 ? 2 : 4}
            onClick={onTurnForward}
            disabled={isTurning || closeRequested || spread === 1 || !nextSpreadReady}
          />
          <PageCorner
            side="left"
            number={spread === 0 ? 1 : 3}
            onClick={onTurnBackward}
            disabled={isTurning || closeRequested || spread === 0}
          />
        </>
      )}

      <PaperClip onClick={onClose} disabled={!open || isTurning || closeRequested} />
    </div>
  );
}
