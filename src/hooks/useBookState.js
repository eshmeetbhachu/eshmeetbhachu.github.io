import { useCallback, useEffect, useState } from 'react';
import { OPEN_FALLBACK_MS, TURN_FALLBACK_MS } from '../constants/layout';

// closed → opening → open (locked). Once open, `spread` (0|1) + `isTurning`
// drive the page-turn leaf; unrelated to the closed/opening machinery above.
export default function useBookState() {
  const [bookState, setBookState] = useState('closed');
  const [spread, setSpread] = useState(0);
  const [isTurning, setIsTurning] = useState(false);

  const open = useCallback(() => setBookState((s) => (s === 'closed' ? 'opening' : s)), []);
  const finishOpening = useCallback(() => setBookState((s) => (s === 'opening' ? 'open' : s)), []);

  useEffect(() => {
    if (bookState !== 'opening') return;
    const timer = setTimeout(finishOpening, OPEN_FALLBACK_MS);
    return () => clearTimeout(timer);
  }, [bookState, finishOpening]);

  const turnTo = useCallback(
    (target) => {
      if (bookState !== 'open' || isTurning) return;
      setSpread((s) => {
        if (s === target) return s;
        setIsTurning(true);
        return target;
      });
    },
    [bookState, isTurning],
  );

  const turnForward = useCallback(() => turnTo(1), [turnTo]);
  const turnBackward = useCallback(() => turnTo(0), [turnTo]);
  const finishTurning = useCallback(() => setIsTurning(false), []);

  useEffect(() => {
    if (!isTurning) return;
    const timer = setTimeout(finishTurning, TURN_FALLBACK_MS);
    return () => clearTimeout(timer);
  }, [isTurning, finishTurning]);

  return { bookState, open, finishOpening, spread, isTurning, turnForward, turnBackward, finishTurning };
}
