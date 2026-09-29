import { useCallback, useEffect, useState } from 'react';
import { CLOSE_FALLBACK_MS, OPEN_FALLBACK_MS, TURN_FALLBACK_MS } from '../constants/layout';

// closed → opening → open → closing → closed. Once open, `spread` (0|1) +
// `isTurning` drive the page-turn leaf.
export default function useBookState() {
  const [bookState, setBookState] = useState('closed');
  const [spread, setSpread] = useState(0);
  const [isTurning, setIsTurning] = useState(false);
  const [closeRequested, setCloseRequested] = useState(false);

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

  const turnTo = useCallback(
    (target) => {
      if (bookState !== 'open' || isTurning || closeRequested) return;
      setSpread((s) => {
        if (s === target) return s;
        setIsTurning(true);
        return target;
      });
    },
    [bookState, isTurning, closeRequested],
  );

  const turnForward = useCallback(() => turnTo(1), [turnTo]);
  const turnBackward = useCallback(() => turnTo(0), [turnTo]);
  const finishTurning = useCallback(() => setIsTurning(false), []);

  useEffect(() => {
    if (!isTurning) return;
    const timer = setTimeout(finishTurning, TURN_FALLBACK_MS);
    return () => clearTimeout(timer);
  }, [isTurning, finishTurning]);

  // The opening animation always starts from spread 0, so closing from
  // spread 1 first turns back (existing page-turn), then plays the reverse.
  const close = useCallback(() => {
    if (bookState !== 'open' || isTurning || closeRequested) return;
    setCloseRequested(true);
    if (spread !== 0) {
      setIsTurning(true);
      setSpread(0);
    }
  }, [bookState, isTurning, closeRequested, spread]);

  useEffect(() => {
    if (closeRequested && !isTurning && spread === 0 && bookState === 'open') {
      setCloseRequested(false);
      setBookState('closing');
    }
  }, [closeRequested, isTurning, spread, bookState]);

  return {
    bookState,
    open,
    finishOpening,
    close,
    finishClosing,
    closeRequested,
    spread,
    isTurning,
    turnForward,
    turnBackward,
    finishTurning,
  };
}
