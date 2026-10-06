export default function ProjectCard({ project, onOpen }) {
  const tilt = (event) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 800px)").matches) return;
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) translateY(-6px)`;
  };

  return (
    <article
      className="project-card is-copy"
      data-cursor="project"
      onMouseMove={tilt}
      onMouseLeave={(event) => { event.currentTarget.style.transform = ""; }}
      onClick={() => onOpen(project)}
    >
      <div className="project-main">
        <div className="project-no">{project.number}</div>
        <h3 className="project-title">{project.lines[0]}<br />{project.lines[1]}</h3>
      </div>
      <div className="project-side">
        <p className="gold">{project.category}</p>
        <div className="tags">{project.technologies.slice(0, 4).map((tag) => <span key={tag}>{tag.toUpperCase()}</span>)}</div>
        <button className="btn btn-gold" type="button" data-cursor="button" data-magnetic>VIEW PROJECT →</button>
      </div>
    </article>
  );
}
