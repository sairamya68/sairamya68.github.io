import { useEffect, useState } from "react";

const links = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Work", "#work"],
  ["Education", "#education"],
  ["Contact", "#contact"],
];

function go(event, href) {
  event.preventDefault();
  const el = document.querySelector(href);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el);
  else el.scrollIntoView();
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
      <a className="brand" href="#top" data-cursor="link" onClick={(e) => go(e, "#top")}>
        <span className="brand-sur">Vallamsetti</span>
        <span className="brand-given">Sai Ramya</span>
      </a>
      <button className={`menu-btn${open ? " is-open" : ""}`} type="button" aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((v) => !v)}>
        <span /><span /><span />
      </button>
      <nav className={`nav-links${open ? " is-open" : ""}`} aria-label="Primary">
        {links.map(([label, href]) => (
          <a key={href} href={href} data-cursor="link" onClick={(e) => { setOpen(false); go(e, href); }}>{label.toUpperCase()}</a>
        ))}
      </nav>
    </header>
  );
}
