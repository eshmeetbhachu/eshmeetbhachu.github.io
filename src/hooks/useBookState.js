import { useCallback, useEffect, useState } from 'react';
import { CLOSE_FALLBACK_MS, OPEN_FALLBACK_MS, TURN_FALLBACK_MS } from '../constants/layout';

// closed → opening → open → closing → closed. Once open, `spread`
// (0..spreadCount-1) + `turningLeaf` drive the page-turn leaves. Leaf k is
// the sheet turned when going from spread k-1 to spread k.
export default function useBookState(spreadCount) {
  const [bookState, setBookState] = useState('closed');
  const [spread, setSpread] = useState(0);
  const [turningLeaf, setTurningLeaf] = useState(null);
  const [closeRequested, setCloseRequested] = useState(false);
  const isTurning = turningLeaf !== null;

  const open = useCallback(() => setBookState((s) => (s === 'closed' ? 'opening' : s)), []);
  const finishOpening = useCallback(() => setBookState((s) => (s === 'opening' ? 'open' : s)), []);
  const finishClosing = useCallback(() => setBookState((s) => (s === 'closing' ? 'closed' : s)), []);

  useEffect(() => {
    if (bookState !== 'opening') return;
    const timer = setTimeout(finishOpening, OPEN_FALLBACK_MS);
    return () => clearTimeout(timer);
  }, [bookState, finishOpening]);

  useEffect(() => {
    if (bookState !== 'closing') return;
    const timer = setTimeout(finishClosing, CLOSE_FALLBACK_MS);
    return () => clearTimeout(timer);
  }, [bookState, finishClosing]);

  // One sheet at a time: forward turns leaf spread+1, backward turns leaf spread.
  const step = useCallback(
    (dir) => {
      const target = spread + dir;
      if (target < 0 || target >= spreadCount) return;
      setTurningLeaf(dir > 0 ? target : spread);
      setSpread(target);
    },
    [spread, spreadCount],
  );

  const canTurn = bookState === 'open' && !isTurning && !closeRequested;
  const turnForward = useCallback(() => canTurn && step(1), [canTurn, step]);
  const turnBackward = useCallback(() => canTurn && step(-1), [canTurn, step]);
  const finishTurning = useCallback(() => setTurningLeaf(null), []);

  useEffect(() => {
    if (!isTurning) return;
    const timer = setTimeout(finishTurning, TURN_FALLBACK_MS);
    return () => clearTimeout(timer);
  }, [isTurning, finishTurning]);

  // The opening animation always starts from spread 0, so closing from a
  // later spread first turns back one sheet at a time, then plays the reverse.
  const close = useCallback(() => {
    if (canTurn) setCloseRequested(true);
  }, [canTurn]);

  useEffect(() => {
    if (!closeRequested || isTurning || bookState !== 'open') return;
    if (spread > 0) {
      step(-1);
    } else {
      setCloseRequested(false);
      setBookState('closing');
    }
  }, [closeRequested, isTurning, spread, bookState, step]);

  return {
    bookState,
    open,
    finishOpening,
    close,
    finishClosing,
    closeRequested,
    spread,
    isTurning,
    turningLeaf,
    turnForward,
    turnBackward,
    finishTurning,
  };
}
