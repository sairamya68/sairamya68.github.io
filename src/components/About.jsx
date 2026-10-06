import { siteConfig } from "../data/siteConfig.js";
import { education } from "../data/projects.js";

export default function About() {
  const college = education[0];
  const diploma = education[1];

  return (
    <section className="section" id="about">
      <div className="wrap about-grid">
        <div className="portrait-stage">
          <img src={siteConfig.profileImage} alt="Portrait of Vallamsetti Sairamya" className="portrait" />
        </div>
        <div>
          <span className="kicker">PROFILE</span>
          <h2 className="display">A LITTLE<br />ABOUT ME.</h2>
          <p className="muted" style={{ maxWidth: "62ch" }}>{siteConfig.about}</p>
          <p>{siteConfig.name} · {siteConfig.location}</p>
          <div className="stats">
            <article className="stat"><b>{college.year}</b><span>{college.degree} · {college.score}</span><span className="muted">{college.school}</span></article>
            <article className="stat"><b>{diploma.year}</b><span>{diploma.degree} · {diploma.score}</span><span className="muted">{diploma.school}</span></article>
          </div>
        </div>
      </div>
    </section>
  );
}
