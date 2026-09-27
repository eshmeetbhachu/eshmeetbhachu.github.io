import ProjectEntry from '../components/ProjectEntry';
import canvassyncIcon from '../../assets/canvassync.svg';
import swimSafeIcon from '../../assets/swim-safe.svg';
import assemblyIcon from '../../assets/assembly.svg';
import crown from '../../assets/crown.svg';
import cat from '../../assets/cat.svg';
import { PROJECTS_CONTENT } from '../constants/content';
import { PROJECTS_HEADING, PROJECT_LAYOUT, PROJECT_DECOR } from '../constants/projectsLayout';

const ICONS = { canvassync: canvassyncIcon, 'swim-safe': swimSafeIcon, assembly: assemblyIcon };

export default function ProjectsPage() {
  return (
    <div className="projects-page">
      <h2 className="notebook-heading projects-heading" style={{ left: PROJECTS_HEADING.left, top: PROJECTS_HEADING.top }}>
        PROJECTS
      </h2>
      {PROJECTS_CONTENT.map(({ key, ...p }) => (
        <ProjectEntry key={key} icon={ICONS[key]} {...p} layout={PROJECT_LAYOUT[key]} />
      ))}
      <img
        className="project-decor"
        src={crown}
        alt=""
        aria-hidden="true"
        style={{ left: PROJECT_DECOR.crown.left, top: PROJECT_DECOR.crown.top, width: PROJECT_DECOR.crown.width }}
      />
      <img
        className="project-decor"
        src={cat}
        alt=""
        aria-hidden="true"
        style={{ left: PROJECT_DECOR.cat.left, top: PROJECT_DECOR.cat.top, width: PROJECT_DECOR.cat.width }}
      />
    </div>
  );
}
