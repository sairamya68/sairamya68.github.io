import { siteConfig } from "../data/siteConfig.js";
import { openMail } from "./ResumeDialog.jsx";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 .5A11.5 11.5 0 0 0 8.36 22.9c.58.1.79-.25.79-.56v-2.16c-3.22.7-3.9-1.38-3.9-1.38-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.41-1.27.74-1.56-2.57-.29-5.27-1.28-5.27-5.72 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.48.11-3.08 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.6.24 2.78.12 3.08.75.81 1.2 1.84 1.2 3.1 0 4.45-2.71 5.42-5.29 5.71.42.36.79 1.08.79 2.18v3.23c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.16h4.52V24H.24V8.16zM8.34 8.16h4.33v2.16h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.02 5.42 6.94V24h-4.52v-7.9c0-1.88-.04-4.3-2.62-4.3-2.62 0-3.02 2.04-3.02 4.16V24H8.34V8.16z"
      />
    </svg>
  );
}

export default function Contact({ onResume }) {
  return (
    <section className="section" id="contact">
      <div className="wrap contact-grid">
        <div>
          <span className="kicker">CONTACT</span>
          <h2 className="display">LET&apos;S BUILD<br />SOMETHING<br /><span className="gold">USEFUL.</span></h2>
          <p className="muted" style={{ maxWidth: "42ch" }}>{siteConfig.contactNote}</p>
          <div className="actions">
            <a className="btn btn-gold" href={`mailto:${siteConfig.email}`} data-magnetic data-cursor="button" onClick={(event) => { event.preventDefault(); openMail("Hello Sairamya", "I would like to connect."); }}>EMAIL ME →</a>
            <button className="btn btn-line" type="button" data-cursor="button" onClick={onResume}>DOWNLOAD RESUME →</button>
          </div>
        </div>
        <div className="meta">
          <p><small>EMAIL</small><a href={`mailto:${siteConfig.email}`} data-cursor="link" onClick={(event) => { event.preventDefault(); openMail("Hello Sairamya", "I would like to connect."); }}>{siteConfig.email}</a></p>
          <p><small>LOCATION</small>{siteConfig.location}</p>
          <div className="socials">
            {siteConfig.github ? (
              <a className="icon-link" href={siteConfig.github} target="_blank" rel="noreferrer" aria-label="GitHub" data-cursor="link">
                <GitHubIcon />
              </a>
            ) : null}
            {siteConfig.linkedin ? (
              <a className="icon-link" href={siteConfig.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" data-cursor="link">
                <LinkedInIcon />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
