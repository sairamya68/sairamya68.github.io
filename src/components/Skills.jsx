import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { marquee, skillGroups } from "../data/skills.js";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const root = useRef(null);
  const loop = [...marquee, ...marquee];

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;
    const ctx = gsap.context(() => {
      gsap.from(".skill-chip", {
        y: 22,
        autoAlpha: 0,
        stagger: 0.05,
        duration: 0.55,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 84%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="skills" ref={root}>
      <div className="wrap">
        <span className="kicker">TOOLKIT</span>
        <h2 className="display">WHAT<br />I WORK WITH.</h2>
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">{loop.map((item, i) => <span key={`${item}-${i}`}>{item} ·</span>)}</div>
        </div>
        <div className="skill-stage">
          {skillGroups.map((group) => (
            <div className="skill-lane" key={group.label}>
              <h3>{group.label.toUpperCase()}</h3>
              <div className="skill-row">
                {group.items.map((item, index) => (
                  <article
                    key={item.name}
                    className="skill-chip"
                    style={{ animationDelay: `${index * 0.2}s` }}
                    data-cursor="link"
                  >
                    <strong>{item.name}</strong>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
