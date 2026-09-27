import githubIcon from '../../assets/github.png';

const px = (v) => (v === undefined ? undefined : `${v}px`);

// One project: circle icon + pill bubble (title + description) + links.
// Every piece is placed from `layout` (see constants/projectsLayout.js) so
// the page matches the Canva design exactly rather than relying on flow.
export default function ProjectEntry({ icon, title, lines, border, githubUrl, liveUrl, layout }) {
  const { circle, bubble, title: t, desc, github, live } = layout;

  return (
    <>
      <img
        className="project-circle"
        src={icon}
        alt=""
        style={{ left: px(circle.left), top: px(circle.top), width: px(circle.width) }}
      />
      <div
        className={`project-bubble project-bubble--cap-${bubble.cap}`}
        style={{
          left: px(bubble.left),
          top: px(bubble.top),
          width: px(bubble.width),
          height: px(bubble.height),
          borderColor: border,
        }}
      />
      <h3
        className="project-title"
        style={
          t.anchor === 'right'
            ? { right: `calc(100% - ${t.right}px)`, top: px(t.top) }
            : { left: px(t.left), top: px(t.top) }
        }
      >
        {title}
      </h3>
      <p
        className="project-description"
        style={{ left: px(desc.left), top: px(desc.top), fontSize: px(desc.fontSize), lineHeight: px(desc.lineHeight) }}
      >
        {lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
      <a
        className="project-github"
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${title} on GitHub`}
        style={{ left: px(github.left), top: px(github.top), width: px(github.size), height: px(github.size) }}
      >
        <img src={githubIcon} alt="" />
      </a>
      {liveUrl && live && (
        <a
          className="project-live-link"
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ left: px(live.left), top: px(live.top), fontSize: px(live.fontSize) }}
        >
          live
        </a>
      )}
    </>
  );
}
