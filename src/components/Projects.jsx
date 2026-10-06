import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { projects, sellerShots, storefrontShots } from "../data/projects.js";
import ProjectCard from "./ProjectCard.jsx";

function Modal({ project, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.__lenis?.start();
    };
  }, [onClose]);

  return createPortal(
    <div className="modal-back" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        onClick={(e) => e.stopPropagation()}
        onWheel={(event) => event.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
          <div>
            <div className="project-no">PROJECT {project.number}</div>
            <h3 id="project-title">{project.title}</h3>
          </div>
          <button ref={closeRef} className="close-x" type="button" onClick={onClose} aria-label="Close">×</button>
        </div>
        <p className="muted">{project.description}</p>
        <h4>TECHNOLOGIES</h4>
        <div className="tags">{project.technologies.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <h4>FEATURES</h4>
        <ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
        <h4>LINKS</h4>
        <p className="muted">
          {project.live ? <a href={project.live}>Live demo</a> : "Live demo link not added yet."}
          {" · "}
          {project.github ? <a href={project.github}>GitHub</a> : "GitHub link not added yet."}
        </p>
      </div>
    </div>,
    document.body
  );
}

function StorefrontReel({ shots, label }) {
  const loop = [...shots, ...shots];
  return (
    <div className="shot-reel" aria-label={label}>
      <div className="shot-track">
        {loop.map((shot, index) => (
          <img key={`${shot.src}-${index}`} src={shot.src} alt={index < shots.length ? shot.alt : ""} />
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const [open, setOpen] = useState(null);
  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="work-head">
          <div>
            <span className="kicker">PORTFOLIO</span>
            <h2 className="display">SELECTED<br />WORK.</h2>
          </div>
          <p className="muted">Customer shopping and seller tools for Flint &amp; Thread.</p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <div className="project-block" key={project.id}>
              <ProjectCard project={project} onOpen={setOpen} />
              {project.visual === "commerce" ? <StorefrontReel shots={storefrontShots} label="Flint & Thread storefront" /> : null}
              {project.visual === "seller" ? <StorefrontReel shots={sellerShots} label="Flint & Thread seller application" /> : null}
            </div>
          ))}
        </div>
      </div>
      {open ? <Modal project={open} onClose={() => setOpen(null)} /> : null}
    </section>
  );
}
