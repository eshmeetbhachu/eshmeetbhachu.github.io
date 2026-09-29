import paperClip from '../../../assets/paperClip.svg';
import { PAPER_CLIP } from '../../constants/layout';

const { hit } = PAPER_CLIP;

export default function PaperClip({ onClick, disabled }) {
  return (
    <button
      type="button"
      className="paper-clip"
      onClick={onClick}
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      aria-label="Close notebook"
      style={{
        left: PAPER_CLIP.left + hit.left,
        top: PAPER_CLIP.top + hit.top,
        width: hit.width,
        height: hit.height,
      }}
    >
      <img
        className="paper-clip__img"
        src={paperClip}
        alt=""
        draggable="false"
        style={{ left: -hit.left, top: -hit.top, width: PAPER_CLIP.width, height: PAPER_CLIP.height }}
      />
    </button>
  );
}
