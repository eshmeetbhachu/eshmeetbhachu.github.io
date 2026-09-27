import { useEffect, useRef, useState } from 'react';
import { STAGE, BOOK_OPEN } from '../constants/layout';
import musicOn from '../../assets/MusicON.svg';
import musicOff from '../../assets/MusicOFF.svg';
import musicSrc from '../../assets/MUSIC.mp3';

const ICON_ASPECT = 105 / 155; // MusicON.svg height / width
const MAX_W = 128; // comfortable, clearly visible size
const EDGE = 12; // gap to the window edge
const GAP = 10; // minimum gap to the open notebook

// Viewport-pixel placement that never touches the open notebook. The stage is
// scaled to fit and centred, so the leftover space sits to the right of it
// (wide windows) or below it (tall windows). The icon only has to be entirely
// right of the book OR entirely below it, so it takes whichever side fits the
// larger icon, capped at MAX_W. Only when the window's shape matches the
// stage's exactly (no leftover space) does it shrink, to fit the book's own
// small bottom-right clearance.
function getPlacement() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const s = Math.min(vw / STAGE.width, vh / STAGE.height);
  const offX = (vw - STAGE.width * s) / 2;
  const offY = (vh - STAGE.height * s) / 2;
  const clearRight = vw - (offX + (BOOK_OPEN.x + BOOK_OPEN.width) * s);
  const clearBelow = vh - (offY + (BOOK_OPEN.y + BOOK_OPEN.height) * s);
  const fitRight = clearRight - EDGE - GAP;
  const fitBelow = (clearBelow - EDGE - GAP) / ICON_ASPECT;
  const width = Math.min(MAX_W, Math.max(fitRight, fitBelow));
  return { width, right: EDGE, bottom: EDGE };
}

// Fixed bottom-right music control. Tries to autoplay on load; if the
// browser blocks that (most do, until the user has interacted with the
// page), it starts on the user's first click/key/touch anywhere instead.
// The icon always reflects the <audio> element's real play/pause state,
// via its own 'play'/'pause' events — not a separately-tracked boolean —
// so it can't drift out of sync with what's actually playing.
export default function MusicToggle() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [placement, setPlacement] = useState(getPlacement);

  useEffect(() => {
    const onResize = () => setPlacement(getPlacement());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    // Autoplay attempt. If it's blocked, fall back to starting on the
    // user's first interaction with the page (once, then stop listening).
    const tryPlay = () => audio.play().catch(() => {});
    tryPlay();

    const onFirstInteraction = (e) => {
      // If this interaction is on the toggle itself, its own onClick below
      // already decides what to do — don't also race it from here (that
      // double-handling could start playback and then immediately pause it
      // again on the very first click).
      if (e.target.closest('.music-toggle')) return;
      if (audio.paused) tryPlay();
      window.removeEventListener('click', onFirstInteraction);
      window.removeEventListener('keydown', onFirstInteraction);
    };
    window.addEventListener('click', onFirstInteraction);
    window.addEventListener('keydown', onFirstInteraction);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      window.removeEventListener('click', onFirstInteraction);
      window.removeEventListener('keydown', onFirstInteraction);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  };

  return (
    <>
      <audio ref={audioRef} src={musicSrc} loop preload="auto" />
      <button
        type="button"
        className="music-toggle"
        style={{ right: placement.right, bottom: placement.bottom }}
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? 'Mute background music' : 'Play background music'}
      >
        <img src={playing ? musicOn : musicOff} alt="" draggable="false" style={{ width: placement.width }} />
      </button>
    </>
  );
}
