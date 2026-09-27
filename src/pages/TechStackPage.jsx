import fishes from '../../assets/Fishes.svg';
import fishesHover from '../../assets/Fishes2.svg';
import antierIcon from '../../assets/antier-icon.png';
import { EXPERIENCE_CONTENT } from '../constants/content';
import { EXPERIENCE_LAYOUT as L } from '../constants/experienceLayout';

export default function TechStackPage({ onOpenTechStack }) {
  return (
    <div className="relative p-5 pt-6">
      <h2 className="notebook-heading text-right">MY TECH STACK</h2>
      {/* Hover morphs to Fishes2.svg (same fish, drawn bigger, with wiggle
          marks); click opens the full tech-stack chart. */}
      <button type="button" className="tech-fish" onClick={onOpenTechStack} aria-label="Open my tech stack">
        <img className="tech-fish__base" src={fishes} alt="" draggable="false" />
        <img className="tech-fish__hover" src={fishesHover} alt="" draggable="false" />
      </button>

      <h2 className="notebook-heading experience-heading" style={{ left: L.heading.left, top: L.heading.top }}>
        EXPERIENCE
      </h2>
      <img
        className="experience-icon"
        src={antierIcon}
        alt=""
        aria-hidden="true"
        style={{ left: L.icon.left, top: L.icon.top, height: L.icon.height }}
      />
      <h3 className="experience-company" style={{ left: L.company.left, top: L.company.top, fontSize: L.company.fontSize }}>
        {EXPERIENCE_CONTENT.company}
      </h3>
      <span className="experience-meta" style={{ left: L.role.left, top: L.role.top, fontSize: L.role.fontSize }}>
        {EXPERIENCE_CONTENT.role}
      </span>
      <span
        className="experience-meta"
        style={{ right: `calc(100% - ${L.date.right}px)`, top: L.date.top, fontSize: L.date.fontSize }}
      >
        {EXPERIENCE_CONTENT.date}
      </span>
      <span className="experience-meta" style={{ left: L.location.left, top: L.location.top, fontSize: L.location.fontSize }}>
        {EXPERIENCE_CONTENT.location}
      </span>
      <p
        className="experience-description"
        style={{
          left: L.desc.left,
          top: L.desc.top,
          fontSize: L.desc.fontSize,
          lineHeight: `${L.desc.lineHeight}px`,
          '--first-indent': `${L.desc.firstLineLeft - L.desc.left}px`,
        }}
      >
        {EXPERIENCE_CONTENT.lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
    </div>
  );
}
