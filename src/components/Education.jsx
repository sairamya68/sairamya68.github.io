import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { education } from "../data/projects.js";

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const root = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;
    const ctx = gsap.context(() => {
      gsap.from(".edu-card", {
        y: 36,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="education" ref={root}>
      <div className="wrap">
        <span className="kicker">ACADEMICS</span>
        <h2 className="display">EDUCATION.</h2>
        <div className="edu-board">
          {education.map((item, index) => (
            <article className="edu-card" key={item.year} style={{ animationDelay: `${index * 0.2}s` }}>
              <span className="edu-index">{String(index + 1).padStart(2, "0")}</span>
              <b className="edu-year">{item.year}</b>
              <h3>{item.degree}</h3>
              {item.field ? <p>{item.field}</p> : null}
              <p className="muted">{item.school}</p>
              <span className="edu-score">{item.score}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
