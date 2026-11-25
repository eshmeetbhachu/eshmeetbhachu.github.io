import ProjectEntry from '../components/ProjectEntry';
import canvassyncIcon from '../assets/optimized/canvassync.webp';
import swimSafeIcon from '../../assets/swim-safe.svg';
import assemblyIcon from '../../assets/assembly.svg';
import perspectiveIcon from '../../assets/placeholder-perspective.svg';
import wildlifeIcon from '../../assets/placeholder-wildlife.svg';
import kidneyIcon from '../../assets/placeholder-kidney.svg';
import crown from '../../assets/crown.svg';
import cat from '../../assets/cat.svg';
import { PROJECTS_CONTENT } from '../constants/content';
import { PROJECTS_HEADING, PROJECT_LAYOUT, PROJECT_PAGES, PROJECT_DECOR } from '../constants/projectsLayout';

const ICONS = {
  canvassync: canvassyncIcon,
  perspective: perspectiveIcon,
  wildlife: wildlifeIcon,
  'swim-safe': swimSafeIcon,
  kidney: kidneyIcon,
  assembly: assemblyIcon,
};
const DECOR_SRC = { crown, cat };

// One page of the Projects spread: `side` picks its three projects + doodles.
// Only the left page carries the PROJECTS heading.
export default function ProjectsPage({ side = 'left' }) {
  const keys = PROJECT_PAGES[side];
  const projects = keys.map((key) => PROJECTS_CONTENT.find((p) => p.key === key));

  return (
    <div className="projects-page">
      {side === 'left' && (
        <h2 className="notebook-heading projects-heading" style={{ left: PROJECTS_HEADING.left, top: PROJECTS_HEADING.top }}>
          PROJECTS
        </h2>
      )}
      {projects.map(({ key, ...p }) => (
        <ProjectEntry key={key} icon={ICONS[key]} {...p} layout={PROJECT_LAYOUT[key]} />
      ))}
      {Object.entries(PROJECT_DECOR[side]).map(([name, d]) => (
        <img
          key={name}
          className="project-decor"
          src={DECOR_SRC[name]}
          alt=""
          aria-hidden="true"
          style={{ left: d.left, top: d.top, width: d.width }}
        />
      ))}
    </div>
  );
}
