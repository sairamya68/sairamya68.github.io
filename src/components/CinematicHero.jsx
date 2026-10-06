import { useEffect, useRef } from "react";
import gsap from "gsap";
import WalkingScene from "./WalkingScene.jsx";

function go(event, href) {
  event.preventDefault();
  const el = document.querySelector(href);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el);
  else el.scrollIntoView();
}

const lines = [
  ["Hi,", "I'm", "a"],
  ["Full Stack", "Developer"],
];

export default function CinematicHero({ ready }) {
  const root = useRef(null);

  useEffect(() => {
    if (!ready) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.from(".hero .word span", { y: 40, autoAlpha: 0, duration: 0.9, stagger: 0.06, ease: "power3.out" });
      gsap.from(".hero-reveal", { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.08, delay: 0.35 });
      gsap.from(".hero-figure", { x: 120, autoAlpha: 0, duration: 1.35, ease: "power3.out" });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 800px)").matches;
    const node = root.current;
    if (!node || reduce || narrow) return undefined;
    const onMove = (event) => {
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      node.querySelectorAll("[data-depth]").forEach((el) => {
        const depth = Number(el.dataset.depth);
        el.style.translate = `${x * depth * 24}px ${y * depth * 14}px`;
      });
    };
    node.addEventListener("mousemove", onMove);
    return () => node.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero-panel" data-depth="0.3">
        <h1 className="hero-title">
          {lines.map((line) => (
            <span key={line.join("-")} style={{ display: "block" }}>
              {line.map((word) => (
                <span className="word" key={word}>
                  <span className={word === "Full Stack" ? "gold" : undefined}>{word}</span>
                </span>
              ))}
            </span>
          ))}
        </h1>
        <p className="hero-copy hero-reveal">I build fast, scalable and modern web applications using React, JavaScript and REST APIs.</p>
        <div className="actions hero-reveal hero-actions">
          <a className="btn btn-talk" href="#work" data-magnetic data-cursor="button" onClick={(e) => go(e, "#work")}>View My Work</a>
          <a className="btn btn-talk" href="#contact" data-magnetic data-cursor="button" onClick={(e) => go(e, "#contact")}>Let's Talk</a>
        </div>
      </div>
      <WalkingScene />
      <a className="scroll-hint" href="#about" onClick={(e) => go(e, "#about")}>SCROLL TO EXPLORE ↓</a>
    </section>
  );
}
