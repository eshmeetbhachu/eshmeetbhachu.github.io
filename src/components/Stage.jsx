import { STAGE } from '../constants/layout';
import useStageScale from '../hooks/useStageScale';

// Fixed 1366×768 canvas matching the Canva artboard, scaled uniformly to fit the viewport.
export default function Stage({ children }) {
  const scale = useStageScale();

  return (
    <div className="stage-viewport">
      <div style={{ width: STAGE.width * scale, height: STAGE.height * scale }}>
        <div className="stage" style={{ width: STAGE.width, height: STAGE.height, transform: `scale(${scale})` }}>
          {children}
        </div>
      </div>
    </div>
  );
}
