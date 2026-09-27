import { useCallback, useEffect, useState } from 'react';
import Stage from './components/Stage';
import Receipt from './components/Receipt';
import RefOverlay from './components/RefOverlay';
import TechStackModal from './components/TechStackModal';
import ClickEffects from './components/ClickEffects';
import MusicToggle from './components/MusicToggle';
import Notebook from './components/notebook/Notebook';
import AboutPage from './pages/AboutPage';
import TechStackPage from './pages/TechStackPage';
import ProjectsPage from './pages/ProjectsPage';
import PhotographsPage from './pages/PhotographsPage';
import useBookState from './hooks/useBookState';
import { IDENTITY } from './constants/content';
import lineArt from './assets/optimized/lineArt.webp';

export default function App() {
  const { bookState, open, finishOpening, spread, isTurning, turnForward, turnBackward, finishTurning } =
    useBookState();
  const [techOpen, setTechOpen] = useState(false);
  const closeTech = useCallback(() => setTechOpen(false), []);

  // Page content (and every image/SVG it imports) only mounts once it's
  // actually needed, so the closed-state first paint only pulls in the
  // receipt + cover assets. Each flag latches true and stays true — once
  // fetched, content stays mounted rather than unmounting/refetching as the
  // user turns back and forth.
  //
  // spread0 (About + Tech Stack) mounts as soon as the cover starts opening
  // — the hinge animation itself takes ~1.1s and the page content doesn't
  // fade in until partway through that, so this is well ahead of when it's
  // actually revealed, not a visible pop-in.
  //
  // spread1 (Projects + Photographs) mounts once the book is fully open and
  // idle, i.e. while the user is still reading spread 0 — giving the much
  // heavier photo/illustration assets a real head start before they could
  // plausibly click the forward corner, so that turn still feels instant.
  const [spread0Ready, setSpread0Ready] = useState(false);
  const [spread1Ready, setSpread1Ready] = useState(false);

  useEffect(() => {
    if (bookState !== 'closed') setSpread0Ready(true);
  }, [bookState]);

  useEffect(() => {
    if (bookState !== 'open') return undefined;
    const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 300));
    const cancelIdle = window.cancelIdleCallback ?? clearTimeout;
    const id = idle(() => setSpread1Ready(true));
    return () => cancelIdle(id);
  }, [bookState]);

  return (
    <>
      {/* Outside Stage's scaled/transformed tree, so their `position: fixed`
          stays relative to the real viewport at any notebook zoom level. */}
      <ClickEffects />
      <MusicToggle />
      <Stage>
        <Receipt shifted={bookState !== 'closed'} />
        <Notebook
          state={bookState}
          onOpen={open}
          onOpened={finishOpening}
          cover={
            <>
              <p className="cover-title">
                {IDENTITY.name.split(' ').slice(0, 2).join(' ').toUpperCase()}
                <br />
                {IDENTITY.name.split(' ').slice(2).join(' ').toUpperCase()}
              </p>
              <img className="cover-lineart" src={lineArt} alt="" aria-hidden="true" />
            </>
          }
          leftPage={spread0Ready ? <AboutPage /> : null}
          rightPage={spread0Ready ? <TechStackPage onOpenTechStack={() => setTechOpen(true)} /> : null}
          nextLeftPage={spread1Ready ? <ProjectsPage /> : null}
          nextRightPage={spread1Ready ? <PhotographsPage /> : null}
          nextSpreadReady={spread1Ready}
          spread={spread}
          isTurning={isTurning}
          onTurnForward={turnForward}
          onTurnBackward={turnBackward}
          onTurnEnd={finishTurning}
        />
        <TechStackModal open={techOpen} onClose={closeTech} />
        <RefOverlay bookState={bookState} spread={spread} />
      </Stage>
    </>
  );
}
