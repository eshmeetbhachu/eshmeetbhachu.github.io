import { useCallback, useState } from 'react';
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
import lineArt from '../assets/lineArt.svg';

export default function App() {
  const { bookState, open, finishOpening, spread, isTurning, turnForward, turnBackward, finishTurning } =
    useBookState();
  const [techOpen, setTechOpen] = useState(false);
  const closeTech = useCallback(() => setTechOpen(false), []);

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
          leftPage={<AboutPage />}
          rightPage={<TechStackPage onOpenTechStack={() => setTechOpen(true)} />}
          nextLeftPage={<ProjectsPage />}
          nextRightPage={<PhotographsPage />}
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
